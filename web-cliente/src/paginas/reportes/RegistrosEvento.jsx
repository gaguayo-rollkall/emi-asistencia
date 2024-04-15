import { useState, useEffect, useCallback, useRef } from 'react'
import toast from 'react-hot-toast';
import { GridComponent, ColumnsDirective, ColumnDirective, Inject, Page, Group, Toolbar, PdfExport } from '@syncfusion/ej2-react-grids';
import { ComboBoxComponent } from '@syncfusion/ej2-react-dropdowns';

import Breadcrumbs from '../../components/Breadcrumbs';
import apiService from '../../servicios/api-service';

export default function RegistrosEvento() {
  const gridRef = useRef();
  const [reporte, setReporte] = useState([]);
  const [carreras, setCarreras] = useState([])
  const [gestiones, setGestiones] = useState([])
  const [periodos, setPeriodos] = useState({})
  const [eventos, setEventos] = useState([])

  const [carrera, setCarrera] = useState('')
  const [gestion, setGestion] = useState('')
  const [periodo, setPeriodo] = useState('')
  const [evento, setEvento] = useState(0)

  const startValue = new Date()
  const endValue = new Date();

  startValue.setHours(7, 0, 0, 0);
  endValue.setHours(8, 0, 0, 0);

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

  const cargarEventos = async () => {
    try {
      const data = await apiService.get('/eventos');
      setEventos(data);
    } catch (error) {
      console.error('Eventos', error);
      toast.error('Hubo un problema al cargar los eventos.')
    }
  }

  const cargarReporte = async () => {
    try {
      const data = await apiService.get('/reportes/registros-evento', { params: { evento, carreraId: carrera, periodoAcademicoId: periodo } })
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
    cargarCarreras();
    cargarPeriodosAcademicos();
    cargarEventos();
  }, [cargarCarreras]);

  const toolbarOptions = ['PdfExport']
  const toolbarClick = (args) => {
    if (gridRef.current && args.item.id === 'GridReporteCarrera_pdfexport') {
      const pdfExportProperties = {
        pageOrientation: 'Landscape',
        fileName: 'Reporte de Eventos por Carrera.pdf',
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
              dataSource={eventos || []}
              fields={{ text: 'subject', value: 'id' }}
              change={(args) => setEvento(args.itemData === 'null' ? '' : args.itemData['id'])}
              placeholder="Seleccione un Evento"
              value={evento}
              popupHeight="220px" />

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
            <ColumnDirective field='ingreso' headerText='Ingreso' />
          </ColumnsDirective>
          <Inject services={[Page, Toolbar, Group, PdfExport]} />
        </GridComponent>
      </div>
    </main>
  )
}