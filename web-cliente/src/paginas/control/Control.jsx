import { useEffect, useState, useCallback } from 'react';
import { createSpinner, showSpinner, hideSpinner } from '@syncfusion/ej2-popups';

import Breadcrumbs from '../../components/Breadcrumbs';
import ImageUploader from '../../components/ImageUploader';
import Resource from './Resource';
import apiService from '../../servicios/api-service';

const URL = '/control';

export default function Control() {
  const [controles, setControles] = useState([]);

  const cargarControles = useCallback(async () => {
    try {
      showSpinner(document.getElementById('controles-main'));
      const data = await apiService.get(URL);
      setControles(data);
    } catch (error) {
      console.error('Cargar Controles', error);
    } finally {
      hideSpinner(document.getElementById('controles-main'));
    }
  }, []);

  useEffect(() => {
    createSpinner({
      target: document.getElementById('controles-main'),
    });
  }, []);

  useEffect(() => {
    cargarControles();
  }, [cargarControles]);

  return (
    <main className="w-full h-full flex-grow p-6 relative">
      <Breadcrumbs items={['Inicio', 'Control']} />

      <div id="controles-main" className="w-full h-full relative" style={{ height: 'calc(100% - 50px)' }}>
        <div className="card w-full bg-base-100 shadow-xl my-5">
          <div className="card-body">
            <p className="text-sm">Selecione las images/videos que se mostraran en la pantalla de control de acceso</p>

            <div className="grid grid-cols-3 gap-4">
              {controles.map((control) => (
                <Resource key={control.id} {...control} />
              ))}

              {controles.length < 6 && (
                <ImageUploader hidePreview />
              )}
            </div>
          </div>
        </div>

        <div className="left-0 w-full text-center">
          <button className="btn btn-primary ">
            Guardar
          </button>
        </div>
      </div>
    </main>
  );
}