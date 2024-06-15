export const removeDuplicateIds = (arr: []) => {
  const map = new Map();

  arr.forEach((item: any) => {
    if (!map.has(item.userId)) {
      map.set(item.userId, item);
    }
  });

  return Array.from(map.values());
};
