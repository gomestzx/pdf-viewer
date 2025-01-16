import { useEffect, useState } from "react";
import { urlApi } from "../api/urlApi";

export const useFetchPDFs = () => {
  const [PDFs, setPDFs] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchPDFs = async () => {
    setIsLoading(true);
    try {
      const url = `${urlApi}/livros/public/pdfs`;
      const response = await fetch(url);

      if (!response.ok) {
        throw new Error(`http error: ${response.status}`);
      }

      const data = await response.json();
      setPDFs(data);
    } catch (err) {
      new Error("error to fetch PDFs");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchPDFs();
  }, []);

  return { PDFs, isLoading };
};
