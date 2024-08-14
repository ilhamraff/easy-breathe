import React from "react";
import Navigation from "../components/Navigation";
import Footer from "./Footer";
import LoadingAnimation from "./Loading";

function AppLayout({ children, userDetails, onLogout }) {
  return (
    <div className="app">
      {userDetails ? (
        <>
          <Navigation firstName={userDetails.firstName} onLogout={onLogout} />
          <main>{children}</main>
          <Footer />
        </>
      ) : (
        <LoadingAnimation />
      )}
    </div>
  );
}

export default AppLayout;
