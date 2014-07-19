
var treeData =
    {
        "name": "Top Level",
        "parent": "null",
        "children": [
            {
                "name": "Level 2: A",
                "parent": "Top Level",
                "children": [
                    {
                        "name": "Son of A",
                        "parent": "Level 2: A"
                    },
                    {
                        "name": "Daughter of A",
                        "parent": "Level 2: A"
                    }
                ]
            },
            {
                "name": "Level 2: B",
                "parent": "Top Level",
                "children": [
                    {
                        "name": "Son of A",
                        "parent": "Level 2: A"
                    },
                    {
                        "name": "Daughter of A",
                        "parent": "Level 2: A"
                    }
                ]
            }
        ]
    };

var margin = {top: 20, right: 120, bottom: 20, left: 320};
var width = 1000 - margin.right - margin.left;
var height = 500 - margin.top - margin.bottom;

var yscale = d3.scale.linear().domain([0, height]).range([0, height/2]);

var tree = d3.layout.tree();
        tree.size([height, width]);

var nodes = tree.nodes(treeData).reverse();
        nodes.forEach(function(d) {
            d.y = d.depth * 80 + margin.left;
            d.x = yscale(d.x + margin.top);
        });
var links = tree.links(nodes);
var diagonal = d3.svg.diagonal().projection(function(d) { return [d.y, d.x]; });

var svg = d3.select("body").append("svg");
        svg.attr("width", width + margin.right + margin.left);
        svg.attr("height", height + margin.top + margin.bottom);
        svg.call(
            d3.behavior.zoom()
                .scaleExtent([.1, 10])
                .on("zoom", zoom)
        );

var g = svg.append("g");

function zoom() {
    g.attr("transform", "translate(" +
        d3.event.translate[0] + "," +
        d3.event.translate[1] + ") scale(" + d3.event.scale + ")");
}


var i=0;
var nodeBindings = g.selectAll("g.node").data(nodes, function(d) { return d.id || (d.id = ++i); });
var newNode = nodeBindings.enter().append("g").attr("class", "node");
        newNode.attr("transform", function(d) {
            return "translate(" + d.y + "," + d.x + ")";
        });
var circle = newNode.append("circle");
        circle.attr("r", 10);
var text = newNode.append("text");
        text.text(function(d) {return d.name; });
        text.attr("x", function(d) {
            return d.children || d._children ? -13 : 13;
        });
        text.attr("text-anchor", function(d) {
            return d.children || d._children ? "end" : "start";
        });
        text.attr("dy", ".35em");

var linkBindings = g.selectAll("path.link").data(links, function(d) { return d.target.id; });
var newLink = linkBindings.enter().insert("path", "g").attr("class", "link");
        newLink.attr("d", diagonal);





