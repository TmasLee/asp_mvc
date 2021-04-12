import React, { Component, useState, useEffect } from 'react';
import { ToggleButton, ToggleButtonGroup } from 'react-bootstrap';
import { BarChart } from 'recharts';

import { ChartWithAxes, ChartWithZoomBrush, ChartWithZoom } from './Charts';
import { StackedBarChart } from './BarCharts';
import { CustomLineChart } from './LineCharts';

let BarChartWithAxes = ChartWithAxes(BarChart);
let StackedBarChartWithAxes = ChartWithAxes(StackedBarChart);
let StackedBarChartWithZoom = ChartWithZoomBrush(StackedBarChartWithAxes);
let LineChartWithAxes = ChartWithAxes(CustomLineChart);
let LineChartWithZoom = ChartWithZoom(LineChartWithAxes);

// Update so each series data point doesn't repeat data
export class ChartContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            series: [],
            chartType: this.props.chartTypes[0]
        }
    }

    setSeriesToRender = (series) => this.setState({series: series});
    setChartType = (type) => this.setState({chartType: type});

    render() {
        let { data, chartTypes, title, getDataPoint } = this.props;
        let { series, chartType } = this.state;
        let seriesKeys = data.yAxis.seriesKeys;
        let chart = null;

        switch (chartType) {
            case 'bar-no-zoom':
                chart = <BarChartWithAxes />;
                break;
            case 'stacked-bar':
                chart = <StackedBarChartWithZoom
                            data={data.data}
                            series={series}
                            seriesKeys={seriesKeys}
                            dataKey={data.xAxis.key}
                            labels={[data.xAxis.label, data.yAxis.label]}
                            getDataPoint={getDataPoint}
                        />;
                break;
            case 'line':
                chart = <LineChartWithZoom
                            data={data.data}
                            series={series}
                            seriesKeys={seriesKeys}
                            dataKey={data.xAxis.key}
                            labels={[data.xAxis.label, data.yAxis.label]}
                            getDataPoint={getDataPoint}
                        />;
                break;
            case 'pie':
                // chart = <CustomPieChart />;
                break;
            default:
                break;
        }

        return (
            <div>
                <h3>{ title }</h3>
                <SeriesToggle
                    seriesKeys={Object.keys(seriesKeys)}
                    setSeriesToRender={this.setSeriesToRender}
                />
                <ChartTypeToggle
                    currentType={chartType}
                    chartTypes={chartTypes}
                    setChartType={this.setChartType}
                />
                { chart }
            </div>
        )
    }
}

function SeriesToggle({ seriesKeys, setSeriesToRender }) {
    const [series, setSeries] = useState(seriesKeys);
    const handleSeriesToggle = (val) => setSeries(val);

    useEffect(() => {
        setSeriesToRender(series);
    }, [series])

    return (
        <ToggleButtonGroup
            type='checkbox'
            value={series}
            onChange={handleSeriesToggle}
        >
            {
                seriesKeys.map((key, i) => (
                    <ToggleButton className='btn-toggle' key={i} value={key}>
                        { key.charAt(0).toUpperCase() + key.slice(1) }
                    </ToggleButton>
                ))
            }
        </ToggleButtonGroup>
    )
}

function ChartTypeToggle({ currentType, chartTypes, setChartType }) {
    const [type, setType] = useState(currentType);
    const handleChartTypeToggle = (val) => setType(val);

    useEffect(() => {
        setChartType(type);
    }, type)

    return (
        <ToggleButtonGroup
            style={{margin: '0 5px 0 5px'}}
            type='radio'
            name='options'
            value={type}
            defaultValue={currentType}
            onChange={handleChartTypeToggle}
        >
            {
                chartTypes.map((type, i) => (
                    <ToggleButton className='btn-toggle' key={i} value={type}>
                        {
                            (type === 'bar' || type === 'stacked-bar') ? <i className="fa fa-bar-chart" aria-hidden="true"></i> :
                            (type === 'line') ? <i className="fa fa-line-chart" aria-hidden="true"></i> : null
                        }
                    </ToggleButton>
                ))
            }
        </ToggleButtonGroup>
    )
}