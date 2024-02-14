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

      <div className="w-5/6">
        {periodos.map((p, i) => (
          <div key={i} className="card w-96 bg-base-100 shadow-xl">
            <figure className="px-10 pt-10">
              <h1 className="text-4xl">{p.gestion}</h1>
            </figure>
            <div className="card-body  items-center overflow-x-auto">
              <table className="table">
                <tbody>
                  {p.periodos.map(({ id, periodo, fechaInicio, fechaFin }) => (
                    <tr key={id}>
                      <td>{periodo}</td>
                      <td>{fecha(new Date(fechaInicio), 'dd/MMM/yyy')}</td>
                      <td>{fecha(new Date(fechaFin), 'dd/MMM/yyy')}</td>
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