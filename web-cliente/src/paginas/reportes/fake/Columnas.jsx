import { useState, useEffect } from 'react';
import { Chart3DComponent, Chart3DSeriesCollectionDirective, Chart3DSeriesDirective, Inject, Legend3D, Category3D, Tooltip3D, ColumnSeries3D, Highlight3D } from '@syncfusion/ej2-react-charts';
import { Browser } from '@syncfusion/ej2-base';
import apiService from '../../../servicios/api-service';

import { pointBootstrap5Colors, pointBootstrap5DarkColors, pointBootstrapColors, pointFabricColors, pointFluentColors, pointFluentDarkColors, pointHighContrastColors, pointMaterial3Colors, pointMaterial3DarkColors, pointMaterialColors, pointMaterialDarkColors, pointTailwindColors, pointTailwindDarkColors } from './theme-color';
export let pointRender = (args) => {
    let selectedTheme = location.hash.split('/')[1];
    selectedTheme = selectedTheme ? selectedTheme : 'Material';
    if (selectedTheme && selectedTheme.indexOf('fabric') > -1) {
        args.fill = pointFabricColors[args.point.index % 10];
        ;
    }
    else if (selectedTheme === 'material-dark') {
        args.fill = pointMaterialDarkColors[args.point.index % 10];
        ;
    }
    else if (selectedTheme === 'material') {
        args.fill = pointMaterialColors[args.point.index % 10];
    }
    else if (selectedTheme === 'bootstrap5-dark') {
        args.fill = pointBootstrap5DarkColors[args.point.index % 10];
    }
    else if (selectedTheme === 'bootstrap5') {
        args.fill = pointBootstrap5Colors[args.point.index % 10];
    }
    else if (selectedTheme === 'bootstrap') {
        args.fill = pointBootstrapColors[args.point.index % 10];
    }
    else if (selectedTheme === 'bootstrap4') {
        args.fill = pointBootstrapColors[args.point.index % 10];
    }
    else if (selectedTheme === 'bootstrap-dark') {
        args.fill = pointBootstrapColors[args.point.index % 10];
    }
    else if (selectedTheme === 'highcontrast') {
        args.fill = pointHighContrastColors[args.point.index % 10];
    }
    else if (selectedTheme === 'fluent-dark') {
        args.fill = pointFluentDarkColors[args.point.index % 10];
    }
    else if (selectedTheme === 'fluent') {
        args.fill = pointFluentColors[args.point.index % 10];
    }
    else if (selectedTheme === 'tailwind-dark') {
        args.fill = pointTailwindDarkColors[args.point.index % 10];
    }
    else if (selectedTheme === 'tailwind') {
        args.fill = pointTailwindColors[args.point.index % 10];
    }
    else if (selectedTheme === 'material3-dark') {
        args.fill = pointMaterial3DarkColors[args.point.index % 10];
    }
    else if (selectedTheme === 'material3') {
        args.fill = pointMaterial3Colors[args.point.index % 10];
    }
};
// export let data1 = [{ x: 'Enero', y: 137429 }, { x: 'Febrero', y: 80308 }, { x: 'Marzo', y: 76418 }, { x: 'Abril', y: 52849 }, { x: 'Mayo', y: 47234 }, { x: 'Junio', y: 31041 }, { x: 'Julio', y: 22449 }, { x: 'Agosto', y: 18733 }];
const SAMPLE_CSS = `
    .control-fluid {
        padding: 0px !important;
    }`;
const Column = () => {
    const [data1, setData1] = useState([]);

    const loadData = async () => {
        try {
            const data = await apiService.get('/reportes/registros-mes');
            setData1(data.map((item) => ({ x: item.mes, y: item.cantidad })));
        } catch (error) {
            console.error('Cargar Registros por Mes', error);
        }
    
    }

    useEffect(() => {
        loadData();
    }, []);
    
    const onChartLoad = () => {
        let chart = document.getElementById('charts');
        chart.setAttribute('title', '');
    };
    const labelRender = (args) => {
        if (args.axis.name === 'primaryYAxis') {
            let value = Number(args.text);
            args.text = (typeof value === 'number' && !isNaN(value)) ? String(value) : args.text;
        }
    };
    const load = (args) => {
        let selectedTheme = location.hash.split('/')[1];
        selectedTheme = selectedTheme ? selectedTheme : 'Material';
        args.chart.theme = (selectedTheme.charAt(0).toUpperCase() + selectedTheme.slice(1)).replace(/-dark/i, "Dark").replace(/contrast/i, 'Contrast');
    };
    return (<div className='control-pane'>
            <style>{SAMPLE_CSS}</style>
            <div className='control-section'>
                <Chart3DComponent id='charts' style={{ textAlign: "center" }} axisLabelRender={labelRender.bind(this)} legendSettings={{ enableHighlight: true, visible: false }} primaryXAxis={{
            valueType: 'Category',
            labelRotation: -45,
            labelPlacement: 'BetweenTicks'
        }} wallColor='transparent' height="400" pointRender={pointRender.bind(this)} primaryYAxis={{
            maximum: 100, interval: 10
        }} load={load.bind(this)} enableRotation={true} rotation={7} tilt={10} depth={100} tooltip={{ enable: true, header: "${point.x}", format: 'Asistencias : <b>${point.y}' }} width={Browser.isDevice ? '100%' : '75%'}
          title='Registros por Mes' loaded={onChartLoad.bind(this)}>
                    <Inject services={[ColumnSeries3D, Legend3D, Tooltip3D, Category3D, Highlight3D]}/>
                    <Chart3DSeriesCollectionDirective>
                        <Chart3DSeriesDirective dataSource={data1} xName='x' columnSpacing={0.1} yName='y' type='Column'>
                        </Chart3DSeriesDirective>
                    </Chart3DSeriesCollectionDirective>
                </Chart3DComponent>
            </div>
        </div>);
};
export default Column;