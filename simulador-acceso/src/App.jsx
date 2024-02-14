import { useState, useRef, useEffect } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import logo from './assets/logo_emi.png';
import './App.css'

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

  const handler = ({ key }) => {
    if (!ENTER_KEYS.includes(String(key))) {
      setCodigo(c => c + key);
    } else {
      console.log(codigo);
      setCodigo('');
      setEstado('go');
      setMensaje(`Bienvenido ${codigo}`)

      setTimeout(() => {
        setEstado('');
        setMensaje('Esperando ...')
      }, 2000);
    }
  };

  useEventListener("keydown", handler);

  return (
    <main>
      <img src={logo} alt='logo' width={400} />
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
