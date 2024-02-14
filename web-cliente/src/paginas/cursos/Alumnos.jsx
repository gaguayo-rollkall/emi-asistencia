import { useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { GridComponent, ColumnsDirective, ColumnDirective, Inject, Page, Edit, Toolbar } from '@syncfusion/ej2-react-grids';

import Breadcrumbs from '../../components/Breadcrumbs';
import apiService from '../../servicios/api-service';
import Errores from '../../components/Errores';
import toast from 'react-hot-toast';

export default function Alumnos() {
  const params = useParams();
  const [estudiantes, setEstudiantes] = useState([]);

  const toolbarOptions = []
  const editSettings = {};

  const cargarEstudiante = useCallback(async () => {
    try {
      if (!params.id) return;

      const data = apiService.get('/estudiantes', { params: { cursoId: params.id } });
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

      <div className="w-full">
        <div className="card w-full bg-base-100 shadow-xl my-5">
          <div className="card-body">
            <GridComponent
              dataSource={estudiantes}
              toolbar={toolbarOptions}
              allowPaging={true}
              editSettings={editSettings}
              enableImmutableMode={true}>
              <ColumnsDirective>
                <ColumnDirective field='id' visible={false} isPrimaryKey={true} />
                <ColumnDirective field='codigo' headerText='Codigo' width='100' />
              </ColumnsDirective>
              <Inject services={[Page, Toolbar, Edit]} />
            </GridComponent>
          </div>
        </div>
      </div>
    </main>
  )
}