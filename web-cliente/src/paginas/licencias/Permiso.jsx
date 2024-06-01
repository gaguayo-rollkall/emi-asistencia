/* eslint-disable react/prop-types */
import { useEffect, useState, useRef } from 'react';
import { DialogComponent } from '@syncfusion/ej2-react-popups';
import { QRCodeGeneratorComponent } from '@syncfusion/ej2-react-barcode-generator';
import { useReactToPrint } from 'react-to-print';

import apiService from '../../servicios/api-service';

export default function Permiso({
  visible,
  close,
  form,
}) {
  const animationSettings = { effect: 'None' };
  const [estudiante, setEstudiante] = useState(null);
  const [loading, setLoading] = useState(false);

  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  const sendEmail = async () => {
    try {
      setLoading(true);

      const user = JSON.parse(localStorage.getItem('user') || '{}');

      const permiso = {
        permisoId: form.id,
        email: '',
        userId: user.username,
      };
  
      await apiService.post(`/estudiantes/enviar-permiso`, permiso);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  const buttons = [
    {
      click: () => handlePrint(),
      buttonModel: {
        content: 'Imprimir Papeleta',
        isPrimary: false,
      }
    },
    {
      click: sendEmail,
      buttonModel: {
        content: 'Enviar por Correo',
        isPrimary: true,
      }
    }
  ];

  const loadEstudiante = async () => {
    const data = await apiService.get(`/estudiantes/${form.codigoEstudiante}`);
    setEstudiante(data);
  }

  useEffect(() => {
    if (visible) {
      loadEstudiante();
      return;
    }

    setEstudiante(null);
  }, [visible]);

  // if (!estudiante) return;

  return (
    <DialogComponent
      showCloseIcon={true}
      animationSettings={animationSettings}
      width="700px"
      target={"#licenciasPage"}
      header=""
      visible={visible}
      close={close}
      buttons={buttons}
    >
      <>
        <div style={{
          border: '1px solid',
          padding: 24,
        }} ref={componentRef}>
          <div className="flex justify-between">
            <img src="https://www.emi.edu.bo/images/main1.png" width={140} height={120} style={{ height: 120 }} />

            <QRCodeGeneratorComponent width={"140px"} height={"140px"} value={`${form.id}`} displayText={{ visibility: false }} />
          </div>

          <h1 className="text-xl text-center underline decoration-solid">Papeleta de Permiso</h1>

          <div className="mt-4 flex gap-1.5">
            <p className="text-base font-bold">NOMBRES Y APELLIDOS:</p> <p className="text-base">{`${estudiante?.grado || 'EST'}. ${estudiante?.nombre || ''}`}</p>
          </div>
          <div className="mt-4 flex gap-1.5">
            <p className="text-base font-bold">CODIGO:</p> <p className="text-base">{form.codigoEstudiante}</p>
          </div>
          <div className="mt-4 flex gap-1.5">
            <p className="text-base font-bold">PERMISO:</p> <p className="text-base">{form.titulo}</p>
          </div>
          <div className="mt-4 flex gap-1.5">
            <p className="text-base font-bold">MOTIVO:</p> <p className="text-base">{form.motivo}</p>
            <p className="text-base font-bold ml-4">JUSTIFICACION:</p> <p className="text-base">{form.justificacion}</p>
          </div>
          <div className="mt-4 flex gap-1.5">
            <p className="text-base font-bold">FECHA:</p> <p className="text-base">{form.fecha}</p>
            <p className="text-base font-bold">ESTATUS:</p> <p className="text-base">{form.estatus}</p>
          </div>

          {loading && (
            <div className="text-center mt-4">
              <span className="loading loading-spinner loading-lg"></span>
              Enviando Correo...
            </div>
          )}
        </div>
      </>
    </DialogComponent>
  )
}