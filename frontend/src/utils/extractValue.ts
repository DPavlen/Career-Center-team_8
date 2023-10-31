export default function extractValue(object: object) {
  const result: { key: string, value: string }[] = [];

  if (!object) {
    return [];
  }

  // eslint-disable-next-line consistent-return
  Object.entries(object).forEach(([key, value]) => {
    if (typeof value === 'string') {
      return result.push({
        key,
        value,
      });
    }
    if (Array.isArray(value)) {
      return result.push(...value.map((v) => ({
        key,
        value: v,
      })));
    }
    if (typeof value === 'object') {
      return result.push(...extractValue(value));
    }
  });

  return result;
}
