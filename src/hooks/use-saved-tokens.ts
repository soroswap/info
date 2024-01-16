import { useEffect, useState } from "react";
import { rows } from "../components/tokens-table/data";

const key = "savedTokensIds";

const useSavedTokens = () => {
  const [savedTokensIds, setSavedTokensIds] = useState<string[]>([]);
  const savedTokens = rows.filter((row) => savedTokensIds.includes(row.id));

  useEffect(() => {
    const savedTokensIds = localStorage.getItem(key) || "[]";
    const parsedSavedTokensIds = JSON.parse(savedTokensIds);
    setSavedTokensIds(parsedSavedTokensIds);
  }, []);

  const handleSavePool = (id: string) => {
    if (savedTokensIds.includes(id)) {
      const newSavedTokensIds = savedTokensIds.filter(
        (poolId) => poolId !== id
      );
      localStorage.setItem(key, JSON.stringify(newSavedTokensIds));
      setSavedTokensIds(newSavedTokensIds);
    } else {
      const newSavedTokensIds = [...savedTokensIds, id];
      localStorage.setItem(key, JSON.stringify(newSavedTokensIds));
      setSavedTokensIds(newSavedTokensIds);
    }
  };

  const isTokenSaved = (id: string) => {
    return savedTokensIds.includes(id);
  };

  return { savedTokens, savedTokensIds, handleSavePool, isTokenSaved };
};

export default useSavedTokens;
