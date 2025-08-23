// app/housing/HousingClient.js
"use client";
import { useState, useEffect, useCallback } from "react";

const DataFetcher = ({ children, onDataFetched, onLoading }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // 1. Enveloppez fetchData dans useCallback
  const fetchData = useCallback(async () => {
    setLoading(true);
    if (onLoading) onLoading(true);
    try {
      const res = await fetch("/api/reservations");
      if (!res.ok) {
        throw new Error("Failed to fetch data");
      }
      const jsonData = await res.json();
      setData(jsonData);
      if (onDataFetched) onDataFetched(jsonData);
    } catch (err) {
      setError("Erreur de chargement des données.");
      console.error(err);
    } finally {
      setLoading(false);
      if (onLoading) onLoading(false);
    }
  }, [onDataFetched, onLoading]); // 2. Ajoutez les dépendances de fetchData ici

  // 3. Ajoutez fetchData à la liste de dépendances de useEffect
  useEffect(() => {
    fetchData();
  }, [fetchData]);

  if (loading) {
    return <p className="text-center text-blue-400 text-xl">Chargement des données...</p>;
  }

  if (error) {
    return <p className="text-center text-red-500 text-xl">{error}</p>;
  }

  const refreshData = () => fetchData();

  return children({ data, refreshData });
};

export default DataFetcher;