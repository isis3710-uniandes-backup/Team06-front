import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import * as d3 from 'd3';

class Chart extends Component {

    state = {
        user: this.props.user,
        max_bar: ""
    }
    componentDidMount = () => {

        var data = this.formalizarData()
        this.dibujarBarras(data)
        this.pieChart(data)
    }

    formalizarData = () => {
        var data = []
        var numero = []
        var List = this.state.user.Playlists
        List.forEach(element => {
            var objeto = {
                "nombre": element.playlist_name,
                "tamaño_lista": element.PlaylistSongs.length
            }
            data.push(objeto);

        });
        return data
    }
    dibujarBarras = (data) => {
        var max = Math.max(...data.map(o => o.tamaño_lista), 0)
        const height = 500
        const width = 700
        const margin = { top: 10, left: 50, bottom: 40, right: 10 };
        const iwidth = width - margin.left - margin.right;
        const iheight = height - margin.top - margin.bottom;

        const svgCanvas = d3.select(this.refs.grafica)
            .append("svg")
            .attr("width", width)
            .attr("height", height)
            .style("border", "1px solid black")

        let g = svgCanvas.append("g").attr("transform", `translate(${margin.left},${margin.top})`);

        const y = d3.scaleLinear()
            .range([iheight, 0])
            .domain([0, max + 2])


        const x = d3.scaleBand()
            .domain(data.map(d => d.nombre))
            .range([0, iwidth])
            .padding(0.1)

        g.selectAll("rect")
            .data(data).enter()
            .append("rect")
            .attr("width", x.bandwidth())
            .attr("height", d => iheight - y(d.tamaño_lista))
            .attr("fill", "orange")
            .attr("x", d => x(d.nombre))
            .attr("y", d => y(d.tamaño_lista))

        g.append("g")
            .classed("y--axis", true)
            .call(d3.axisLeft(y));

        g.append("g")
            .classed("x--axis", true)
            .call(d3.axisBottom(x))
            .attr("transform", `translate(0, ${iheight})`);

        svgCanvas.append("text")
            .attr("x", (width / 2))
            .attr("y", 0 + (margin.top * 2))
            .attr("text-anchor", "middle")
            .style("font-size", "16px")
            .style("text-decoration", "underline")
            .text("Cantidad canciones por lista");
    }

    pieChart = () => {
        var data = { "Rock": 20, "Pop": 30, "Bachata": 40, "Rap": 90 }
        var width = 700
        var height = 500
        var margin = 40

        var radius = Math.min(width, height) / 2 - margin

        var svgCanvas = d3.select(this.refs.pie)
            .append("svg")
            .attr("width", width)
            .attr("height", height)
            .style("border", "1px solid black")

        var g = svgCanvas.append("g")
            .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

        var pie = d3.pie()
            .sort(null)
            .value(d => d.value)

        var color = d3.scaleOrdinal()
            .domain(data)
            .range(["#98abc5", "#8a89a6"])

        var listo = pie(d3.entries(data))


        var hoyo = d3.arc()
            .innerRadius(100)
            .outerRadius(radius * 0.8)

        var hoyo2 = d3.arc()
            .innerRadius(200)
            .outerRadius(radius * 0.9)

        g.selectAll("whatever")
            .data(listo)
            .enter()
            .append("path")
            .attr("d", hoyo)
            .attr('fill', (d) => color(d.data.value))
            .attr("stroke", "black")
            .style("stroke-width", "2px")
            .style("opacity", 0.7)

        g.selectAll('allPolylines')
            .data(listo)
            .enter()
            .append('polyline')
            .attr("stroke", "black")
            .style("fill", "none")
            .attr("stroke-width", 1)
            .attr('points', (d) => {
                var posA = hoyo.centroid(d)
                var posB = hoyo2.centroid(d)
                var posC = hoyo2.centroid(d);
                var midangle = d.startAngle + (d.endAngle - d.startAngle) / 2
                posC[0] = radius * 0.95 * (midangle < Math.PI ? 1 : -1);
                return [posA, posB, posC]
            })
        console.log(listo)
        g.selectAll('allLabels')
            .data(listo)
            .enter()
            .append('text')
            .text((d) => {
                return d.data.key
            })
            .attr('transform', (d) => {
                var pos = hoyo2.centroid(d);
                var midangle = d.startAngle + (d.endAngle - d.startAngle) / 2
                pos[0] = radius * 0.99 * (midangle < Math.PI ? 1 : -1);
                return 'translate(' + pos + ')';
            })
            .style('text-anchor', (d => {
                var midangle = d.startAngle + (d.endAngle - d.startAngle) / 2
                return (midangle < Math.PI ? 'start' : 'end')
            }))



        svgCanvas.append("text")
            .attr("x", (width / 2))
            .attr("y", 0 + (margin))
            .attr("text-anchor", "middle")
            .style("font-size", "16px")
            .style("text-decoration", "underline")
            .text("Musica escuchada")
    }

    render() {
        return (
            <div>
                <br></br>
                <br></br>
                <h1 style={{ "fontSize": "30px" }} className="center-align"><FormattedMessage id="Chart" /></h1>
                <br></br>
                <div className="section container" />
                <center>
                    <div ref="grafica">

                    </div>
                    <br></br>
                    <div ref="pie">

                    </div>
                </center>
                <br></br>
            </div>
        );
    }
}

export default Chart;