import { useEffect, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import './HeroScene3D.css';

const createParticlePositions = () => {
  const count = 90;
  const positions = new Float32Array(count * 3);
  let seed = 1847;

  const random = () => {
    seed = (seed * 16807) % 2147483647;
    return (seed - 1) / 2147483646;
  };

  for (let index = 0; index < count; index += 1) {
    const radius = 2.2 + random() * 2.7;
    const angle = random() * Math.PI * 2;
    const verticalAngle = Math.acos(2 * random() - 1);

    positions[index * 3] = radius * Math.sin(verticalAngle) * Math.cos(angle);
    positions[index * 3 + 1] = radius * Math.cos(verticalAngle);
    positions[index * 3 + 2] = radius * Math.sin(verticalAngle) * Math.sin(angle);
  }

  return positions;
};

const PARTICLE_POSITIONS = createParticlePositions();

function OrbitalSculpture() {
  const sculptureRef = useRef(null);
  const coreRef = useRef(null);
  const pointer = useRef({ x: 0, y: 0 });
  const scrollProgress = useRef(0);

  useEffect(() => {
    const handlePointerMove = (event) => {
      pointer.current.x = (event.clientX / window.innerWidth) * 2 - 1;
      pointer.current.y = -((event.clientY / window.innerHeight) * 2 - 1);
    };

    const handleScroll = () => {
      scrollProgress.current = Math.min(window.scrollY / window.innerHeight, 1);
    };

    window.addEventListener('pointermove', handlePointerMove, { passive: true });
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useFrame((state, delta) => {
    if (!sculptureRef.current || !coreRef.current) return;

    const targetRotationX = pointer.current.y * 0.16 - 0.08;
    const targetRotationY = pointer.current.x * 0.22 + scrollProgress.current * 0.35;
    const easing = 1 - Math.exp(-delta * 2.8);

    sculptureRef.current.rotation.x = THREE.MathUtils.lerp(
      sculptureRef.current.rotation.x,
      targetRotationX,
      easing
    );
    sculptureRef.current.rotation.y = THREE.MathUtils.lerp(
      sculptureRef.current.rotation.y,
      targetRotationY,
      easing
    );
    sculptureRef.current.rotation.z += delta * 0.035;

    coreRef.current.rotation.x += delta * 0.08;
    coreRef.current.rotation.y += delta * 0.12;

    const floatOffset = Math.sin(state.clock.elapsedTime * 0.55) * 0.08;
    sculptureRef.current.position.y = floatOffset - scrollProgress.current * 0.2;
  });

  return (
    <group ref={sculptureRef} rotation={[-0.08, 0, 0.12]}>
      <mesh ref={coreRef}>
        <icosahedronGeometry args={[1.42, 2]} />
        <meshPhysicalMaterial
          color="#d9dde5"
          roughness={0.3}
          metalness={0.78}
          clearcoat={0.8}
          clearcoatRoughness={0.22}
          transparent
          opacity={0.28}
        />
      </mesh>

      <mesh scale={1.01}>
        <icosahedronGeometry args={[1.42, 2]} />
        <meshBasicMaterial
          color="#ffffff"
          wireframe
          transparent
          opacity={0.2}
        />
      </mesh>

      <mesh rotation={[Math.PI / 2.8, 0.3, 0.2]}>
        <torusGeometry args={[2.02, 0.012, 8, 160]} />
        <meshBasicMaterial color="#c7ceda" transparent opacity={0.32} />
      </mesh>

      <mesh rotation={[0.55, Math.PI / 2.5, -0.3]}>
        <torusGeometry args={[2.42, 0.009, 8, 160]} />
        <meshBasicMaterial color="#ffffff" transparent opacity={0.16} />
      </mesh>

      <points>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[PARTICLE_POSITIONS, 3]}
          />
        </bufferGeometry>
        <pointsMaterial
          color="#ffffff"
          size={0.025}
          sizeAttenuation
          transparent
          opacity={0.45}
          depthWrite={false}
        />
      </points>
    </group>
  );
}

export default function HeroScene3D() {
  return (
    <div className="hero-scene" aria-hidden="true">
      <div className="hero-scene__fallback" />
      <Canvas
        className="hero-scene__canvas"
        camera={{ position: [0, 0, 7.2], fov: 42 }}
        dpr={[1, 1.5]}
        frameloop="always"
        gl={{
          alpha: true,
          antialias: true,
          powerPreference: 'high-performance'
        }}
      >
        <ambientLight intensity={0.7} />
        <directionalLight position={[3, 4, 5]} intensity={2.5} color="#ffffff" />
        <pointLight position={[-4, -2, 3]} intensity={9} color="#78849a" />
        <OrbitalSculpture />
      </Canvas>
    </div>
  );
}
