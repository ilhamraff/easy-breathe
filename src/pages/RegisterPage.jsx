// RegisterPage.jsx
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../config/firebase";
import { setDoc, doc } from "firebase/firestore";
import { Slide, toast, ToastContainer } from "react-toastify";
import { Link } from "react-router-dom";
import RegisterInput from "../components/RegisterInput";
import React from "react";

function RegisterPage() {
  async function registerHandler(email, password, firstName, lastName) {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      const user = auth.currentUser;

      if (user) {
        await setDoc(doc(db, "Users", user.uid), {
          email: user.email,
          firstName: firstName,
          lastName: lastName,
        });
      }

      toast.success("Registrasi Berhasil", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Slide,
      });
    } catch (error) {
      console.error(error);
      toast.error(`Registrasi gagal: ${error.message}`, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Slide,
      });
    }
  }

  return (
    <div className="register-page">
      <div className="register-page__container">
        <div className="register-page__hero">
          <img src="login-image.png" alt="" />
        </div>
        <div className="register-page__form">
          <h3>Register</h3>
          <RegisterInput onRegister={registerHandler} />
          <div>
            <p>
              Sudah punya Akun ? <Link to="/login">Masuk</Link>
            </p>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}

export default RegisterPage;
