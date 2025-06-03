// src/App.js
import EquiposList from './components/equiposlist';
import EquipoForm from './components/equiposform';
import { useState, useEffect } from 'react';
import './App.css';
import { getApiUrl } from './config/api';

function App() {
  const [refrescar, setRefrescar] = useState(0);
  const [apiStatus, setApiStatus] = useState({ checking: true, online: false });

  // Verificar si la API está disponible
  useEffect(() => {
    const checkApiStatus = async () => {
      try {
        const response = await fetch(getApiUrl('EQUIPOS'), {
          method: 'HEAD',
          headers: {
            'Accept': 'application/json'
          }
        });
        setApiStatus({ checking: false, online: response.ok });
      } catch (error) {
        console.error('Error al verificar la API:', error);
        setApiStatus({ checking: false, online: false });
      }
    };

    checkApiStatus();
  }, []);

  const handleRefresh = () => setRefrescar(prev => prev + 1);

  return (
    <div className="App" style={{ maxWidth: '800px', margin: '0 auto', padding: '20px' }}>
      <header style={{ textAlign: 'center', marginBottom: '20px' }}>
        <h1>Sistema de Mantenimiento de Equipos</h1>
        <div style={{ 
          display: 'inline-block', 
          padding: '5px 10px', 
          borderRadius: '4px', 
          fontSize: '0.8em',
          backgroundColor: apiStatus.checking ? '#FFD700' : (apiStatus.online ? '#4CAF50' : '#F44336'),
          color: 'white'
        }}>
          {apiStatus.checking ? 'Verificando conexión...' : 
          (apiStatus.online ? 'Conectado a Oracle APEX' : 'Sin conexión a Oracle APEX')}
        </div>
      </header>
      
      <main>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {apiStatus.online ? (
            <>
              <EquipoForm onAdd={handleRefresh} />
              <EquiposList key={refrescar} />
            </>
          ) : (
            <div style={{ textAlign: 'center', padding: '20px', backgroundColor: '#ffebee', borderRadius: '4px' }}>
              <h3>No se pudo conectar con el servicio de Oracle APEX</h3>
              <p>Verifica tu conexión a internet o que el servicio esté disponible.</p>
              <button 
                onClick={() => window.location.reload()}
                style={{ padding: '10px 15px', backgroundColor: '#2196F3', color: 'white', border: 'none', borderRadius: '4px' }}
              >
                Intentar de nuevo
              </button>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

export default App;

