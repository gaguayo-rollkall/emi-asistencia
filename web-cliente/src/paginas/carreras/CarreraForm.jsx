/* eslint-disable react/prop-types */
import { useEffect, useState } from 'react';
import { FormValidator } from '@syncfusion/ej2-inputs';
import { TextBoxComponent } from '@syncfusion/ej2-react-inputs';

import apiService from '../../servicios/api-service';
import { uuidv4 } from '../../utiles'
import APIErrors from '../../components/APIErrors';

let formObject;

export default function CarreaForm(props) {
  const { onEditComplete } = props;
  const [form, setForm] = useState(props);
  const [error, setError] = useState(null);

  const update = (field, toUpperCase = false) => ({ value }) => {
    setForm({ ...form, [field]: toUpperCase ? value.toUpperCase().trim() : value });
  }

  const options = {
    rules: {
      'nombre': {
        required: [true, '* Ingrese el Nombre']
      },
    }
  }

  const onSaveForm = async (e) => {
    e?.preventDefault();

    try {
      if (formObject.validate()) {
        if (props.isAdd) {
          form.id = uuidv4();
        }

        var action = props.isAdd ? 'post' : 'put';
        var url = props.isAdd ? '/carreras' : `/carreras/${form.id}`;
  
        await apiService[action](url, { ...form });

        onEditComplete();
      }
    } catch (apiError) {
      console.error('Error al guardar la carrera', apiError);
      setError(apiError);
    }
  }

  useEffect(() => {
    formObject = new FormValidator(`#carreraForm1`, options);
  }, []);

  return (
    <form id="carreraForm1" method="post" onSubmit={(e) => e.preventDefault()}>
      <APIErrors error={error} />

      <div className="form-group">
        <TextBoxComponent type="text" name="nombre" value={form.nombre} change={update('nombre', true)} placeholder="Nombre" floatLabelType="Auto" data-msg-containerid="errroForNombre" />
        <div id="errroForNombre" />
      </div>

      <div className="mt-4" style={{ textAlign: 'right' }}>
        <button type="submit" className="btn btn-sm btn-primary" onClick={onSaveForm}>
          Guardar
        </button>
      </div>
    </form>
  )
}