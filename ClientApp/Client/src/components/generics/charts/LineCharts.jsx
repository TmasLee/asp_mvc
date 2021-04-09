import React, { useState, useEffect } from 'react';
import { LineChart, Line } from 'recharts';
import { seriesColors } from './utils';

// Each key is a separate line series
export function CustomLineChart(props) {
    const { series, seriesKeys, style } = props;
    let seriesLines = [];

    series.forEach((key, i) => {
        for (let j = 0; j < seriesKeys[key].length; j++){
            seriesLines.push(
                <Line
                    key={seriesKeys[key][j]}
                    dataKey={seriesKeys[key][j]}
                    type='monotone'
                    stroke={seriesColors[i][j]}
                    dot={false}
                />
            )
        }
    })

    return (
        <LineChart {...props} {...style}>
            {
                seriesLines.map(line => line)
            }
            {props.children}
        </LineChart>
    )
}
