import { useState, useEffect } from "react"
import axios from "axios"
import { Pie } from "@visx/shape"
import { Group } from "@visx/group"
import { Text } from "@visx/text"

import urls from "../../static/urls"

interface IData {
    cat: string;
    num: number;
    color: string;
}

/*
      #204051
      #163139
      #51203d
      #39162b
      #514a20
*/

const booksReadThisYear:number = 7
const yearlyGoal: number = 12

interface IChartProps {
    size: number;
    data_url: string
}

function getRandomColor():string {
    const colorlist:string[] = [ "#204051", "#163139", "#51203d", "#39162b", "#514a20"]
    return colorlist[Math.floor(Math.random()*colorlist.length)]
}

const DonutChart = ({size, data_url}: IChartProps) => {

    const [activeArc, setActiveArc] = useState<IData>()
    const [categories, setCategories] = useState<IData[]>()
    const [goal, setGoal] = useState<number>()
    const [read, setRead] = useState<number>()

    useEffect(()=>{
        axios
        .get(data_url)
        .then((res) => {
            console.log(res.data);
            
            setCategories(res.data.map((el: { cat: string; num: number }) => {return {"cat":el.cat, "num": el.num, "color": getRandomColor()}}))
        })



    }, [])
    
    useEffect(() => {
        axios
        .get(urls.API_GET_NUM_BOOKS_THIS_YEAR + "63a7099b2abcfa4b5c790f8d")
        .then(
            (res) => {
                console.log(res.data.books);
                
                setRead(res.data.books)
            }
        )
    }, [])

    useEffect(() => {
        axios
        .get(urls.API_GET_YEARLY_GOAL + "63a7099b2abcfa4b5c790f8d")
        .then(
            (res) => {
                console.log(res.data);
                
                setGoal(res.data.data)
            }
        )
    }, [])
    
    console.log(data_url);
    if(read && categories && goal)
    return (
        <div className="donut-chart">
            <svg height={size} width={size}>
                <Group top={size/2} left={size/2}>
                    <Pie 
                        data = {categories}
                        pieValue = {(data) => data.num}
                        outerRadius = {size/2}
                        innerRadius = {({data}) => {
                            let width = (activeArc && activeArc.cat == data.cat) ? 15 : 10
                            return size/2 - width;
                        }}
                        padAngle = {0.01}
                    >
                        {(pie) => {
                            return pie.arcs.map((arc) => {
                                console.log(arc);
                                return (
                                <g key={arc.data.cat} onMouseEnter={() => setActiveArc(arc.data)} onMouseLeave={()=> setActiveArc(undefined)}>
                                    <path d = {pie.path(arc) as string} fill={arc.data.color} ></path>
                                </g>
                                );
                            })
                        }}
                    </Pie>
                    {activeArc ? 
                        <Text textAnchor="middle" fill={activeArc.color} fontWeight="bold">
                            {`${activeArc.num} of it is ${activeArc.cat}`}
                        </Text> 
                        :
                        <g>
                        <Text textAnchor="middle" fill="white" fontWeight="bold" dy={-10}> 
                            {`You've read ${read} books this year! `}
                        </Text>
                        <Text textAnchor="middle" fill="white" fontWeight="bold" dy={10}>  
                            {`${(read < goal) ? goal-read : 0} more to go to reach your goal!`}
                        </Text>
                        </g>
                    }
                </Group>
            </svg>
        </div>
    )


    return <div></div>
}

export default DonutChart;