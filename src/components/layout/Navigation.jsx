import React, { useState, useEffect } from "react";
import { FiChevronDown, FiLogOut, FiMenu, FiX, FiUser, FiSettings } from "react-icons/fi";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/Button";

function Navigation() {
  const [isDropDownOpen, setIsDropDownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  
  const { userDetails, isAuthenticated, isAdmin, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
    setIsDropDownOpen(false);
  }, [location.pathname]);

  const handleLogout = async () => {
    await logout();
    navigate("/");
  };

  const [isContributionOpen, setIsContributionOpen] = useState(false);

  const NavLinks = ({ mobile = false }) => (
    <>
      <Link 
        to="/" 
        className={`font-medium transition-colors hover:text-teal-600 ${mobile ? 'block py-3 text-lg border-b border-slate-100' : 'text-slate-600'}`}
      >
        Beranda
      </Link>
      
      <div className={`relative group ${mobile ? 'block border-b border-slate-100 py-3' : 'flex items-center'}`}>
        <button 
          onClick={() => setIsDropDownOpen(!isDropDownOpen)}
          className={`flex items-center gap-1 font-medium transition-colors hover:text-teal-600 ${mobile ? 'w-full justify-between text-lg' : 'text-slate-600'}`}
        >
          Layanan <FiChevronDown className={`transition-transform duration-200 ${isDropDownOpen ? 'rotate-180' : ''}`} />
        </button>
        
        {/* Dropdown for Desktop & Mobile */}
        <div className={`
          ${mobile ? (isDropDownOpen ? 'block mt-4 pl-4 space-y-4' : 'hidden') : 
          'absolute top-full left-0 mt-2 w-48 rounded-xl bg-white p-2 shadow-lg ring-1 ring-slate-900/5 transition-all opacity-0 invisible group-hover:opacity-100 group-hover:visible translate-y-2 group-hover:translate-y-0'}
        `}>
          <Link to="/addiction-test" className="block rounded-lg px-4 py-2 text-sm font-medium text-slate-700 hover:bg-teal-50 hover:text-teal-700">
            Tes Kecanduan
          </Link>
          <Link to="/calculator-savings" className="block rounded-lg px-4 py-2 text-sm font-medium text-slate-700 hover:bg-teal-50 hover:text-teal-700">
            Kalkulator
          </Link>
          <Link to="/forum" className="block rounded-lg px-4 py-2 text-sm font-medium text-slate-700 hover:bg-teal-50 hover:text-teal-700">
            Forum Diskusi
          </Link>
        </div>
      </div>

      <Link 
        to="/articles" 
        className={`font-medium transition-colors hover:text-teal-600 ${mobile ? 'block py-3 text-lg border-b border-slate-100' : 'text-slate-600'}`}
      >
        Artikel
      </Link>

      {isAuthenticated && (
        <div className={`relative group ${mobile ? 'block border-b border-slate-100 py-3' : 'flex items-center'}`}>
          <button 
            onClick={() => setIsContributionOpen(!isContributionOpen)}
            className={`flex items-center gap-1 font-medium transition-colors hover:text-teal-600 ${mobile ? 'w-full justify-between text-lg' : 'text-slate-600'}`}
          >
            Kontribusi <FiChevronDown className={`transition-transform duration-200 ${isContributionOpen ? 'rotate-180' : ''}`} />
          </button>
          
          <div className={`
            ${mobile ? (isContributionOpen ? 'block mt-4 pl-4 space-y-4' : 'hidden') : 
            'absolute top-full left-0 mt-2 w-48 rounded-xl bg-white p-2 shadow-lg ring-1 ring-slate-900/5 transition-all opacity-0 invisible group-hover:opacity-100 group-hover:visible translate-y-2 group-hover:translate-y-0'}
          `}>
            <Link to="/kontribusi/tulis" className="block rounded-lg px-4 py-2 text-sm font-medium text-slate-700 hover:bg-teal-50 hover:text-teal-700">
              Tulis Artikel
            </Link>
            <Link to="/kontribusi/artikel-saya" className="block rounded-lg px-4 py-2 text-sm font-medium text-slate-700 hover:bg-teal-50 hover:text-teal-700">
              Artikel Saya
            </Link>
          </div>
        </div>
      )}
      
      <Link 
        to="/about" 
        className={`font-medium transition-colors hover:text-teal-600 ${mobile ? 'block py-3 text-lg border-b border-slate-100' : 'text-slate-600'}`}
      >
        Tentang
      </Link>
    </>
  );

  return (
    <>
    <header className={`sticky top-0 z-50 w-full transition-all duration-300 ${scrolled ? 'bg-white/80 backdrop-blur-md shadow-sm' : 'bg-white'}`}>
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6 lg:px-8">
        
        {/* Logo */}
        <Link to="/" className="flex items-center">
          <img
            src="/easybreathe-logo.svg"
            alt="Easy Breathe"
            className="h-9 w-auto object-contain transition-transform duration-200 hover:opacity-90"
          />
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          <NavLinks />
        </nav>

        {/* User Actions */}
        <div className="hidden md:flex items-center gap-4">
          {isAuthenticated ? (
            <div className="flex items-center gap-4">
              {isAdmin && (
                <Link
                  to="/admin"
                  className="inline-flex items-center gap-1.5 rounded-lg bg-slate-900 px-3 py-1.5 text-xs font-medium text-white transition-colors hover:bg-slate-800"
                >
                  <FiSettings size={13} />
                  Admin Panel
                </Link>
              )}
              <div className="flex items-center gap-2 text-sm font-medium text-slate-700">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-teal-100 text-teal-700">
                  <FiUser />
                </div>
                {userDetails?.firstName || "User"}
              </div>
              <Button variant="ghost" size="sm" onClick={handleLogout} className="text-slate-500 hover:text-red-600">
                <FiLogOut className="mr-2" /> Keluar
              </Button>
            </div>
          ) : (
            <Button onClick={() => navigate("/login")} variant="primary" size="md">
              Masuk
            </Button>
          )}
        </div>

        {/* Mobile Menu Toggle */}
        <button 
          className="md:hidden flex items-center justify-center rounded-lg p-2 text-slate-600 hover:bg-slate-100"
          onClick={() => setIsMobileMenuOpen(true)}
        >
          <FiMenu size={24} />
        </button>
      </div>
    </header>

    {/* Mobile Drawer Overlay */}
    {isMobileMenuOpen && (
      <div className="fixed inset-0 z-100 md:hidden">
        <div 
          className="fixed inset-0 bg-slate-900/20 backdrop-blur-sm"
          onClick={() => setIsMobileMenuOpen(false)}
        />
        <div className="fixed inset-y-0 right-0 w-full max-w-sm bg-white px-6 py-6 shadow-xl sm:ring-1 sm:ring-slate-900/10">
          <div className="flex items-center justify-between mb-8">
            <Link to="/" className="flex items-center">
              <img
                src="/easybreathe-logo.svg"
                alt="Easy Breathe"
                className="h-8 w-auto object-contain"
              />
            </Link>
            <button 
              className="rounded-lg p-2 text-slate-600 hover:bg-slate-100"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <FiX size={24} />
            </button>
          </div>
          
          <nav className="flex flex-col mb-8">
            <NavLinks mobile={true} />
          </nav>
          
          <div className="mt-auto border-t border-slate-100 pt-8">
            {isAuthenticated ? (
              <div className="flex flex-col gap-4">
                {isAdmin && (
                  <Link
                    to="/admin"
                    className="flex items-center justify-center gap-2 rounded-xl bg-slate-900 px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-slate-800"
                  >
                    <FiSettings size={15} />
                    Admin Panel
                  </Link>
                )}
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-teal-100 text-teal-700">
                    <FiUser size={20} />
                  </div>
                  <div>
                    <p className="text-sm text-slate-500">Masuk sebagai</p>
                    <p className="font-medium text-slate-900">{userDetails?.firstName || "User"}</p>
                  </div>
                </div>
                <Button variant="outline" className="w-full justify-center text-red-600" onClick={handleLogout}>
                  <FiLogOut className="mr-2" /> Keluar
                </Button>
              </div>
            ) : (
              <Button onClick={() => navigate("/login")} className="w-full justify-center">
                Masuk ke Akun
              </Button>
            )}
          </div>
        </div>
      </div>
    )}
    </>
  );
}

export default Navigation;
