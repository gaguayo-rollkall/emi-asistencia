import { useState, useEffect, useCallback, useRef } from 'react'
import toast from 'react-hot-toast';
import { GridComponent, ColumnsDirective, ColumnDirective, Inject, Page, Edit, Toolbar } from '@syncfusion/ej2-react-grids';

import Breadcrumbs from '../../components/Breadcrumbs';
import apiService from '../../servicios/api-service';
import Errores from '../../components/Errores';

const URL = '/estudiantes';

export default function Estudiantes() {
  const gridRef = useRef();
  const [errors, setErrors] = useState({});
  const [estudiantes, setEstudiantes] = useState([]);

  const guardar = async (seleccionado) => {
    try {
      if (!seleccionado.nombre?.trim()) {
        return;
      }

      await apiService.post(`${URL}/registrar-estudiante`, seleccionado);
      await cargarEstudiantes();
    } catch (error) {
      const { response: { data: { errors } } } = error;
      gridRef.current.dataSource = estudiantes;

      if (errors) {
        setErrors(errors);
      }

      console.error('Guardar', error);
    }
  }

  const cargarEstudiantes = useCallback(async () => {
    try {
      const data = await apiService.get(URL);
      setEstudiantes(data);
    } catch (error) {
      console.error('Cargar Carreras', error);
      toast.error('Hubo un problema al cargar los estudiantes.')
    }
  }, []);

  const dataSourceChanged = async (state) => {
    if (state.action === 'add' || state.action === 'edit') {
      await guardar(state.data);
    }
  }

  useEffect(() => {
    cargarEstudiantes();
  }, [cargarEstudiantes]);

  const toolbarOptions = ['Add', 'Edit']
  const editSettings = { allowEditing: true, allowAdding: true };

  return (
    <main className="w-full h-full flex-grow p-6 relative">
      <Breadcrumbs items={['Inicio', 'Estudiantes']} />

      <div className="w-full">
        <div className="card w-full bg-base-100 shadow-xl my-5">
          <div className="card-body">
            <GridComponent dataSource={estudiantes}
              toolbar={toolbarOptions}
              allowPaging={true}
              editSettings={editSettings}
              actionComplete={dataSourceChanged}
              ref={gridRef}
              enableImmutableMode={true}>
              <ColumnsDirective>
                <ColumnDirective field='codigo' isPrimaryKey={true} />
                <ColumnDirective field='nombre' headerText='Nombre' />
                <ColumnDirective field='rfid' headerText='RFID' />
                <ColumnDirective field='email' headerText='Email' />
              </ColumnsDirective>
              <Inject services={[Page, Toolbar, Edit]} />
            </GridComponent>
          </div>
        </div>
      </div>

      <Errores errors={errors} cleanErrors={() => setErrors([])} />
    </main>
  )
}