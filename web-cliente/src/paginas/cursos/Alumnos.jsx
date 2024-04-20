import { useCallback, useEffect, useState, useRef } from 'react';
import { useSearchParams } from 'react-router-dom';
import { GridComponent, ColumnsDirective, ColumnDirective, Inject, Page, Edit, Toolbar, CommandColumn } from '@syncfusion/ej2-react-grids';
import { UploaderComponent } from '@syncfusion/ej2-react-inputs';

import Breadcrumbs from '../../components/Breadcrumbs';
import apiService from '../../servicios/api-service';
import toast from 'react-hot-toast';
import RegistrarEstudianteModal from './RegistrarAlumnoModal';

export default function Alumnos() {
  const [searchParams] = useSearchParams();
  const uploadObj = useRef(null);

  const [curso, setCurso] = useState({});
  const [estudiantes, setEstudiantes] = useState([]);
  const [tempEstudiantes, setTempEstudiantes] = useState([]);
  const [modalEstudiante, setModalEstudiante] = useState(false);

  const toolbarOptions = []
  const editSettings = {};

  const processCSV = async (text) => {
    const estudiantesRaw = [];

    const lines = text.split('\r\n');
    lines.filter(l => l !== '').forEach(line => {
      const columns = line.split(',');
      const [grado = 'EST', codigo, nombre = '', email = '', rfid = ''] = columns;
      estudiantesRaw.push({ grado, codigo, nombre, email, rfid });
    });

    setTempEstudiantes(estudiantesRaw);
  }

  const registrarEstudiantes = async () => {
    const cursoId = searchParams.get('cursoId');
    await apiService.post('/estudiantes', { cursoId, estudiantes: tempEstudiantes });
    await cargarEstudiantes();
    setTempEstudiantes([]);
  }

  const subirEstudiantes = async () => {
    try {
      const [file] = uploadObj.current.filesData;

      if (!file) return;

      const reader = new FileReader();

      reader.onload = (e) => {
        const text = e.target.result;
        processCSV(text);
      };

      reader.readAsText(file.rawFile);
    } catch (error) {
      console.error('Subir', error);
      toast.error('Hubo un problema al subir los estudiantes.');
    }
  }

  const commands = [
    {
      buttonOption: {
        content: 'Quitar', cssClass: 'btn btn-warning btn-xs'
      }
    }
  ];

  const commandClick = async (args) => {
    try {
      await apiService.post('/estudiantes/remover-estudiante', args.rowData);
      await cargarEstudiantes();

      toast.success('Se removio al estudiante del curso.');
    } catch (error) {
      console.error('Invitar', error);
      toast.error('Hubo un problema al remover al estudiante.')
    }
  }

  const cargarEstudiantes = useCallback(async () => {
    try {
      const id = searchParams.get('cursoId');
      if (!id) return;

      const info = await apiService.get(`/cursos/${id}`)
      const data = await apiService.get('/estudiantes', { params: { cursoId: id } });

      setCurso(info);
      setEstudiantes(data);
    } catch (error) {
      console.error('Estudiantes', error);
      toast.error('Hubo un problema al cargar los estudiantes');
    }
  }, [searchParams]);

  useEffect(() => {
    cargarEstudiantes();
  }, [cargarEstudiantes]);

  return (
    <main className="w-full h-full flex-grow p-6 relative" id="estudiantes-main">
      <Breadcrumbs items={['Inicio', 'Cursos', 'Estudiantes']} />

      <div className="text-xl font-bold tracking-tight text-gray-900 sm:text-xl breadcrumbs">
        <ul>
          <li>{curso.carrera}</li>
          <li>{curso.nombre}</li>
          <li>{curso.gestion}</li>
          <li>{curso.periodo}</li>
        </ul>
      </div>

      <div className="w-full">
        <div className="card w-full bg-base-100 shadow-xl my-5">
          <div className="card-body">
            {estudiantes.length === 0 &&
              <div className="text-center">
                <p className="text-sm">El formato del excel (CSV) debe ser: Grado, Codigo, Nombre, Email, RFID </p>
                <UploaderComponent
                  type='file'
                  ref={uploadObj}
                  autoUpload={true}
                  sequentialUpload={false}
                  beforeUpload={subirEstudiantes}
                  beforeRemove={() => setTempEstudiantes([])} />
              </div>
            }

            {estudiantes.length > 0 &&
              <GridComponent
                dataSource={estudiantes}
                toolbar={toolbarOptions}
                allowPaging={true}
                editSettings={editSettings}
                enableImmutableMode={false}
                commandClick={commandClick}
                selectionSettings={{ mode: 'Row', type: 'Single' }}
              >
                <ColumnsDirective>
                  <ColumnDirective field='id' visible={false} isPrimaryKey={true} />
                  <ColumnDirective field='grado' headerText='Grado' width='100' />
                  <ColumnDirective field='codigo' headerText='Codigo' width='100' />
                  <ColumnDirective field='nombre' headerText='Nombre' width='100' />
                  <ColumnDirective field='rfid' headerText='RFID' width='100' />
                  <ColumnDirective field='email' headerText='Email' width='100' />
                  <ColumnDirective headerText='Remover Estudiante' width={120} commands={commands} />
                </ColumnsDirective>
                <Inject services={[Page, CommandColumn, Toolbar, Edit]} />
              </GridComponent>
            }

            {tempEstudiantes.length > 0 &&
              <div>
                <GridComponent
                  dataSource={tempEstudiantes}
                  allowPaging={true}
                >
                  <ColumnsDirective>
                    <ColumnDirective field='id' visible={false} isPrimaryKey={true} />
                    <ColumnDirective field='grado' headerText='Grado' width='100' />
                    <ColumnDirective field='codigo' headerText='Codigo' width='100' />
                    <ColumnDirective field='nombre' headerText='Nombre' width='100' />
                    <ColumnDirective field='rfid' headerText='RFID' width='100' />
                    <ColumnDirective field='email' headerText='Email' width='100' />
                  </ColumnsDirective>
                  <Inject services={[Page]} />
                </GridComponent>
                <button className="btn btn-outline btn-success mt-4" onClick={registrarEstudiantes}>Registrar Estudiantes</button>
              </div>
            }

            <button className="btn btn-primary btn-primary mt-4" onClick={() => setModalEstudiante(true)}>
              Registrar Estudiante
            </button>
          </div>
        </div>
      </div>

      <RegistrarEstudianteModal
        status={modalEstudiante}
        cursoId={curso?.id}
        setStatus={setModalEstudiante}
        onClose={cargarEstudiantes}
      />
    </main>
  )
}