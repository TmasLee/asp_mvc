import React, { Component } from 'react';
import { XAxis, YAxis, Tooltip, Legend, ResponsiveContainer, ReferenceArea, Label, Brush } from 'recharts';

import { removeUnderscore } from '../../../utilities/utils';
import { formatXAxis } from './utils';

export function ChartWithAxes(ChartComponent) {
    return function(props) {
        const { data, series, seriesKeys } = props;
        let style = {
            width: 1400,
            height: 400,
            margin: {
                top: 25,
                bottom: 25
            }
        }
        return (
            <ChartComponent
                data={data}
                series={series}
                seriesKeys={seriesKeys}
                style={style}
            >
                {props.children}
                <XAxis dataKey='date' tickFormatter={formatXAxis}>
                    <Label value='Date' position='bottom' style={{ textAnchor: "middle" }}/>
                </XAxis>
                <YAxis>
                    <Label value='Count' position='left' angle={-90} style={{ textAnchor: "middle" }}/>
                </YAxis>
                <Legend />
                <Tooltip content={<ReuseChartTooltip/>}/>
            </ChartComponent>
        )
    }
}

export function ChartWithZoomBrush(ChartComponent) {
    return function(props) {
        return (
            <ChartComponent {...props}>
                {props.children}
                <Brush dataKey="date" height={30} stroke="#8884d8" />
            </ChartComponent>
        )
    }
}

export function ChartWithZoom(ChartComponent) {
    return class extends Component {
        constructor(props) {
            super(props);
            this.state = {
                dataToRender: data,
                left: 'dataMin -10000',
                right: 'dataMax',
                refAreaLeft: '',
                refAreaRight: '',
                top: 'dataMax+1',
                bottom: 'dataMin-1',
                animation: true,
            }
        }

        baseState = this.state;

        getAxisYDomain = (from, to, ref) => {
            let [bottom, top] = [refData[0][ref], refData[0][ref]];
            refData.forEach((d) => {
                if (d[ref] > top) {
                    top = d[ref]
                }
                if (d[ref] < bottom) {
                    bottom = d[ref]
                }
            });

            return [(bottom | 0), (top | 0)];
        };

        zoom = () => {
            let { refAreaLeft, refAreaRight, dataToRender } = this.state;

            if (refAreaLeft === refAreaRight || refAreaRight === '') {
                this.setState(() => ({
                    refAreaLeft: '',
                    refAreaRight: '',
                }));
                return;
            }
    
            // xAxis domain
            if (refAreaLeft > refAreaRight) {
                [refAreaLeft, refAreaRight] = [refAreaRight, refAreaLeft];
            }
    
            // yAxis domain
            const [bottom, top] = this.getAxisYDomain(refAreaLeft, refAreaRight, 'core_non_reuse_count');

            this.setState(() => ({
                refAreaLeft: '',
                refAreaRight: '',
                left: refAreaLeft,
                right: refAreaRight,
                bottom,
                top
            }));
        };

        resetZoom = () => {
            this.setState(() => ({
                dataToRender: data,
                refAreaLeft: '',
                refAreaRight: '',
                left: 'dataMin',
                right: 'dataMax',
                top: 'dataMax+1',
                bottom: 'dataMin'
            }));
        };

        render() {
            const { left, right, top, bottom, refAreaLeft, refAreaRight, dataToRender } = this.state;
            return (
                <ChartComponent
                    data={dataToRender}
                    series={series}
                    seriesKeys={seriesKeys}
                    style={this.style}
                    onMouseDown={(e) => this.setState({ refAreaLeft: e.activeLabel })}
                    onMouseMove={(e) => refAreaLeft && this.setState({ refAreaRight: e.activeLabel })}
                    onMouseUp={(e) => this.zoom()}
                >
                    {this.props.children}
                    <XAxis
                        allowDataOverflow
                        dataKey='date'
                        type='number'
                        domain={[left, right]}
                        // tickFormatter={formatXAxis}
                    >
                        <Label value='Date' position='bottom' style={{ textAnchor: "middle" }}/>
                    </XAxis>
                    <YAxis
                        allowDataOverflow
                        type='number'
                        domain={[bottom, top]}
                    >
                        <Label value='Count' position='left' angle={-90} style={{ textAnchor: "middle" }}/>
                    </YAxis>
                    {refAreaLeft && refAreaRight ? (
                    <ReferenceArea x1={refAreaLeft} x2={refAreaRight} strokeOpacity={0.3} />
                    ) : null}
                    <Legend />
                    <Tooltip content={<ReuseChartTooltip/>}/>
                </ChartComponent>
            )
        }
    }
}

export default function ReuseChartTooltip({payload, label, active}) {
    if (active) {
        return (
            <div style={{backgroundColor: 'white', padding: '10px 10px', outline: '1px solid black'}}>
                <p>{`Flight #${payload[0].payload.flight_number} (${formatXAxis(label)})`}</p>
                {
                    payload.map((data, i) => (
                        <p key={i}>
                            {`${removeUnderscore(data.dataKey)}: ${data.value}`}
                        </p>
                    ))
                }
            </div>
        );
    }

      return null;
}
