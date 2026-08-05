import { Navigate, Route, Routes } from "react-router-dom";
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";
import HomePage from "./pages/HomePage";
import AddictionTestPage from "./pages/AddictionTestPage";
import AppLayout from "./components/layout/AppLayout";
import CalculatorPage from "./pages/CalculatorPage";
import AboutPage from "./pages/About";
import ArticlesPage from "./pages/ArticlesPage";
import ArticleDetail from "./pages/ArticleDetailPage";
import ForumPage from "./pages/ForumPage";
import ScrollToTop from "./components/ScrollToTop";
import ProtectedRoute from "./components/ProtectedRoute";
import { useAuth } from "./contexts/AuthContext";
import LoadingAnimation from "./components/Loading";

function App() {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return <LoadingAnimation />;
  }

  return (
    <>
      <ScrollToTop />
      <Routes>
        {/* Auth routes - redirect to home if already logged in */}
        <Route
          path="/login"
          element={isAuthenticated ? <Navigate to="/home" /> : <LoginPage />}
        />
        <Route
          path="/register"
          element={
            isAuthenticated ? <Navigate to="/home" /> : <RegisterPage />
          }
        />

        {/* Public routes - accessible to everyone */}
        <Route
          path="/"
          element={<Navigate to="/home" />}
        />
        <Route
          path="/home"
          element={
            <AppLayout>
              <HomePage />
            </AppLayout>
          }
        />
        <Route
          path="/addiction-test"
          element={
            <AppLayout>
              <AddictionTestPage />
            </AppLayout>
          }
        />
        <Route
          path="/calculator-savings"
          element={
            <AppLayout>
              <CalculatorPage />
            </AppLayout>
          }
        />
        <Route
          path="/articles"
          element={
            <AppLayout>
              <ArticlesPage />
            </AppLayout>
          }
        />
        <Route
          path="/articles/:id"
          element={
            <AppLayout>
              <ArticleDetail />
            </AppLayout>
          }
        />
        <Route
          path="/about"
          element={
            <AppLayout>
              <AboutPage />
            </AppLayout>
          }
        />

        {/* Protected routes - require authentication */}
        <Route
          path="/forum"
          element={
            <ProtectedRoute>
              <AppLayout>
                <ForumPage />
              </AppLayout>
            </ProtectedRoute>
          }
        />
      </Routes>
    </>
  );
}

export default App;
