import React, { Component, useRef, useState, useEffect } from 'react'
import {Line} from 'react-chartjs-2';
// import classes from "./LineGraph.module.css";

const LineGraph = (props) => {

    return (
        <div>
            <Line data={{
                labels: props.xData,
                datasets: props.dataSet
            }}/>
        </div>
    )
    
}

export default LineGraph;