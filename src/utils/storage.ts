import { createAsyncStoragePersister } from "@tanstack/query-async-storage-persister";
import { createMMKV } from "react-native-mmkv";

export const storage = createMMKV();

export function getItem<T>(key: string): T | null {
  const value = storage.getString(key);
  return value ? JSON.parse(value) : null;
}

export function setItem<T>(key: string, value: T) {
  storage.set(key, JSON.stringify(value));
}

export function removeItem(key: string) {
  storage.remove(key);
}

export async function fetchFile(uri: string) {
  const downloadedFile = await fetch(uri);
  return downloadedFile.text();
}

export const clientPersister = createAsyncStoragePersister({
  storage: { setItem, getItem, removeItem },
});
