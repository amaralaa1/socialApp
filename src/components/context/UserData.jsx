import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { createContext, useEffect, useState } from "react";

export let UserData = createContext();
 
export function UserDataProvider({ children }) {

  const [Token, setToken] = useState(null);

  function getUserData() {
    return axios.get(
      `https://route-posts.routemisr.com/users/profile-data`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("userToken")}`
        }
      }
    );
  }

  let { data, error, isError, isLoading } = useQuery({
    queryKey: ["userData"],
    queryFn: getUserData,
    select: (res) => res?.data.data.user,
    enabled: !!Token
  });

  useEffect(() => {
    const token = localStorage.getItem("userToken");

    if (token) {
      setToken(token);
    }
  }, []);

  console.log(data);

  return (
    <UserData.Provider value={{ Token, setToken, data }}>
      {children}
    </UserData.Provider>
  );
}










