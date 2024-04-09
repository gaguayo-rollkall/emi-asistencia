/* eslint-disable react/prop-types */
import { useEffect, useState } from 'react';
import { FormValidator } from '@syncfusion/ej2-inputs';
import { TextBoxComponent } from '@syncfusion/ej2-react-inputs';
import { DialogComponent } from '@syncfusion/ej2-react-popups';
import ImageUploader from '../../components/ImageUploader';
import apiService from '../../servicios/api-service';

const animationSettings = { effect: 'None' };

let formObject;

const options = {
  rules: {
    'grado': {
      required: [true, '* Ingrese el Grado']
    },
    'nombre': {
      required: [true, '* Ingrese el Nombre']
    },
    'codigo': {
      required: [true, '* Ingrese el Codigo']
    },
    'email': {
      required: [true, '* Ingrese el Email'],
      email: [true, '* Ingrese un Email valido']
    }
  }
}

const URL = '/estudiantes';

export default function ModalEstudiante({
  estudiante,
  status,
  setStatus,
  onClose
}) {
  const [form, setForm] = useState({});

  const submit = async () => {
    if (formObject.validate()) {
      await apiService.post(`${URL}/registrar-estudiante`, form);
      onClose();
      setStatus(false);
    }
  }

  const buttons = [
    {
      click: submit,
      buttonModel: {
        content: !estudiante?.Id ? 'Agregar' : 'Actualizar',
        isPrimary: true,
      }
    }
  ];

  const dialogClose = () => setStatus(false);

  const dialogOpen = () => setStatus(true);

  const update = (field) => ({ value }) => {
    setForm({ ...form, [field]: value });
  }

  useEffect(() => {
    if (status) {
      formObject = new FormValidator('#form1', options);
      setForm(estudiante)
    }
  }, [estudiante, status]);

  return (
    <DialogComponent
      id="estudiantesDialog"
      showCloseIcon={true}
      animationSettings={animationSettings}
      width="500px"
      target="#estudiantes-main"
      header={!estudiante?.id ? 'Agregar Estudiante' : 'Actualizar Estudiante'}
      visible={status}
      buttons={buttons}
      open={() => dialogOpen()}
      close={() => dialogClose()}
      isModal={true}
    >
      <form id="form1" method="post" onSubmit={(e) => e.preventDefault()}>
        {status && <ImageUploader value={form.foto} change={update('foto')} />}
        <div className="form-group">
          <TextBoxComponent type="text" name="grado" value={form.grado} change={update('grado')} placeholder="Grado" floatLabelType="Auto" data-msg-containerid="errroForGrado" />
          <div id="errroForGrado" />
        </div>
        <div className="form-group">
          <TextBoxComponent type="text" name="nombre" value={form.nombre} change={update('nombre')} placeholder="Nombre" floatLabelType="Auto" data-msg-containerid="errroForNombre" />
          <div id="errroForNombre" />
        </div>
        <div className="form-group">
          <TextBoxComponent type="text" name="codigo" value={form.codigo} change={update('codigo')} placeholder="Codigo" floatLabelType="Auto" data-msg-containerid="errroForCodigo" />
          <div id="errroForCodigo" />
        </div>
        <div className="form-group">
          <TextBoxComponent type="text" name="rfid" value={form.rfid} change={update('rfid')} placeholder="RFID" floatLabelType="Auto" data-msg-containerid="errroForRFID" />
          <div id="errroForRFID" />
        </div>
        <div className="form-group">
          <TextBoxComponent type="text" name="email" value={form.email} change={update('email')} placeholder="Email" floatLabelType="Auto" data-msg-containerid="errroForEmail" />
          <div id="errroForEmail" />
        </div>
      </form>
    </DialogComponent>
  )
}
