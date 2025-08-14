"use client";
import { useState, useEffect } from "react";

const DataFetcher = ({ children, onDataFetched, onLoading }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = async () => {
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
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (loading) {
    return <p className="text-center text-blue-400 text-xl">Chargement des données...</p>;
  }

  if (error) {
    return <p className="text-center text-red-500 text-xl">{error}</p>;
  }

  // Permet de rafraîchir les données
  const refreshData = () => fetchData();

  return children({ data, refreshData });
};

export default DataFetcher;