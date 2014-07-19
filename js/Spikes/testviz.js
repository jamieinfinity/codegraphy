
require(["//cdnjs.cloudflare.com/ajax/libs/d3/3.2.2/d3.v3.min.js"], function() {

    $.getJSON("JSONDATAFILE", function(dataset) {

        //Width and height
        var w = 750;
        var h = 250;

        //Initialize a default force layout, using the nodes and edges in dataset
        var force = d3.layout.force()
            .nodes(dataset.nodes)
            .links(dataset.edges)
            .size([w, h])
            .linkDistance([50])
            .charge([-100])
            .start();

        var colors = d3.scale.category10();

        //Create SVG element
        var svg = d3.select(HTMLELEMENT)
            .append("svg")
            .attr("align", "center")
            .attr("width", w)
            .attr("height", h);

        //Create edges as lines
        var edges = svg.selectAll("line")
            .data(dataset.edges)
            .enter()
            .append("line")
            .style("stroke", "#ccc")
            .style("stroke-width", 1);

        //Create nodes as circles
        var nodes = svg.selectAll("circle")
            .data(dataset.nodes)
            .enter()
            .append("circle")
            .attr("r", 10)
            .style("fill", function(d, i) {
                return colors(i);
            })
            .call(force.drag);

        //Every time the simulation "ticks", this will be called
        force.on("tick", function() {

            edges.attr("x1", function(d) { return d.source.x; })
                .attr("y1", function(d) { return d.source.y; })
                .attr("x2", function(d) { return d.target.x; })
                .attr("y2", function(d) { return d.target.y; });

            nodes.attr("cx", function(d) { return d.x; })
                .attr("cy", function(d) { return d.y; });

        });
    });
});