import React, { useState, useEffect } from 'react';
import { BarChart, Bar } from 'recharts';

import { seriesColors } from './utils';

export function StackedBarChart(props) {
    const { data, series, seriesKeys, style } = props;
    let seriesBars = [];

    series.forEach((key, i) => {
        for (let j = 0; j < seriesKeys[key].length; j++){
            seriesBars.push(
                <Bar
                    key={seriesKeys[key][j]}
                    dataKey={seriesKeys[key][j]}
                    stackId={i}
                    fill={seriesColors[i][j]}
                />
            )
        }
    })

    return (
        <BarChart {...props} {...style}>
            {
                seriesBars.map(bar => bar)
            }
            {props.children}
        </BarChart>
    )
}
