import React, { Component, Fragment } from 'react';
import { XAxis, YAxis, Tooltip, Legend, ResponsiveContainer, ReferenceArea, Brush } from 'recharts';

import { formatTimestamp } from '../../../utilities/utils';

export function ChartWithAxes(ChartComponent) {
    return function(props) {
        let style = {
            userSelect: 'none',
            width: 850,
            height: 400,
            margin: {
                top: 25,
                bottom: 25
            }
        }
        return (
            <ResponsiveContainer width={1000} height='80%'>
                <ChartComponent
                    {...props}
                    style={style}
                    onClick={(e) => { if (e) props.getDataPoint(e.activePayload)}}
                >
                    {props.children}
                    <XAxis
                        dataKey={props.dataKey}
                        tick={{fontSize: 12}}
                        tickFormatter={formatTimestamp}
                        height={60}
                        label={{value: props.labels[0], position: 'insideBottom', offset: 20 }}
                    />
                    <YAxis
                        tick={{fontSize: 12}}
                        label={{value: props.labels[1], offset: 20, angle: -90, position: 'insideLeft'}}
                    />
                    <Legend verticalAlign="top"/>
                    { props.tooltip ? <Tooltip content={props.tooltip}/> : <Tooltip  /> }
                </ChartComponent>
            </ResponsiveContainer>
        )
    }
}

// Probably unnecessary HOC
export function ChartWithZoomBrush(ChartComponent) {
    return function(props) {
        return (
            <ChartComponent {...props}>
                {props.children}
                <Brush
                    dataKey="date"
                    height={30}
                    stroke="#8884d8"
                    tickFormatter={formatTimestamp}
                />
            </ChartComponent>
        )
    }
}

// Only works for Line atm, can't get zoom to work with BarCharts
// This zoom function only works for axes with type 'number' which doesn't seem to work fully w/ BarCharts
export function ChartWithZoom(ChartComponent) {
    return class extends Component {
        state = {
            left: 'dataMin',
            right: 'dataMax',
            refAreaLeft: '',
            refAreaRight: '',
            top: 'dataMax+5',
            bottom: 'dataMin',
            animation: true,
        }

        baseState = this.state;

        getAxisYDomain = (from, to) => {
            let { data, series, seriesKeys } = this.props;
            let fromIndex = data.map(e => e.date).indexOf(from);
            let toIndex = data.map(e => e.date).indexOf(to);

            const refData = data.slice(fromIndex - 1, toIndex + 1);

            let ref;

            // Find data series key for local dataMax in refData
            series.forEach(series => {
                let maxValue = 0;
                ref = seriesKeys[series][0];
                for (let i = 0; i < seriesKeys[series].length; i++) {
                    let value = Math.max(...refData.map(dp => dp[seriesKeys[series][i]]), 0)
                    if (value > maxValue) {
                        maxValue = value;
                        ref = seriesKeys[series][i];
                    }
                }
            })
            let [bottom, top] = [refData[0][ref], refData[0][ref]];

            refData.forEach((d) => {
              if (d[ref] > top) top = d[ref];
              if (d[ref] < bottom) bottom = d[ref];
            });

            return [(bottom | 0), (top | 0)];
        };

        zoom = () => {
            let { refAreaLeft, refAreaRight } = this.state;

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
            const [bottom, top] = this.getAxisYDomain(refAreaLeft, refAreaRight);

            this.setState(() => ({
                refAreaLeft: '',
                refAreaRight: '',
                left: refAreaLeft,
                right: refAreaRight,
                bottom: bottom,
                top: top,
            }));
        };

        resetZoom = () => {
            this.setState(this.baseState);
        };

        setDataStart = (e) => {
            if (e) {
                this.setState({ refAreaLeft: e.activeLabel })
            }
        }

        setDataRange = (e) => {
            this.state.refAreaLeft && this.setState({ refAreaRight: e.activeLabel })
        }

        render() {
            const { left, right, top, bottom, refAreaLeft, refAreaRight } = this.state;
            return (
                <Fragment>
                    <button onClick={this.resetZoom}>Reset Zoom</button>
                    <ChartComponent
                        {...this.props}
                        onMouseDown={(e) => this.setDataStart(e)}
                        onMouseMove={(e) => this.setDataRange(e)}
                        onMouseUp={() => this.zoom()}
                    >
                        {this.props.children}
                        <XAxis
                            allowDataOverflow
                            dataKey={this.props.dataKey}
                            type='number'
                            domain={[left, right]}
                            tick={{fontSize: 12}}
                            height={40}
                            tickFormatter={formatTimestamp}
                            label={{value: this.props.labels[0], position: 'insideBottom'}}
                        />
                        <YAxis
                            allowDataOverflow
                            domain={['auto', top]}
                            type='number'
                            tick={{fontSize: 12}}
                            label={{value: this.props.labels[1], offset: 20, angle: -90, position: 'insideLeft'}}
                        />
                        {refAreaLeft && refAreaRight ? (
                        <ReferenceArea x1={refAreaLeft} x2={refAreaRight} strokeOpacity={0.3} />
                        ) : null}
                    </ChartComponent>
                </Fragment>
            )
        }
    }
}
