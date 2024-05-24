/* eslint-disable react/prop-types */
import { useState, useEffect, useCallback, useRef } from 'react'
import toast from 'react-hot-toast';
import { GridComponent, ColumnsDirective, ColumnDirective, Inject, Page, Edit, Toolbar, PdfExport, Filter } from '@syncfusion/ej2-react-grids';

import Breadcrumbs from '../../components/Breadcrumbs';
import apiService from '../../servicios/api-service';
import Errores from '../../components/Errores';
import PermisoForm from './PermisoForm';

const URL = '/permisosseguridad';

export default function Permisos() {
  const gridRef = useRef();
  const [errors, setErrors] = useState({});
  const [permisos, setPermisos] = useState([]);

  const toolbarOptions = ['Add', 'Edit', 'Delete', 'PdfExport']
  const template = (props) => <PermisoForm {...props}
    onEditComplete={() => {
      gridRef.current.endEdit();
    }} />
  const editSettings = {
    allowEditing: true,
    allowAdding: true,
    allowDeleting: true,
    showDeleteConfirmDialog: true,
    mode: 'Dialog',
    headerTemplate: 'Registro de Permiso',
    footerTemplate: () => <></>,
    template,
  };
  const FilterOptions = {
    type: 'Menu'
  };

  const toolbarClick = (args) => {
    if (gridRef.current && args.item.id === 'GridPermisos_pdfexport') {
      gridRef.current.pdfExport();
    }
  }

  const borrar = async (seleccionado) => {
    try {
      await apiService.delete(`${URL}/${seleccionado.id}`);
    } catch (error) {
      console.error('Borrar', error);
      gridRef.current.dataSource = permisos;
      toast.error('No se pudo borrar la licencia');
    }
  }

  const cargarDatos = useCallback(async () => {
    try {
      const data = await apiService.get(URL);
      setPermisos(data);
    } catch (error) {
      console.error('Cargar Permisos', error);
      toast.error('Hubo un problema al cargar los permisos.')
    }
  }, []);

  const dataSourceChanged = async (state) => {
    if (state.requestType === 'delete') {
      await borrar(state.data[0]);
    }

    await cargarDatos();
  }

  useEffect(() => {
    cargarDatos();
  }, [cargarDatos]);

  return (
    <main className="w-full h-full flex-grow p-6 relative">
      <Breadcrumbs items={['Inicio', 'Permisos']} />

      <div className="w-full">
        <div className="card w-full bg-base-100 shadow-xl my-5">
          <div className="card-body">
            <GridComponent id="GridPermisos"
              dataSource={permisos}
              toolbar={toolbarOptions}
              allowPaging={true}
              editSettings={editSettings}
              actionComplete={dataSourceChanged}
              ref={gridRef}
              enableImmutableMode={true}
              allowFiltering={true}
              filterSettings={FilterOptions}
              allowPdfExport={true}
              toolbarClick={toolbarClick}>
              <ColumnsDirective>
                <ColumnDirective field='id' visible={false} isPrimaryKey={true} width={100} />
                <ColumnDirective field='nombre' headerText='Nombre' width={100} />
                <ColumnDirective displayAsCheckBox="true" editType="booleanedit"  type="boolean" field='usuariosSistema' headerText='Usuarios' width={100} />
                <ColumnDirective displayAsCheckBox="true" editType="booleanedit"  type="boolean" field='reportes' headerText='Reportes' width={100} />
                <ColumnDirective displayAsCheckBox="true" editType="booleanedit"  type="boolean" field='carreras' headerText='Carreras' width={100} />
                <ColumnDirective displayAsCheckBox="true" editType="booleanedit"  type="boolean" field='periodosAcademicos' headerText='Periodos' width={100} />
                <ColumnDirective displayAsCheckBox="true" editType="booleanedit"  type="boolean" field='cursos' headerText='Cursos' width={100} />
                <ColumnDirective displayAsCheckBox="true" editType="booleanedit"  type="boolean" field='calendario' headerText='Calendario' width={100} />
                <ColumnDirective displayAsCheckBox="true" editType="booleanedit"  type="boolean" field='estudiantes' headerText='Estudiantes' width={100} />
                <ColumnDirective displayAsCheckBox="true" editType="booleanedit"  type="boolean" field='licencias' headerText='Licencias' width={100} />
                <ColumnDirective displayAsCheckBox="true" editType="booleanedit"  type="boolean" field='control' headerText='Control' width={100} />
              </ColumnsDirective>
              <Inject services={[Page, Toolbar, Edit, PdfExport, Filter]} />
            </GridComponent>
          </div>
        </div>
      </div>

      <Errores errors={errors} cleanErrors={() => setErrors([])} />
    </main>
  )
}