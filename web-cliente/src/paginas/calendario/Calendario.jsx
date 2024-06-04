/* eslint-disable react/prop-types */
import { useEffect, useRef, useState, useCallback } from 'react';
import { ScheduleComponent, Day, Week, WorkWeek, Month, Agenda, Inject, Resize, DragAndDrop } from '@syncfusion/ej2-react-schedule';
import { QRCodeGeneratorComponent } from '@syncfusion/ej2-react-barcode-generator';
import { ListBoxComponent, Inject as InjectDropDown, CheckBoxSelection } from '@syncfusion/ej2-react-dropdowns';

import apiService from '../../servicios/api-service';

import './Calendario.css';
import toast from 'react-hot-toast';

const getFormattedString = (eventData) => {
  function formatDate(date) {
    const options = {
      day: '2-digit',
      month: 'long',
      year: 'numeric'
    };
    return date.toLocaleDateString('es-ES', options);
  }

  // Function to format time in HH:MM format
  function formatTime(date) {
    return date.toLocaleTimeString('es-ES', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: false
    });
  }

  // Convert StartTime and EndTime to Date objects
  const startTime = new Date(eventData.StartTime);
  const endTime = new Date(eventData.EndTime);

  // Format dates and times
  const formattedDate = formatDate(startTime);
  const formattedStartTime = formatTime(startTime);
  const formattedEndTime = formatTime(endTime);

  // Construct the title string
  return `${formattedDate} (${formattedStartTime} - ${formattedEndTime})`;
}

// eslint-disable-next-line react/prop-types
const QR = (props) => {
  console.log(props);
  const { Id } = props;
  const [visible, setVisible] = useState(false);
  const [usuarios, setUsuarios] = useState([]);
  const [emails, setEmails] = useState([]);
  const [sendingEmail, setSendingEmail] = useState(false);

  const sendEmail = async () => {
    try {
      setSendingEmail(true);

      await apiService.post('/eventos/enviar-invitacion-evento', {
        eventoId: Id,
        emails,
      });

      toast.success('Correo enviado correctamente');
    } catch (error) {
      console.error('Enviar Correo', error);
      toast.error('No se pudo enviar el correo');
    } finally {
      setSendingEmail(false);
    }
  }

  const loadUsers = useCallback(async () => {
    const allUsers = await apiService.get('/users/informacion-usuarios');
    setUsuarios(allUsers.map(u => ({ text: u.userId, id: u.userId })));
  }, []);

  useEffect(() => {
    loadUsers();
  }, [loadUsers]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setVisible(true);
    }, 0);

    () => clearTimeout(timeout);
  }, []);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <div style={{
        marginTop: '1rem',
        textAlign: 'left',
      }}>
        <div className="e-popup-content">
          <div className="e-date-time">
            <div className="e-date-time-icon e-icons"></div>
            <div className="e-date-time-wrapper e-text-ellipsis">
              <div className="e-date-time-details e-text-ellipsis">
                {getFormattedString(props)}
              </div>
            </div>
          </div>

          {props.Location && (
            <div className="e-location">
              <div className="e-location-icon e-icons" />
              <div className="e-location-details e-text-ellipsis">
                {props.Location}
              </div>
            </div>
          )}

          {props.Description && (
            <div className="e-description">
              <div className="e-description-icon e-icons" />
              <div className="e-location-details e-text-ellipsis">
                {props.Description}
              </div>
            </div>
          )}
        </div>

        <div className="flex flex-col items-center" style={{ height: 250, width: '100%' }}>
          {visible && <QRCodeGeneratorComponent width={"200px"} height={"250px"} value={`${Id}`} />}
        </div>

        <p className="text-sm mb-4">Seleccione los usuarios para mandar la informacion del evento.</p>

        <ListBoxComponent dataSource={usuarios} selectionSettings={{ showSelectAll: true, showCheckbox: true }} onChange={({ value }) => setEmails(value)}>
          <InjectDropDown services={[CheckBoxSelection]} />
        </ListBoxComponent>

        <button className="btn btn-outline btn-primary w-full mt-2" disabled={emails.length === 0} onClick={sendEmail}>
          {sendingEmail && <span className="loading loading-spinner"></span>}
          Enviar Correo
        </button>
      </div>
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
          templateType: 'Both',
          // eslint-disable-next-line react/prop-types
          content: (props) => props.Id && <QR {...props} />
        }}
      >
        <Inject services={[Day, Week, WorkWeek, Month, Agenda, Resize, DragAndDrop]} />
      </ScheduleComponent>
    </div>
  )
}