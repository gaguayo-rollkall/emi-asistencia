import { useCallback, useEffect, useState, useRef } from 'react'
import toast from 'react-hot-toast'

import Breadcrumbs from '../../components/Breadcrumbs'
import apiService from '../../servicios/api-service'
import fecha from '../../servicios/fecha';
import Errores from '../../components/Errores'

const URL = '/periodosacademicos';

export default function PeriodosAcademicos() {
  const modalRef = useRef();
  const [errors, setErrors] = useState({});

  const [periodos, setPeriodos] = useState([]);
  const [periodo, setPeriodo] = useState({
    gestion: 0,
    periodo: '',
    fechaInicio: null,
    fechaFin: null,
  });

  const agregarNuevo = () => {
    setPeriodo({
      gestion: 0,
      periodo: '',
      fechaInicio: null,
      fechaFin: null,
    })
    modalRef.current?.showModal();
  }

  const guardar = async (e) => {
    try {
      e?.preventDefault();

      await apiService.post(URL, periodo);
      await cargarPeriodos();

      modalRef.current?.close();
    } catch (error) {
      const { response: { data: { errors } } } = error;

      if (errors) {
        setErrors(errors);
      } else {
        toast.error('Hubo un problema al guardar el periodo academico.')
      }

      console.error('Guardar', error);
    }
  }

  const borrar = async (id) => {
    try {
      await apiService.delete(`${URL}/${id}`);
      await cargarPeriodos();
    } catch (error) {
      console.error('Borrar', error);
      toast.error('Hubo un problema al borrar el periodo academico.')
    }
  }

  const editar = async (periodoSeleccionado) => {
    setPeriodo(periodoSeleccionado);
    modalRef.current?.showModal();
  }

  const cargarPeriodos = useCallback(async () => {
    try {
      const data = await apiService.get(URL);
      setPeriodos(data);
    } catch (error) {
      console.error('Periodos', error);
      toast.error('Hubo un problema al cargar los periodos academicos.')
    }
  }, []);

  useEffect(() => {
    cargarPeriodos();
  }, [cargarPeriodos]);

  return (
    <main className="w-full h-full flex-grow p-6 relative">
      <Breadcrumbs items={['Inicio', 'Periodos Academicos']} />

      <div className="w-full">
        <div className="flex justify-between">
          <h1 className="text-3xl text-black pb-6">
            Periodos Academicos
          </h1>

          <button className="btn btn-primary" onClick={agregarNuevo}>
            Agregar
          </button>
        </div>
      </div>

      <div className="w-5/6 flex">
        {periodos.map((p, i) => (
          <div key={i} className="card w-96 bg-base-100 shadow-xl ml-4">
            <figure className="px-10 pt-10">
              <h1 className="text-4xl">{p.gestion}</h1>
            </figure>
            <div className="card-body  items-center overflow-x-auto">
              <table className="table">
                <tbody>
                  {p.periodos.map(({ id, periodo, fechaInicio, fechaFin }, j) => (
                    <tr key={id}>
                      <td>{periodo}</td>
                      <td>{fecha(new Date(fechaInicio), 'dd/MMM/yyy')}</td>
                      <td>{fecha(new Date(fechaFin), 'dd/MMM/yyy')}</td>
                      <td className="flex">
                        <button className="btn btn-square btn-xs" onClick={() => borrar(id)}>
                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                          </svg>
                        </button>
                        <button className="btn btn-square btn-xs ml-2" onClick={() => editar(p.periodos[j])}>
                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125" />
                          </svg>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ))}
      </div>

      <dialog ref={modalRef} className="modal">
        <div className="modal-box">
          <form className="mt-1 grid grid-cols-1" onSubmit={guardar}>
            <div className="col-span-full">
              <label htmlFor="street-address" className="block text-sm font-medium leading-6 text-gray-900">Gestion</label>
              <div className="mt-2">
                <input type="number" placeholder="Gestion" className="input input-bordered w-full"
                  value={periodo.gestion}
                  onChange={({ target: { value: gestion } }) => setPeriodo((p) => ({ ...p, gestion }))} />
              </div>
            </div>

            <div className="col-span-full mt-4">
              <label htmlFor="street-address" className="block text-sm font-medium leading-6 text-gray-900">Periodo</label>
              <div className="mt-2">
                <input type="text" placeholder="Periodo" className="input input-bordered w-full"
                  value={periodo.periodo}
                  onChange={({ target: { value: periodo } }) => setPeriodo((p) => ({ ...p, periodo }))} />
              </div>
            </div>

            <div className="mt-4 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
              <div className="sm:col-span-3">
                <label className="block text-sm font-medium leading-6 text-gray-900">Fecha de Inicio</label>
                <div className="mt-2">
                  <input type="date" className="input input-bordered w-full"
                    onChange={({ target: { value: fechaInicio } }) => setPeriodo((p) => ({ ...p, fechaInicio }))} />
                </div>
              </div>

              <div className="sm:col-span-3">
                <label className="block text-sm font-medium leading-6 text-gray-900">Fecha de Fin</label>
                <div className="mt-2">
                  <input type="date" className="input input-bordered w-full"
                    onChange={({ target: { value: fechaFin } }) => setPeriodo((p) => ({ ...p, fechaFin }))} />
                </div>
              </div>

            </div>
          </form>

          <div className="flex justify-center gap-4 mt-6">
            <button className="btn btn-primary" onClick={() => guardar()}>Guardar</button>
            <button className="btn" onClick={() => modalRef.current.close()}>Cerrar</button>
          </div>

          <Errores errors={errors} cleanErrors={() => setErrors([])} />
        </div>
      </dialog>
    </main>
  )
}