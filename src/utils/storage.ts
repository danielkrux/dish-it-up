import { createAsyncStoragePersister } from "@tanstack/query-async-storage-persister";
import { Asset } from "expo-asset";
import { MMKV } from "react-native-mmkv";

export const storage = new MMKV();

export function getItem<T>(key: string): T {
  const value = storage.getString(key);
  return value ? JSON.parse(value) || null : null;
}

export async function setItem<T>(key: string, value: T) {
  storage.set(key, JSON.stringify(value));
}

export async function removeItem(key: string) {
  storage.delete(key);
}

export async function fetchFile(uri: string) {
  const downloadedFile = await fetch(uri);
  return downloadedFile.text();
}

export const clientPersister = createAsyncStoragePersister({
  storage: { setItem, getItem, removeItem },
});
