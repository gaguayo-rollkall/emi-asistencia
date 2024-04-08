import { useState, useRef, useEffect } from 'react'
import logo from './assets/logo_emi.png';
import ibnorca from './assets/ibnorca.png';
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

function NOW() {

  var date = new Date();
  var aaaa = date.getUTCFullYear();
  var gg = date.getUTCDate();
  var mm = (date.getUTCMonth() + 1);

  if (gg < 10)
    gg = "0" + gg;

  if (mm < 10)
    mm = "0" + mm;

  var cur_day = aaaa + "-" + mm + "-" + gg;

  var hours = date.getUTCHours()
  var minutes = date.getUTCMinutes()
  var seconds = date.getUTCSeconds();

  if (hours < 10)
    hours = "0" + hours;

  if (minutes < 10)
    minutes = "0" + minutes;

  if (seconds < 10)
    seconds = "0" + seconds;

  return cur_day + " " + hours + ":" + minutes + ":" + seconds;
}

function App() {
  const [codigo, setCodigo] = useState('');
  const [estado, setEstado] = useState('');
  const [estudiante, setEstudiante] = useState({});

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

  return (
    <main>
      <div className="header">
      </div>

      {/* <div className="estudiante">
        <div className={`photo ${estado === 'go' ? 'go' : ''}`}>
          {estado === 'go' ? (
            <div className="granted">
              SE HABILITO EL ACCESO
            </div>
          ) : estado === 'rejected' ? (
            <div className="rejected">
              ACCESO DENEGADO
            </div>
          ) : <></>}
        </div>
        <div className="details">
          {estado === 'go' ? (
            <>
              <div className="detalles">EST. {estudiante.nombre}</div>
              <div className="detalles">Codigo: {estudiante.codigo}</div>
              <div className="detalles">RFID: {estudiante.rfid}</div>
            </>
          ) : estado === 'rejected' ? (
            <>
              <div className="detalles bad">NO SE ENCONTRO EL REGISTRO</div>
              <div className="detalles bad">DE LA TARJETA EN EL SISTEMA</div>
              <div className="detalles bad">RFID: {codigo}</div>
              <div className="detalles bad">{NOW()}</div>
            </>
          ) : <></>}
        </div>
      </div> */}
    </main>
  )
}

export default App
