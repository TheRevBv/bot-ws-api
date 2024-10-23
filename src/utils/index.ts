/**
 * Normaliza una URL de medios asegurándose de que sea una URL completa.
 * Si la URL proporcionada no comienza con 'http://' o 'https://', se concatena con la ruta base.
 *
 * @param mediaUrl - La URL de medios a normalizar.
 * @param baseUri - La URI base para concatenar en caso de que la mediaUrl sea relativa.
 * @returns La URL completa y normalizada.
 */
export const normalizeMediaUrl = (
  mediaUrl: string,
  baseUri: string
): string => {
  if (mediaUrl && mediaUrl.trim().length > 0) {
    const trimmedUrl = mediaUrl.trim();

    // Verificar si mediaUrl ya es una URL completa
    if (
      !trimmedUrl.toLowerCase().startsWith("http://") &&
      !trimmedUrl.toLowerCase().startsWith("https://")
    ) {
      // Reemplazar barras invertidas por barras normales y eliminar barras iniciales
      const relativePath = trimmedUrl.replace(/\\/g, "/").replace(/^\/+/, "");

      // Asegurarse de que baseUri termine con una barra '/'
      const normalizedBaseUri = baseUri.endsWith("/") ? baseUri : `${baseUri}/`;

      // Combinar baseUri con relativePath
      const fullUri = `${normalizedBaseUri}${relativePath}`;
      return fullUri;
    }
  }
  return mediaUrl;
};
