import { useState, useEffect, useCallback, useRef } from 'react'
import toast from 'react-hot-toast';
import { GridComponent, ColumnsDirective, ColumnDirective, Inject, Page, Group, Toolbar, PdfExport } from '@syncfusion/ej2-react-grids';
import { DatePickerComponent } from '@syncfusion/ej2-react-calendars';
import { ComboBoxComponent } from '@syncfusion/ej2-react-dropdowns';

import Breadcrumbs from '../../components/Breadcrumbs';
import apiService from '../../servicios/api-service';

export default function RegistrosCarrera() {
  const gridRef = useRef();
  const [reporte, setReporte] = useState([]);
  const [carreras, setCarreras] = useState([])
  const [gestiones, setGestiones] = useState([])
  const [periodos, setPeriodos] = useState({})
  const [cursos, setCursos] = useState([{
    id: '00000000-0000-0000-0000-000000000000',
    Nombre: 'TODOS',
  }])

  const [carrera, setCarrera] = useState('')
  const [gestion, setGestion] = useState('')
  const [periodo, setPeriodo] = useState('')
  const [curso, setCurso] = useState('00000000-0000-0000-0000-000000000000');

  const startValue = new Date();
  startValue.setHours(0, 0, 0, 0);

  const [fechaInicio, setFechaInicio] = useState(startValue);
  const format = 'dd/MM/yyyy';

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

  const cargarCursos = async () => {
    const cursos = await apiService.get('/cursos', { params: { carreraId: carrera, periodoId: periodo } });
    setCursos([{ id: '00000000-0000-0000-0000-000000000000', nombre: 'TODOS LOS SEMESTRES' }, ...cursos.map(({ id, nombre }) => ({ id, nombre }))]);
  }

  const cargarReporte = async () => {
    try {
      const data = await apiService.get('/reportes/registros-carrera', { params: { fechaInicio, fechaFin: fechaInicio, carreraId: carrera, periodoAcademicoId: periodo, cursoId: curso } })
      const reporteData = [];

      data.forEach(({ carrera, cursos, idCarrera }) => {
        cursos.forEach(({ id, nombre, estudiantes }) => {
          estudiantes.forEach(estudiante => {
            reporteData.push({ carrera, curso: nombre, ...estudiante, })
          });
        });
      });

      setReporte(reporteData);
    } catch (error) {
      console.error('Reporte', error);
      toast.error('Hubo un problema al cargar el reporte.')
    }
  }

  useEffect(() => {
    if (carrera && periodo) {
      cargarCursos();
    }
  }, [carrera, periodo])

  useEffect(() => {
    cargarCarreras();
    cargarPeriodosAcademicos();
  }, [cargarCarreras]);

  const toolbarOptions = ['PdfExport']
  const toolbarClick = (args) => {
    if (gridRef.current && args.item.id === 'GridReporteCarrera_pdfexport') {
      const pdfExportProperties = {
        pageOrientation: 'Landscape',
        fileName: 'Reporte de Registros por Carrera.pdf',
      };
      gridRef.current.pdfExport(pdfExportProperties);
    }
  }

  return (
    <main className="w-full h-full flex-grow p-6 relative">
      <Breadcrumbs items={['Reportes', 'Registros']} />

      <div className="w-full flex flex-col justify-center items-center">
        <div className="card w-3/5 bg-base-100 shadow-xl my-5">
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

            <ComboBoxComponent
              dataSource={cursos}
              fields={{ text: 'nombre', value: 'id' }}
              change={(args) => setCurso(args.itemData === 'null' ? '' : args.itemData['id'])}
              placeholder="Seleccione un Curso"
              value={curso}
              popupHeight="220px" />

            <DatePickerComponent
              format={format}
              value={fechaInicio}
              change={(args) => setFechaInicio(args.value)}
              placeholder="Fecha" />

            <button className="btn btn-primary" onClick={cargarReporte}>
              Cargar Reporte
            </button>
          </div>
        </div>

        <GridComponent
          id="GridReporteCarrera"
          dataSource={reporte}
          allowPaging={false}
          toolbar={toolbarOptions}
          ref={gridRef}
          allowPdfExport={true}
          toolbarClick={toolbarClick}
          allowGrouping={true}
          groupSettings={{
            columns: ['carrera', 'curso']
          }}
        >
          <ColumnsDirective>
            <ColumnDirective field='carrera' headerText='Carrera' />
            <ColumnDirective field='curso' headerText='Curso' />
            <ColumnDirective field='codigo' headerText='Codigo' isPrimaryKey={true} />
            <ColumnDirective field='nombre' headerText='Nombre' />
            <ColumnDirective field='fecha' headerText='Fecha' />
            <ColumnDirective field='ingreso' headerText='Ingreso' />
            <ColumnDirective field='salida' headerText='Salida' />
            <ColumnDirective field='registros' headerText='Registros' />
          </ColumnsDirective>
          <Inject services={[Page, Toolbar, Group, PdfExport]} />
        </GridComponent>
      </div>
    </main>
  )
}