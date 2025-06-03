import axios from 'axios';
import { useEffect, useState } from 'react';

function EquiposList() {
  const [equipos, setEquipos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  useEffect(() => {
    const fetchEquipos = async () => {
      setLoading(true);
      try {
        // Usar la misma URL que en equiposform.js para mantener consistencia
        const response = await axios.get('https://apex.oracle.com/pls/apex/erikworks/equipos/', {
          headers: {
            'Accept': 'application/json'
          }
        });
        
        console.log('Datos recibidos:', response.data);
        
        // Verificar la estructura de datos recibida
        if (response.data.items) {
          setEquipos(response.data.items);
        } else if (Array.isArray(response.data)) {
          setEquipos(response.data);
        } else {
          console.warn('Formato inesperado de datos:', response.data);
          setEquipos([]);
        }
        
        setError(null);
      } catch (err) {
        console.error('Error al obtener equipos:', err);
        setError('Error al cargar los equipos. Por favor, intenta de nuevo más tarde.');
        setEquipos([]);
      } finally {
        setLoading(false);
      }
    };

    fetchEquipos();
  }, []);

  if (loading) return <p>Cargando equipos...</p>;
  
  return (
    <div>
      <h2>Lista de Equipos</h2>
      {error && <div style={{ color: 'red', marginBottom: '10px' }}>{error}</div>}
      
      {equipos.length === 0 && !error ? (
        <p>No hay equipos registrados. Agrega uno usando el formulario.</p>
      ) : (
        <ul style={{ listStyleType: 'none', padding: 0 }}>
          {equipos.map((e, index) => (
            <li 
              key={e.id || index} 
              style={{ 
                padding: '10px', 
                margin: '5px 0', 
                backgroundColor: '#f5f5f5', 
                borderRadius: '4px',
                border: '1px solid #ddd'
              }}
            >
              <strong>{e.nombre}</strong> - {e.tipo}
              <div style={{ fontSize: '0.9em', color: '#666' }}>
                Ubicación: {e.ubicacion} | Estado: {e.estado}
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default EquiposList;
