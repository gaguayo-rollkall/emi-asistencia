import {
  // createBrowserRouter,
  // RouterProvider,
  Routes, Route
} from 'react-router-dom'
import { Toaster } from 'react-hot-toast';

// import ErrorPage from './error-page';
import { AuthProvider } from './hooks/useAuth'
import { ProtectedRoute } from './routes/ProtectedRoute';

import './App.css'
import Inicio from './paginas/inicio/Inicio';
import Login from './paginas/login/Login';
import Carreras from './paginas/carreras/Carreras'

function App() {
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
            <Route path="periodos" element={<></>} />
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
