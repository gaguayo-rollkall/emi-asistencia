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
            <Route path="contact" element={<div>Hello</div>} />
          </Route>
        </Routes>
      </AuthProvider>

      <Toaster />
    </>
  );
}

export default App
