import { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom'
import { Toaster } from 'react-hot-toast';
import { L10n, loadCldr, setCulture } from '@syncfusion/ej2-base';

import numberingSystems from 'cldr-data/supplemental/numberingSystems.json';
import caGregorian from 'cldr-data/main/es/ca-gregorian.json';
import numbers from 'cldr-data/main/es/numbers.json';
import timeZoneNames from 'cldr-data/main/es/timeZoneNames.json';
import languages from 'cldr-data/supplemental/numberingSystems.json';

// import ErrorPage from './error-page';
import { AuthProvider } from './hooks/useAuth'
import { ProtectedRoute } from './routes/ProtectedRoute';
import sync from './idiomas/sync';

import './App.css'
import Inicio from './paginas/inicio/Inicio';
import Login from './paginas/login/Login';
import Carreras from './paginas/carreras/Carreras'
import PeriodosAcademicos from './paginas/periodos/PeriodosAcademicos';
import Calendario from './paginas/calendario/Calendario';
import DetallesEvento from './paginas/calendario/DetallesEvento';
import Cursos from './paginas/cursos/Cursos';
import Alumnos from './paginas/cursos/Alumnos';
import Estudiantes from './paginas/estudiantes/Estudiantes';
import Dashboard from './paginas/reportes/Dashboard';
import RegistrosCarrera from './paginas/reportes/RegistrosCarrera';
import RegistrosEvento from './paginas/reportes/RegistrosEvento';
import Usuarios from './paginas/usuarios/Usuarios';
import Control from './paginas/control/Control';

function App() {
  useEffect(() => {
    L10n.load(sync)
    loadCldr(
      numberingSystems,
      caGregorian,
      numbers,
      timeZoneNames,
      languages,
    )
    setCulture('es');
  }, []);

  return (
    <>
      <AuthProvider>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <Inicio />
              </ProtectedRoute>
            }
          >
            <Route path="reportes-dashboard" element={<Dashboard />} />
            <Route path="reportes-registros-carrera" element={<RegistrosCarrera />} />
            <Route path="reportes-registros-evento" element={<RegistrosEvento />} />
            <Route path="carreras" element={<Carreras />} />
            <Route path="periodos" element={<PeriodosAcademicos />} />
            <Route path="calendario" element={<Calendario />} />
            <Route path="cursos" element={<Cursos />} />
            <Route path="cursos-alumnos" element={<Alumnos />} />
            <Route path="estudiantes" element={<Estudiantes />} />
            <Route path="rfid" element={<></>} />
            <Route path="usuarios" element={<Usuarios />} />
            <Route path="control" element={<Control />} />
            <Route path="detalles-evento" element={<DetallesEvento />} />
          </Route>
        </Routes>
      </AuthProvider>

      <Toaster />
    </>
  );
}

export default App
