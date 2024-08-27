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
