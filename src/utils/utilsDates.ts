export const formatDate = (date: Date | string) => {
  // Convert to a Date object if it's a string
  const dateObj = typeof date === 'string' ? new Date(date) : date;

  return dateObj.toLocaleDateString('es-ES', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  });
};

// Función para serializar las fechas
export function serializeDates(data: any): any {
  const serializedData = { ...data };
  Object.keys(serializedData).forEach((key) => {
    if (serializedData[key] instanceof Date) {
      serializedData[key] = serializedData[key].toISOString();
    }
  });
  return serializedData;
}

// Función para deserializar las fechas
export function deserializeDates(data: any): any {
  // Exporta la función
  const deserializedData = { ...data };
  Object.keys(deserializedData).forEach((key) => {
    if (
      typeof deserializedData[key] === 'string' &&
      deserializedData[key].match(
        /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/
      )
    ) {
      deserializedData[key] = new Date(deserializedData[key]);
    }
  });
  return deserializedData;
}
