import { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom'
import { Toaster } from 'react-hot-toast';
import { L10n, setCulture } from '@syncfusion/ej2-base';

// import ErrorPage from './error-page';
import { AuthProvider } from './hooks/useAuth'
import { ProtectedRoute } from './routes/ProtectedRoute';
import sync from './idiomas/sync';

import './App.css'
import Inicio from './paginas/inicio/Inicio';
import Login from './paginas/login/Login';
import Carreras from './paginas/carreras/Carreras'
import PeriodosAcademicos from './paginas/periodos/PeriodosAcademicos';
// import Test from './paginas/Test';

function App() {
  useEffect(() => {
    L10n.load(sync);
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
            <Route path="calendario" element={<></>} />
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
