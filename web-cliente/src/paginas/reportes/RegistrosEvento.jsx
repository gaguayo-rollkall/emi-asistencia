import { useState, useEffect, useCallback } from 'react'
import toast from 'react-hot-toast';
import { GridComponent, ColumnsDirective, ColumnDirective, Inject, Page, Edit, Toolbar } from '@syncfusion/ej2-react-grids';
import { ComboBoxComponent } from '@syncfusion/ej2-react-dropdowns';

import Breadcrumbs from '../../components/Breadcrumbs';
import apiService from '../../servicios/api-service';
import { reportFake } from './fake/alumnos';

export default function RegistrosEvento() {
  const [reporte, setReporte] = useState(reportFake);
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

      data.forEach(p => {
        setGestiones(g => [...g, { gestion: p.gestion }]);
        setPeriodos(x => ({ ...x, [p.gestion]: p.periodos.map(({ id, periodo }) => ({ id, periodo })) }));
      });

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
      setReporte(data);
      console.log(data);
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

        {reporte.length > 0 && (
          <div className="card w-full bg-base-100 shadow-xl my-5">
            <div className="card-body">
              {reporte.map(({ carrera, cursos, idCarrera }) => (
                <div className="carrera" key={idCarrera}>
                  <p className="text-lg">{carrera}</p>

                  {cursos.map(({ id, nombre, estudiantes }) => (
                    <div className="cursos" key={id}>
                      <p className="text-base mt-4">{nombre}</p>

                      <GridComponent dataSource={estudiantes}
                        allowPaging={false}>
                        <ColumnsDirective>
                          <ColumnDirective field='codigo' headerText='Codigo' isPrimaryKey={true} />
                          <ColumnDirective field='nombre' headerText='Nombre' />
                          <ColumnDirective field='registros' headerText='Asistencias' />
                        </ColumnsDirective>
                        <Inject services={[Page, Toolbar, Edit]} />
                      </GridComponent>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>)}
      </div>
    </main>
  )
}