import { ChartComponent, SeriesCollectionDirective, SeriesDirective, Inject, BubbleSeries, Tooltip, DataLabel } from '@syncfusion/ej2-react-charts';
import { Browser } from '@syncfusion/ej2-base';
import { bubbleFabricColors, bubbleMaterialDarkColors, bubbleMaterialColors, bubbleBootstrap5DarkColors, bubbleBootstrapColors, bubbleHighContrastColors, bubbleFluentDarkColors, bubbleFluentColors, bubbleTailwindDarkColors, bubbleTailwindColors, pointFabricColors, pointMaterialDarkColors, pointMaterialColors, pointBootstrap5DarkColors, pointBootstrapColors, pointHighContrastColors, pointFluentDarkColors, pointFluentColors, pointTailwindDarkColors, pointTailwindColors, bubbleBootstrap5Colors, pointBootstrap5Colors, bubbleMaterial3Colors, pointMaterial3Colors, bubbleMaterial3DarkColors, pointMaterial3DarkColors } from './bubble-color';

export let pointRender = (args) => {
    let selectedTheme = location.hash.split('/')[1];
    selectedTheme = selectedTheme ? selectedTheme : 'material';
    if (selectedTheme && selectedTheme.indexOf('fabric') > -1) {
        args.fill = bubbleFabricColors[args.point.index % 10];
        args.border.color = pointFabricColors[args.point.index % 10];
    }
    else if (selectedTheme === 'material-dark') {
        args.fill = bubbleMaterialDarkColors[args.point.index % 10];
        args.border.color = pointMaterialDarkColors[args.point.index % 10];
    }
    else if (selectedTheme === 'material') {
        args.fill = bubbleMaterialColors[args.point.index % 10];
        args.border.color = pointMaterialColors[args.point.index % 10];
    }
    else if (selectedTheme === 'bootstrap5-dark') {
        args.fill = bubbleBootstrap5DarkColors[args.point.index % 10];
        args.border.color = pointBootstrap5DarkColors[args.point.index % 10];
    }
    else if (selectedTheme === 'bootstrap5') {
        args.fill = bubbleBootstrap5Colors[args.point.index % 10];
        args.border.color = pointBootstrap5Colors[args.point.index % 10];
    }
    else if (selectedTheme === 'bootstrap') {
        args.fill = bubbleBootstrapColors[args.point.index % 10];
        args.border.color = pointBootstrapColors[args.point.index % 10];
    }
    else if (selectedTheme === 'bootstrap4') {
        args.fill = bubbleBootstrapColors[args.point.index % 10];
        args.border.color = pointBootstrapColors[args.point.index % 10];
    }
    else if (selectedTheme === 'bootstrap-dark') {
        args.fill = bubbleBootstrapColors[args.point.index % 10];
        args.border.color = pointBootstrapColors[args.point.index % 10];
    }
    else if (selectedTheme === 'highcontrast') {
        args.fill = bubbleHighContrastColors[args.point.index % 10];
        args.border.color = pointHighContrastColors[args.point.index % 10];
    }
    else if (selectedTheme === 'fluent-dark') {
        args.fill = bubbleFluentDarkColors[args.point.index % 10];
        args.border.color = pointFluentDarkColors[args.point.index % 10];
    }
    else if (selectedTheme === 'fluent') {
        args.fill = bubbleFluentColors[args.point.index % 10];
        args.border.color = pointFluentColors[args.point.index % 10];
    }
    else if (selectedTheme === 'tailwind-dark') {
        args.fill = bubbleTailwindDarkColors[args.point.index % 10];
        args.border.color = pointTailwindDarkColors[args.point.index % 10];
    }
    else if (selectedTheme === 'tailwind') {
        args.fill = bubbleTailwindColors[args.point.index % 10];
        args.border.color = pointTailwindColors[args.point.index % 10];
    }
    else if (selectedTheme === 'material3') {
        args.fill = bubbleMaterial3Colors[args.point.index % 10];
        args.border.color = pointMaterial3Colors[args.point.index % 10];
    }
    else if (selectedTheme === 'material3-dark') {
        args.fill = bubbleMaterial3DarkColors[args.point.index % 10];
        args.border.color = pointMaterial3DarkColors[args.point.index % 10];
    }
};
export let data = [
    { x: 92.2, y: 7.8, size: 1.347, toolTipMappingName: 'Sistemas', text: 'Sistemas' },
    { x: 74, y: 6.5, size: 1.241, toolTipMappingName: 'Electronica', text: 'Electronica' },
    { x: 90.4, y: 6.0, size: 0.238, toolTipMappingName: 'Civil', text: Browser.isDevice ? 'ID' : 'Civil' },
    { x: 99.4, y: 2.2, size: 0.312, toolTipMappingName: 'Petrolera', text: 'Petrolera' },
    { x: 88.6, y: 1.3, size: 0.197, toolTipMappingName: 'Agroindustrial', text: 'Agroindustrial' },
];
const SAMPLE_CSS = `
    .control-fluid {
        padding: 0px !important;
    }
    ellipse[id*=_Trackball_0] {

        strokeWidth: 1 !important;
    }`;
/**
 * Bubble sample
 */
const Bubble = () => {
    const onChartLoad = () => {
        let chart = document.getElementById('charts-2');
        chart.setAttribute('title', '');
    };
    const load = (args) => {
        let selectedTheme = location.hash.split('/')[1];
        selectedTheme = selectedTheme ? selectedTheme : 'Material';
        args.chart.theme = (selectedTheme.charAt(0).toUpperCase() + selectedTheme.slice(1)).replace(/-dark/i, "Dark").replace(/contrast/i, 'Contrast');
    };
    return (<div className='control-pane'>
            <style>{SAMPLE_CSS}</style>
            <div className='control-section'>
                <ChartComponent id='charts-2' style={{ textAlign: "center" }} primaryXAxis={{ minimum: 65, maximum: 102, interval: 5, crossesAt: 5 }} load={load.bind(this)} primaryYAxis={{ minimum: 0, maximum: 10, crossesAt: 85, interval: 2.5 }} width={Browser.isDevice ? '100%' : '75%'} title='Carreras' pointRender={pointRender} legendSettings={{ visible: false }} loaded={onChartLoad.bind(this)} tooltip={{ enableMarker: false, enable: true, header: "<b>${point.tooltip}</b>", format: "Literacy Rate : <b>${point.x}%</b> <br/>GDP Annual Growth Rate : <b>${point.y}</b><br/>Population : <b>${point.size} Billion</b>" }}>
                    <Inject services={[BubbleSeries, Tooltip, DataLabel]}/>
                    <SeriesCollectionDirective>
                        <SeriesDirective dataSource={data} type='Bubble' minRadius={3} maxRadius={8} tooltipMappingName='toolTipMappingName' border={{ width: 2 }} xName='x' yName='y' size='size' marker={{ dataLabel: { visible: true, name: 'text', position: 'Middle', font: { fontWeight: '500', color: '#ffffff' } } }}/>
                    </SeriesCollectionDirective>
                </ChartComponent>
            </div>
        </div>);
};
export default Bubble;