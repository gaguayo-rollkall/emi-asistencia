/* eslint-disable react/prop-types */
import { useState, useEffect, useCallback, useRef } from 'react'
import toast from 'react-hot-toast';
import { GridComponent, ColumnsDirective, ColumnDirective, Inject, Page, Edit, Toolbar, PdfExport } from '@syncfusion/ej2-react-grids';

import Breadcrumbs from '../../components/Breadcrumbs';
import apiService from '../../servicios/api-service';
import Errores from '../../components/Errores';
import { upperCase } from '../../utiles';
import CarreaForm from './CarreraForm';

const URL = '/carreras';

export default function Carreras() {
  const gridRef = useRef();
  const [errors, setErrors] = useState({});
  const [carreras, setCarreras] = useState([]);

  const toolbarOptions = ['Add', 'Edit', 'Delete', 'PdfExport']
  const template = (props) => <CarreaForm {...props} />
  const editSettings = {
    allowEditing: true,
    allowAdding: true,
    allowDeleting: true,
    mode: 'Dialog',
    headerTemplate: 'Registro de Carrera',
    footerTemplate: () => <></>,
    // template,
  };

  const toolbarClick = (args) => {
    if (gridRef.current && args.item.id === 'GridCarreras_pdfexport') { // 'Grid_pdfexport' -> Grid component id + _ + toolbar item name
      gridRef.current.pdfExport();
    }
  }


  const guardar = async (seleccionado) => {
    try {
      if (!seleccionado.nombre?.trim()) {
        return;
      }

      var url = seleccionado.id ? `${URL}/${seleccionado.id}` : URL;
      var action = seleccionado.id ? 'put' : 'post';

      await apiService[action](url, seleccionado);
      await cargarCarreras();
    } catch (error) {
      const { response: { data: { errors } } } = error;
      gridRef.current.dataSource = carreras;

      if (errors) {
        setErrors(errors);
      }

      console.error('Guardar', error);
    }
  }

  const borrar = async (seleccionado) => {
    try {
      await apiService.delete(`${URL}/${seleccionado.id}`);
      await cargarCarreras();
    } catch (error) {
      console.error('Borrar', error);
      gridRef.current.dataSource = carreras;
      toast.error('No se pudo borrar la carrera');
    }
  }

  const cargarCarreras = useCallback(async () => {
    try {
      const data = await apiService.get(URL);
      setCarreras(data);
    } catch (error) {
      console.error('Cargar Carreras', error);
      toast.error('Hubo un problema al cargar las carreras.')
    }
  }, []);

  const dataSourceChanged = async (state) => {
    if (state.action === 'add' || state.action === 'edit') {
      await guardar(state.data);
    } else if (state.requestType === 'delete') {
      await borrar(state.data[0]);
    }
  }

  useEffect(() => {
    cargarCarreras();
  }, [cargarCarreras]);

  return (
    <main className="w-full h-full flex-grow p-6 relative">
      <Breadcrumbs items={['Inicio', 'Carreras']} />

      <div className="w-full">
        <div className="card w-full bg-base-100 shadow-xl my-5">
          <div className="card-body">
            <GridComponent id="GridCarreras"
                           dataSource={carreras}
                           toolbar={toolbarOptions}
                           allowPaging={true}
                           editSettings={editSettings}
                           actionComplete={dataSourceChanged}
                           ref={gridRef}
                           enableImmutableMode={true}
                           allowPdfExport={true}
                           toolbarClick={toolbarClick}>
              <ColumnsDirective>
                <ColumnDirective field='id' visible={false} isPrimaryKey={true} width={100} />
                <ColumnDirective field='nombre' headerText='Nombre' width='100' />
              </ColumnsDirective>
              <Inject services={[Page, Toolbar, Edit, PdfExport]}/>
            </GridComponent>
          </div>
        </div>
      </div>

      <Errores errors={errors} cleanErrors={() => setErrors([])}/>
    </main>
  )
}