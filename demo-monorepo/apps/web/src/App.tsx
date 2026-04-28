import { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { restoreAuthState, useAuthStore } from './store/authStore';
import LoginPage from './pages/LoginPage';
import UploadPage from './pages/UploadPage';
import ReportPage from './pages/ReportPage';
import Layout from './components/Layout';
import './App.css';

function App() {
  const { user } = useAuthStore();

  useEffect(() => {
    restoreAuthState();
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route
          path="/*"
          element={
            user ? (
              <Layout>
                <Routes>
                  <Route path="/upload" element={<UploadPage />} />
                  <Route path="/report" element={<ReportPage />} />
                  <Route path="/" element={<Navigate to="/upload" replace />} />
                </Routes>
              </Layout>
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
