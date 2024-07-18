import React, { createContext, useState, useEffect } from "react";
import graffixAPI from "../api/graffixAPI";

const UserDataContext = createContext();

export const UserDataProvider = ({ children }) => {
  const [userData, setUserData] = useState(null);
  const defaultAvatar = require("../../assets/Profile/defaultAvatar.png");

  const fetchUserData = async () => {
    try {
      const response = await graffixAPI.get("/api/v1/users/current-user");
      const userDataWithRole = {
        ...response.data.userWithoutPassword,
        role: response.data.userWithoutPassword.role || "collector", // Default role is collector if not provided
        defaultAvatar
      };
      setUserData(userDataWithRole);
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

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

  const addTreasureToCollection = async (treasureId) => {
    try {
      const response = await graffixAPI.post(
        `/api/v1/treasure/add-to-collection/${treasureId}`
      );

      if (response.status === 200) {
        setUserData((prevUserData) => ({
          ...prevUserData,
          treasureCollection: response.data.treasureCollection,
        }));
      }

      return response;
    } catch (error) {
      console.error("Error adding treasure to collection:", error);
      throw error;
    }
  };

  return (
    <UserDataContext.Provider
      value={{
        userData,
        fetchUserData,
        updateUser,
        addTreasureToCollection,
      }}
    >
      {children}
    </UserDataContext.Provider>
  );
};

export default UserDataContext;
