/* eslint-disable react/prop-types */
import { useEffect, useState } from 'react';
import { FormValidator } from '@syncfusion/ej2-inputs';
import { TextBoxComponent } from '@syncfusion/ej2-react-inputs';

import apiService from '../../servicios/api-service';
import { uuidv4 } from '../../utiles'
import APIErrors from '../../components/APIErrors';

let formObject;

export default function UsuariosForm(props) {
  console.info('UsuariosForm', props);
  const { onEditComplete } = props;
  const [form, setForm] = useState(props);
  const [error, setError] = useState(null);

  const update = (field, toUpperCase = false) => ({ value }) => {
    setForm({ ...form, [field]: toUpperCase ? value.toUpperCase() : value });
  }

  const options = {
    rules: {
      'nombre': {
        required: [true, '* Ingrese el Nombre']
      },
      'userId': {
        required: [true, '* Ingrese el Email'],
        email: [true, '* Ingrese un Email valido']
      },
      'password': {
        required: [props.isAdd, '* Ingrese la contraseña'],
        regex: [(args) => args['value'] === '' || (/(?=.*\d)(?=.*[a-zA-Z])(?=.*[^a-zA-Z0-9]).{6,}/).test(args['value']), '* La contraseña debe tener al menos 6 caracteres, un alfanumerico y un caracter especial'],
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
  
        await apiService.put(`/users/informacion-usuarios/${form.id}`, form);

        onEditComplete();
      }
    } catch (apiError) {
      console.error('Error al guardar el usuario', apiError);
      setError(apiError);
    }
  }

  useEffect(() => {
    formObject = new FormValidator(`#usuarioForm1`, options);
  }, []);

  return (
    <form id="usuarioForm1" method="post" onSubmit={(e) => e.preventDefault()}>
      <APIErrors error={error} />

      <div className="form-group">
        <TextBoxComponent type="text" name="nombre" value={form.nombre} change={update('nombre', true)} placeholder="Nombre" floatLabelType="Auto" data-msg-containerid="errroForNombre" />
        <div id="errroForNombre" />
      </div>

      <div className="form-group">
        <TextBoxComponent type="text" name="userId" value={form.userId} change={update('userId')} placeholder="Email" floatLabelType="Auto" data-msg-containerid="errroForEmail" />
        <div id="errroForEmail" />
      </div>

      <div className="form-group">
        <TextBoxComponent type="text" name="detalles" value={form.detalles} change={update('detalles', true)} placeholder="Detalles" floatLabelType="Auto" data-msg-containerid="errorForDetails" />
        <div id="errorForDetails" />
      </div>

      <div className="form-group">
        <TextBoxComponent type="password" name="password" value={form.password} change={update('password')} placeholder="Contraseña" floatLabelType="Auto" data-msg-containerid="errorForPassword" />
        <div id="errorForPassword" />
      </div>

      <div className="mt-4" style={{ textAlign: 'right' }}>
        <button type="submit" className="btn btn-sm btn-primary" onClick={onSaveForm}>
          Guardar
        </button>
      </div>
    </form>
  )
}