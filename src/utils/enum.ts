export function getEnumKeys(Enum: any): string[] {
  const keys = Object.keys(Enum);
  if (keys.some((key) => Number.isInteger(+key))) {
    return keys.filter((key: string) => !Number.isInteger(+key));
  }
  return keys;
}

export function getEnumValues<T>(Enum: any): T[] {
  return getEnumKeys(Enum).map((key: string) => Enum[key] as T);
}
