import { Navigate, Route, Routes, useNavigate } from "react-router-dom";
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";
import HomePage from "./pages/HomePage";
import { useEffect, useState } from "react";
import { auth, db } from "./config/firebase";
import AddictionTestPage from "./pages/AddictionTestPage";
import { doc, getDoc } from "firebase/firestore";
import AppLayout from "./components/AppLayout";
import CalculatorPage from "./pages/CalculatorPage";
import ArticlePage from "./pages/ArticlePage";
import AboutPage from "./pages/About";

function App() {
  const [user, setUser] = useState(null);
  const [userDetails, setUserDetails] = useState(null);

  const navigate = useNavigate();

  const getUserData = async (user) => {
    const docRef = doc(db, "Users", user.uid);
    const docSnap = await getDoc(docRef);
    return docSnap.exists() ? docSnap.data() : null;
  };

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      setUser(user);
      if (user) {
        const userData = await getUserData(user);
        setUserDetails(userData);
      }
    });

    return () => unsubscribe();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function logoutHandler() {
    try {
      await auth.signOut();
      setUser(null);
      setUserDetails(null);
      navigate("/");
    } catch (error) {
      console.error(error.message);
    }
  }

  return (
    <Routes>
      <Route
        path="/"
        element={user ? <Navigate to="/home" /> : <Navigate to="/login" />}
      />
      <Route
        path="/login"
        element={user ? <Navigate to="/home" /> : <LoginPage />}
      />
      <Route
        path="/register"
        element={user ? <Navigate to="/home" /> : <RegisterPage />}
      />
      <Route
        path="/home"
        element={
          user ? (
            <AppLayout userDetails={userDetails} onLogout={logoutHandler}>
              <HomePage />
            </AppLayout>
          ) : (
            <Navigate to="/login" />
          )
        }
      />
      <Route
        path="/addiction-test"
        element={
          user ? (
            <AppLayout userDetails={userDetails} onLogout={logoutHandler}>
              <AddictionTestPage />
            </AppLayout>
          ) : (
            <Navigate to="/login" />
          )
        }
      />
      <Route
        path="/calculator-savings"
        element={
          user ? (
            <AppLayout userDetails={userDetails} onLogout={logoutHandler}>
              <CalculatorPage />
            </AppLayout>
          ) : (
            <Navigate to="/login" />
          )
        }
      />
      <Route
        path="/articles"
        element={
          user ? (
            <AppLayout userDetails={userDetails} onLogout={logoutHandler}>
              <ArticlePage />
            </AppLayout>
          ) : (
            <Navigate to="/login" />
          )
        }
      />
      <Route
        path="/about"
        element={
          user ? (
            <AppLayout userDetails={userDetails} onLogout={logoutHandler}>
              <AboutPage />
            </AppLayout>
          ) : (
            <Navigate to="/login" />
          )
        }
      />
    </Routes>
  );
}

export default App;
