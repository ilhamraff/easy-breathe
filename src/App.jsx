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
import AboutPage from "./pages/About";
import ArticlesPage from "./pages/ArticlesPage";
import ArticleDetail from "./pages/ArticleDetailPage";
import ForumPage from "./pages/ForumPage";
import ScrollToTop from "./components/ScrollToTop";

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

  function PrivateRoute({ user, children }) {
    return user ? children : <Navigate to="/login" />;
  }

  return (
    <>
      <ScrollToTop />
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
            <PrivateRoute user={user}>
              <AppLayout userDetails={userDetails} onLogout={logoutHandler}>
                <HomePage />
              </AppLayout>
            </PrivateRoute>
          }
        />
        <Route
          path="/addiction-test"
          element={
            <PrivateRoute user={user}>
              <AppLayout userDetails={userDetails} onLogout={logoutHandler}>
                <AddictionTestPage />
              </AppLayout>
            </PrivateRoute>
          }
        />
        <Route
          path="/calculator-savings"
          element={
            <PrivateRoute user={user}>
              <AppLayout userDetails={userDetails} onLogout={logoutHandler}>
                <CalculatorPage />
              </AppLayout>
            </PrivateRoute>
          }
        />
        <Route
          path="/forum"
          element={
            <PrivateRoute user={user}>
              <AppLayout userDetails={userDetails} onLogout={logoutHandler}>
                <ForumPage firstName={userDetails?.firstName} />
              </AppLayout>
            </PrivateRoute>
          }
        />
        <Route
          path="/articles"
          element={
            <PrivateRoute user={user}>
              <AppLayout userDetails={userDetails} onLogout={logoutHandler}>
                <ArticlesPage />
              </AppLayout>
            </PrivateRoute>
          }
        />
        <Route
          path="/articles/:id"
          element={
            <PrivateRoute user={user}>
              <AppLayout userDetails={userDetails} onLogout={logoutHandler}>
                <ArticleDetail />
              </AppLayout>
            </PrivateRoute>
          }
        />
        <Route
          path="/about"
          element={
            <PrivateRoute user={user}>
              <AppLayout userDetails={userDetails} onLogout={logoutHandler}>
                <AboutPage />
              </AppLayout>
            </PrivateRoute>
          }
        />
      </Routes>
    </>
  );
}

export default App;
