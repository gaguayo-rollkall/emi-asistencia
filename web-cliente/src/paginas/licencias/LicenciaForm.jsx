/* eslint-disable react/prop-types */
import { useEffect, useState } from 'react';
import { FormValidator } from '@syncfusion/ej2-inputs';
import { TextBoxComponent } from '@syncfusion/ej2-react-inputs';
import { ComboBoxComponent } from '@syncfusion/ej2-react-dropdowns';

import ImageUploader from '../../components/ImageUploader';
import apiService from '../../servicios/api-service';
import { uuidv4 } from '../../utiles'
import APIErrors from '../../components/APIErrors';
import Permiso from './Permiso';

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
    fechaInicio: formatDateToDDMMYYYY(props.fechaInicio),
    fechaFin: formatDateToDDMMYYYY(props.fechaFin),
  };
  const [form, setForm] = useState({
    titulo: '',
    fechaInicio: formatDateToDDMMYYYY(new Date()),
    fechaFin: formatDateToDDMMYYYY(new Date()),
    motivo: 'Personal',
    foto: 'https://st4.depositphotos.com/16537446/25274/v/450/depositphotos_252749160-stock-illustration-contract-document-with-signature-vector.jpg',
    justificacion: '',
    codigoEstudiante: '',
    estatus: 'PENDIENTE',
    carrera: '',
    semestre: '',
    autorizado: '',
    ...existingForm,
  });

  const [error, setError] = useState(null);
  const [showPermiso, setShowPermiso] = useState(false);
  const [carreras, setCarreras] = useState([]);
  const [semestres, setSemestres] = useState([]);

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
      'fechaInicio': {
        required: [true, '* Ingrese la Fecha']
      },
      'fechaFin': {
        required: [true, '* Ingrese la Fecha']
      },
      'codigoEstudiante': {
        required: [true, '* Ingrese el Codigo del Estudiante']
      },
      'autorizado': {
        required: [true, '* Ingrese Autorizado Por']
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

  const loadEstudiante = async () => {
    try {
      if (!form?.codigoEstudiante) {
        setCarreras([]);
        setSemestres([]);
      }

      const data = await apiService.get(`/estudiantes/${form.codigoEstudiante}`);
      setCarreras(data.carreras || []);
      setSemestres(data.semestres || [])
   
      setForm({ ...form, carrera: (data.carreras || [])[0] || '', semestre: (data.semestres || [])[0] || '' })
    } catch (error) {
      console.error('Error al cargar el estudiante', error);
    }
  }

  useEffect(() => {
    loadEstudiante();
  }, [form?.codigoEstudiante])

  useEffect(() => {
    formObject = new FormValidator(`#licenciaForm1`, options);
  }, []);

  return (
    <>
      <form id="licenciaForm1" method="post" onSubmit={(e) => e.preventDefault()}>
        <APIErrors error={error} />

        <ImageUploader value={form.foto} change={update('foto')} />

        <div className="form-group">
          <TextBoxComponent type="text" name="titulo" value={form.titulo} change={update('titulo', true)} placeholder="Titulo" floatLabelType="Auto" data-msg-containerid="errorForTitulo" />
          <div id="errorForTitulo" />
        </div>

        <div className="form-group">
          <TextBoxComponent type="date" name="fechaInicio" value={form.fechaInicio} change={update('fechaInicio')} placeholder="Fecha" floatLabelType="Auto" data-msg-containerid="errorForFecha" format="dd/MM/yyyy" />
          <div id="errorForFecha" />
        </div>

        <div className="form-group">
          <TextBoxComponent type="date" name="fechaFin" value={form.fechaFin} change={update('fechaFin')} placeholder="Hasta" floatLabelType="Auto" data-msg-containerid="errorForFechaFin" format="dd/MM/yyyy" />
          <div id="errorForFechaFin" />
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
          <TextBoxComponent type="text" name="justificacion" value={form.justificacion} change={update('justificacion', true)} placeholder="Justificacion" floatLabelType="Auto" data-msg-containerid="errorForJustificacion" />
          <div id="errorForJustificacion" />
        </div>

        <div className="form-group">
          <TextBoxComponent type="text" name="codigoEstudiante" value={form.codigoEstudiante} change={update('codigoEstudiante', true)} placeholder="Codigo de Estudiante" floatLabelType="Auto" data-msg-containerid="errorForCodigo" />
          <div id="errorForCodigo" />
        </div>

        <div className="form-group">
          <ComboBoxComponent
            dataSource={carreras}
            change={update('carrera', true)}
            placeholder="Carrera"
            value={form.carrera}
            popupHeight="220px"
            floatLabelType="Auto" />
        </div>

        <div className="form-group">
          <ComboBoxComponent
            dataSource={semestres}
            change={update('semestre', true)}
            placeholder="Semestre"
            value={form.semestre}
            popupHeight="220px"
            floatLabelType="Auto" />
        </div>

        <div className="form-group">
          <TextBoxComponent type="text" name="autorizado" value={form.autorizado} change={update('autorizado', true)} placeholder="Autorizado Por" floatLabelType="Auto" data-msg-containerid="errorForAutorizado" />
          <div id="errorForAutorizado" />
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
          <button type="button" className="btn btn-sm btn-warning mr-4" onClick={() => setShowPermiso(true)} disabled={!form.id}>
            Papeleta de Permiso
          </button>
          <button type="submit" className="btn btn-sm btn-primary" onClick={onSaveForm}>
            Guardar
          </button>
        </div>
      </form>

      <Permiso visible={showPermiso} close={() => setShowPermiso(false)} form={form}/>
    </>
  )
}