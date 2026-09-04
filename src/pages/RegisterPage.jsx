// RegisterPage.jsx
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../config/firebase";
import { setDoc, doc, serverTimestamp } from "firebase/firestore";
import { ToastContainer } from "react-toastify";
import { showSuccessToast, showErrorToast } from "../utils/toast";
import { Link } from "react-router-dom";
import RegisterInput from "../components/RegisterInput";
import React, { useState } from "react";

function RegisterPage() {
  const [loading, setLoading] = useState(false);
  async function registerHandler(email, password, firstName, lastName) {
    setLoading(true);
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      const user = auth.currentUser;

      if (user) {
        await setDoc(doc(db, "Users", user.uid), {
          email: user.email,
          firstName: firstName,
          lastName: lastName,
          role: "user",
          createdAt: serverTimestamp(),
        });
      }

      showSuccessToast("Registrasi Berhasil");
    } catch (error) {
      console.error(error);
      showErrorToast(`Registrasi gagal: ${error.message}`);
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
          <h2 className="text-4xl font-bold text-white mb-4">Langkah Pertama Anda.</h2>
          <p className="text-teal-100 max-w-md text-lg">
            Bergabunglah sekarang dan temukan metode, pelacakan, dan dukungan yang Anda butuhkan untuk kehidupan bebas asap rokok.
          </p>
        </div>
      </div>

      {/* Right Side - Form */}
      <div className="flex w-full flex-col justify-center px-8 sm:px-12 lg:w-1/2 lg:px-24">
        <div className="mx-auto w-full max-w-sm">
          <div className="mb-10 text-center lg:text-left">
            <h1 className="text-3xl font-bold tracking-tight text-slate-900">Buat Akun Baru</h1>
            <p className="mt-2 text-sm text-slate-600">
              Isi data diri Anda di bawah ini untuk memulai.
            </p>
          </div>

          <RegisterInput onRegister={registerHandler} loading={loading} />
          
          <div className="mt-8 text-center text-sm text-slate-600">
            Sudah punya Akun?{" "}
            <Link to="/login" className="font-semibold text-teal-600 transition-colors hover:text-teal-500">
              Masuk Disini
            </Link>
          </div>
        </div>
      </div>
      
      <ToastContainer />
    </div>
  );
}

export default RegisterPage;

