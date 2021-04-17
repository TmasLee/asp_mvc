import React, { Component, useState, useEffect } from 'react';
import { ToggleButton, ToggleButtonGroup } from 'react-bootstrap';
import { BarChart } from 'recharts';

import { ChartWithAxes, ChartWithZoomBrush, ChartWithZoom } from './Charts';
import { StackedBarChart } from './BarCharts';
import { CustomLineChart } from './LineCharts';
import { charts } from '../../../utilities/chart-types';

let BarChartWithAxes = ChartWithAxes(BarChart);
let StackedBarChartWithAxes = ChartWithAxes(StackedBarChart);
let StackedBarChartWithZoom = ChartWithZoomBrush(StackedBarChartWithAxes);
let LineChartWithAxes = ChartWithAxes(CustomLineChart);
let LineChartWithZoom = ChartWithZoom(LineChartWithAxes);

export class ChartContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            series: Object.keys(this.props.data.yAxis.seriesKeys),
            chartType: this.props.chartTypes[0]
        }
    }

    setSeriesToRender = (series) => this.setState({series: series});
    setChartType = (type) => this.setState({chartType: type});

    render() {
        let { data, chartTypes, title, tooltip, getSidePanelData = null } = this.props;
        let { series, chartType } = this.state;
        let seriesKeys = data.yAxis.seriesKeys;
        let chart = null;

        switch (chartType) {
            case charts.BAR:
                chart = <BarChartWithAxes />;
                break;
            case charts.STACKED_BAR_WITH_ZOOM:
                chart = <StackedBarChartWithZoom
                            data={data.data}
                            series={series}
                            seriesKeys={seriesKeys}
                            dataKey={data.xAxis.key}
                            labels={[data.xAxis.label, data.yAxis.label]}
                            getSidePanelData={getSidePanelData}
                            tooltip={tooltip}
                        />;
                break;
            case charts.LINE_WITH_ZOOM:
                chart = <LineChartWithZoom
                            data={data.data}
                            series={series}
                            seriesKeys={seriesKeys}
                            dataKey={data.xAxis.key}
                            labels={[data.xAxis.label, data.yAxis.label]}
                            getSidePanelData={getSidePanelData}
                            tooltip={tooltip}
                        />;
                break;
            case charts.PIE:
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

    if (seriesKeys.length === 1) {
        return null;
    }

    return (
        <ToggleButtonGroup
            className='btn-toggle-grp'
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

    if (chartTypes.length === 1) {
        return null;
    }

    return (
        <ToggleButtonGroup
            className='btn-toggle-grp'
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
                            (type === charts.BAR || type === charts.STACKED_BAR_WITH_ZOOM) ? <i className="fa fa-bar-chart" aria-hidden="true"></i> :
                            (type === charts.LINE_WITH_ZOOM) ? <i className="fa fa-line-chart" aria-hidden="true"></i> : null
                        }
                    </ToggleButton>
                ))
            }
        </ToggleButtonGroup>
    )
}