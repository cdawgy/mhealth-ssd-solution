export const localStorageStore = (key: string, value: any): void => {
  const stringyfiedObject = JSON.stringify(value);
  localStorage.setItem(key, stringyfiedObject);
};

export const localStorageGet = (key: string): any => {
  const localItem = localStorage.getItem(key);
  return localItem != null ? JSON.parse(localItem) : undefined;
};
