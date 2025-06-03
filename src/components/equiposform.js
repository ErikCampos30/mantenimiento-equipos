// src/components/EquipoForm.js
import { useState } from 'react';
import axios from 'axios';
import { getApiUrl } from '../config/api';

function EquipoForm({ onAdd }) {
  const [formData, setFormData] = useState({
    nombre: '',
    tipo: '',
    ubicacion: '',
    estado: ''
  });
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [apiInfo, setApiInfo] = useState(null);
  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (error) setError('');
  };
    // Función para verificar la información de la API
  const checkApiInfo = async () => {
    try {
      setSubmitting(true);
      const response = await axios.options(getApiUrl('EQUIPOS'));
      setApiInfo(response.data);
      console.log('Información de la API:', response.data);
    } catch (err) {
      console.error('Error al obtener información de la API:', err);
    } finally {
      setSubmitting(false);
    }
  };const handleSubmit = async e => {
    e.preventDefault();
    setSubmitting(true);
    setError('');
    
    try {
      // Crear FormData con el formato adecuado para Oracle APEX REST services
      const params = new URLSearchParams();
      params.append('nombre', formData.nombre);
      params.append('tipo', formData.tipo);
      params.append('ubicacion', formData.ubicacion);
      params.append('estado', formData.estado);
      
      console.log('Enviando datos como FormData:', Object.fromEntries(params));      
      // Primera opción: Usando URLSearchParams (application/x-www-form-urlencoded)
      const response = await axios.post(
        getApiUrl('EQUIPOS'), 
        params,
        {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Accept': 'application/json'
          }
        }
      );
      
      // Si el método anterior falla, intenta con esto:
      /*      // Segunda opción: Usando JSON directo
      const response = await axios({
        method: 'post',
        url: getApiUrl('EQUIPOS'),
        data: formData,
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        }
      });
      */
        console.log('Respuesta del servidor:', response.data);
      onAdd(); // Actualizar la lista
      setFormData({ nombre: '', tipo: '', ubicacion: '', estado: '' }); // Limpiar el formulario
    } catch (err) {
      console.error('Error al enviar datos:', err.response?.data || err.message);
      
      // Si falla el primer método, intenta con JSON directo (segunda opción)
      if (err.message.includes('ORDS-25001')) {
        try {
          console.log('Intentando método alternativo con JSON directo...');
            const jsonResponse = await axios({
            method: 'post',
            url: getApiUrl('EQUIPOS'),
            data: formData,
            headers: {
              'Content-Type': 'application/json',
              'Accept': 'application/json'
            }
          });
          
          console.log('Respuesta del servidor (método alternativo):', jsonResponse.data);
          onAdd(); // Actualizar la lista
          setFormData({ nombre: '', tipo: '', ubicacion: '', estado: '' }); // Limpiar el formulario
          return; // Salir del método si fue exitoso
        } catch (secondErr) {
          console.error('Error en método alternativo:', secondErr.response?.data || secondErr.message);
          setError('Error en ambos métodos de envío. Verifica la estructura de la API.');
        }
      }
      
      // Mostrar mensaje de error específico si hay información
      if (err.response?.data?.message) {
        setError(`Error: ${err.response.data.message}`);
      } else if (err.message.includes('ORDS-25001')) {
        setError('Error en la base de datos: Verifica que los campos y valores sean correctos.');
      } else {
        setError('Error al agregar el equipo. Verifica la consola para más detalles.');
      }
    } finally {
      setSubmitting(false);
    }
  };
  return (
    <div>
      <h2>Agregar Nuevo Equipo</h2>
      {error && <div style={{ color: 'red', marginBottom: '10px' }}>{error}</div>}      <div style={{ marginBottom: '10px' }}>
        <button 
          type="button" 
          onClick={checkApiInfo}
          style={{
            padding: '8px 12px',
            backgroundColor: '#2196F3',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            marginRight: '10px',
            cursor: 'pointer'
          }}
        >
          Verificar API
        </button>
        {apiInfo && (
          <span style={{ fontSize: '0.9em', color: '#666' }}>
            API verificada
          </span>
        )}
      </div>
      
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '10px' }}>
          <input 
            name="nombre" 
            value={formData.nombre} 
            onChange={handleChange} 
            placeholder="Nombre" 
            style={{ padding: '8px', marginRight: '5px' }}
            required 
          />
          <input 
            name="tipo" 
            value={formData.tipo} 
            onChange={handleChange} 
            placeholder="Tipo" 
            style={{ padding: '8px', marginRight: '5px' }}
            required 
          />
        </div>
        <div style={{ marginBottom: '10px' }}>
          <input 
            name="ubicacion" 
            value={formData.ubicacion} 
            onChange={handleChange} 
            placeholder="Ubicación" 
            style={{ padding: '8px', marginRight: '5px' }}
            required 
          />
          <input 
            name="estado" 
            value={formData.estado} 
            onChange={handleChange} 
            placeholder="Estado" 
            style={{ padding: '8px' }}
            required 
          />
        </div>
        <button 
          type="submit" 
          disabled={submitting}
          style={{ 
            padding: '10px 15px', 
            backgroundColor: '#4CAF50', 
            color: 'white', 
            border: 'none', 
            borderRadius: '4px', 
            cursor: submitting ? 'wait' : 'pointer' 
          }}
        >
          {submitting ? 'Enviando...' : 'Agregar Equipo'}
        </button>
      </form>
    </div>
  );
}

export default EquipoForm;
