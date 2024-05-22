/* eslint-disable react/prop-types */
import { useEffect, useState } from 'react';
import { FormValidator } from '@syncfusion/ej2-inputs';
import { TextBoxComponent } from '@syncfusion/ej2-react-inputs';
import { ComboBoxComponent } from '@syncfusion/ej2-react-dropdowns';

import ImageUploader from '../../components/ImageUploader';
import apiService from '../../servicios/api-service';
import { uuidv4 } from '../../utiles'
import APIErrors from '../../components/APIErrors';

let formObject;

function formatDateToDDMMYYYY(date) {
  // Extract day, month, and year from the date object
  const day = String(date.getDate()).padStart(2, '0'); // Get the day and pad with zero if necessary
  const month = String(date.getMonth() + 1).padStart(2, '0'); // Get the month, adjust zero-based index, and pad with zero
  const year = date.getFullYear(); // Get the full year

  // Concatenate into the desired format
  return `${year}-${month}-${day}`;
}

export default function LicenciaForm(props) {
  const { onEditComplete } = props;
  const existingForm = props.isAdd ? {} : {
    ...props,
    fecha: formatDateToDDMMYYYY(props.fecha),
  };
  const [form, setForm] = useState({
    titulo: '',
    fecha: formatDateToDDMMYYYY(new Date()),
    motivo: 'Personal',
    foto: 'https://st4.depositphotos.com/16537446/25274/v/450/depositphotos_252749160-stock-illustration-contract-document-with-signature-vector.jpg',
    justificacion: '',
    codigoEstudiante: '',
    estatus: 'PENDIENTE',
    ...existingForm,
  });
  const [error, setError] = useState(null);
  console.log(form);

  const update = (field, toUpperCase = false) => ({ value }) => {
    setForm({ ...form, [field]: toUpperCase ? value.toUpperCase().trim() : value });
  }

  const options = {
    rules: {
      'titulo': {
        required: [true, '* Ingrese el Titulo']
      },
      'justificacion': {
        required: [true, '* Ingrese la Justificacion']
      },
      'fecha': {
        required: [true, '* Ingrese la Fecha']
      },
      'codigoEstudiante': {
        required: [true, '* Ingrese el Codigo del Estudiante']
      }
    }
  }

  const onSaveForm = async (e) => {
    e?.preventDefault();

    try {
      if (formObject.validate()) {
        if (props.isAdd) {
          form.id = uuidv4();
        }
  
        await apiService.post('licencias', { ...form });

        onEditComplete();
      }
    } catch (apiError) {
      console.error('Error al guardar la licencia', apiError);
      setError(apiError);
    }
  }

  useEffect(() => {
    formObject = new FormValidator(`#licenciaForm1`, options);
  }, []);

  return (
    <form id="licenciaForm1" method="post" onSubmit={(e) => e.preventDefault()}>
      <APIErrors error={error} />

      <ImageUploader value={form.foto} change={update('foto')} />

      <div className="form-group">
        <TextBoxComponent type="text" name="titulo" value={form.titulo} change={update('titulo', true)} placeholder="Titulo" floatLabelType="Auto" data-msg-containerid="errorForTitulo" />
        <div id="errorForTitulo" />
      </div>

      <div className="form-group">
        <TextBoxComponent type="date" name="fecha" value={form.fecha} change={update('fecha')} placeholder="Fecha" floatLabelType="Auto" data-msg-containerid="errorForFecha" format="dd/MM/yyyy" />
        <div id="errorForFecha" />
      </div>

      <div className="form-group">
        <ComboBoxComponent
              dataSource={['PERSONAL', 'EMERGENCIA', 'SALUD', 'OTRO']}
              change={update('motivo', true)}
              placeholder="Motivo"
              value={form.motivo}
              popupHeight="220px"
              floatLabelType="Auto" />
      </div>

      <div className="form-group">
        <TextBoxComponent type="text" name="justificacion" value={form.justificacion} change={update('justificacion', true)} placeholder="Justificacion" floatLabelType="Auto" data-msg-containerid="errorForJustificacion"  />
        <div id="errorForJustificacion" />
      </div>

      <div className="form-group">
        <TextBoxComponent type="text" name="codigoEstudiante" value={form.codigoEstudiante} change={update('codigoEstudiante', true)} placeholder="Codigo de Estudiante" floatLabelType="Auto" data-msg-containerid="errorForCodigo" />
        <div id="errorForCodigo" />
      </div>

      <div className="form-group">
        <ComboBoxComponent
              dataSource={['RECHAZADO', 'PENDIENTE', 'APROVADO']}
              change={update('estatus', true)}
              placeholder="Estatus"
              value={form.estatus}
              popupHeight="220px"
              floatLabelType="Auto" />
      </div>

      <div className="mt-4" style={{ textAlign: 'right' }}>
        <button type="submit" className="btn btn-sm btn-primary" onClick={onSaveForm}>
          Guardar
        </button>
      </div>
    </form>
  )
}