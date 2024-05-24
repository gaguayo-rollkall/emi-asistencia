/* eslint-disable react/prop-types */
import { useEffect, useState } from 'react';
import { FormValidator } from '@syncfusion/ej2-inputs';
import { TextBoxComponent } from '@syncfusion/ej2-react-inputs';
import { CheckBoxComponent } from '@syncfusion/ej2-react-buttons';

import apiService from '../../servicios/api-service';
import { uuidv4 } from '../../utiles'
import APIErrors from '../../components/APIErrors';

let formObject;

export default function PermisoForm(props) {
  const { onEditComplete } = props;
  const existingForm = props.isAdd ? {} : {
    ...props,
  };
  const [form, setForm] = useState({
    nombre: '',
    usuariosSistema: false,
    reportes: false,
    carreras: false,
    periodosAcademicos: false,
    cursos: false,
    calendario: false,
    estudiantes: false,
    licencias: false,
    control: false,
    ...existingForm,
  });
  const [error, setError] = useState(null);

  const update = (field, toUpperCase = false) => ({ value, checked }) => {
    setForm({ ...form, [field]: toUpperCase ? value.toUpperCase().trim() : checked });
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

        await apiService.post('permisosseguridad', { ...form });

        onEditComplete();
      }
    } catch (apiError) {
      console.error('Error al guardar el permiso', apiError);
      setError(apiError);
    }
  }

  useEffect(() => {
    formObject = new FormValidator(`#permisoForm1`, options);
  }, []);

  return (
    <form id="permisoForm1" method="post" onSubmit={(e) => e.preventDefault()}>
      <APIErrors error={error} />

      <div className="form-group">
        <TextBoxComponent type="text" name="nombre" value={form.nombre} change={update('nombre', true)} placeholder="Nombre" floatLabelType="Auto" data-msg-containerid="errorForTitulo" />
        <div id="errorForTitulo" />
      </div>

      <div className="form-group mt-4">
        <CheckBoxComponent label="Usuarios" change={update('usuariosSistema')} checked={form.usuariosSistema} />
      </div>
      <div className="form-group">
        <CheckBoxComponent label="Reportes" change={update('reportes')} checked={form.reportes} />
      </div>
      <div className="form-group">
        <CheckBoxComponent label="Carreras" change={update('carreras')} checked={form.carreras} />
      </div>
      <div className="form-group">
        <CheckBoxComponent label="Periodos Academicos" change={update('periodosAcademicos')} checked={form.periodosAcademicos} />
      </div>
      <div className="form-group">
        <CheckBoxComponent label="Cursos" change={update('cursos')} checked={form.cursos} />
      </div>
      <div className="form-group">
        <CheckBoxComponent label="Calendario" change={update('calendario')} checked={form.calendario} />
      </div>
      <div className="form-group">
        <CheckBoxComponent label="Estudiantes" change={update('estudiantes')} checked={form.estudiantes} />
      </div>
      <div className="form-group">
        <CheckBoxComponent label="Licencias" change={update('licencias')} checked={form.licencias} />
      </div>
      <div className="form-group">
        <CheckBoxComponent label="Control" change={update('control')} checked={form.control} />
      </div>

      <div className="mt-4" style={{ textAlign: 'right' }}>
        <button type="submit" className="btn btn-sm btn-primary" onClick={onSaveForm}>
          Guardar
        </button>
      </div>
    </form>
  )
}