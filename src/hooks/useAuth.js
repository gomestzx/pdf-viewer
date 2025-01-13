import { useState, useEffect } from "react";

const useAuth = () => {
  const [isAuth, setIsAuth] = useState(false);

  useEffect(() => {
    const checkTokenFromCookie = () => {
      if (typeof document !== "undefined") {
        const cookies = document.cookie.split("; ");
        const userToken = cookies.find((cookie) => cookie.startsWith("userToken="));
        setIsAuth(userToken !== undefined);
        console.log(userToken);
        console.log('aqui')
      }
    };

    checkTokenFromCookie();
  }, []);

  return isAuth;
};

export default useAuth;
