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
import Cursos from './paginas/cursos/Cursos';
import Alumnos from './paginas/cursos/Alumnos';

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
            <Route path="dashboard" element={<></>} />
            <Route path="carreras" element={<Carreras />} />
            <Route path="periodos" element={<PeriodosAcademicos />} />
            <Route path="calendario" element={<Calendario />} />
            <Route path="cursos" element={<Cursos />} />
            <Route path="cursos/:id/alumnos" element={<Alumnos />} />
            <Route path="estudiantes" element={<></>} />
            <Route path="rfid" element={<></>} />
          </Route>
        </Routes>
      </AuthProvider>

      <Toaster />
    </>
  );
}

export default App
