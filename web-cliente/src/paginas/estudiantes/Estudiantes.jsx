import { useState, useEffect, useCallback, useRef } from 'react'
import toast from 'react-hot-toast';
import { GridComponent, ColumnsDirective, ColumnDirective, Inject, Page, Edit, Toolbar, CommandColumn, Filter } from '@syncfusion/ej2-react-grids';

import Breadcrumbs from '../../components/Breadcrumbs';
import ImageUploader from '../../components/ImageUploader';
import apiService from '../../servicios/api-service';
import Errores from '../../components/Errores';

const URL = '/estudiantes';

export default function Estudiantes() {
  const gridRef = useRef();
  const [errors, setErrors] = useState({});
  const [estudiantes, setEstudiantes] = useState([]);

  const guardar = async (seleccionado, previo) => {
    try {
      if (!seleccionado.nombre?.trim()) {
        return;
      }

      await apiService.post(`${URL}/registrar-estudiante`, seleccionado);
      await cargarEstudiantes();
    } catch (error) {
      const { response: { data: { errors } } } = error;
      const previosEstudiantes = [...estudiantes];
      const estudianteIndex = previosEstudiantes.findIndex(e => e.codigo === previo.codigo);

      if (estudianteIndex !== -1) {
        previosEstudiantes[estudianteIndex] = { ...previo };

        setEstudiantes([...previosEstudiantes]);
      }

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
      await guardar(state.data, state.previousData);
    }
  }

  const commands = [
    {
      buttonOption: {
        content: 'Invitacion', cssClass: 'btn btn-active btn-link btn-xs'
      }
    }
  ];

  const commandClick = async (args) => {
    const { codigo, email } = args.rowData;
    
    if (!email) {
      toast.error('El estudiante no tiene un email.');
      return;
    }

    try {
      await apiService.post('/estudiantes/enviar-invitacion', { codigo });
      toast.success('Se envio la invitacion al estudiante.');
    } catch (error) {
      console.error('Invitar', error);
      toast.error('Hubo un problema al enviar la invitacion.')
    }
  }

  useEffect(() => {
    cargarEstudiantes();
  }, [cargarEstudiantes]);

  const toolbarOptions = ['Add', 'Edit']
  const editSettings = { allowEditing: true, allowAdding: true };
  const FilterOptions = {
    type: 'Menu'
  };

  return (
    <main className="w-full h-full flex-grow p-6 relative">
      <Breadcrumbs items={['Inicio', 'Estudiantes']} />

      <ImageUploader />

      <div className="w-full">
        <div className="card w-full bg-base-100 shadow-xl my-5">
          <div className="card-body">
            <GridComponent dataSource={estudiantes}
              toolbar={toolbarOptions}
              allowPaging={true}
              editSettings={editSettings}
              actionComplete={dataSourceChanged}
              ref={gridRef}
              enableImmutableMode={false}
              allowFiltering={true}
              filterSettings={FilterOptions}
              commandClick={commandClick}>
              <ColumnsDirective>
              <ColumnDirective field='id' visible={false} isPrimaryKey={true} />
                <ColumnDirective field='codigo' />
                <ColumnDirective field='nombre' headerText='Nombre' />
                <ColumnDirective field='rfid' headerText='RFID' />
                <ColumnDirective field='email' headerText='Email' />
                <ColumnDirective headerText='Enviar invitacion' width='120' commands={commands} />
              </ColumnsDirective>
              <Inject services={[Page, Toolbar, Edit, CommandColumn, Filter]} />
            </GridComponent>
          </div>
        </div>
      </div>

      <Errores errors={errors} cleanErrors={() => setErrors([])} />
    </main>
  )
}