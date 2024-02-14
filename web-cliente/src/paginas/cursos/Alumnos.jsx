import { useCallback, useEffect, useState, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { GridComponent, ColumnsDirective, ColumnDirective, Inject, Page, Edit, Toolbar } from '@syncfusion/ej2-react-grids';
import { UploaderComponent } from '@syncfusion/ej2-react-inputs';

import Breadcrumbs from '../../components/Breadcrumbs';
import apiService from '../../servicios/api-service';
import toast from 'react-hot-toast';

export default function Alumnos() {
  const params = useParams();
  const uploadObj = useRef(null);

  const [curso, setCurso] = useState({});
  const [estudiantes, setEstudiantes] = useState([]);

  const toolbarOptions = []
  const editSettings = {};

  const processCSV = async (text) => {
    const estudiantes = [];

    const lines = text.split('\r\n');
    lines.forEach(line => {
      const columns = line.split(',');
      const [codigo, nombre = '', email = '', rfid = ''] = columns;
      estudiantes.push({ codigo, nombre, email, rfid });
    });

    await apiService.post('/estudiantes', { cursoId: params.id, estudiantes })
    await cargarEstudiante();
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

  const cargarEstudiante = useCallback(async () => {
    try {
      if (!params.id) return;

      const info = await apiService.get(`/cursos/${params.id}`)
      const data = await apiService.get('/estudiantes', { params: { cursoId: params.id } });

      setCurso(info);
      setEstudiantes(data);
    } catch (error) {
      console.error('Estudiantes', error);
      toast.error('Hubo un problema al cargar los estudiantes');
    }
  }, [params.id]);

  useEffect(() => {
    cargarEstudiante();
  }, [cargarEstudiante]);

  return (
    <main className="w-full h-full flex-grow p-6 relative">
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
                <UploaderComponent
                  type='file'
                  ref={uploadObj}
                  autoUpload={true}
                  sequentialUpload={false}></UploaderComponent>

                <button className="btn btn-outline btn-primary mt-4" onClick={subirEstudiantes}>Subir</button>
              </div>
            }

            {estudiantes.length > 0 &&
              <GridComponent
                dataSource={estudiantes}
                toolbar={toolbarOptions}
                allowPaging={true}
                editSettings={editSettings}
                enableImmutableMode={false}>
                <ColumnsDirective>
                  <ColumnDirective field='id' visible={false} isPrimaryKey={true} />
                  <ColumnDirective field='codigo' headerText='Codigo' width='100' />
                  <ColumnDirective field='nombre' headerText='Nombre' width='100' />
                  <ColumnDirective field='rfid' headerText='RFID' width='100' />
                </ColumnsDirective>
                <Inject services={[Page, Toolbar, Edit]} />
              </GridComponent>
            }
          </div>
        </div>
      </div>
    </main>
  )
}