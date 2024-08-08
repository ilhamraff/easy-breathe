import React from "react";
import Navigation from "../components/Navigation";

function AppLayout({ children, userDetails, onLogout }) {
  return (
    <div>
      {userDetails ? (
        <Navigation firstName={userDetails.firstName} onLogout={onLogout} />
      ) : (
        <p>Loading...</p>
      )}
      <main>{children}</main>
    </div>
  );
}

export default AppLayout;
