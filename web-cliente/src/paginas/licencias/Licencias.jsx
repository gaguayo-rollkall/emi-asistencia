/* eslint-disable react/prop-types */
import { useState, useEffect, useCallback, useRef } from 'react'
import toast from 'react-hot-toast';
import { GridComponent, ColumnsDirective, ColumnDirective, Inject, Page, Edit, Toolbar, PdfExport, Filter } from '@syncfusion/ej2-react-grids';

import Breadcrumbs from '../../components/Breadcrumbs';
import apiService from '../../servicios/api-service';
import Errores from '../../components/Errores';
import LicenciaForm from './LicenciaForm';
import Permiso from './Permiso'

const URL = '/licencias';

export default function Licencias() {
  const gridRef = useRef();
  const [errors, setErrors] = useState({});
  const [licencias, setLicencias] = useState([]);
  const [showPermiso, setShowPermiso] = useState(false);
  const [form, setForm] = useState({});

  const toolbarOptions = ['Add', 'Edit', { text: 'Papeleta de Permiso', id: 'papeleta' } , 'Delete', 'PdfExport']
  const template = (props) => <LicenciaForm {...props}
    onEditComplete={() => {
      gridRef.current.endEdit();
    }} />
  const editSettings = {
    allowEditing: true,
    allowAdding: true,
    allowDeleting: true,
    showDeleteConfirmDialog: true,
    mode: 'Dialog',
    headerTemplate: 'Registro de Licencia',
    footerTemplate: () => <></>,
    template,
  };
  const FilterOptions = {
    type: 'Menu'
  };

  const toolbarClick = (args) => {
    if (gridRef.current && args.item.id === 'GridLicencias_pdfexport') {
      gridRef.current.pdfExport();
    }

    if (gridRef.current && args.item.id === 'papeleta') {
      setShowPermiso(true);
    }
  }

  const borrar = async (seleccionado) => {
    try {
      await apiService.delete(`${URL}/${seleccionado.id}`);
    } catch (error) {
      console.error('Borrar', error);
      gridRef.current.dataSource = licencias;
      toast.error('No se pudo borrar la licencia');
    }
  }

  const cargarLicencias = useCallback(async () => {
    try {
      const data = await apiService.get(URL);
      setLicencias(data.map((licencia) => ({
        ...licencia,
        fechaInicio: new Date(licencia.fechaInicio),
        fechaFin: new Date(licencia.fechaFin),
      })));
    } catch (error) {
      console.error('Cargar Licencias', error);
      toast.error('Hubo un problema al cargar las licencias.')
    }
  }, []);

  const dataSourceChanged = async (state) => {
    if (state.requestType === 'delete') {
      await borrar(state.data[0]);
    }

    await cargarLicencias();
  }

  useEffect(() => {
    cargarLicencias();
  }, [cargarLicencias]);

  return (
    <main className="w-full h-full flex-grow p-6 relative" id="licenciasPage">
      <Breadcrumbs items={['Inicio', 'Licencias']} />

      <div className="w-full">
        <div className="card w-full bg-base-100 shadow-xl my-5">
          <div className="card-body">
            <GridComponent id="GridLicencias"
              dataSource={licencias}
              toolbar={toolbarOptions}
              allowPaging={true}
              editSettings={editSettings}
              actionComplete={dataSourceChanged}
              ref={gridRef}
              enableImmutableMode={true}
              allowFiltering={true}
              filterSettings={FilterOptions}
              allowPdfExport={true}
              toolbarClick={toolbarClick}
              rowSelected={({ data }) => setForm({ ...data })}>
              <ColumnsDirective>
                <ColumnDirective field='id' visible={false} isPrimaryKey={true} width={100} />
                <ColumnDirective field='titulo' headerText='Titulo' width={100} />
                <ColumnDirective field='fechaInicio' headerText='Fecha' width={100} format="dd/MM/yyyy" />
                <ColumnDirective field='fechaFin' headerText='Hasta' width={100} format="dd/MM/yyyy" />
                <ColumnDirective field='motivo' headerText='Motivo' width={100} />
                <ColumnDirective field='codigoEstudiante' headerText='Codigo' width={100} />
                <ColumnDirective field='estatus' headerText='Estatus' width={100} />
              </ColumnsDirective>
              <Inject services={[Page, Toolbar, Edit, PdfExport, Filter]} />
            </GridComponent>
          </div>
        </div>
      </div>

      <Permiso visible={showPermiso} close={() => setShowPermiso(false)} form={form} target="#licenciasPage"/>
      <Errores errors={errors} cleanErrors={() => setErrors([])} />
    </main>
  )
}