import React from "react";
import { FiFileText, FiGithub, FiInstagram, FiLinkedin, FiMail } from "react-icons/fi";
import { Link } from "react-router-dom";

function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-slate-900 pt-16 pb-8 text-slate-300">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-3 lg:gap-8">
          
          {/* Brand Column */}
          <div className="flex flex-col gap-4">
            <h2 className="text-2xl font-bold tracking-tight text-white">
              Easy Breathe.
            </h2>
            <p className="max-w-xs text-sm leading-relaxed text-slate-400">
              Platform pendamping untuk membantu Anda membebaskan diri dari kecanduan merokok dan memulai hidup yang lebih sehat.
            </p>
            <div className="mt-4 flex gap-4">
              <a href="https://www.linkedin.com/in/ilhamrafifadhilah/" target="_blank" rel="noopener noreferrer" className="rounded-full bg-slate-800 p-2 text-slate-400 transition-colors hover:bg-teal-600 hover:text-white" aria-label="LinkedIn">
                <FiLinkedin size={20} />
              </a>
              <a href="https://github.com/ilhamraff" target="_blank" rel="noopener noreferrer" className="rounded-full bg-slate-800 p-2 text-slate-400 transition-colors hover:bg-teal-600 hover:text-white" aria-label="GitHub">
                <FiGithub size={20} />
              </a>
              <a href="https://www.instagram.com/ilhamraff_/" target="_blank" rel="noopener noreferrer" className="rounded-full bg-slate-800 p-2 text-slate-400 transition-colors hover:bg-teal-600 hover:text-white" aria-label="Instagram">
                <FiInstagram size={20} />
              </a>
              <a href="https://ilhamrafi-portfolio.web.app/" target="_blank" rel="noopener noreferrer" className="rounded-full bg-slate-800 p-2 text-slate-400 transition-colors hover:bg-teal-600 hover:text-white" aria-label="Portfolio">
                <FiFileText size={20} />
              </a>
            </div>
          </div>

          {/* Links Column */}
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-2 md:col-span-2">
            <div>
              <h3 className="text-sm font-semibold tracking-wider text-white uppercase">Navigasi</h3>
              <ul className="mt-6 space-y-4">
                <li>
                  <Link to="/" className="text-sm transition-colors hover:text-teal-400">Beranda</Link>
                </li>
                <li>
                  <Link to="/articles" className="text-sm transition-colors hover:text-teal-400">Artikel Edukasi</Link>
                </li>
                <li>
                  <Link to="/forum" className="text-sm transition-colors hover:text-teal-400">Forum Diskusi</Link>
                </li>
                <li>
                  <Link to="/about" className="text-sm transition-colors hover:text-teal-400">Tentang Kami</Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-semibold tracking-wider text-white uppercase">Layanan</h3>
              <ul className="mt-6 space-y-4">
                <li>
                  <Link to="/addiction-test" className="text-sm transition-colors hover:text-teal-400">Tes Kecanduan</Link>
                </li>
                <li>
                  <Link to="/calculator-savings" className="text-sm transition-colors hover:text-teal-400">Kalkulator Hemat</Link>
                </li>
              </ul>
            </div>
          </div>

        </div>
        
        {/* Bottom Bar */}
        <div className="mt-16 border-t border-slate-800 pt-8 flex flex-col items-center justify-between gap-4 sm:flex-row">
          <p className="text-xs leading-5 text-slate-400">
            &copy; {currentYear} Easy Breathe. All rights reserved.
          </p>
          <div className="flex gap-4 text-xs text-slate-400">
            <span>Dibuat dengan semangat untuk hidup lebih sehat.</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
