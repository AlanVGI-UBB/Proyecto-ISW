import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { authService } from '../services/authService';
import './Dashboard.css';

const Dashboard = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [isDevMode, setIsDevMode] = useState(false);

  useEffect(() => {
    // Verificar si el usuario está autenticado
    if (!authService.isAuthenticated()) {
      navigate('/');
      return;
    }

    // Obtener datos del usuario
    const currentUser = authService.getCurrentUser();
    setUser(currentUser);

    // Verificar si está en modo desarrollo
    const devMode = localStorage.getItem('devMode') === 'true';
    setIsDevMode(devMode);
  }, [navigate]);

  const handleLogout = () => {
    authService.logout();
    localStorage.removeItem('devMode');
    navigate('/');
  };

  if (!user) {
    return null;
  }

  const getRoleName = () => {
    const roles = {
      estudiante: 'Estudiante',
      profesor: 'Profesor',
      administrador: 'Admin',
      admin: 'Admin'
    };
    return roles[user.rol] || user.rol;
  };

  // Datos de ejemplo para las comisiones
  const comisiones = [
    {
      id: 1,
      materia: 'Derecho Civil I',
      ubicacion: 'Aula Magna',
      fecha: '15 de Octubre, 10:00 AM',
      status: 'confirmed',
      tribunal: user.rol === 'profesor' ? 'Tribunal asignado' : null
    },
    {
      id: 2,
      materia: 'Derecho Penal II',
      ubicacion: 'Sala de Juicios',
      fecha: '22 de Octubre, 09:00 AM',
      status: 'pending',
      tribunal: user.rol === 'profesor' ? 'Por confirmar' : null
    }
  ];

  // Renderizar contenido según el rol
  const renderRoleContent = () => {
    switch (user.rol) {
      case 'estudiante':
        return (
          <>
            <div className="content-section">
              <h2 className="section-title">Comisiones Próximas</h2>
              <div className="cards-list">
                {comisiones.map((comision) => (
                  <div key={comision.id} className="comision-card">
                    <div className="comision-icon">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
                        <line x1="16" y1="2" x2="16" y2="6"/>
                        <line x1="8" y1="2" x2="8" y2="6"/>
                        <line x1="3" y1="10" x2="21" y2="10"/>
                      </svg>
                    </div>
                    <div className="comision-content">
                      <h3 className="comision-title">{comision.materia}</h3>
                      <p className="comision-location">{comision.ubicacion}</p>
                      <p className="comision-date">{comision.fecha}</p>
                    </div>
                    <div className={`status-indicator status-${comision.status}`}></div>
                  </div>
                ))}
              </div>
            </div>

            <div className="content-section">
              <h2 className="section-title">Simulaciones Activas</h2>
              <div className="feature-card">
                <p className="feature-description">
                  Prepárate para tus evaluaciones practicando con nuestros casos simulados.
                </p>
                <button className="btn-action">Practicar ahora</button>
              </div>
            </div>

            <div className="content-section">
              <h2 className="section-title">Resultados Recientes</h2>
              <div className="empty-state">
                <p>No hay resultados disponibles</p>
              </div>
            </div>
          </>
        );

      case 'profesor':
        return (
          <>
            <div className="content-section">
              <h2 className="section-title">Comisiones Próximas</h2>
              <div className="cards-list">
                {comisiones.map((comision) => (
                  <div key={comision.id} className="comision-card">
                    <div className="comision-icon">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
                        <line x1="16" y1="2" x2="16" y2="6"/>
                        <line x1="8" y1="2" x2="8" y2="6"/>
                        <line x1="3" y1="10" x2="21" y2="10"/>
                      </svg>
                    </div>
                    <div className="comision-content">
                      <h3 className="comision-title">Evaluación {comision.materia}</h3>
                      <p className="comision-location">{comision.ubicacion}</p>
                      <p className="comision-date">{comision.fecha} - {comision.tribunal}</p>
                    </div>
                    <div className={`status-indicator status-${comision.status}`}></div>
                  </div>
                ))}
              </div>
            </div>

            <div className="content-section">
              <h2 className="section-title">Gestión de Evaluaciones</h2>
              <div className="feature-card">
                <p className="feature-description">
                  Crea y administra las evaluaciones orales de tus asignaturas.
                </p>
                <button className="btn-action">Crear Nueva Evaluación</button>
              </div>
            </div>

            <div className="content-section">
              <h2 className="section-title">Resultados Recientes</h2>
              <div className="empty-state">
                <p>No hay resultados disponibles</p>
              </div>
            </div>
          </>
        );

      case 'administrador':
      case 'admin':
        return (
          <>
            <div className="content-section">
              <h2 className="section-title">Comisiones Próximas</h2>
              <div className="cards-list">
                {comisiones.map((comision) => (
                  <div key={comision.id} className="comision-card">
                    <div className="comision-icon">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
                        <line x1="16" y1="2" x2="16" y2="6"/>
                        <line x1="8" y1="2" x2="8" y2="6"/>
                        <line x1="3" y1="10" x2="21" y2="10"/>
                      </svg>
                    </div>
                    <div className="comision-content">
                      <h3 className="comision-title">{comision.materia}</h3>
                      <p className="comision-location">{comision.ubicacion}</p>
                      <p className="comision-date">{comision.fecha}</p>
                    </div>
                    <div className={`status-indicator status-${comision.status}`}></div>
                  </div>
                ))}
              </div>
            </div>

            <div className="content-section">
              <h2 className="section-title">Panel de Administración</h2>
              <div className="feature-card">
                <p className="feature-description">
                  Gestiona usuarios, configuraciones del sistema y reportes.
                </p>
                <div className="admin-buttons">
                  <button className="btn-action btn-admin">Gestionar Usuarios</button>
                  <button className="btn-action btn-admin-secondary">Ver Reportes</button>
                </div>
              </div>
            </div>

            <div className="content-section">
              <h2 className="section-title">Resultados Recientes</h2>
              <div className="empty-state">
                <p>No hay resultados disponibles</p>
              </div>
            </div>
          </>
        );

      default:
        return <div>Rol no reconocido</div>;
    }
  };

  return (
    <div className="dashboard-container">
      {/* Header */}
      <header className="dashboard-header">
        <div className="header-content">
          <div className="header-left">
            <div className="header-logo">⚖️</div>
            <h1 className="header-title">Facultad de Derecho</h1>
          </div>
          <button className="settings-button" onClick={() => alert('Configuración')}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="3"/>
              <path d="M12 1v6m0 6v6m5.2-13.2l-4.2 4.2m0 6l4.2 4.2M1 12h6m6 0h6m-13.2 5.2l4.2-4.2m0-6l-4.2-4.2"/>
            </svg>
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="dashboard-main">
        {/* Welcome Section */}
        <div className="welcome-section">
          <h2 className="welcome-title">Bienvenido(a), {user.nombre || 'Usuario'}</h2>
          <p className="welcome-role">Rol: {getRoleName()}</p>
        </div>

        {/* Dev Mode Banner */}
        {isDevMode && (
          <div className="dev-mode-banner">
            <span className="dev-badge">🚀 MODO DESARROLLO</span>
            <span>Sesión iniciada sin autenticación</span>
          </div>
        )}

        {/* Role-specific Content */}
        <div className="content-wrapper">
          {renderRoleContent()}
        </div>
      </main>

      {/* Bottom Navigation */}
      <nav className="bottom-nav">
        <button className="nav-item active">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/>
            <polyline points="9 22 9 12 15 12 15 22"/>
          </svg>
          <span>Inicio</span>
        </button>
        <button className="nav-item" onClick={() => navigate('/evaluaciones')}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/>
            <polyline points="14 2 14 8 20 8"/>
          </svg>
          <span>Evaluaciones</span>
        </button>
        <button className="nav-item">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/>
            <circle cx="9" cy="7" r="4"/>
            <path d="M23 21v-2a4 4 0 00-3-3.87m-4-12a4 4 0 010 7.75"/>
          </svg>
          <span>{user.rol === 'profesor' ? 'Comisiones' : 'Simulación'}</span>
        </button>
        <button className="nav-item" onClick={handleLogout}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4"/>
            <polyline points="16 17 21 12 16 7"/>
            <line x1="21" y1="12" x2="9" y2="12"/>
          </svg>
          <span>Salir</span>
        </button>
      </nav>
    </div>
  );
};

export default Dashboard;
