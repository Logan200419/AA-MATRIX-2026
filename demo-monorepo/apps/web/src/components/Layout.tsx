import { useAuthStore } from '../store/authStore';
import { useNavigate } from 'react-router-dom';
import './Layout.css';

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const { user, logout } = useAuthStore();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  return (
    <div className="layout">
      <header className="header">
        <div className="header-container">
          <div className="logo">
            <h1>🔍 DeepfakeDetect</h1>
            <span className="demo-badge">Demo Mode</span>
          </div>
          <div className="user-section">
            <span className="user-name">{user?.email}</span>
            <button 
              className="logout-btn" 
              onClick={handleLogout}
              type="button"
            >
              Logout
            </button>
          </div>
        </div>
      </header>
      <main className="main-content">
        {children}
      </main>
    </div>
  );
}
