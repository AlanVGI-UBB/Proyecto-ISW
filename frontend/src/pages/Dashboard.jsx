import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { authService } from '../services/authService';
import './Dashboard.css';

const Dashboard = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Verificar si el usuario está autenticado
    if (!authService.isAuthenticated()) {
      navigate('/');
      return;
    }

    // Obtener datos del usuario
    const currentUser = authService.getCurrentUser();
    setUser(currentUser);
  }, [navigate]);

  const handleLogout = () => {
    authService.logout();
    navigate('/');
  };

  if (!user) {
    return null;
  }

  const getInitials = () => {
    if (user.nombre && user.apellido) {
      return `${user.nombre[0]}${user.apellido[0]}`.toUpperCase();
    }
    return user.email[0].toUpperCase();
  };

  const getRoleName = () => {
    const roles = {
      estudiante: 'Estudiante',
      profesor: 'Profesor',
      admin: 'Administrador'
    };
    return roles[user.rol] || user.rol;
  };

  return (
    <div className="dashboard-container">
      {/* Header */}
      <header className="dashboard-header">
        <div className="header-left">
          <div className="header-icon"></div>
          <h2 className="header-title">
            Sistema de Evaluaciones Orales
          </h2>
        </div>
        <div className="header-right">
          <div className="user-info">
            <div className="user-avatar">{getInitials()}</div>
            <div className="user-details">
              <span className="user-name">
                {user.nombre && user.apellido 
                  ? `${user.nombre} ${user.apellido}`
                  : user.email}
              </span>
              <span className="user-role">{getRoleName()}</span>
            </div>
          </div>
          <button className="logout-button" onClick={handleLogout}>
            Cerrar Sesión
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="dashboard-main">
        <div className="dashboard-content">
          <div className="welcome-card">
            <h1>¡Bienvenido al Sistema!</h1>
            <p>
              Has iniciado sesión exitosamente. Esta es tu área de trabajo.
            </p>
            <p style={{ marginTop: '1rem', color: 'var(--text-secondary)' }}>
              Aquí podrás gestionar tus evaluaciones orales y ver tu progreso académico.
            </p>
          </div>

          {/* Aquí puedes agregar más contenido según las necesidades del proyecto */}
          <div className="welcome-card">
            <h2 style={{ marginBottom: '1rem' }}>Información del Usuario</h2>
            <p><strong>Email:</strong> {user.email}</p>
            <p><strong>Nombre:</strong> {user.nombre || 'No especificado'}</p>
            <p><strong>Apellido:</strong> {user.apellido || 'No especificado'}</p>
            <p><strong>Rol:</strong> {getRoleName()}</p>
            <p><strong>ID:</strong> {user.id}</p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
