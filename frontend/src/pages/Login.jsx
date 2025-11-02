import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { authService } from '../services/authService';
import './Login.css';

const Login = () => {
  const navigate = useNavigate();
  const [selectedRole, setSelectedRole] = useState('estudiante');
  const [devMode, setDevMode] = useState(true); // Iniciar en true por defecto
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState({ show: false, type: '', message: '' });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Si escribe en email o password, desactivar modo desarrollo
    if ((name === 'email' || name === 'password') && value.trim() !== '') {
      setDevMode(false);
    }
    // Limpiar error del campo cuando el usuario escribe
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleRoleChange = (e) => {
    setSelectedRole(e.target.value);
    setDevMode(true);
    // Limpiar campos de login
    setFormData({ email: '', password: '' });
    setErrors({});
  };

  const handleDevLogin = () => {
    // Crear usuario falso basado en el rol seleccionado
    const fakeUser = {
      id: Math.floor(Math.random() * 1000),
      email: `${selectedRole}@dev.local`,
      nombre: selectedRole.charAt(0).toUpperCase() + selectedRole.slice(1),
      apellido: 'Desarrollo',
      rol: selectedRole,
      activo: true
    };

    // Guardar en localStorage
    localStorage.setItem('user', JSON.stringify(fakeUser));
    localStorage.setItem('token', 'dev-token-' + Date.now());
    localStorage.setItem('devMode', 'true');

    // Navegar al dashboard
    navigate('/dashboard');
  };

  const validateForm = () => {
    const newErrors = {};

    // Validar email
    if (!formData.email) {
      newErrors.email = 'El correo electrónico es obligatorio';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'El correo electrónico no es válido';
    }

    // Validar password
    if (!formData.password) {
      newErrors.password = 'La contraseña es obligatoria';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Si está en modo desarrollo, usar login falso
    if (devMode) {
      handleDevLogin();
      return;
    }

    if (!validateForm()) {
      return;
    }

    setLoading(true);
    setAlert({ show: false, type: '', message: '' });

    try {
      const response = await authService.login(formData.email, formData.password);
      
      if (response.success) {
        setAlert({
          show: true,
          type: 'success',
          message: '¡Inicio de sesión exitoso! Redirigiendo...'
        });

        // Redirigir después de 1 segundo
        setTimeout(() => {
          navigate('/dashboard');
        }, 1000);
      }
    } catch (error) {
      setAlert({
        show: true,
        type: 'error',
        message: error.message || 'Error al iniciar sesión. Por favor, verifica tus credenciales.'
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      {/* Header */}
      <header className="login-header">
        <div className="login-header-icon"></div>
        <h2 className="login-header-title">
          Facultad de Derecho - Sistema de Evaluaciones Orales
        </h2>
      </header>

      {/* Main Content */}
      <main className="login-main">
        <div className="login-card">
          {/* Welcome Section */}
          <div className="login-welcome">
            <h1>Bienvenido</h1>
            <p>Inicie sesión para acceder al sistema.</p>
          </div>

          {/* Alert */}
          {alert.show && (
            <div className={`alert alert-${alert.type}`}>
              {alert.message}
            </div>
          )}

          {/* Login Form */}
          <form className="login-form" onSubmit={handleSubmit}>
            {/* Selector de Rol */}
            <div className="form-group">
              <label htmlFor="role">Modo Desarrollo - Rol</label>
              <select
                id="role"
                name="role"
                className="form-input form-select"
                value={selectedRole}
                onChange={handleRoleChange}
                disabled={loading}
                style={{
                  paddingLeft: '1rem',
                  cursor: 'pointer',
                  backgroundColor: devMode ? '#f0f9ff' : 'white'
                }}
              >
                <option value="estudiante">Estudiante</option>
                <option value="profesor">Profesor</option>
                <option value="administrador">Administrador</option>
              </select>
            </div>

            {/* Email Field */}
            <div className="form-group">
              <label htmlFor="email">Correo Institucional</label>
              <div className="input-wrapper">
                <svg className="input-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
                </svg>
                <input
                  type="email"
                  id="email"
                  name="email"
                  className={`form-input ${errors.email ? 'error' : ''}`}
                  placeholder="Ingrese su correo (o deje vacío)"
                  value={formData.email}
                  onChange={handleChange}
                  disabled={loading}
                  required={!devMode}
                />
              </div>
              {errors.email && <span className="error-message">{errors.email}</span>}
            </div>

            {/* Password Field */}
            <div className="form-group">
              <label htmlFor="password">Contraseña</label>
              <div className="input-wrapper">
                <svg className="input-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
                  <path d="M7 11V7a5 5 0 0110 0v4"/>
                </svg>
                <input
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  name="password"
                  className={`form-input ${errors.password ? 'error' : ''}`}
                  placeholder="Ingrese su contraseña (o deje vacío)"
                  value={formData.password}
                  onChange={handleChange}
                  disabled={loading}
                  required={!devMode}
                />
                <button
                  type="button"
                  className="password-toggle"
                  onClick={() => setShowPassword(!showPassword)}
                  disabled={loading}
                >
                  {showPassword ? (
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19m-6.72-1.07a3 3 0 11-4.24-4.24"/>
                      <line x1="1" y1="1" x2="23" y2="23"/>
                    </svg>
                  ) : (
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                      <circle cx="12" cy="12" r="3"/>
                    </svg>
                  )}
                </button>
              </div>
              {errors.password && <span className="error-message">{errors.password}</span>}
            </div>

            {/* Submit Button */}
            <button 
              type="submit" 
              className="login-button"
              disabled={loading}
            >
              {loading ? (
                <>
                  <span className="spinner"></span>
                  Iniciando sesión...
                </>
              ) : (
                'Iniciar sesión'
              )}
            </button>
          </form>

          {/* Footer Links */}
          <div className="login-footer">
            <a href="#" className="login-link">¿Olvidaste tu contraseña?</a>
            <a href="/register" className="login-link register-link">Registrarse</a>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Login;
