import { useCallback, useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { QRCodeGeneratorComponent } from '@syncfusion/ej2-react-barcode-generator';
import { ListBoxComponent, Inject, CheckBoxSelection } from '@syncfusion/ej2-react-dropdowns';
import toast from 'react-hot-toast';

import Breadcrumbs from '../../components/Breadcrumbs';
import apiService from '../../servicios/api-service';

export default function DetallesEvento() {
  const [searchParams] = useSearchParams();
  const [evento, setEvento] = useState({});
  const [usuarios, setUsuarios] = useState([]);
  const [emails, setEmails] = useState([]);
  const [sendingEmail, setSendingEmail] = useState(false);

  const loadEventDetails = useCallback(async () => {
    try {
      const id = searchParams.get('evento');

      if (!id) return;

      const data = await apiService.get(`/eventos/${id}`);
      setEvento(data);

      const allUsers = await apiService.get('/users/informacion-usuarios');
      setUsuarios(allUsers.map(u => ({ text: u.userId, id: u.userId })));
    } catch (error) {
      console.error('Cargar Detalles Evento', error);
    }
  }, [searchParams]);

  const sendEmail = async () => {
    const id = searchParams.get('evento');

    try {
      setSendingEmail(true);

      await apiService.post('/eventos/enviar-invitacion-evento', {
        eventoId: id,
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

  const parsedDate = () => {
    const currentDate = new Date(evento.startTime);
    const endDate = new Date(evento.endTime);

    // Get the individual components of the date and time
    let day = currentDate.getDate();
    let month = currentDate.getMonth() + 1; // Note: January is 0, so we add 1
    let year = currentDate.getFullYear();
    let hours = currentDate.getHours();
    let minutes = currentDate.getMinutes();
    let hours2 = endDate.getHours();
    let minutes2 = endDate.getMinutes();

    // Ensure leading zeroes for single-digit values
    day = (day < 10) ? '0' + day : day;
    month = (month < 10) ? '0' + month : month;
    hours = (hours < 10) ? '0' + hours : hours;
    minutes = (minutes < 10) ? '0' + minutes : minutes;
    hours2 = (hours2 < 10) ? '0' + hours2 : hours2;
    minutes2 = (minutes2 < 10) ? '0' + minutes2 : minutes2;

    // Construct the formatted date string
    return `${day}/${month}/${year} ${hours}:${minutes} - ${hours2}:${minutes2}`;
  }

  useEffect(() => {
    loadEventDetails();
  }, [loadEventDetails])

  if (!evento?.id) {
    return null;
  }

  return (
    <main className="w-full h-full flex-grow p-6 relative" id="detallesmain">
      <Breadcrumbs items={['Inicio', 'Calendario']} />

      <div role="alert" className="alert shadow-lg">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="stroke-info shrink-0 w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
        <div>
          <h3 className="font-bold">Evento #{evento.id} - {evento.subject}</h3>
          <div className="text-xs">{evento.description}</div>
          <div className="text-xs">{parsedDate()}</div>
        </div>
      </div>

      <div className='w-full' style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        marginTop: '1rem',
      }}>
        <QRCodeGeneratorComponent width={"200px"} height={"200px"} value={`${evento.id}`} />
      </div>

      <div style={{
        marginTop: '1rem',
      }}>
        <p className="text-sm">Seleccione los usuarios para mandar la informacion del evento.</p>

        <ListBoxComponent dataSource={usuarios} selectionSettings={{ showSelectAll: true, showCheckbox: true }} onChange={({ value }) => setEmails(value)}>
          <Inject services={[CheckBoxSelection]} />
        </ListBoxComponent>

        <button className="btn btn-primary" disabled={emails.length === 0} onClick={sendEmail}>
          {sendingEmail && <span className="loading loading-spinner"></span>}
          Enviar Correo
        </button>
      </div>
    </main>
  )
}