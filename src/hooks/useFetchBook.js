import { useEffect, useState } from "react";
import { getUserIdFromToken } from "./getUserIdFromToken";
import { urlApi } from "../api/urlApi";

export const useFetchBook = (id) => {
  const [book, setBook] = useState(undefined);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchBook = async () => {
    setIsLoading(true);
    try {
      if (!id) return null;
      const cookies = document.cookie.split("; ");
      const token = cookies.find((cookie) => cookie.startsWith("userToken="));
      console.log(token, 'token');
      const userId = await getUserIdFromToken();
      console.log(userId, 'userId')
      const url = token
        ? `${urlApi}/livros/${id}/${userId}`
        : `${urlApi}/livros/public/${id}`;
      const response = await fetch(url, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error(`Http error: ${response.status}`);
      }

      const data = await response.json();
      setBook(data);
    } catch (error) {
      setError(
        error instanceof Error ? error : new Error("Failed to fetch book")
      );
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchBook();
  }, [id]);

  return { book, isLoading, error };
};
