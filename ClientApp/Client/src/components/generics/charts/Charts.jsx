import React, { Component, Fragment } from 'react';
import { XAxis, YAxis, Tooltip, Legend, ResponsiveContainer, ReferenceArea, Label, Brush } from 'recharts';

import { removeUnderscore } from '../../../utilities/utils';
import { formatXAxis } from './utils';

export function ChartWithAxes(ChartComponent) {
    return function(props) {
        let style = {
            userSelect: 'none',
            width: 1000,
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
                >
                    {props.children}
                    <XAxis dataKey='date' tick={{fontSize: 12}} tickFormatter={formatXAxis} height={60}>
                        <Label value='Launch Date' position='insideBottom' offset={20} style={{ textAnchor: "middle" }}/>
                    </XAxis>
                    <YAxis tick={{fontSize: 12}} label={{value: 'Count', offset: 7, angle: -90, position: 'insideLeft'}}/>
                    <Legend verticalAlign="top"/>
                    <Tooltip content={<ReuseChartTooltip/>}/>
                </ChartComponent>
            </ResponsiveContainer>
        )
    }
}

export function ChartWithZoomBrush(ChartComponent) {
    return function(props) {
        return (
            <ChartComponent {...props}>
                {props.children}
                <Brush
                    dataKey="date"
                    height={30}
                    stroke="#8884d8"
                    tickFormatter={formatXAxis}
                />
            </ChartComponent>
        )
    }
}

/**
 * Only works for Line atm, can't get zoom to work with Recharts' BarCharts
 * Need to redefine X and Y axes here to include domain - should be completely separate chart component - ChartWithAxesAndZoom?
 */
export function ChartWithZoom(ChartComponent) {
    return class extends Component {
        state = {
            left: 'dataMin',
            right: 'dataMax',
            refAreaLeft: '',
            refAreaRight: '',
            top: 'dataMax+1',
            bottom: 'dataMin-1',
            animation: true,
        }

        baseState = this.state;

        getAxisYDomain = (from, to, ref) => {
            let { data } = this.props;
            let fromIndex = data.map(e => e.date).indexOf(from);
            let toIndex = data.map(e => e.date).indexOf(to);

            const refData = data.slice(fromIndex - 1, toIndex);
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
                            dataKey='date'
                            type='number'
                            domain={[left, right]}
                            tick={{fontSize: 12}}
                            height={10}
                            tickFormatter={formatXAxis}
                        >
                            <Label value='Date' position='bottom' style={{ textAnchor: "middle" }}/>
                        </XAxis>
                        <YAxis tick={{fontSize: 12}} domain={[bottom, top]} label={{value: 'Count', offset: 7, angle: -90, position: 'insideLeft'}}/>
                        {refAreaLeft && refAreaRight ? (
                        <ReferenceArea x1={refAreaLeft} x2={refAreaRight} strokeOpacity={0.3} />
                        ) : null}
                    </ChartComponent>
                </Fragment>
            )
        }
    }
}

export default function ReuseChartTooltip({payload, label, active}) {
    if (active) {
        return (
            <div style={{backgroundColor: 'white', padding: '5px 5px', outline: '1px solid black'}}>
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
