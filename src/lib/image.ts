/**
 * Redimensiona y comprime una foto en el propio navegador (canvas) antes de
 * guardarla como texto (data URI) directo en el documento de Firestore —
 * no hay Firebase Storage detrás (requiere plan de pago), así que la foto
 * vive como un campo más del comentario. A 640px de lado máximo y calidad
 * 0.72 una foto de celular normal queda en 40-150KB, muy por debajo del
 * límite de 1MB por documento de Firestore.
 */
export function compressImage(file: File, maxDimension = 640, quality = 0.72): Promise<string> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    const url = URL.createObjectURL(file);

    img.onload = () => {
      URL.revokeObjectURL(url);

      const scale = Math.min(1, maxDimension / Math.max(img.width, img.height));
      const width = Math.round(img.width * scale);
      const height = Math.round(img.height * scale);

      const canvas = document.createElement('canvas');
      canvas.width = width;
      canvas.height = height;
      const ctx = canvas.getContext('2d');
      if (!ctx) {
        reject(new Error('No se pudo procesar la imagen.'));
        return;
      }
      ctx.drawImage(img, 0, 0, width, height);
      resolve(canvas.toDataURL('image/jpeg', quality));
    };
    img.onerror = () => {
      URL.revokeObjectURL(url);
      reject(new Error('No se pudo leer la imagen.'));
    };
    img.src = url;
  });
}
