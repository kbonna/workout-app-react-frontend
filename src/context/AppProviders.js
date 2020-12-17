import React from "react";
import NotificationProvider from "./NotificationProvider";
import UserProvider from "./UserProvider";
import AuthProvider from "./AuthProvider";
import FlagsProvider from "./FlagsProvider";

function AppProviders({ children }) {
  return (
    <AuthProvider>
      <UserProvider>
        <FlagsProvider>
          <NotificationProvider>{children}</NotificationProvider>
        </FlagsProvider>
      </UserProvider>
    </AuthProvider>
  );
}

export default AppProviders;
