/**
 * Sample for Default Range Navigator
 */
import { RangeNavigatorComponent, AreaSeries, DateTime, Inject, RangeTooltip, RangenavigatorSeriesCollectionDirective, RangenavigatorSeriesDirective } from '@syncfusion/ej2-react-charts';
import { Browser } from '@syncfusion/ej2-base';
import { bitCoinData } from './default-data';

export let data = bitCoinData;
export let themes = ['bootstrap5', 'bootstrap5dark', 'tailwind', 'tailwinddark', 'material', 'materialdark', 'bootstrap4', 'bootstrap', 'bootstrapdark', 'fabric', 'fabricdark', 'highcontrast', 'fluent', 'fluentdark', 'material3', 'material3dark'];
export let borderColor = ['#6355C7', '#8F80F4', '#5A61F6', '#8B5CF6', '#00bdae', '#9ECB08', '#a16ee5', '#a16ee5', '#a16ee5', '#4472c4', '#4472c4', '#79ECE4', '#1AC9E6', '#1AC9E6', '#6355C7', '#4EAAFF'];
export let regionColor = ['rgba(99, 85, 199, 0.3)', 'rgba(143, 128, 244, 0.3)', 'rgba(90, 97, 246, 0.3)', 'rgba(139, 92, 246, 0.3)', 'rgba(0, 189, 174, 0.3)',
    'rgba(158, 203, 8, 0.3)', 'rgba(161, 110, 229, 0.3)', 'rgba(161, 110, 229, 0.3)', 'rgba(161, 110, 229, 0.3)', 'rgba(68, 114, 196, 0.3)',
    'rgba(68, 114, 196, 0.3)', 'rgba(121, 236, 228, 0.3)', 'rgba(26, 201, 230, 0.3)', 'rgba(26, 201, 230, 0.3)', 'rgba(99, 85, 199, 0.3)', 'rgba(78, 170, 255, 0.3)'];
const SAMPLE_CSS = `
     .control-fluid {
         padding: 0px !important;
     }
     #title{
         font-size: 15px;
         font-style: normal;
         font-family: "Segoe UI";
         font-weight: 500;
         text-anchor: middle;
         transform: none;
         opacity: 1;
     }
     #rangenavigator {
         transform: translate(0, 25%);
     }
 
     #material-gradient-chart stop {
         stop-color: #00bdae;
     }
 
     #fabric-gradient-chart stop {
         stop-color: #4472c4;
     }
 
     #bootstrap-gradient-chart stop {
         stop-color: #a16ee5;
     }
 
     #bootstrap4-gradient-chart stop {
         stop-color: #a16ee5;
     }
 
     #highcontrast-gradient-chart stop {
         stop-color: #79ECE4;
     }
 
     #tailwind-gradient-chart stop {
         stop-color: #5A61F6;
     }
 
     #bootstrap5-gradient-chart stop {
         stop-color: #6355C7;
     }
 
     #material-dark-gradient-chart stop {
         stop-color: #9ECB08;
     }
 
     #fabric-dark-gradient-chart stop {
         stop-color: #4472c4;
     }
 
     #bootstrap-dark-gradient-chart stop {
         stop-color: #a16ee5;
     }
 
     #tailwind-dark-gradient-chart stop {
         stop-color: #8B5CF6;
     }
 
     #bootstrap5-dark-gradient-chart stop {
         stop-color: #8F80F4;
     }
 
     #fluent-gradient-chart stop {
         stop-color: #1AC9E6;
     }
 
     #fluent-dark-gradient-chart stop {
         stop-color: #1AC9E6;
     }

     #material3-gradient-chart stop {
         stop-color: #6355C7;
     }

     #material3-dark-gradient-chart stop {
         stop-color: #4EAAFF;
     }
 
     .chart-gradient stop[offset="0"] {
         stop-opacity: 0.9;
     }
 
     .chart-gradient stop[offset="1"] {
         stop-opacity: 0.3;
     }
     `;
function Default() {
    return (<div className='control-pane'>
            <style>
                {SAMPLE_CSS}
            </style>
            <div className='control-section'>
                <div className="row" style={{ textAlign: "center" }}>
                    <div id="title">Asistencias</div>
                </div>
                <div className="row">
                    <RangeNavigatorComponent id='rangenavigator' style={{ textAlign: "center" }} valueType='DateTime' load={load.bind(this)} tooltip={{ enable: true, displayMode: 'Always', format: 'MM/dd/yyyy' }} navigatorStyleSettings={{
            unselectedRegionColor: 'transparent'
        }} labelFormat='MMM-yy' width={Browser.isDevice ? '100%' : '80%'} value={[new Date('2017-09-01'), new Date('2018-02-01')]}>
                        <Inject services={[AreaSeries, DateTime, RangeTooltip]}/>
                        <RangenavigatorSeriesCollectionDirective>
                            <RangenavigatorSeriesDirective dataSource={data} xName='x' yName='y' type='Area' width={2} border={{ width: 2 }}>
                            </RangenavigatorSeriesDirective>
                        </RangenavigatorSeriesCollectionDirective>
                    </RangeNavigatorComponent>
                </div>
            </div>
            <svg style={{ height: '0' }}>
                <defs>
                    <linearGradient id="material-gradient-chart" style={{ opacity: 0.75 }} className="chart-gradient" x1="0" x2="0" y1="0" y2="1">
                        <stop offset="0"></stop>
                        <stop offset="1"></stop>
                    </linearGradient>
                    <linearGradient id="fabric-gradient-chart" style={{ opacity: 0.75 }} className="chart-gradient" x1="0" x2="0" y1="0" y2="1">
                        <stop offset="0"></stop>
                        <stop offset="1"></stop>
                    </linearGradient>
                    <linearGradient id="bootstrap-gradient-chart" style={{ opacity: 0.75 }} className="chart-gradient" x1="0" x2="0" y1="0" y2="1">
                        <stop offset="0"></stop>
                        <stop offset="1"></stop>
                    </linearGradient>
                    <linearGradient id="bootstrap4-gradient-chart" style={{ opacity: 0.75 }} className="chart-gradient" x1="0" x2="0" y1="0" y2="1">
                        <stop offset="0"></stop>
                        <stop offset="1"></stop>
                    </linearGradient>
                    <linearGradient id="highcontrast-gradient-chart" style={{ opacity: 0.75 }} className="chart-gradient" x1="0" x2="0" y1="0" y2="1">
                        <stop offset="0"></stop>
                        <stop offset="1"></stop>
                    </linearGradient>
                    <linearGradient id="tailwind-gradient-chart" style={{ opacity: 0.75 }} className="chart-gradient" x1="0" x2="0" y1="0" y2="1">
                        <stop offset="0"></stop>
                        <stop offset="1"></stop>
                    </linearGradient>
                    <linearGradient id="bootstrap5-gradient-chart" style={{ opacity: 0.75 }} className="chart-gradient" x1="0" x2="0" y1="0" y2="1">
                        <stop offset="0"></stop>
                        <stop offset="1"></stop>
                    </linearGradient>
                    <linearGradient id="material-dark-gradient-chart" style={{ opacity: 0.75 }} className="chart-gradient" x1="0" x2="0" y1="0" y2="1">
                        <stop offset="0"></stop>
                        <stop offset="1"></stop>
                    </linearGradient>
                    <linearGradient id="fabric-dark-gradient-chart" style={{ opacity: 0.75 }} className="chart-gradient" x1="0" x2="0" y1="0" y2="1">
                        <stop offset="0"></stop>
                        <stop offset="1"></stop>
                    </linearGradient>
                    <linearGradient id="bootstrap-dark-gradient-chart" style={{ opacity: 0.75 }} className="chart-gradient" x1="0" x2="0" y1="0" y2="1">
                        <stop offset="0"></stop>
                        <stop offset="1"></stop>
                    </linearGradient>
                    <linearGradient id="tailwind-dark-gradient-chart" style={{ opacity: 0.75 }} className="chart-gradient" x1="0" x2="0" y1="0" y2="1">
                        <stop offset="0"></stop>
                        <stop offset="1"></stop>
                    </linearGradient>
                    <linearGradient id="bootstrap5-dark-gradient-chart" style={{ opacity: 0.75 }} className="chart-gradient" x1="0" x2="0" y1="0" y2="1">
                        <stop offset="0"></stop>
                        <stop offset="1"></stop>
                    </linearGradient>
                    <linearGradient id="fluent-gradient-chart" style={{ opacity: 0.75 }} className="chart-gradient" x1="0" x2="0" y1="0" y2="1">
                        <stop offset="0"></stop>
                        <stop offset="1"></stop>
                    </linearGradient>
                    <linearGradient id="fluent-dark-gradient-chart" style={{ opacity: 0.75 }} className="chart-gradient" x1="0" x2="0" y1="0" y2="1">
                        <stop offset="0"></stop>
                        <stop offset="1"></stop>
                    </linearGradient>
                    <linearGradient id="material3-gradient-chart" style={{ opacity: 0.75 }} className="chart-gradient" x1="0" x2="0" y1="0" y2="1">
                        <stop offset="0"></stop>
                        <stop offset="1"></stop>
                    </linearGradient>
                    <linearGradient id="material3-dark-gradient-chart" style={{ opacity: 0.75 }} className="chart-gradient" x1="0" x2="0" y1="0" y2="1">
                        <stop offset="0"></stop>
                        <stop offset="1"></stop>
                    </linearGradient>
                </defs>
            </svg>
        </div>);
    function load(args) {
        let selectedTheme = location.hash.split('/')[1];
        selectedTheme = selectedTheme ? selectedTheme : 'Material';
        args.rangeNavigator.theme = (selectedTheme.charAt(0).toUpperCase() + selectedTheme.slice(1)).
            replace(/-dark/i, "Dark").replace(/contrast/i, 'Contrast');
        let rangeTheme = args.rangeNavigator.theme;
        args.rangeNavigator.series[0].fill = 'url(#' + selectedTheme.toLowerCase() + '-gradient-chart)';
        args.rangeNavigator.series[0].border.color = borderColor[themes.indexOf(rangeTheme.toLowerCase())];
        args.rangeNavigator.navigatorStyleSettings.selectedRegionColor = regionColor[themes.indexOf(rangeTheme.toLowerCase())];
    }
}
export default Default;