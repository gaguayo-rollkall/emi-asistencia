import { useState, useRef, useEffect } from 'react'
import logo from './assets/logo_emi.png';
import './App.css'

import { URL_API } from '../configuracion.json';

const apiUrl = `${URL_API}/api/asistencias`;

const ENTER_KEYS = ["13", "Enter"];

const useEventListener = (eventName, handler, element = window) => {
  const savedHandler = useRef();
  useEffect(() => {
    savedHandler.current = handler;
  }, [handler]);
  useEffect(() => {
    const eventListener = (event) => savedHandler.current(event);
    element.addEventListener(eventName, eventListener);
    return () => {
      element.removeEventListener(eventName, eventListener);
    };
  }, [eventName, element]);
};

function App() {
  const [codigo, setCodigo] = useState('');
  const [estado, setEstado] = useState('');
  const [mensaje, setMensaje] = useState('Esperando ...');

  const registrarAsitencia = async(rfid) => {
    try {
      const asistencia = {
        rfid,
      };

      const opciones = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(asistencia)
      };

      const { codigo: codigoEstudiante, nombre = '' } = await fetch(apiUrl, opciones)
        .then(response => {
          if (!response.ok) {
            throw new Error('Hubo un problema registrando');
          }

          return response.json();
        })

      setCodigo('');
      setEstado('go');
      setMensaje(`Bienvenido ${codigoEstudiante} ${nombre}`)
    } catch (error) {
      console.error('Asistencia', error);
      setMensaje('Rechazado')
    } finally {
      setTimeout(() => {
        setCodigo('');
        setEstado('');
        setMensaje('Esperando ...')
      }, 1500);
    }
  }

  const handler = ({ key }) => {
    if (!ENTER_KEYS.includes(String(key))) {
      setCodigo(c => c + key);
    } else {
      registrarAsitencia(codigo);
    }
  };

  useEventListener("keydown", handler);

  return (
    <main>
      {/* <img src={logo} alt='logo' width={400} /> */}
      <div className="encuadro">
        <div className={`estado ${estado}`}></div>
      </div>

      <div className="welcome">
        {mensaje}
      </div>
    </main>
  )
}

export default App
