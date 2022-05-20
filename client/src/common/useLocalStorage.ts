import { useState, useEffect } from "react";

function getStorageValue(key: string, defaultValue: string) {
  // getting stored value
  const saved: (string | null) = localStorage.getItem(key);
  let initial: JSON;
  if (saved != null) {
    initial = JSON.parse(saved);
    return initial;
  }
  return defaultValue;
}

export const useLocalStorage = (key: string, defaultValue: string) => {
  const [value, setValue] = useState(() => {
    return getStorageValue(key, defaultValue);
  });

  useEffect(() => {
    // storing input name
    console.log("U useLocalStorage/useEffect: " + JSON.stringify(value))
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, setValue];
};