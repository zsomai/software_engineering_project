import React,  {useMemo, useState, useEffect} from 'react';
import axios from "axios";
import { Bar } from "@visx/shape";
import { Group } from "@visx/group";
import { Text } from "@visx/text"
import { LinearGradient} from "@visx/gradient";
import { scaleLinear, scaleBand } from "@visx/scale";
import { AxisBottom } from '@visx/axis';

import "./static/barchart.css";

const margin = 40;

export type BarChartProps = {
    dataUrl: string;
    width: number;
    height: number;
}

interface IData {
    date: string;
    pagesRead: number;
}

export default ({ dataUrl, width, height }:BarChartProps) => {
    const [data, setData] = useState<IData[]>([]);
    const [maxVal,setMaxVal] = useState<number>(0);

    const [activeBar, setActiveBar] = useState<IData>()

    useEffect(() => {
        axios.get(dataUrl)
             .then((res) => {
                setData(res.data);
             })
             .catch((err) => {
                console.log(err.message);
             })
    }, [dataUrl]);

    useEffect(() => {
        let temp = data.map(a => a.pagesRead);
        setMaxVal(Math.max(...temp));
    }, [data])

    const xScale = scaleBand({
                range : [0, width],
                round : true,
                domain: data.map(temp => temp.date),
                padding: 0.4
            });


    const yScale = scaleLinear({
            range:[0, height-margin],
            round: true,
            domain: [0, maxVal]
        });

        

    return (
        <svg width = {width} height = {height} className = "bar-chart-container">
            <LinearGradient from="#3b6978" to="#204051" id ="background"/>
            <rect width={width} height={height} fill="url(#background)" rx={14} />
            <Group top = {margin}>
                {data.map((el) => {
                    const barWidth = 20;
                    const barHeight =  (yScale(el.pagesRead));
                    const barY = height - margin - barHeight;
                    const barX = xScale(el.date)
                    return (
                        <Bar
                            key = {el.date}
                            x = {barX}
                            y = {barY}
                            width = {barWidth}
                            height = {barHeight}
                            fill = "#bef6ff"
                            onMouseEnter={() => setActiveBar(el)}
                            onMouseLeave={() => setActiveBar(undefined)}
                        />
                    );
                })}
                {activeBar && 
                <Text fill="white" >
                    {`You've read ${activeBar.pagesRead} pages on: ${activeBar.date.slice(0,10)}`}
                </Text>
                }
            </Group>
        </svg>
    );
}