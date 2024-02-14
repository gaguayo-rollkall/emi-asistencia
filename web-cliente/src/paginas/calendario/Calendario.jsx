import { useEffect, useRef, useState, useCallback } from 'react';
import { ScheduleComponent, Day, Week, WorkWeek, Month, Agenda, Inject, Resize, DragAndDrop } from '@syncfusion/ej2-react-schedule';

import apiService from '../../servicios/api-service';

import './Calendario.css';
import toast from 'react-hot-toast';

export default function Calendario() {
  const scheduleObj = useRef(null);
  const [eventos, setEventos] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const actionComplete = async (args) => {
    if (args.requestType === 'eventCreated' || args.requestType === 'eventChanged') {
      const [evento] = args.data;
      await apiService.post('/eventos', evento);
      return;
    }

    if (args.requestType === 'eventDeleted') {
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

  const cargarEventos = useCallback(async() => {
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
        actionComplete={actionComplete}>
        <Inject services={[Day, Week, WorkWeek, Month, Agenda, Resize, DragAndDrop]} />
      </ScheduleComponent>
    </div>
  )
}