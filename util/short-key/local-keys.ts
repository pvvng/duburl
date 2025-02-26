import { validateLocalShortKeys } from "./validate-local-key";

const LOCAL_KEYS_NAME = "werl_key" as const;

export const getLocalKeys = () => localStorage.getItem(LOCAL_KEYS_NAME);
export const setLocalKeys = (newKeys: string[]) => {
  const validatedKeys = validateLocalShortKeys(JSON.stringify(newKeys));
  localStorage.setItem(LOCAL_KEYS_NAME, JSON.stringify(validatedKeys));
};
