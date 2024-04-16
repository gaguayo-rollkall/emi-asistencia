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

export default function RegistrarEstudianteModal({
  status,
  cursoId,
  setStatus,
  onClose
}) {
  console.info(cursoId)
  const [form, setForm] = useState({});

  const submit = async () => {
    if (formObject.validate()) {
      const estudiante = { ...form, cursoId };
      await apiService.post(`${URL}/registrar-estudiante`, estudiante);
      onClose();
      setStatus(false);
    }
  }

  const buttons = [
    {
      click: submit,
      buttonModel: {
        content: 'Agregar',
        isPrimary: true,
      }
    }
  ];

  const dialogClose = () => setStatus(false);

  const dialogOpen = () => setStatus(true);

  const update = (field, upperCase) => ({ value }) => {
    setForm({ ...form, [field]: upperCase ? value.toUpperCase().trim() : value });
  }

  const codigoSeleccionado = async ({value}) => {
    setForm({ ...form, codigo: value });

    if (!value) return;

    const data = await apiService.get(`${URL}/${value}`);
    if (data) {
      setForm({ ...form, ...data });
    }
  }

  useEffect(() => {
    if (status) {
      formObject = new FormValidator('#form45', options);
      setForm({
        grado: 'EST',
        nombre: '',
        codigo: '',
        rfid: '',
        email: '',
      })
    }
  }, [status]);

  return (
    <DialogComponent
      id="estudiantes2Dialog"
      showCloseIcon={true}
      animationSettings={animationSettings}
      width="500px"
      target="#estudiantes-main"
      header={'Agregar Estudiante'}
      visible={status}
      buttons={buttons}
      open={() => dialogOpen()}
      close={() => dialogClose()}
      isModal={true}
    >
      <form id="form45" method="post" onSubmit={(e) => e.preventDefault()}>
        {status && <ImageUploader value={form.foto} change={update('foto')} />}
        <div className="form-group">
          <TextBoxComponent type="text" name="grado" value={form.grado} change={update('grado', true)} placeholder="Grado" floatLabelType="Auto" data-msg-containerid="errroForGrado" enabled={form.codigo} />
          <div id="errroForGrado" />
        </div>
        <div className="form-group">
          <TextBoxComponent type="text" name="nombre" value={form.nombre} change={update('nombre', true)} placeholder="Nombre" floatLabelType="Auto" data-msg-containerid="errroForNombre" enabled={form.codigo}/>
          <div id="errroForNombre" />
        </div>
        <div className="form-group">
          <TextBoxComponent type="text" name="codigo" value={form.codigo} change={codigoSeleccionado} placeholder="Codigo" floatLabelType="Auto" data-msg-containerid="errroForCodigo" focus={true} />
          <div id="errroForCodigo" />
        </div>
        <div className="form-group">
          <TextBoxComponent type="text" name="rfid" value={form.rfid} change={update('rfid')} placeholder="RFID" floatLabelType="Auto" data-msg-containerid="errroForRFID" enabled={form.codigo}/>
          <div id="errroForRFID" />
        </div>
        <div className="form-group">
          <TextBoxComponent type="text" name="email" value={form.email} change={update('email')} placeholder="Email" floatLabelType="Auto" data-msg-containerid="errroForEmail" enabled={form.codigo}/>
          <div id="errroForEmail" />
        </div>
      </form>
    </DialogComponent>
  )
}
