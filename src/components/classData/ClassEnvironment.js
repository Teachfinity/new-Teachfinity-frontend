import React, { useEffect, useState } from 'react';
import {selectedClass} from "../../features/selectClassSlice" ;
import {useSelector , useDispatch} from "react-redux" ;
import * as d3 from 'd3';
import axios from 'axios';

function PieChart() {
  /* const {
    data,
    outerRadius,
    innerRadius,
  }; */
  //const [data, setData] = useState([]);
const selectClass = useSelector(selectedClass) ;
const [isBusy , setBusy] = useState(true) ;
  const[ data, setData] = useState([{ label: 'angry', value: 0 }, { label: 'disgust', value: 0 },{ label: 'scared', value: 0 },
  { label: 'happy', value: 0 }, { label: 'sad', value: 0 },{ label: 'surprised', value: 0 }, { label: 'neutral', value: 0 }
])
  var outerRadius = 200;
  var innerRadius = 0;

  const margin = {
    top: 50, right: 50, bottom: 50, left: 50,
  };

  const width = 2 * outerRadius + margin.left + margin.right;
  const height = 2 * outerRadius + margin.top + margin.bottom;

  const colorScale = d3     
    .scaleSequential()      
    .interpolator(d3.interpolateCool)      
    .domain([0, data.length]);

  useEffect(() => {
    axios.get('http://localhost:5000/classes/getclasses/'+selectClass.id)
    .then((res)=>{
        res.data.environment.map((item)=>{
            if(item.mood==='angry'){
                data[0].value++
            }
            if(item.mood==='disgust'){
                data[1].value++
            }
            if(item.mood==='scared'){
                data[2].value++
            }
            if(item.mood==='happy'){
                data[3].value++
            }
            if(item.mood==='sad'){
                data[4].value++
            }
            if(item.mood==='surprised'){
                data[5].value++
            }
            if(item.mood==='neutral'){
                data[6].value++
            }
        })
    })
    .then(()=>{
        setBusy(false)
        drawChart();
    })
  }, [data]);

  function drawChart() {
    // Remove the old svg
    d3.select('#pie-container')
      .select('svg')
      .remove();

    // Create new svg
    const svg = d3
      .select('#pie-container')
      .append('svg')
      .attr('width', width)
      .attr('height', height)
      .append('g')
      .attr('transform', `translate(${width / 2}, ${height / 2})`);

    const arcGenerator = d3
      .arc()
      .innerRadius(innerRadius)
      .outerRadius(outerRadius);

    const pieGenerator = d3
      .pie()
      .padAngle(0)
      .value((d) => d.value);

    const arc = svg
      .selectAll()
      .data(pieGenerator(data))
      .enter();

    // Append arcs
    arc
      .append('path')
      .attr('d', arcGenerator)
      .style('fill', (_, i) => colorScale(i))
      .style('stroke', '#ffffff')
      .style('stroke-width', 0);

    // Append text labels
    arc
      .append('text')
      .attr('text-anchor', 'middle')
      .attr('alignment-baseline', 'middle')
      .text((d) => d.data.label)
      .style('fill', (_, i) => colorScale(data.length - i))
      .attr('transform', (d) => {
        const [x, y] = arcGenerator.centroid(d);
        return `translate(${x}, ${y})`;
      });
      
  }    

  return ( 
<div>
{!isBusy && 
     <div id="pie-container"/>}
</div>
  );
}

export default PieChart;