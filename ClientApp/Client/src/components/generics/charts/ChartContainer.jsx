import React, { Component, useState, useEffect } from 'react';
import { ToggleButton, ToggleButtonGroup, ButtonGroup, Button } from 'react-bootstrap';
import { BarChart } from 'recharts';

import { ChartWithAxes, ChartWithZoomBrush, ChartWithZoom } from './Charts';
import { StackedBarChart } from './BarCharts';
import { CustomLineChart } from './LineCharts';

let BarChartWithAxes = ChartWithAxes(BarChart);
let StackedBarChartWithAxes = ChartWithAxes(StackedBarChart);
let StackedBarChartWithZoom = ChartWithZoomBrush(StackedBarChartWithAxes);
let LineChartWithAxes = ChartWithAxes(CustomLineChart);
let LineChartWithZoom = ChartWithZoom(LineChartWithAxes);

// Chart OnClick data point - pass from parent SidePane component?
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
        let { data, seriesKeys, chartTypes, title } = this.props;
        let { series, chartType } = this.state;

        let chart = null;

        switch (chartType) {
            case 'bar':
                // chart = <BarChartWithAxes />;
                break;
            case 'stacked-bar':
                chart = <StackedBarChartWithZoom data={data} series={series} seriesKeys={seriesKeys}/>;
                break;
            case 'line':
                chart = <LineChartWithZoom data={data} series={series} seriesKeys={seriesKeys}/>;
                // chart = <LineChartWithAxes data={data} series={series} seriesKeys={seriesKeys}/>;
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
        <ToggleButtonGroup type='checkbox' value={series} onChange={handleSeriesToggle}>
            {
                seriesKeys.map((key, i) => (
                    <ToggleButton className='Btn-Gray-BG' key={i} value={key}>
                        { key.charAt(0).toUpperCase() + key.slice(1) }
                    </ToggleButton>
                ))
            }
        </ToggleButtonGroup>
    )
}

function ChartTypeToggle({ chartTypes, setChartType }) {
    return (
        <ButtonGroup>
            {
                chartTypes.map((type, i) => (
                    <Button key={i} value={type} onClick={() => setChartType(type)}>
                        {
                            (type === 'bar' || type === 'stacked-bar') ? <i className="fa fa-bar-chart" aria-hidden="true"></i> :
                            (type === 'line') ? <i className="fa fa-line-chart" aria-hidden="true"></i> : null
                        }
                    </Button>
                ))
            }
        </ButtonGroup>
    )
}