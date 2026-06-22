import { useEffect, useMemo, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import './HeroScene3D.css';

const vertexShader = `
  uniform float uTime;
  uniform vec2 uPointer;
  uniform float uPointerActive;
  uniform float uPixelRatio;
  uniform float uAspect;

  attribute float aRandom;
  attribute float aScale;

  varying float vStrength;

  void main() {
    vec3 basePosition = position;
    vec3 direction = normalize(basePosition);

    float waveA = sin(direction.x * 8.0 + uTime * 0.55);
    float waveB = cos(direction.y * 11.0 - uTime * 0.42);
    float waveC = sin((direction.z + direction.x) * 13.0 + uTime * 0.3);
    float surfaceNoise = waveA * waveB * 0.11 + waveC * 0.045;

    vec3 displaced = direction * (length(basePosition) + surfaceNoise);

    vec4 modelPosition = modelMatrix * vec4(displaced, 1.0);
    vec4 viewPosition = viewMatrix * modelPosition;
    vec4 baseProjectedPosition = projectionMatrix * viewPosition;
    vec2 screenPosition = baseProjectedPosition.xy / baseProjectedPosition.w;
    vec2 pointerDelta = screenPosition - uPointer;
    pointerDelta.x *= uAspect;

    float pointerDistance = length(pointerDelta);
    float pointerInfluence =
      (1.0 - smoothstep(0.035, 0.28, pointerDistance))
      * uPointerActive;

    vec2 repulsionDirection = normalize(pointerDelta + vec2(0.0001));
    repulsionDirection.x /= uAspect;
    viewPosition.xy += repulsionDirection * pointerInfluence * 0.46;
    viewPosition.z += pointerInfluence * 0.08;

    gl_Position = projectionMatrix * viewPosition;

    float depthScale = 1.0 / max(1.0, -viewPosition.z);
    gl_PointSize = (2.0 + aScale * 2.4 + pointerInfluence * 1.2) * uPixelRatio * depthScale * 5.2;

    vStrength = 0.38 + aRandom * 0.42 + pointerInfluence * 0.3;
  }
`;

const fragmentShader = `
  varying float vStrength;

  void main() {
    vec2 center = gl_PointCoord - vec2(0.5);
    float distanceToCenter = length(center);
    float alpha = 1.0 - smoothstep(0.12, 0.5, distanceToCenter);

    vec3 color = mix(
      vec3(0.43, 0.47, 0.55),
      vec3(0.95, 0.97, 1.0),
      vStrength
    );

    gl_FragColor = vec4(color, alpha * vStrength);
  }
`;

const createParticleCloud = (count) => {
  const positions = new Float32Array(count * 3);
  const randomValues = new Float32Array(count);
  const scales = new Float32Array(count);
  const goldenAngle = Math.PI * (3 - Math.sqrt(5));
  let seed = 9157;

  const random = () => {
    seed = (seed * 16807) % 2147483647;
    return (seed - 1) / 2147483646;
  };

  for (let index = 0; index < count; index += 1) {
    const y = 1 - (index / (count - 1)) * 2;
    const radiusAtHeight = Math.sqrt(1 - y * y);
    const angle = goldenAngle * index;
    const radius = 1.55 + (random() - 0.5) * 0.14;

    positions[index * 3] = Math.cos(angle) * radiusAtHeight * radius;
    positions[index * 3 + 1] = y * radius;
    positions[index * 3 + 2] = Math.sin(angle) * radiusAtHeight * radius;
    randomValues[index] = random();
    scales[index] = 0.45 + random() * 0.8;
  }

  return { positions, randomValues, scales };
};

function ParticlePlanet() {
  const pointsRef = useRef(null);
  const materialRef = useRef(null);
  const pointerTarget = useRef(new THREE.Vector2(0, 0));
  const smoothPointer = useRef(new THREE.Vector2(0, 0));
  const pointerActivityTarget = useRef(0);
  const pointerActivity = useRef(0);
  const particleCloud = useMemo(
    () => createParticleCloud(window.innerWidth <= 768 ? 3400 : 6200),
    []
  );

  useEffect(() => {
    const handlePointerMove = (event) => {
      pointerActivityTarget.current = 1;
      pointerTarget.current.set(
        (event.clientX / window.innerWidth) * 2 - 1,
        -((event.clientY / window.innerHeight) * 2 - 1)
      );
    };

    const handlePointerLeave = () => {
      pointerActivityTarget.current = 0;
    };

    const handleResize = () => {
      if (materialRef.current) {
        materialRef.current.uniforms.uAspect.value =
          window.innerWidth / window.innerHeight;
      }
    };

    window.addEventListener('pointermove', handlePointerMove, { passive: true });
    window.addEventListener('resize', handleResize, { passive: true });
    document.documentElement.addEventListener('mouseleave', handlePointerLeave);

    return () => {
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('resize', handleResize);
      document.documentElement.removeEventListener('mouseleave', handlePointerLeave);
    };
  }, []);

  useFrame((state, delta) => {
    if (!pointsRef.current || !materialRef.current) return;

    const easing = 1 - Math.exp(-delta * 3.4);
    smoothPointer.current.lerp(pointerTarget.current, easing);
    pointerActivity.current = THREE.MathUtils.lerp(
      pointerActivity.current,
      pointerActivityTarget.current,
      easing
    );

    materialRef.current.uniforms.uTime.value = state.clock.elapsedTime;
    materialRef.current.uniforms.uPointer.value.copy(smoothPointer.current);
    materialRef.current.uniforms.uPointerActive.value = pointerActivity.current;

    pointsRef.current.rotation.x = THREE.MathUtils.lerp(
      pointsRef.current.rotation.x,
      smoothPointer.current.y * 0.24 - 0.08,
      easing
    );
    pointsRef.current.rotation.y += delta * 0.055;
    pointsRef.current.rotation.y += smoothPointer.current.x * delta * 0.055;
    pointsRef.current.rotation.z = THREE.MathUtils.lerp(
      pointsRef.current.rotation.z,
      smoothPointer.current.x * -0.08,
      easing
    );
    pointsRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.055;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[particleCloud.positions, 3]}
        />
        <bufferAttribute
          attach="attributes-aRandom"
          args={[particleCloud.randomValues, 1]}
        />
        <bufferAttribute
          attach="attributes-aScale"
          args={[particleCloud.scales, 1]}
        />
      </bufferGeometry>
      <shaderMaterial
        ref={materialRef}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        transparent
        depthWrite={false}
        blending={THREE.AdditiveBlending}
        uniforms={{
          uTime: { value: 0 },
          uPointer: { value: new THREE.Vector2(0, 0) },
          uPointerActive: { value: 0 },
          uPixelRatio: { value: Math.min(window.devicePixelRatio, 1.5) },
          uAspect: { value: window.innerWidth / window.innerHeight }
        }}
      />
    </points>
  );
}

export default function HeroScene3D() {
  return (
    <div className="hero-scene" aria-hidden="true">
      <div className="hero-scene__fallback" />
      <Canvas
        className="hero-scene__canvas"
        camera={{ position: [0, 0, 5.8], fov: 42 }}
        dpr={[1, 1.5]}
        frameloop="always"
        gl={{
          alpha: true,
          antialias: false,
          powerPreference: 'high-performance'
        }}
      >
        <ParticlePlanet />
      </Canvas>
    </div>
  );
}
