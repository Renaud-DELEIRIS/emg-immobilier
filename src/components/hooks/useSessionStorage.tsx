export const useSessionStorage = (key: string) => {
  const get = () => window.sessionStorage.getItem(key);
  const set = (v: string) => window.sessionStorage.setItem(key, v);

  return {
    get,
    set,
  };
};
