import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { authService } from '../services/authService';
import Header from '../components/Header';
import './Configuracion.css';

const Configuracion = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [activeTab, setActiveTab] = useState('usuario');
  const [formData, setFormData] = useState({
    nombre: '',
    apellido: '',
    email: '',
    telefono: '+56 9 1234 5678',
    correoPersonal: 'juan.perez.g@email.com',
    asignatura: 'Derecho Penal I'
  });
  const [isEditing, setIsEditing] = useState({
    telefono: false,
    correoPersonal: false
  });

  useEffect(() => {
    if (!authService.isAuthenticated()) {
      navigate('/');
      return;
    }
    const currentUser = authService.getCurrentUser();
    setUser(currentUser);
    
    // Inicializar datos del formulario
    setFormData(prev => ({
      ...prev,
      nombre: currentUser.nombre || '',
      apellido: currentUser.apellido || '',
      email: currentUser.email || ''
    }));
  }, [navigate]);

  const handleLogout = () => {
    authService.logout();
    localStorage.removeItem('devMode');
    navigate('/');
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const toggleEdit = (field) => {
    setIsEditing(prev => ({
      ...prev,
      [field]: !prev[field]
    }));
  };

  const handleSave = (field) => {
    // Aquí iría la lógica para guardar en el backend
    toggleEdit(field);
    alert(`${field} actualizado correctamente`);
  };

  const handleCerrarSesion = () => {
    if (window.confirm('¿Estás seguro que deseas cerrar sesión?')) {
      handleLogout();
    }
  };

  if (!user) {
    return null;
  }

  const getRoleName = () => {
    const roles = {
      estudiante: 'Estudiante',
      profesor: 'Docente',
      administrador: 'Admin',
      admin: 'Admin'
    };
    return roles[user.rol] || user.rol;
  };

  return (
    <div className="configuracion-container">
      {/* Header */}
      <Header />

      {/* Main Content */}
      <main className="configuracion-main">
        <div className="configuracion-content">
          <h2 className="page-title">Configuración</h2>

          {/* Tabs */}
          <div className="config-tabs">
            <button 
              className={`tab-button ${activeTab === 'usuario' ? 'active' : ''}`}
              onClick={() => setActiveTab('usuario')}
            >
              Usuario
            </button>
            <button 
              className={`tab-button ${activeTab === 'aplicacion' ? 'active' : ''}`}
              onClick={() => setActiveTab('aplicacion')}
            >
              Aplicación
            </button>
          </div>

          {/* Tab Content */}
          {activeTab === 'usuario' && (
            <div className="tab-content">
              {/* User Info Card */}
              <div className="info-card">
                <h3 className="info-name">{formData.nombre} {formData.apellido}</h3>
                <p className="info-email">{formData.email}</p>
                <p className="info-role">Rol: {getRoleName()}</p>
                {user.rol === 'profesor' && (
                  <p className="info-asignatura">Asignatura: {formData.asignatura}</p>
                )}
              </div>

              {/* Contact Section */}
              <div className="config-section">
                <h3 className="section-title">Contacto</h3>

                {/* Phone */}
                <div className="contact-item">
                  <div className="contact-icon">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z"/>
                    </svg>
                  </div>
                  <div className="contact-content">
                    <label className="contact-label">Teléfono</label>
                    {isEditing.telefono ? (
                      <input
                        type="text"
                        className="contact-input"
                        value={formData.telefono}
                        onChange={(e) => handleInputChange('telefono', e.target.value)}
                      />
                    ) : (
                      <p className="contact-value">{formData.telefono}</p>
                    )}
                  </div>
                  <button 
                    className="edit-button"
                    onClick={() => isEditing.telefono ? handleSave('telefono') : toggleEdit('telefono')}
                  >
                    {isEditing.telefono ? (
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <polyline points="20 6 9 17 4 12"/>
                      </svg>
                    ) : (
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7"/>
                        <path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z"/>
                      </svg>
                    )}
                  </button>
                </div>

                {/* Personal Email */}
                <div className="contact-item">
                  <div className="contact-icon">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                      <polyline points="22,6 12,13 2,6"/>
                    </svg>
                  </div>
                  <div className="contact-content">
                    <label className="contact-label">Correo Personal</label>
                    {isEditing.correoPersonal ? (
                      <input
                        type="email"
                        className="contact-input"
                        value={formData.correoPersonal}
                        onChange={(e) => handleInputChange('correoPersonal', e.target.value)}
                      />
                    ) : (
                      <p className="contact-value">{formData.correoPersonal}</p>
                    )}
                  </div>
                  <button 
                    className="edit-button"
                    onClick={() => isEditing.correoPersonal ? handleSave('correoPersonal') : toggleEdit('correoPersonal')}
                  >
                    {isEditing.correoPersonal ? (
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <polyline points="20 6 9 17 4 12"/>
                      </svg>
                    ) : (
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7"/>
                        <path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z"/>
                      </svg>
                    )}
                  </button>
                </div>
              </div>

              {/* Logout Button */}
              <button className="btn-logout" onClick={handleCerrarSesion}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4"/>
                  <polyline points="16 17 21 12 16 7"/>
                  <line x1="21" y1="12" x2="9" y2="12"/>
                </svg>
                Cerrar Sesión
              </button>
            </div>
          )}

          {activeTab === 'aplicacion' && (
            <div className="tab-content">
              <div className="empty-config">
                <p>Configuración de aplicación próximamente</p>
              </div>
            </div>
          )}
        </div>
      </main>

      {/* Bottom Navigation */}
      <nav className="bottom-nav">
        <button className="nav-item" onClick={() => navigate('/dashboard')}>
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

export default Configuracion;
