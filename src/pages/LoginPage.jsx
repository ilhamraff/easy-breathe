// LoginPage.jsx
import React, { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate, Link } from "react-router-dom";
import { auth } from "../config/firebase";
import { ToastContainer } from "react-toastify";
import { showErrorToast } from "../utils/toast";
import LoginInput from "../components/LoginInput";

function LoginPage() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  async function loginHandler(email, password) {
    setLoading(true);
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/home");
    } catch (error) {
      console.error(error.message);
      showErrorToast(`Login gagal: ${error.message}`);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex min-h-screen bg-slate-50">
      {/* Left Side - Image/Branding */}
      <div className="hidden w-1/2 bg-teal-900 lg:block relative overflow-hidden">
        <div className="absolute inset-0 bg-teal-800/20 mix-blend-multiply z-10" />
        <img 
          src="login-image.png" 
          alt="Ilustrasi berhenti merokok" 
          className="absolute inset-0 w-full h-full object-cover opacity-80"
        />
        <div className="absolute inset-0 z-20 flex flex-col justify-end p-12 bg-linear-to-t from-teal-950 via-teal-900/60 to-transparent">
          <h2 className="text-4xl font-bold text-white mb-4">Mulai Perjalanan Anda.</h2>
          <p className="text-teal-100 max-w-md text-lg">
            Bergabung dengan komunitas kami untuk mendapatkan dukungan penuh dalam membebaskan diri dari kecanduan merokok.
          </p>
        </div>
      </div>

      {/* Right Side - Form */}
      <div className="flex w-full flex-col justify-center px-8 sm:px-12 lg:w-1/2 lg:px-24">
        <div className="mx-auto w-full max-w-sm">
          <div className="mb-10 text-center lg:text-left">
            <h1 className="text-3xl font-bold tracking-tight text-slate-900">Selamat Datang Kembali</h1>
            <p className="mt-2 text-sm text-slate-600">
              Silakan masuk ke akun Anda untuk melanjutkan.
            </p>
          </div>

          <LoginInput onLogin={loginHandler} loading={loading} />
          
          <div className="mt-8 text-center text-sm text-slate-600">
            Belum punya akun?{" "}
            <Link to="/register" className="font-semibold text-teal-600 transition-colors hover:text-teal-500">
              Registrasi Disini
            </Link>
          </div>
        </div>
      </div>
      
      <ToastContainer />
    </div>
  );
}

export default LoginPage;

