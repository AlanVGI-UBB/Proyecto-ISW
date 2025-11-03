import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { authService } from '../services/authService';
import Header from '../components/Header';
import './Evaluaciones.css';

const Evaluaciones = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [selectedFilters, setSelectedFilters] = useState({
    fecha: '',
    estado: '',
    modalidad: ''
  });

  useEffect(() => {
    if (!authService.isAuthenticated()) {
      navigate('/');
      return;
    }
    const currentUser = authService.getCurrentUser();
    setUser(currentUser);
  }, [navigate]);

  const handleLogout = () => {
    authService.logout();
    localStorage.removeItem('devMode');
    navigate('/');
  };

  if (!user) {
    return null;
  }

  const isProfesor = user.rol === 'profesor';

  // Datos de ejemplo
  const evaluaciones = [
    {
      id: 1,
      asignatura: 'Derecho Procesal Civil',
      fecha: '22/10/2024 09:00',
      modalidad: 'Presencial',
      estado: 'activa'
    },
    {
      id: 2,
      asignatura: 'Derecho Constitucional',
      fecha: '25/10/2024 11:00',
      modalidad: 'En línea',
      estado: 'pendiente'
    },
    {
      id: 3,
      asignatura: 'Derecho Penal I',
      fecha: '15/09/2024 14:30',
      modalidad: 'Presencial',
      estado: 'finalizada'
    }
  ];

  const getEstadoBadge = (estado) => {
    const estados = {
      activa: { label: 'Activa', class: 'badge-activa' },
      pendiente: { label: 'Pendiente', class: 'badge-pendiente' },
      finalizada: { label: 'Finalizada', class: 'badge-finalizada' }
    };
    return estados[estado] || estados.activa;
  };

  return (
    <div className="evaluaciones-container">
      {/* Header */}
      <Header />

      {/* Main Content */}
      <main className="evaluaciones-main">
        <div className="evaluaciones-content">
          {/* Title and Create Button */}
          <div className="page-header">
            <h2 className="page-title">Gestión de Evaluaciones</h2>
            {isProfesor && (
              <button className="btn-create" onClick={() => alert('Crear nueva evaluación')}>
                + Crear nueva evaluación
              </button>
            )}
          </div>

          {/* Filters */}
          <div className="filters-row">
            <button className="filter-button">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
                <line x1="16" y1="2" x2="16" y2="6"/>
                <line x1="8" y1="2" x2="8" y2="6"/>
                <line x1="3" y1="10" x2="21" y2="10"/>
              </svg>
              <span>Filtrar por Fecha</span>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polyline points="6 9 12 15 18 9"/>
              </svg>
            </button>

            <button className="filter-button">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M22 11.08V12a10 10 0 11-5.93-9.14"/>
                <polyline points="22 4 12 14.01 9 11.01"/>
              </svg>
              <span>Filtrar por Estado</span>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polyline points="6 9 12 15 18 9"/>
              </svg>
            </button>

            <button className="filter-button">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/>
                <circle cx="9" cy="7" r="4"/>
                <path d="M23 21v-2a4 4 0 00-3-3.87m-4-12a4 4 0 010 7.75"/>
              </svg>
              <span>Filtrar por Modalidad</span>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polyline points="6 9 12 15 18 9"/>
              </svg>
            </button>
          </div>

          {/* Table */}
          <div className="table-container">
            <table className="evaluaciones-table">
              <thead>
                <tr>
                  <th>ASIGNATURA</th>
                  <th>FECHA Y HORA</th>
                  <th>MODALIDAD</th>
                  <th>ESTADO</th>
                  {isProfesor && <th>ACCIONES</th>}
                </tr>
              </thead>
              <tbody>
                {evaluaciones.map((evaluacion) => {
                  const estadoBadge = getEstadoBadge(evaluacion.estado);
                  return (
                    <tr key={evaluacion.id}>
                      <td className="cell-asignatura">{evaluacion.asignatura}</td>
                      <td className="cell-fecha">{evaluacion.fecha}</td>
                      <td className="cell-modalidad">{evaluacion.modalidad}</td>
                      <td>
                        <span className={`badge ${estadoBadge.class}`}>
                          {estadoBadge.label}
                        </span>
                      </td>
                      {isProfesor && (
                        <td className="cell-acciones">
                          <button 
                            className="action-button" 
                            title="Ver detalles"
                            onClick={() => alert('Ver detalles')}
                          >
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                              <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                              <circle cx="12" cy="12" r="3"/>
                            </svg>
                          </button>
                          <button 
                            className="action-button" 
                            title="Editar"
                            onClick={() => alert('Editar evaluación')}
                          >
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                              <path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7"/>
                              <path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z"/>
                            </svg>
                          </button>
                          <button 
                            className="action-button action-delete" 
                            title="Eliminar"
                            onClick={() => alert('Eliminar evaluación')}
                          >
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                              <polyline points="3 6 5 6 21 6"/>
                              <path d="M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2"/>
                            </svg>
                          </button>
                        </td>
                      )}
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
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
        <button className="nav-item active">
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

export default Evaluaciones;
