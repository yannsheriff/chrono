export function compare(schema, object) {
  const schemaKeys = Object.keys(schema);
  const objectKeys = Object.keys(object);
  const keymap = schemaKeys.map((schemaKey) => {
    const keyExist = objectKeys.find(objectKey => schemaKey === objectKey);
    if (keyExist) {
      return false;
    }
    return true;
  });
  const haveError = keymap.find(element => element);
  if (haveError) {
    return false;
  }
  return true;
}

export function findMissingKey(schema, object) {
  const schemaKeys = Object.keys(schema);
  const objectKeys = Object.keys(object);
  const keymap = schemaKeys.filter((schemaKey) => {
    const keyExist = objectKeys.find(objectKey => schemaKey === objectKey);
    if (keyExist === undefined) {
      return schemaKey;
    }
  });
  return keymap;
}

export function migrate(schema, object) {
  const missingKey = findMissingKey(schema, object);
  const newObject = { ...object };
  missingKey.forEach((key) => {
    if (typeof schema[key] === 'function') {
      newObject[key] = schema[key](object);
    } else {
      newObject[key] = schema[key];
    }
  });
  return newObject;
}
