import { useRef, useState, useEffect, useCallback } from 'react'
import toast from 'react-hot-toast';

import Breadcrumbs from '../../components/Breadcrumbs';
import apiService from '../../servicios/api-service';

export default function Carreras() {
  const modalRef = useRef();
  const [carreras, setCarreras] = useState([]);

  const agregarNuevo = () => {
    modalRef.current?.showModal();
  }

  const cargarCarreras = useCallback(async () => {
    try {
      const data = await apiService.get('/carreras');
      setCarreras(data);
    } catch (error) {
      console.error('Cargar Carreras', error);
      toast.error('Hubo un problema al cargar las carreras.')
    }
  }, []);

  useEffect(() => {
    cargarCarreras();
  }, [cargarCarreras]);

  return (
    <main className="w-full h-full flex-grow p-6 relative">
      <Breadcrumbs items={['Inicio', 'Carreras']} />

      <div className="w-full">
        <div className="flex justify-between">
          <h1 className="text-3xl text-black pb-6">
            Carreras
          </h1>

          <button className="btn btn-primary" onClick={agregarNuevo}>
            Agregar
          </button>
        </div>

        <div className="card w-full bg-base-100 shadow-xl">
          <div className="card-body">
            <form className="flex gap-3">
              <input type="text" placeholder="Carrera" className="input input-bordered" />

              <button className="btn" type='submit'>Buscar</button>
            </form>
          </div>
        </div>

        <div className="card w-full bg-base-100 shadow-xl my-5">
          <div className="card-body">
            <div className="overflow-x-auto">
              <table className="table">
                <thead>
                  <tr>
                    <th></th>
                    <th>Nombre</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {carreras.map(({ id, nombre }, index) => (
                    <tr key={id}>
                      <th>{index + 1}</th>
                      <td>{nombre}</td>
                      <td className="">
                        <button className="btn btn-sm btn-outline btn-primary">Editar</button>
                        <button className="btn btn-sm btn-outline btn-error ml-4">Borrar</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <dialog ref={modalRef} className="modal">
          <div className="modal-box">
            <h3 className="font-bold text-lg">Carrera</h3>



            <div className="flex justify-center gap-4">
              <button className="btn btn-primary">Guardar</button>
              <button className="btn" onClick={() => modalRef.current.close()}>Cerrar</button>
            </div>
          </div>
        </dialog>
      </div>
    </main>
  )
}