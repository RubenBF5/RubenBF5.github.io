export const CV_ES = {
  url: `${import.meta.env.BASE_URL}cv-ruben-barrientos-es.pdf`,
  filename: 'Ruben-Barrientos-CV-ES.pdf'
};

export const CV_EN = {
  url: `${import.meta.env.BASE_URL}cv-ruben-barrientos-en.pdf`,
  filename: 'Ruben-Barrientos-CV-EN.pdf'
};

export async function downloadCv(event, { url, filename }) {
  event.preventDefault();

  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error(`HTTP ${response.status}`);

    const bytes = await response.arrayBuffer();
    const signature = new TextDecoder().decode(bytes.slice(0, 5));
    if (signature !== '%PDF-') throw new Error('El archivo recibido no es un PDF');

    const file = new File([bytes], filename, { type: 'application/pdf' });
    const objectUrl = URL.createObjectURL(file);
    const link = document.createElement('a');
    link.href = objectUrl;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    link.remove();
    window.setTimeout(() => URL.revokeObjectURL(objectUrl), 60_000);
  } catch (error) {
    console.error('No se pudo descargar el CV:', error);
    window.open(url, '_blank', 'noopener,noreferrer');
  }
}
