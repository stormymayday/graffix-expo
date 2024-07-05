import React, { createContext, useState, useEffect } from "react";
import graffixAPI from "../api/graffixAPI";

const UserDataContext = createContext();

export const UserDataProvider = ({ children }) => {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await graffixAPI.get("/api/v1/users/current-user");
        const userDataWithRole = {
          ...response.data.userWithoutPassword,
          role: response.data.userWithoutPassword.role || "collector", // Default role is collector if not provided
        };
        setUserData(userDataWithRole);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, []);

  const updateUser = async (updatedUserData) => {
    try {
      const response = await graffixAPI.patch(
        "/api/v1/users/update-user",
        updatedUserData
      );
      setUserData((prevUserData) => ({
        ...prevUserData,
        ...updatedUserData,
      }));
      console.log("User data updated:", response.data);
    } catch (error) {
      console.error("Error updating user data:", error);
    }
  };

  return (
    <UserDataContext.Provider value={{ userData, updateUser }}>
      {children}
    </UserDataContext.Provider>
  );
};

export default UserDataContext;
