import { useEffect, useRef, useState, useCallback } from 'react';
import { ScheduleComponent, Day, Week, WorkWeek, Month, Agenda, Inject, Resize, DragAndDrop } from '@syncfusion/ej2-react-schedule';
import { QRCodeGeneratorComponent } from '@syncfusion/ej2-react-barcode-generator';

import apiService from '../../servicios/api-service';

import './Calendario.css';
import toast from 'react-hot-toast';

// eslint-disable-next-line react/prop-types
const QR = ({ id }) => {
  const [visible, setVisible] = useState(false);
  
  useEffect(() => {
    const timeout = setTimeout(() => {
      setVisible(true);
    }, 0);

    () => clearTimeout(timeout);
  }, []);

  return (
    <div style={{ height: 300, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <a className="btn btn-active btn-neutral btn-sm w-full" href={`/detalles-evento?evento=${id}`} target='_blank' rel="nonrefer">Mostrar Evento</a>
      {visible && <QRCodeGeneratorComponent width={"200px"} height={"250px"} value={`${id}`} />}
    </div>
  )
}

export default function Calendario() {
  const scheduleObj = useRef(null);
  const [eventos, setEventos] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const actionComplete = async (args) => {
    console.log(args);
    if (args.requestType === 'eventCreated' || args.requestType === 'eventChanged') {
      const [evento] = args.data;
      await apiService.post('/eventos', evento);
      return;
    }

    if (args.requestType === 'eventDeleted' || args.requestType === 'eventRemoved') {
      const [evento] = args.data;
      await apiService.delete(`/eventos/${evento.Id}`)
    }
  }

  const onEventRendered = (args) => {
    let categoryColor = args.data.CategoryColor;
    if (!args.element || !categoryColor) {
      return;
    }
    if (scheduleObj.current.currentView === 'Agenda') {
      args.element.firstChild.style.borderLeftColor = categoryColor;
    }
    else {
      args.element.style.backgroundColor = categoryColor;
    }
  };

  const cargarEventos = useCallback(async () => {
    try {
      const data = await apiService.get('/eventos').then(es => es.map(e => ({
        Id: e.id,
        Description: e.description,
        StartTime: new Date(e.startTime),
        EndTime: new Date(e.endTime),
        IsAllDay: e.isAllDay,
        Subject: e.subject,
        Location: e.location,
        RecurrenceRule: e.recurrenceRule,
      })));

      setEventos(data);
      setIsLoading(false);
    } catch (error) {
      console.error('Eventos', error);
      toast.error('Hubo un problema al cargar los eventos');
    }
  }, []);

  useEffect(() => {
    cargarEventos();
  }, [cargarEventos]);

  if (isLoading) {
    return (
      <div className="w-full h-full flex items-center justify-center">
        <span className="loading loading-ball loading-lg"></span>
      </div>
    )
  }

  return (
    <div className="w-full h-full">
      <ScheduleComponent
        width='100%'
        height='100%'
        selectedDate={new Date()}
        ref={scheduleObj}
        eventSettings={{ dataSource: eventos }}
        eventRendered={onEventRendered}
        actionComplete={actionComplete}
        quickInfoTemplates={{
          templateType: 'Event',
          // eslint-disable-next-line react/prop-types
          footer: (props) => props.Id && <QR id={props.Id} />
        }}
      >
        <Inject services={[Day, Week, WorkWeek, Month, Agenda, Resize, DragAndDrop]} />
      </ScheduleComponent>
    </div>
  )
}