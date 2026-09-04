import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import {
  FiFileText,
  FiUsers,
  FiArrowLeft,
  FiLogOut,
  FiMenu,
  FiX,
  FiChevronRight,
} from "react-icons/fi";

const sidebarItems = [
  {
    label: "Artikel",
    path: "/admin/articles",
    icon: FiFileText,
  },
  {
    label: "Kelola Admin",
    path: "/admin/users",
    icon: FiUsers,
  },
];

function AdminLayout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { userDetails, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  // Close sidebar on route change (mobile)
  useEffect(() => {
    setSidebarOpen(false);
  }, [location.pathname]);

  const handleLogout = async () => {
    await logout();
    navigate("/");
  };

  function isActive(path) {
    return location.pathname.startsWith(path);
  }

  const SidebarContent = () => (
    <div className="flex h-full flex-col">
      {/* Logo */}
      <div className="flex h-16 items-center gap-2 px-5">
        <span className="text-xl font-bold tracking-tight text-white">
          Easy Breathe
        </span>
        <span className="rounded-md bg-teal-500/20 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-teal-400">
          Admin
        </span>
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-1 px-3 pt-4">
        {sidebarItems.map((item) => {
          const Icon = item.icon;
          const active = isActive(item.path);
          return (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all ${
                active
                  ? "bg-teal-500/15 text-teal-400"
                  : "text-slate-400 hover:bg-white/5 hover:text-slate-200"
              }`}
            >
              <Icon size={18} />
              {item.label}
              {active && (
                <FiChevronRight className="ml-auto" size={14} />
              )}
            </Link>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="border-t border-white/10 p-3">
        <Link
          to="/home"
          className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-slate-400 transition-colors hover:bg-white/5 hover:text-slate-200"
        >
          <FiArrowLeft size={18} />
          Kembali ke Situs
        </Link>
      </div>
    </div>
  );

  return (
    <div className="flex min-h-screen bg-slate-50">
      {/* Desktop Sidebar */}
      <aside className="fixed inset-y-0 left-0 z-30 hidden w-60 bg-slate-900 lg:block">
        <SidebarContent />
      </aside>

      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-40 lg:hidden">
          <div
            className="absolute inset-0 bg-slate-900/50 backdrop-blur-sm"
            onClick={() => setSidebarOpen(false)}
          />
          <aside className="relative w-60 bg-slate-900 h-full shadow-2xl">
            <button
              onClick={() => setSidebarOpen(false)}
              className="absolute right-3 top-4 rounded-lg p-1.5 text-slate-400 hover:text-white"
            >
              <FiX size={20} />
            </button>
            <SidebarContent />
          </aside>
        </div>
      )}

      {/* Main Content */}
      <div className="flex flex-1 flex-col lg:pl-60">
        {/* Topbar */}
        <header className="sticky top-0 z-20 flex h-16 items-center justify-between border-b border-slate-200 bg-white/80 px-5 backdrop-blur-md lg:px-8">
          {/* Mobile hamburger */}
          <button
            onClick={() => setSidebarOpen(true)}
            className="rounded-lg p-2 text-slate-500 hover:bg-slate-100 lg:hidden"
          >
            <FiMenu size={20} />
          </button>

          {/* Breadcrumb placeholder */}
          <div className="hidden lg:block">
            <h2 className="text-sm font-medium text-slate-800">Panel Admin</h2>
          </div>

          {/* User info + logout */}
          <div className="flex items-center gap-3">
            <div className="hidden text-right sm:block">
              <p className="text-sm font-medium text-slate-800">
                {userDetails?.firstName || "Admin"}
              </p>
              <p className="text-xs text-slate-500">Administrator</p>
            </div>
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-teal-100 text-sm font-semibold text-teal-700">
              {(userDetails?.firstName || "A").charAt(0).toUpperCase()}
            </div>
            <button
              onClick={handleLogout}
              className="rounded-lg p-2 text-slate-400 transition-colors hover:bg-red-50 hover:text-red-500"
              title="Keluar"
            >
              <FiLogOut size={18} />
            </button>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 p-5 lg:p-8">{children}</main>
      </div>
    </div>
  );
}

export default AdminLayout;
