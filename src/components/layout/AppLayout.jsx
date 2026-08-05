import React from "react";
import Navigation from "./Navigation";
import Footer from "./Footer";

function AppLayout({ children }) {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50 font-sans text-slate-900 selection:bg-teal-200 selection:text-teal-900">
      <Navigation />
      <main className="flex-1 w-full">{children}</main>
      <Footer />
    </div>
  );
}

export default AppLayout;
