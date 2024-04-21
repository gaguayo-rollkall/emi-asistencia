import { useState, useEffect, useCallback, useRef } from 'react'
import toast from 'react-hot-toast';
import { createSpinner, showSpinner, hideSpinner } from '@syncfusion/ej2-popups';
import { GridComponent, ColumnsDirective, ColumnDirective, Inject, Page, Toolbar, CommandColumn, Filter } from '@syncfusion/ej2-react-grids';

import Breadcrumbs from '../../components/Breadcrumbs';
import apiService from '../../servicios/api-service';
import Errores from '../../components/Errores';
import ModalEstudiante from './ModalEstudiante';

const URL = '/estudiantes';

export default function Estudiantes() {
  const gridRef = useRef();
  const [errors, setErrors] = useState({});
  const [estudiantes, setEstudiantes] = useState([]);
  const [modalEstudiante, setModalEstudiante] = useState(false);
  const [estudiante, setEstudiante] = useState({ nombre: ''});

  const cargarEstudiantes = useCallback(async () => {
    try {
      showSpinner(document.getElementById('estudiantes-main'));
      const data = await apiService.get(URL);
      setEstudiantes(data);
    } catch (error) {
      console.error('Cargar Carreras', error);
      toast.error('Hubo un problema al cargar los estudiantes.')
    } finally {
      hideSpinner(document.getElementById('estudiantes-main'));
    }
  }, []);

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

  const clickHandler = (args) => {
    if (args.item.id === 'AgregarEstudiante') {
      setEstudiante({
        grado: 'EST',
        nombre: '',
        codigo: '',
        rfid: '',
        email: '',
      });
      setModalEstudiante(true);
    }

    if (args.item.id === 'EditarEstudiante') {
      setModalEstudiante(true);
    }

    if (args.item.id === 'EliminarEstudiante') {
      const { id } = estudiante;

      if (id) {
        apiService.post(`${URL}/borrar-estudiante/${id}`, {})
          .then(() => {
            cargarEstudiantes();
            toast.success('Estudiante eliminado correctamente.');
          });
      }
    }
  }

  useEffect(() => {
    createSpinner({
      target: document.getElementById('estudiantes-main'),
    });
  }, []);

  useEffect(() => {
    cargarEstudiantes();
  }, [cargarEstudiantes]);

  const toolbarOptions = [
    {
      text: 'Agregar Estudiante',
      tooltipText: 'Agregar',
      prefixIcon: 'e-add',
      id: 'AgregarEstudiante'
    },
    {
      text: 'Editar Estudiante',
      tooltipText: 'Editar',
      prefixIcon: 'e-edit',
      id: 'EditarEstudiante'
    }, {
      text: 'Eliminar',
      tooltipText: 'Eliminar',
      prefixIcon: 'e-delete',
      id: 'EliminarEstudiante',
    }]
  const FilterOptions = {
    type: 'Menu'
  };
  const selectionSettings = { mode: 'Row', type: 'Single' };

  return (
    <main className="w-full h-full flex-grow p-6 relative" id="estudiantes-main">
      <Breadcrumbs items={['Inicio', 'Estudiantes']} />

      <div className="w-full">
        <div className="card w-full bg-base-100 shadow-xl my-5">
          <div className="card-body">
            <GridComponent
              dataSource={estudiantes}
              toolbar={toolbarOptions}
              toolbarClick={clickHandler}
              allowPaging={true}
              ref={gridRef}
              enableImmutableMode={false}
              allowFiltering={true}
              filterSettings={FilterOptions}
              commandClick={commandClick}
              selectionSettings={selectionSettings}
              rowSelected={({ data }) => setEstudiante({ ...data })}
            >
              <ColumnsDirective>
                <ColumnDirective field='id' visible={false} isPrimaryKey={true} />
                <ColumnDirective field='codigo' />
                <ColumnDirective field='grado' headerText='Grado' />
                <ColumnDirective field='nombre' headerText='Nombre' />
                <ColumnDirective field='rfid' headerText='RFID' />
                <ColumnDirective field='email' headerText='Email' />
                <ColumnDirective headerText='Enviar invitacion' width='120' commands={commands} />
              </ColumnsDirective>
              <Inject services={[Page, Toolbar, CommandColumn, Filter]} />
            </GridComponent>
          </div>
        </div>
      </div>

      <ModalEstudiante
        status={modalEstudiante}
        setStatus={setModalEstudiante}
        estudiante={estudiante}
        onClose={cargarEstudiantes}
      />

      <Errores errors={errors} cleanErrors={() => setErrors([])} />
    </main>
  )
}