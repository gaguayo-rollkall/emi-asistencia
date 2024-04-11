import { useState, useRef, useEffect } from 'react'
import { Carousel } from 'react-responsive-carousel';

import './App.css'

import { URL_API } from '../configuracion.json';
import { useCallback } from 'react';
import warning from './assets/warning.png';

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

const formatDate = (date) => {
  const hour = date.getHours();
  const minute = date.getMinutes();
  const amPm = hour >= 12 ? 'PM' : 'AM';
  const formattedHour = (hour % 12 || 12).toString().padStart(2, '0'); // Convert to 12-hour format and pad with leading zeros
  const formattedMinute = minute.toString().padStart(2, '0'); // Pad minutes with leading zeros
  const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Month is zero-based, so add 1
  const day = date.getDate().toString().padStart(2, '0'); // Pad day with leading zeros
  const year = date.getFullYear();
  
  // Step 3: Format the extracted values as strings
  return `${formattedHour}:${formattedMinute} ${amPm} - ${day}/${month}/${year}`;
}

function App() {
  const [codigo, setCodigo] = useState('');
  const [estado, setEstado] = useState('');
  const [estudiante, setEstudiante] = useState({});
  const [controles, setControles] = useState([]);

  const registrarAsitencia = async (rfid) => {
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

      const estudianteRegistrado = await fetch(apiUrl, opciones)
        .then(response => {
          if (!response.ok) {
            throw new Error('Hubo un problema registrando');
          }

          return response.json();
        })

      setCodigo('');
      setEstado('go');
      setEstudiante(estudianteRegistrado);
    } catch (error) {
      console.error('Asistencia', error);
      setEstado('rejected');
      setEstudiante({});
    } finally {
      setTimeout(() => {
        setCodigo('');
        setEstado('');
        setEstudiante({});
      }, 2500);
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

  const loadControles = useCallback(async () => {
    const data = await fetch(`${URL_API}/api/control`).then(response => response.json());
    setControles(data)
  }, []);

  useEffect(() => {
    loadControles();
  }, [loadControles]);

  return (
    <main style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: 20
    }}>
      <div className="header" />

      <div style={{ width: '100%', flex: 1, display: estado === 'rejected' ? 'flex' : 'none', padding: 40, }}>
        <div className="no-autorizado" style={{
          width: 200,
          height: 300,
        }}>
        </div>
          
        <div style={{
          flex: 1,
          width: '100%',
          paddingLeft: 40,
        }}>


          <div style={{
            fontSize: 40,
            fontWeight: 'bold',
            color: '#EC0101',
            marginBottom: 5,
          }}>NO AUTHORIZADO</div>

          <div style={{
            fontSize: 40,
            fontWeight: 'bold',
            color: 'black',
          }}>
            RFID {estudiante.rfid}
          </div>

          <div style={{
            fontSize: 30,
            fontWeight: 'bold',
            color: 'black',
            marginBottom: 5,
          }}>
            {formatDate(new Date())}
          </div>
        </div>
      </div>

      <div style={{ width: '100%', flex: 1, display: estado === 'go' ? 'flex' : 'none', padding: 40, }}>
        <div className="estudiante-foto" style={{
          width: 200,
          height: 200,
          background: `url(${estudiante.foto || 'https://www.shutterstock.com/image-vector/blank-avatar-photo-place-holder-600nw-1095249842.jpg'}) no-repeat`,
          border: '6px solid #002F8F',
          borderRadius: 20,
        }}>
        </div>
          
        <div style={{
          flex: 1,
          width: '100%',
          paddingLeft: 40,
        }}>
          {estudiante.warning && <div style={{
            backgroundColor: '#FCD204',
            borderRadius: 20,
            fontSize: 30,
            fontWeight: 'bold',
            color: 'black',
            padding: 10,
            display: 'flex'
          }}>
            <img src={warning} width={100} height={100} />
            <div>
            Se registraron multiples ingresos en el mismo dia
            </div>
          </div>}

          <div style={{
            fontSize: 40,
            fontWeight: 'bold',
            color: '#002F8F',
            marginBottom: 5,
          }}>BIENVENIDO</div>
          
          <div style={{
            fontSize: 40,
            fontWeight: 'bold',
            color: 'black',
            marginBottom: 5,
          }}>
            {estudiante.grado}. {estudiante.nombre}
          </div>

          <div style={{
            fontSize: 40,
            fontWeight: 'bold',
            color: '#FCD204',
          }}>
            {estudiante.codigo}
          </div>

          <div style={{
            fontSize: 40,
            fontWeight: 'bold',
            color: 'rgba(0, 0, 0, .5)',
          }}>
            RFID {estudiante.rfid}
          </div>

          <div style={{
            fontSize: 30,
            fontWeight: 'bold',
            color: 'black',
            marginBottom: 5,
          }}>
            {formatDate(new Date())}
          </div>
        </div>
      </div>

      <div style={{
        width: '80%',
        maxHeight: 'calc(100vh - 100px)',
        display: estado === '' ? 'flex' : 'none',
      }}>
        <Carousel
          showArrows={true}
          showThumbs={false}
          autoPlay={true}
          interval={10000}
          infiniteLoop={true}
        >
          {controles.map(({ id, tipo, url }) => (
            <div key={id}>
              {tipo === 0 && (
                <img src={url} height={500} />
              )}
              {tipo === 1 && (
                <iframe width="100%" height="500" src={`${url}&autoplay=1&mute=1&autoplay=1&loop=1`} title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen ></iframe>
              )}
            </div>
          ))}
        </Carousel>
      </div>
    </main>
  )
}

export default App
