import { useState, useEffect, useCallback, useRef } from 'react'
import toast from 'react-hot-toast';
import { GridComponent, ColumnsDirective, ColumnDirective, Inject, Page, Edit, Toolbar, CommandColumn, Filter } from '@syncfusion/ej2-react-grids';

import UsuariosForm from './UsuariosForm';
import Breadcrumbs from '../../components/Breadcrumbs';
import apiService from '../../servicios/api-service';

const URL = '/users/informacion-usuarios';

export default function Usuarios() {
  const gridRef = useRef();
  const [usuarios, setUsuarios] = useState([]);

  const toolbarOptions = ['Add', 'Edit', 'Delete']
  const template = (props) => <UsuariosForm {...props} onEditComplete={() => {
    gridRef.current.endEdit();
    cargarUsuarios();
  }} />
  const editSettings = {
    allowEditing: true,
    allowAdding: true,
    allowDeleting: true,
    showDeleteConfirmDialog: true,
    mode: 'Dialog',
    headerTemplate: 'Registro de Usuarios',
    footerTemplate: () => <></>,
    template,
  };

  const FilterOptions = {
    type: 'Menu'
  };

  const borrar = async (seleccionado) => {
    try {
      await apiService.delete(`/users/informacion-usuarios/${seleccionado.id}`);
    } catch (error) {
      console.error('Borrar', error);
      toast.error('No se pudo borrar el usuario.');
    }
  }

  const cargarUsuarios = useCallback(async () => {
    try {
      const data = await apiService.get(URL);
      setUsuarios(data);
    } catch (error) {
      console.error('Cargar Usuarios', error);
      toast.error('Hubo un problema al cargar los usuarios.')
    }
  }, []);

  const dataSourceChanged = async (state) => {
    if (state.requestType === 'delete') {
      await borrar(state.data[0]);
    }
    
    await cargarUsuarios();
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
                ref={gridRef}
                allowFiltering={true}
                filterSettings={FilterOptions}
                actionComplete={dataSourceChanged}>
                <ColumnsDirective>
                <ColumnDirective field='id' visible={false} isPrimaryKey={true} />
                  <ColumnDirective field='userId' headerText='Email' />
                  <ColumnDirective field='nombre' headerText='Nombre' />
                  <ColumnDirective field='detalles' headerText='Detalles' />
                  <ColumnDirective field='permisoSeguridad.nombre' headerText='Permiso' />
                </ColumnsDirective>
                <Inject services={[Page, Toolbar, Edit, CommandColumn, Filter]} />
              </GridComponent>
          </div>
        </div>
      </div>
    </main>
  );
}