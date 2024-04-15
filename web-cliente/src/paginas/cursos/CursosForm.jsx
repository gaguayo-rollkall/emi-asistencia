/* eslint-disable react/prop-types */
import { useEffect, useState } from 'react';
import { FormValidator } from '@syncfusion/ej2-inputs';
import { TextBoxComponent } from '@syncfusion/ej2-react-inputs';

import apiService from '../../servicios/api-service';
import { uuidv4 } from '../../utiles'
import APIErrors from '../../components/APIErrors';

let formObject;

export default function CursosForm(props) {
  const { onEditComplete } = props;
  console.log('CursosForm', props);
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

        const carreraId = sessionStorage.getItem('carrera');
        const periodoId = sessionStorage.getItem('periodo');
  
        await apiService.post('/cursos', { carreraId, periodoId, ...form });

        onEditComplete();
      }
    } catch (apiError) {
      console.error('Error al guardar el usuario', apiError);
      setError(apiError);
    }
  }

  useEffect(() => {
    formObject = new FormValidator(`#cursosForm1`, options);
  }, []);

  return (
    <form id="cursosForm1" method="post" onSubmit={(e) => e.preventDefault()}>
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