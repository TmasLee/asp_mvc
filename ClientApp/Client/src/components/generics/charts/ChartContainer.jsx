import React, { Component, useState, useEffect } from 'react';
import { ToggleButton, ToggleButtonGroup } from 'react-bootstrap';
import { BarChart, LineChart } from 'recharts';

import { ChartWithAxes, ChartWithZoomBrush, ChartWithZoom } from './Charts';
import { StackedBarChart } from './BarCharts';

let BarChartWithAxes = ChartWithAxes(BarChart);
let StackedBarChartWithAxes = ChartWithAxes(StackedBarChart);
let StackedBarChartWithZoom = ChartWithZoomBrush(StackedBarChartWithAxes);
let LineChartWithZoom = ChartWithZoom(LineChart);

// Chart OnClick data point - pass from parent SidePane component?
export class ChartContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            series: [],
            chartType: 'stacked-bar'
        }
    }

    setSeriesToRender = (series) => this.setState({series: series});
    setChartType = (type) => this.setState({chartType: type});

    render() {
        let {
            data, seriesKeys, title = 'An Interesting Graph', chartTypes = []
        } = this.props;

        const { series, chartType } = this.state;

        let chart = null;

        switch (chartType) {
            case 'bar':
                // chart = <BarChartWithAxes />;
                break;
            case 'stacked-bar':
                chart = <StackedBarChartWithZoom data={data} series={series} seriesKeys={seriesKeys}/>;
                break;
            case 'line':
                // chart = <LineChartWithZoom />;
                break;
            case 'pie':
                // chart = <CustomPieChart />;
                break;
            default:
                // Update to loading gif
                break;
        }

        return (
            <div>
                <h3>{ title }</h3>
                <SeriesToggle
                    seriesKeys={Object.keys(seriesKeys)}
                    setSeriesToRender={this.setSeriesToRender}
                />
                {/* <ChartTypeToggle chartTypes={chartTypes} setChartType={this.setChartType}/> */}
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
                    <ToggleButton key={i} value={key}>
                        { key.charAt(0).toUpperCase() + key.slice(1) }
                    </ToggleButton>
                ))
            }
        </ToggleButtonGroup>
    )
}

function ChartTypeToggle({ chartTypes }) {
    const [type, setType] = useState();
    const handleTypeToggle = (val) => setType(val);
    return (
        <ToggleButtonGroup type='checkbox' value={type} onChange={handleTypeToggle}>
            {
                chartTypes.map((type, i) => (
                    <ToggleButton key={i} value={type}>
                        { type }
                    </ToggleButton>
                ))
            }
        </ToggleButtonGroup>
    )
}