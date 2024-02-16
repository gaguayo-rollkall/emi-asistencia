import { useState, useEffect, useCallback, useRef } from 'react'
import toast from 'react-hot-toast';
import { GridComponent, ColumnsDirective, ColumnDirective, Inject, Page, Edit, Toolbar, CommandColumn } from '@syncfusion/ej2-react-grids';
import { ComboBoxComponent } from '@syncfusion/ej2-react-dropdowns';
import { useNavigate } from "react-router-dom";

import Breadcrumbs from '../../components/Breadcrumbs';
import apiService from '../../servicios/api-service';

export default function RegistrosCarrera() {
  const navigate = useNavigate();

  const [errors, setErrors] = useState({});
  const [carreras, setCarreras] = useState([])
  const [gestiones, setGestiones] = useState([])
  const [periodos, setPeriodos] = useState({})
  const [cursos, setCursos] = useState([]);

  const [carrera, setCarrera] = useState('')
  const [gestion, setGestion] = useState('')
  const [periodo, setPeriodo] = useState('')

  const cargarCarreras = useCallback(async () => {
    try {
      const data = await apiService.get('/carreras');
      setCarreras(data);
      setCarrera(data[0].id);

    } catch (error) {
      console.error('Carreras', error);
      toast.error('Hubo un problema al cargar las carreras.');
    }
  }, [])

  const cargarPeriodosAcademicos = async () => {
    try {
      const data = await apiService.get('/periodosacademicos');

      data.forEach(p => {
        setGestiones(g => [...g, { gestion: p.gestion }]);
        setPeriodos(x => ({ ...x, [p.gestion]: p.periodos.map(({ id, periodo }) => ({ id, periodo })) }));
      });

    } catch (error) {
      console.log('Periodos', error);
      toast.error('Hubo un problema al cargar los periodos academicos.')
    }
  }

  const cargarCursos = useCallback(async () => {
    try {
      const data = await apiService.get('/cursos', { params: { carreraId: carrera, periodoId: periodo } });
      setCursos(data);
    } catch (error) {
      console.error('Cursos', error);
      toast.error('Hubo un problema al cargar los cursos');
    }
  }, [carrera, periodo]);

  useEffect(() => {
    if (!periodo || !carrera) return;

    cargarCursos();
  }, [cargarCursos, periodo, carrera]);

  useEffect(() => {
    cargarCarreras();
    cargarPeriodosAcademicos();
  }, [cargarCarreras]);

  return (
    <main className="w-full h-full flex-grow p-6 relative">
      <Breadcrumbs items={['Reportes', 'Registros']} />

      <div className="w-full flex flex-col justify-center">
        <div className="card w-5/6 bg-base-100 shadow-xl my-5">
          <div className="card-body">
            <ComboBoxComponent
              dataSource={carreras}
              fields={{ text: 'nombre', value: 'id' }}
              change={(args) => setCarrera(args.itemData === 'null' ? '' : args.itemData['id'])}
              placeholder="Seleccione una carrera"
              value={carrera}
              popupHeight="220px" />

            <ComboBoxComponent
              dataSource={gestiones}
              fields={{ text: 'gestion', value: 'gestion' }}
              change={(args) => setGestion(args.itemData === 'null' ? '' : args.itemData['gestion'])}
              placeholder="Seleccione una Gestion"
              value={gestion}
              popupHeight="220px" />

            <ComboBoxComponent
              dataSource={periodos[gestion] || []}
              fields={{ text: 'periodo', value: 'id' }}
              change={(args) => setPeriodo(args.itemData === 'null' ? '' : args.itemData['id'])}
              placeholder="Seleccione un Periodo"
              value={periodo}
              popupHeight="220px" />
          </div>
        </div>

        <div className="card w-5/6 bg-base-100 shadow-xl my-5">
          <div className="card-body">
          </div>
        </div>
      </div>
    </main>
  )
}