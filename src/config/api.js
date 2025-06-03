// src/config/api.js
// Configuración centralizada para endpoints de API

const API_CONFIG = {
  // URL base usando variables de entorno (definidas en .env.development y .env.production)
  // Para desarrollo: process.env.REACT_APP_API_URL desde .env.development
  // Para producción: process.env.REACT_APP_API_URL desde .env.production
  BASE_URL: process.env.REACT_APP_API_URL || 'https://apex.oracle.com/pls/apex/erikworks',
  
  // Determina si estamos en producción basado en variables de entorno
  IS_PRODUCTION: process.env.NODE_ENV === 'production',
  
  // Endpoints específicos
  ENDPOINTS: {
    EQUIPOS: '/equipos/'
  }
};

// Función para obtener la URL base
export const getBaseUrl = () => {
  return API_CONFIG.BASE_URL;
};

// Función para obtener la URL completa para un endpoint específico
export const getApiUrl = (endpoint) => {
  return `${getBaseUrl()}${API_CONFIG.ENDPOINTS[endpoint] || endpoint}`;
};

// Exportamos el objeto de configuración completo por si se necesita acceder a él
export default API_CONFIG;
