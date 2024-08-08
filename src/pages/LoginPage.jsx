// LoginPage.jsx
import { signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate, Link } from "react-router-dom";
import { auth } from "../config/firebase";
import { Slide, toast, ToastContainer } from "react-toastify";
import LoginInput from "../components/LoginInput";

function LoginPage() {
  const navigate = useNavigate();

  async function loginHandler(email, password) {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/home");
    } catch (error) {
      console.error(error.message);
      toast.error(`Login gagal: ${error.message}`, {
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
    <div className="login-page">
      <div className="login-page__container">
        <div className="login-page__hero">
          <img src="login-image.png" alt="" />
        </div>
        <div className="login-page__form">
          <h3>Login</h3>
          <LoginInput onLogin={loginHandler} />
          <div>
            <p>
              Belum punya akun? <Link to="/register">Registrasi Disini</Link>
            </p>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}

export default LoginPage;
