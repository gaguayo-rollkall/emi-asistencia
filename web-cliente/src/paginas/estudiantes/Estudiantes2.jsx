import { useState } from 'react';

import Breadcrumbs from '../../components/Breadcrumbs';
import ModalEstudiante from './ModalEstudiante';

export default function Estudiantes2() {
  const [status, setStatus] = useState(false);

  return (
    <main className="w-full h-full flex-grow p-6 relative" id="estudiantes-main">
      <Breadcrumbs items={['Inicio', 'Estudiantes']} />

      <div className="w-full">
        <div className="card w-full bg-base-100 shadow-xl my-5">
          <div className="card-body">
            {status ? 'TRUE' : 'FALSE'}
            <button onClick={() => setStatus(true)} type='button'>Open Dialog</button>
          </div>
        </div>
      </div>

      <ModalEstudiante status={status} setStatus={setStatus} />
    </main>
  );
}