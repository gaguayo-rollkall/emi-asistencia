import { useState, useEffect, useCallback, useRef } from 'react'
import toast from 'react-hot-toast';
import { GridComponent, ColumnsDirective, ColumnDirective, Inject, Page, Edit, Toolbar, CommandColumn, Filter } from '@syncfusion/ej2-react-grids';

import Breadcrumbs from '../../components/Breadcrumbs';
import apiService from '../../servicios/api-service';
import Errores from '../../components/Errores';
import { upperCase } from '../../utiles';

const URL = '/users';

export default function Usuarios() {
  const gridRef = useRef();
  const [errors, setErrors] = useState({});
  const [usuarios, setUsuarios] = useState([]);

  const cargarUsuarios = useCallback(async () => {
    try {
      const data = await apiService.get(URL);
      setUsuarios(data);
    } catch (error) {
      console.error('Cargar Usuarios', error);
      toast.error('Hubo un problema al cargar los usuarios.')
    }
  }, []);

  const toolbarOptions = ['Add', 'Edit']
  const editSettings = { allowEditing: true, allowAdding: true };
  const FilterOptions = {
    type: 'Menu'
  };

  const dataSourceChanged = async (state) => {
    if (state.action === 'add' || state.action === 'edit') {
      // 
    }
  }

  useEffect(() => {
    cargarUsuarios();
  }, [cargarUsuarios]);

  return (
    <main className="w-full h-full flex-grow p-6 relative">
      <Breadcrumbs items={['Inicio', 'Usuarios']} />

      <div className="w-full">
        <div className="card w-full bg-base-100 shadow-xl my-5">
          <div className="card-body">
            <GridComponent dataSource={usuarios}
                toolbar={toolbarOptions}
                allowPaging={true}
                editSettings={editSettings}
                actionComplete={dataSourceChanged}
                ref={gridRef}
                enableImmutableMode={false}
                allowFiltering={true}
                filterSettings={FilterOptions}>
                <ColumnsDirective>
                <ColumnDirective field='id' visible={false} isPrimaryKey={true} />
                  <ColumnDirective field='nombre' headerText='Nombre'  alueAccessor={upperCase} />
                  <ColumnDirective field='email' headerText='Email' />
                </ColumnsDirective>
                <Inject services={[Page, Toolbar, Edit, CommandColumn, Filter]} />
              </GridComponent>
          </div>
        </div>
      </div>
    </main>
  );
}