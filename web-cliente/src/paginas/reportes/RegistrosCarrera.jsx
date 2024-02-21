import { useState, useEffect, useCallback, useRef } from 'react'
import toast from 'react-hot-toast';
import { GridComponent, ColumnsDirective, ColumnDirective, Inject, Page, Edit, Toolbar, CommandColumn } from '@syncfusion/ej2-react-grids';
import { DateRangePickerComponent } from '@syncfusion/ej2-react-calendars';
import { ComboBoxComponent } from '@syncfusion/ej2-react-dropdowns';
import { useNavigate } from "react-router-dom";

import Breadcrumbs from '../../components/Breadcrumbs';
import apiService from '../../servicios/api-service';

export default function RegistrosCarrera() {
  const navigate = useNavigate();

  const [errors, setErrors] = useState({});
  const [reporte, setReporte] = useState([]);
  const [carreras, setCarreras] = useState([])
  const [gestiones, setGestiones] = useState([])
  const [periodos, setPeriodos] = useState({})

  const [carrera, setCarrera] = useState('')
  const [gestion, setGestion] = useState('')
  const [periodo, setPeriodo] = useState('')

  const startValue = new Date()
  const endValue = new Date();

  startValue.setHours(7, 0, 0, 0);
  endValue.setHours(8, 0, 0, 0);

  const [fechaInicio, setFechaInicio] = useState(startValue);
  const [fechaFin, setFechaFin] = useState(endValue);

  const format = 'dd/MMM/yy hh:mm a';
  const separator = '-';

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

  const onDateSelected = ({ value }) => {
    if (!Array.isArray(value)) {
      return;
    }

    const [inicio, fin] = value;
    setFechaInicio(inicio);
    setFechaFin(fin);
  }

  const cargarReporte = async () => {
    try {
      const data = await apiService.get('/reportes/registros-carrera', { params: { fechaInicio, fechaFin, carreraId: carrera, periodoAcademicoId: periodo } })
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

            <DateRangePickerComponent
              format={format}
              separator={separator}
              startDate={startValue}
              endDate={endValue}
              onChange={onDateSelected}
            />

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
                        allowPaging={false}
                        rowTemplate={({ codigo, nombre, asistencias }) => (
                          <tr className="e-row">
                            <td className="e-rowcell">
                              {codigo}
                            </td>
                            <td className="e-rowcell">
                              {nombre}
                            </td>
                            <td className="e-rowcell">
                              <ul className="timeline timeline-vertical">
                                {asistencias.map(({ asistencia, dia }, index) => (
                                  <li key={index}>
                                    {index > 0 && <hr />}
                                    <div className="timeline-start">{dia}</div>
                                    <div className="timeline-middle">
                                      {asistencia ? (
                                        <svg
                                          viewBox="0 0 1024 1024"
                                          fill="green"
                                          height="1em"
                                          width="1em"
                                        >
                                          <path d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm193.5 301.7l-210.6 292a31.8 31.8 0 01-51.7 0L318.5 484.9c-3.8-5.3 0-12.7 6.5-12.7h46.9c10.2 0 19.9 4.9 25.9 13.3l71.2 98.8 157.2-218c6-8.3 15.6-13.3 25.9-13.3H699c6.5 0 10.3 7.4 6.5 12.7z" />
                                        </svg>
                                      ) : (
                                        <svg
                                          viewBox="0 0 1024 1024"
                                          fill="red"
                                          height="1em"
                                          width="1em"
                                        >
                                          <path d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm165.4 618.2l-66-.3L512 563.4l-99.3 118.4-66.1.3c-4.4 0-8-3.5-8-8 0-1.9.7-3.7 1.9-5.2l130.1-155L340.5 359a8.32 8.32 0 01-1.9-5.2c0-4.4 3.6-8 8-8l66.1.3L512 464.6l99.3-118.4 66-.3c4.4 0 8 3.5 8 8 0 1.9-.7 3.7-1.9 5.2L553.5 514l130 155c1.2 1.5 1.9 3.3 1.9 5.2 0 4.4-3.6 8-8 8z" />
                                        </svg>
                                      )}
                                    </div>
                                    <div className="timeline-end timeline-box">{asistencia ? 'Si' : 'No'}</div>
                                    {index < asistencias.length - 1 && <hr />}
                                  </li>
                                ))}
                              </ul>
                            </td>
                          </tr>)}>
                        <ColumnsDirective>
                          <ColumnDirective field='codigo' headerText='Codigo' isPrimaryKey={true} />
                          <ColumnDirective field='nombre' headerText='Nombre' />
                          <ColumnDirective field='asistencias' headerText='Asistencias' />
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