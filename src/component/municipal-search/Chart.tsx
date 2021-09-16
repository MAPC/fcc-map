/** @jsx jsx */

import React from 'react';
import { jsx, css } from '@emotion/react';
import { CsvData } from './MunicipalData'; 
import { themeColors, fonts } from '../../utils/theme';
import * as d3 from 'd3';
import { scaleLinear } from 'd3-scale';
import { X } from 'phosphor-react';

interface ChartProps {
    data: Array<CsvData>,
    node: Array<CsvData>,
    selectedMuni: string|undefined,
    highlightedSites: Array<number|undefined> 
}

const chartStyle = css`
    display: flex;
    max-width: 10vw;
    align-items: flex-end; 
    div {
        font: 10px sans-serif;
        background-color: steelblue;
        text-align: right;
        padding: .2px;
        // margin: 1px;
        color: white;
    }
`;

const Chart: React.FC<ChartProps> = ({ data, node, selectedMuni, highlightedSites }) => {
    
    // // successfully passing in CsvData,
    // // filtering to sites within selectedMuni,
    // // and sorting by Overall Score descending.
 
    // var d3Data: Array<any> = [];
    // var dataToParse = [...data]
    //     // .filter(site => site.municipal === selectedMuni)
    //     .sort((a: any, b: any) => 
    //     // choose sort-by attribute here
    //     b.Overall_Score - a.Overall_Score
    //     );

    // dataToParse.forEach((site) => {
    //     // if (site.municipal === selectedMuni) {
    //         d3Data.push(parseFloat(site.Overall_Score))
    //     // }
    //     return d3Data;
    // })

    // // console.log('d3Data', d3Data);

    // // now render the data into div.chart
    // var x = d3.scaleLinear()
    // .domain([0, d3.max(d3Data)])
    // .range([0, 400]);

    // d3.select(".chart")
    //     .selectAll("div")
    //         .data(d3Data)
    //     .enter().append("div")
    //         .style("height", function(d) { return x(d)/4 + "px"; })
    //         .style("background-color", function(d) {if (d > 4) {return "pink";} else {return "blue";}});
    //         // .text(function(d) { return d; });



    var d3Data: Array<any> = [];
    d3Data = [...data]
        // .filter(site => site.municipal === selectedMuni)
        .sort((a: any, b: any) => 
        // choose sort-by attribute here
        b.Overall_Score - a.Overall_Score
        );

    console.log('d3Data', d3Data);

    // now render the data into div.chart
    var y = d3.scaleLinear()
    .domain([0, d3.max(d3Data, d => d.Overall_Score)])
    .range([0, 100]);

    var x = d3.scaleBand()
    .domain(d3.range(d3Data.length))
    .range([0, 450])

    d3.select(".chart")
        .selectAll("div")
            .data(d3Data) //binding data
        .enter().append("div") //entering the data, looping through each elem of array
            .style("height", function(d) { return (+d.Overall_Score)*10 + "px"; })
            .style("background-color", function(d) {if (highlightedSites.includes(d.site_oid)) {return "pink";} else {return "blue";}})
            .style("width", function(d, i) { return x(i) + "px"; });
            // .text(function(d) { return d; });


    return (
        <div>
            <p>Candlestick Component for: {selectedMuni}</p>
            <div className="chart" css={chartStyle}></div>
        </div>
    );
};

export default Chart;