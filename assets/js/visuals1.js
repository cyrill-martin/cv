//////////////////////////////////////////////////////////
/////////////// The Radar Chart Function /////////////////
/////////////// Written by Nadieh Bremer /////////////////
////////////////// VisualCinnamon.com ////////////////////
/////////// Inspired by the code of alangrafu ////////////
//////////////////////////////////////////////////////////
// https://gist.github.com/nbremer/21746a9668ffdf6d8242 //
//////////////////////////////////////////////////////////
////////////// Adapted by Cyrill Martin //////////////////
/// License: MIT (https://opensource.org/licenses/MIT) ///
//////////////////////////////////////////////////////////
function radarChart(id, data, options) {
    let cfg = {
        w: 600,
        h: 600,
        margin: {
            top: 20,
            right: 20,
            bottom: 20,
            left: 20
        },
        levels: 3,
        maxValue: 0,
        labelFactor: 1.2,
        wrapWidth: 200,
        opacityArea: 0.35,
        dotRadius: 2.5,
        opacityCircles: 0.1,
        strokeWidth: 4,
        roundStrokes: false,
        color: d3.scale.category10(),
        case: "",
        caseColor: ""
    };
    if ('undefined' !== typeof options) {
        for (let i in options) {
            if ('undefined' !== typeof options[i]) {
                cfg[i] = options[i]
            }
        }
    }
    let maxValue = Math.max(cfg.maxValue, d3.max(data, function(i) {
        return d3.max(i.map(function(o) {
            return o.value
        }))
    }));
    let allAxis = (data[0].map(function(i, j) {
            return i.axis
        })),
        total = allAxis.length,
        radius = Math.min(cfg.w/2, cfg.h/2),
        Format = d3.format(''),
        angleSlice = Math.PI * 2/total;
    let rScale = d3.scale.linear()
        .range([0, radius])
        .domain([0, maxValue]);
    let svg = d3.select(id)
        .append("svg")
        .attr("width", cfg.w + cfg.margin.left + cfg.margin.right)
        .attr("height", cfg.h + cfg.margin.top + cfg.margin.bottom)
        .attr("id", "svg" + id);
    let g = svg.append("g")
        .attr("transform", "translate(" + (cfg.w/2 + cfg.margin.left) + "," + (cfg.h/2 + cfg.margin.top) + ")");
    let axisGrid = g.append("g")
        .attr("class", "axisWrapper");
    axisGrid.selectAll(".levels")
        .data(d3.range(1, (cfg.levels + 1))
            .reverse())
        .enter()
        .append("circle")
        .attr("class", "gridCircle")
        .attr("r", function(d, i) {
            return radius/cfg.levels * d
        })
        .style("fill", "white")
        .style("stroke", "#CDCDCD")
        .style("fill-opacity", cfg.opacityCircles);
    let axis = axisGrid.selectAll(".axis")
        .data(allAxis)
        .enter()
        .append("g")
        .attr("class", "axis");
    axis.append("line")
        .attr("x1", 0)
        .attr("y1", 0)
        .attr("x2", function(d, i) {
            return rScale(maxValue * 1.1) * Math.cos(angleSlice * i - Math.PI/2)
        })
        .attr("y2", function(d, i) {
            return rScale(maxValue * 1.1) * Math.sin(angleSlice * i - Math.PI/2)
        })
        .attr("class", "line")
        .style("stroke", "white")
        .style("stroke-width", "0.5px");
    axis.append("text")
        .attr("class", "legend")
        .style("font-size", "0.8em")
        .attr("text-anchor", "middle")
        .attr("dy", "0.35em")
        .attr("x", function(d, i) {
            return rScale(maxValue * cfg.labelFactor) * Math.cos(angleSlice * i - Math.PI/2)
        })
        .attr("y", function(d, i) {
            return rScale(maxValue * cfg.labelFactor) * Math.sin(angleSlice * i - Math.PI/2)
        })
        .text(function(d) {
            return d
        })
        .call(wrap, cfg.wrapWidth);
    axisGrid.selectAll(".axisLabel")
        .data(d3.range(1, (cfg.levels + 1))
            .reverse())
        .enter()
        .append("text")
        .attr("class", "axisLabel")
        .attr("x", -11)
        .attr("y", function(d) {
            return -d * radius / cfg.levels
        })
        .attr("dy", "0.4em")
        .style("font-size", "0.6em")
        .attr("fill", "#737373")
        .text(function(d, i) {
            return Format(maxValue * d/cfg.levels)
        });
    let radarLine = d3.svg.line.radial()
        .interpolate("linear-closed")
        .radius(function(d) {
            return rScale(d.value)
        })
        .angle(function(d, i) {
            return i * angleSlice
        });
    if (cfg.roundStrokes) {
        radarLine.interpolate("cardinal-closed")
    }
    let blobWrapper = g.selectAll(".radarWrapper")
        .data(data)
        .enter()
        .append("g")
        .attr("class", "radarWrapper");
    blobWrapper.append("path")
        .attr("class", cfg.case+"Area")
        .attr("id", function(d, i) {
            return cfg.case+"Area_" + i
        })
        .attr("d", function(d, i) {
            return radarLine(d)
        })
        .style("fill", function(d, i) {
            return cfg.color(i)
        })
        .style("fill-opacity", cfg.opacityArea)
        .on('mouseover', function(d, i) {
            let id = d3.select(this)
                .attr("id")
                .slice(8, 10);
            d3.selectAll("." + cfg.case)
                .style("background-color", "");
            d3.selectAll("." + cfg.case+"Area")
                .transition()
                .duration(200)
                .style("fill-opacity", 0.1);
            d3.select(this)
                .transition()
                .duration(200)
                .style("fill-opacity", 0.9);
            d3.select("#" + cfg.case+"_" + id)
                .style("background-color", cfg.caseColor)
        })
        .on('mouseout', function() {
            let id = d3.select(this)
                .attr("id")
                .slice(8, 10);
            d3.selectAll("." + cfg.case+"Area")
                .transition()
                .duration(200)
                .style("fill-opacity", cfg.opacityArea);
            d3.select("#" + cfg.case+"_" + id)
                .style("background-color", "")
        });
    blobWrapper.append("path")
        .attr("class", "radarStroke")
        .attr("d", function(d, i) {
            return radarLine(d)
        })
        .style("stroke-width", cfg.strokeWidth + "px")
        .style("stroke", function(d, i) {
            return cfg.color(i)
        })
        .style("fill", "none")
        .style("filter", "url(#glow)");
    blobWrapper.selectAll(".radarCircle")
        .data(function(d, i) {
            return d
        })
        .enter()
        .append("circle")
        .attr("class", "radarCircle")
        .attr("r", cfg.dotRadius)
        .attr("cx", function(d, i) {
            return rScale(d.value) * Math.cos(angleSlice * i - Math.PI / 2)
        })
        .attr("cy", function(d, i) {
            return rScale(d.value) * Math.sin(angleSlice * i - Math.PI / 2)
        })
        .style("fill", function(d, i, j) {
            return cfg.color(j)
        })
        .style("fill-opacity", 0.8);
    let blobCircleWrapper = g.selectAll(".radarCircleWrapper")
        .data(data)
        .enter()
        .append("g")
        .attr("class", "radarCircleWrapper");
    blobCircleWrapper.selectAll(".radarInvisibleCircle")
        .data(function(d, i) {
            return d
        })
        .enter()
        .append("circle")
        .attr("class", "radarInvisibleCircle")
        .attr("r", cfg.dotRadius * 1.5)
        .attr("cx", function(d, i) {
            return rScale(d.value) * Math.cos(angleSlice * i - Math.PI / 2)
        })
        .attr("cy", function(d, i) {
            return rScale(d.value) * Math.sin(angleSlice * i - Math.PI / 2)
        })
        .style("fill", "none")
        .style("pointer-events", "all")
        .on("mouseover", function(d, i) {
            newX = parseFloat(d3.select(this)
                .attr('cx')) - 10;
            newY = parseFloat(d3.select(this)
                .attr('cy')) - 10;
            tooltip.attr('x', newX)
                .attr('y', newY)
                .text(Format(d.value))
                .transition()
                .duration(200)
                .style('opacity', 1)
        })
        .on("mouseout", function() {
            tooltip.transition()
                .duration(200)
                .style("opacity", 0)
        });
    let tooltip = g.append("text")
        .attr("class", "tooltip")
        .style("opacity", 0)
        .style("font-size", "0.8em");

    function wrap(text, width) {
        text.each(function() {
            let text = d3.select(this),
                words = text.text()
                .split(/\s+/)
                .reverse(),
                word, line = [],
                lineNumber = 0,
                lineHeight = 1.4,
                y = text.attr("y"),
                x = text.attr("x"),
                dy = parseFloat(text.attr("dy")),
                tspan = text.text(null)
                .append("tspan")
                .attr("x", x)
                .attr("y", y)
                .attr("dy", dy + "em");
            while (word = words.pop()) {
                line.push(word);
                tspan.text(line.join(" "));
                if (tspan.node()
                    .getComputedTextLength() > width) {
                    line.pop();
                    tspan.text(line.join(" "));
                    line = [word];
                    tspan = text.append("tspan")
                        .attr("x", x)
                        .attr("y", y)
                        .attr("dy", ++lineNumber * lineHeight + dy + "em")
                        .text(word)
                }
            }
        })
    }
};

function mouseJobs() {
    d3.selectAll(".job")
        .on("mouseover", function() {
            let jobId = d3.select(this)
                .attr("id")
                .slice(4, 6);
            d3.selectAll(".jobArea")
                .transition()
                .duration(200)
                .style("fill-opacity", 0.1);
            d3.select("#jobArea_" + jobId)
                .transition()
                .duration(200)
                .style("fill-opacity", 0.9);
            d3.selectAll(".job")
                .style("background-color", "");
            d3.select(this)
                .style("background-color", "#E9EBEA")
        })
        .on("mouseout", function() {
            d3.selectAll(".jobArea")
                .transition()
                .duration(200)
                .style("fill-opacity", 0.35);
            d3.select(this)
                .style("background-color", "")
        })
};

function mouseProjects() {
    d3.selectAll(".project")
        .on("mouseover", function() {
            let jobId = d3.select(this)
                .attr("id")
                .slice(4, 6);
            d3.selectAll(".prjArea")
                .transition()
                .duration(200)
                .style("fill-opacity", 0.1);
            d3.select("#prjArea_" + jobId)
                .transition()
                .duration(200)
                .style("fill-opacity", 0.9);
            d3.selectAll(".project")
                .style("background-color", "");
            d3.select(this)
                .style("background-color", "#E9EBEA")
        })
        .on("mouseout", function() {
            d3.selectAll(".prjArea")
                .transition()
                .duration(200)
                .style("fill-opacity", 0.35);
            d3.select(this)
                .style("background-color", "")
        })
};

function mouseSchools() {
    d3.selectAll(".school")
        .on("mouseover", function() {
            let schoolId = d3.select(this)
                .attr("id")
                .slice(4, 6);
            d3.selectAll(".sclArea")
                .transition()
                .duration(200)
                .style("fill-opacity", 0.1);
            d3.select("#sclArea_" + schoolId)
                .transition()
                .duration(200)
                .style("fill-opacity", 0.9);
            d3.select(this)
                .style("background-color", "#EFF3E5")
        })
        .on("mouseout", function() {
            d3.selectAll(".sclArea")
                .transition()
                .duration(200)
                .style("fill-opacity", 0.35);
            d3.select(this)
                .style("background-color", "")
        })
};
