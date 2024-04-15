import { useState, useEffect, useCallback, useRef } from 'react'
import toast from 'react-hot-toast';
import { GridComponent, ColumnsDirective, ColumnDirective, Inject, Page, Edit, Toolbar, CommandColumn } from '@syncfusion/ej2-react-grids';
import { ComboBoxComponent } from '@syncfusion/ej2-react-dropdowns';
import { useNavigate } from "react-router-dom";

import Breadcrumbs from '../../components/Breadcrumbs';
import apiService from '../../servicios/api-service';
import Errores from '../../components/Errores';

export default function Cursos() {
  const gridRef = useRef();
  const toolbarOptions = ['Add', 'Edit', 'Delete']
  const editSettings = { allowEditing: true, allowAdding: true, allowDeleting: true, mode: 'Dialog' };
  const navigate = useNavigate();

  const [errors, setErrors] = useState({});
  const [carreras, setCarreras] = useState([])
  const [gestiones, setGestiones] = useState([])
  const [periodos, setPeriodos] = useState({})
  const [cursos, setCursos] = useState([]);

  const [carrera, setCarrera] = useState('')
  const [gestion, setGestion] = useState('')
  const [periodo, setPeriodo] = useState('')

  const commands = [
    {
      buttonOption: {
        content: 'Alumnos', cssClass: 'btn btn-active btn-link btn-xs'
      }
    }
  ];

  const commandClick = (args) => {
    const { id } = args.rowData;
    navigate(`/cursos-alumnos?cursoId=${id}`) 
  }

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
      const gestiones = data.map(({ gestion }) => ({ gestion }));
      const periodosData = {};

      data.forEach(({ gestion, periodos: p }) => {
        console.log(gestion, periodos);
        periodosData[gestion] = p.map(({ id, periodo }) => ({ id, periodo }));
      });

      setGestiones(gestiones);
      setPeriodos(periodosData);

      const [{ gestion: primeraGestion }] = gestiones;
      const ultimoPeriodo = periodosData[primeraGestion].slice(-1)[0].id;
      setGestion(primeraGestion);
      setPeriodo(ultimoPeriodo);
    } catch (error) {
      console.error('Periodos', error);
      toast.error('Hubo un problema al cargar los periodos academicos.')
    }
  }

  const guardar = async (seleccionado) => {
    try {
      await apiService.post('/cursos', {
        carreraId: carrera,
        periodoId: periodo,
        ...seleccionado
      });

      await cargarCursos();
    } catch (error) {
      const { response: { data: { errors } } } = error;
      gridRef.current.dataSource = cursos;

      if (errors) {
        setErrors(errors);
      }

      console.error('Guardar', error);
    }
  }

  const borrar = async (seleccionado) => {
    try {
      await apiService.delete(`/cursos/${seleccionado.id}`);
    } catch (error) {
      console.error('Borrar', error);
      gridRef.current.dataSource = cursos;
      toast.error('No se pudo borrar el curso.');
    }
  }

  const dataSourceChanged = async (state) => {
    console.log(state);
    if (state.action === 'add' || state.action === 'edit') {
      await guardar(state.data);
    } else if (state.requestType === 'delete') {
      await borrar(state.data[0]);
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
      <Breadcrumbs items={['Inicio', 'Cursos']} />

      <div className="w-full">
        <div className="card w-full bg-base-100 shadow-xl my-5">
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

        <div className="card w-full bg-base-100 shadow-xl my-5">
          <div className="card-body">
            <GridComponent dataSource={cursos}
              toolbar={toolbarOptions}
              allowPaging={true}
              editSettings={editSettings}
              actionComplete={dataSourceChanged}
              ref={gridRef}
              commandClick={commandClick}>
              <ColumnsDirective>
                <ColumnDirective field='id' visible={false} isPrimaryKey={true} />
                <ColumnDirective field='nombre' headerText='Nombre' width='100' />
                <ColumnDirective headerText='' width='120' commands={commands} />
              </ColumnsDirective>
              <Inject services={[Page, Toolbar, Edit, CommandColumn]} />
            </GridComponent>
          </div>
        </div>
      </div>

      <Errores errors={errors} cleanErrors={() => setErrors([])} />
    </main>
  )
}