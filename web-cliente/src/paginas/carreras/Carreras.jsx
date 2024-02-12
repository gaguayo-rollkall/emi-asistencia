import { useRef, useState, useEffect, useCallback } from 'react'
import toast from 'react-hot-toast';

import Breadcrumbs from '../../components/Breadcrumbs';
import apiService from '../../servicios/api-service';
import Errores from '../../components/Errores';

const URL = '/carreras';

export default function Carreras() {
  const modalRef = useRef();
  const modalDeleteRef = useRef();
  const [errors, setErrors] = useState({});

  const [carreras, setCarreras] = useState([]);
  const [seleccionado, setSeleccionado] = useState({});

  const agregarNuevo = () => {
    setSeleccionado({ nombre: '' })
    modalRef.current?.showModal();
  }

  const editar = (item) => {
    setSeleccionado(item);
    modalRef.current?.showModal();
  }

  const guardar = async (e) => {
    try {
      e?.preventDefault();

      if (!seleccionado.nombre?.trim()) {
        return;
      }

      var url = seleccionado.id ? `${URL}/${seleccionado.id}` : URL;
      var action = seleccionado.id ? 'put' : 'post';

      await apiService[action](url, seleccionado);
      setSeleccionado({});
      await cargarCarreras();
      modalRef.current?.close();
    } catch (error) {
      const { response: { data: { errors } } } = error;

      if (errors) {
        setErrors(errors);
      }

      console.error('Guardar', error);
    }
  }

  const borrar = async () => {
    try {
      await apiService.delete(`${URL}/${seleccionado.id}`);
      await cargarCarreras();

      modalDeleteRef.current.close()
    } catch (error) {
      console.error('Borrar', error);
      toast.error('No se pudo borrar la carrera');
    }
  }

  const cargarCarreras = useCallback(async () => {
    try {
      const data = await apiService.get(URL);
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
                  {carreras.map((item, index) => (
                    <tr key={item.id}>
                      <th>{index + 1}</th>
                      <td>{item.nombre}</td>
                      <td className="">
                        <button className="btn btn-sm btn-outline btn-primary" onClick={() => editar(item)}>Editar</button>
                        <button className="btn btn-sm btn-outline btn-error ml-4" onClick={() => {
                          setSeleccionado(item);
                          modalDeleteRef.current.showModal();
                        }}>Borrar</button>
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
            <form className="mt-1 grid grid-cols-1" onSubmit={guardar}>
              <div className="col-span-full">
                <label htmlFor="street-address" className="block text-sm font-medium leading-6 text-gray-900">Nombre</label>
                <div className="mt-2">
                  <input type="text" placeholder="Nombre de la Carrera" className="input input-bordered w-full"
                    value={seleccionado.nombre}
                    onChange={({ target: { value: nombre } }) => setSeleccionado((p) => ({ ...p, nombre }))} />
                </div>
              </div>
            </form>

            <div className="flex justify-center gap-4 mt-6">
              <button className="btn btn-primary" onClick={() => guardar()}>Guardar</button>
              <button className="btn" onClick={() => modalRef.current.close()}>Cerrar</button>
            </div>

            <Errores errors={errors} />
          </div>
        </dialog>

        <dialog ref={modalDeleteRef} className="modal modal-bottom sm:modal-middle">
          <div className="modal-box">
            <h3 className="font-bold text-lg">Borrar {seleccionado.nombre}?</h3>
            <p className="py-4">Se eliminara el registro de la base de datos.</p>
            <div className="modal-action">
              <form method="dialog">
                <button className="btn btn-error" onClick={() => borrar()}>Borrar</button>
                <button className="btn ml-4" onClick={() => modalDeleteRef.current.close()}>Close</button>
              </form>
            </div>
          </div>
        </dialog>
      </div>
    </main>
  )
}