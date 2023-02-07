document.getElementById("name").innerText = "Wenbo Tong";
document.getElementById("assignment_number").innerText = "4";
/////////////////////////////////////////////////////
import * as d3 from "d3";

// interaction with 3 options
document.getElementById("drselect")
    .addEventListener("change", getData)
document.getElementById("paraselect")
    .addEventListener("change", getData)
document.getElementById("cselect")
    .addEventListener("change", getData)

// set init data
const margin = {top: 10, right: 30, bottom: 30, left: 60};
const width = 700 - margin.left - margin.right;
const height = 700 - margin.top - margin.bottom;
const xValue = (d) => {return d["0"]};
const yValue = (d) => {return d["1"]};

// initial map
d3.json("http://127.0.0.1:8080/api/v1/pca_data")
.then(function (data){
  init(data, 0);
  legend(0);
});

// interaction
function getData(){
  var dr_index = document.getElementById("drselect").selectedIndex;
  var para_index = document.getElementById("paraselect").selectedIndex;
  var c_idex = document.getElementById("cselect").selectedIndex
  console.log(dr_index)
  console.log(para_index)
  console.log(c_idex)

  if (dr_index == 0)
  {   
    if (para_index == 0){
      if (c_idex == 0){
        d3.json("http://127.0.0.1:8080/api/v1/pca_data")
        .then(function (data){       // asynchronous programming
            d3.select("#mysvg").remove()
            d3.select("#mylegend").remove()
            d3.select('.tooltip').remove()
            init(data, para_index);
            legend(para_index);
        });
      }
      else if (c_idex == 1){
        d3.json("http://127.0.0.1:8080/api/v1/pca_names")
        .then(function (data){       
            d3.select("#mysvg").remove()
            d3.select("#mylegend").remove()
            d3.select('.tooltip').remove()
            init(data, para_index);
            legend(para_index);
        });
      }
    }
    else if (para_index == 1){
      if (c_idex == 0){
        d3.json("http://127.0.0.1:8080/api/v1/pca_data")
        .then(function (data){      
            d3.select("#mysvg").remove()
            d3.select("#mylegend").remove()
            d3.select('.tooltip').remove()
            init(data, para_index);
            legend(para_index);
        });
      }
      else if (c_idex == 1){
        d3.json("http://127.0.0.1:8080/api/v1/pca_names")
        .then(function (data){       
            d3.select("#mysvg").remove()
            d3.select("#mylegend").remove()
            d3.select('.tooltip').remove()
            init(data, para_index);
            legend(para_index);
        });
      }
    }
    else if (para_index == 2){
      if (c_idex == 0){
        d3.json("http://127.0.0.1:8080/api/v1/pca_data")
        .then(function (data){       
            d3.select("#mysvg").remove()
            d3.select("#mylegend").remove()
            d3.select('.tooltip').remove()
            init(data, para_index);
            legend(para_index);
        });
      }
      else if (c_idex == 1){
        d3.json("http://127.0.0.1:8080/api/v1/pca_names")
        .then(function (data){       
            d3.select("#mysvg").remove()
            d3.select("#mylegend").remove()
            d3.select('.tooltip').remove()
            init(data, para_index);
            legend(para_index);
        });
      }
    }
  }
  else if (dr_index == 1)
  {
    if (para_index == 0){
      if (c_idex == 0){
        d3.json("http://127.0.0.1:8080/api/v1/tsne_data")
        .then(function (data){       // asynchronous programming
            d3.select("#mysvg").remove()
            d3.select("#mylegend").remove()
            d3.select('.tooltip').remove()
            init(data, para_index);
            legend(para_index);
        });
      }
      else if (c_idex == 1){
        d3.json("http://127.0.0.1:8080/api/v1/tsne_names")
        .then(function (data){       
            d3.select("#mysvg").remove()
            d3.select("#mylegend").remove()
            d3.select('.tooltip').remove()
            init(data, para_index);
            legend(para_index);
        });
      }
    }
    else if (para_index == 1){
      if (c_idex == 0){
        d3.json("http://127.0.0.1:8080/api/v1/tsne_data")
        .then(function (data){     
            d3.select("#mysvg").remove()
            d3.select("#mylegend").remove()
            d3.select('.tooltip').remove()
            init(data, para_index);
            legend(para_index);
        });
      }
      else if (c_idex == 1){
        d3.json("http://127.0.0.1:8080/api/v1/tsne_names")
        .then(function (data){       
            d3.select("#mysvg").remove()
            d3.select("#mylegend").remove()
            d3.select('.tooltip').remove()
            init(data, para_index);
            legend(para_index);
        });
      }
    }
    else if (para_index == 2){
      if (c_idex == 0){
        d3.json("http://127.0.0.1:8080/api/v1/tsne_data")
        .then(function (data){      
            d3.select("#mysvg").remove()
            d3.select("#mylegend").remove()
            d3.select('.tooltip').remove()
            init(data, para_index);
            legend(para_index);
        });
      }
      else if (c_idex == 1){
        d3.json("http://127.0.0.1:8080/api/v1/tsne_names")
        .then(function (data){       
            d3.select("#mysvg").remove()
            d3.select("#mylegend").remove()
            d3.select('.tooltip').remove()
            init(data, para_index);
            legend(para_index);
        });
      }
    }
  }
}

function init(data, category) {
  console.log(data)
  if (category == 0){
    var keys = ["journal paper", "conference paper", "miscellaneous" ];
    var cate = 'paper_type';
    var range = ["#F8766D", "#00BA38", "#619CFF"];
  }
  else if (category == 1){
    var keys = ["<30", "30~50", ">50" ];
    var cate = 'cite_number';
    var range = ["#F8766D", "#00BA38", "#619CFF"];
  }
  else if (category == 2){
    var keys = ["no award", "has award"];
    var cate = 'award';
    var range = ["#F8766D", "#00BA38"];
  }
  const color = d3.scaleOrdinal()
    .domain(keys)
    .range(range)

  // append the svg object to the body of the page
  const svg = d3.select("#scatterplot")
  .append("svg")
    .attr("id", "mysvg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform",
          `translate(${margin.left}, ${margin.top})`);
  
    // Add X axis
  const x = d3.scaleLinear()
    .domain([d3.min(data, xValue), d3.max(data, xValue)])
    .range([ 0, width ]);
  svg.append("g")
    .attr("transform", `translate(0, ${height})`)
    .call(d3.axisBottom(x));

  // Add Y axis
  const y = d3.scaleLinear()
    .domain([d3.min(data, yValue), d3.max(data, yValue)])
    .range([ height, 0]);
  svg.append("g")
    .call(d3.axisLeft(y));

  // Add a tooltip div. It cannot be seen by default.
  const tooltip = d3.select("#scatterplot")
    .append("div")
    .style("opacity", 0)
    .attr("class", "tooltip")
    .style("background-color", "white")
    .style("border", "solid")
    .style("border-width", "1px")
    .style("border-radius", "5px")
    .style("padding", "10px")

  // A function that change this tooltip when the user hover a point, use opacity to show it.
  const mouseover = function(event, d) {
    tooltip
      .style("opacity", 1)
    d3.select(this)
      .style("stroke", "black")
      .style("opacity", 1)
  }

  const mousemove = function(event, d) {
    tooltip
      .html("Paper Name: " + d.title + "<br>Author(s): " + d.names)
      .style("left", (event.x)/2 + "px")
      .style("top", (event.y)/2 + "px")
  }

  // A function that change this tooltip when the leaves a point: just need to set opacity to 0 again
  const mouseleave = function(event,d) {
    tooltip
      .style("opacity", 0)
    d3.select(this)
      .style("stroke", "white")
      .style("opacity", 0.6)
  }

  // Add dots
  svg.append('g')
    .selectAll("dot")
    .data(data)
    .enter()
    .append("circle")
      .attr("cx", function (d) { return x(d["0"]); } )
      .attr("cy", function (d) { return y(d["1"]); } )
      .attr("r", 5)
      .style("fill", function (d) { return color(d[cate])})
      .style("opacity", 0.6)
      .style("stroke", "white")
    .on("mouseover", mouseover )
    .on("mousemove", mousemove )
    .on("mouseleave", mouseleave )

}

// function that adds legend
function legend(category){
  if (category == 0){
    var keys = ["journal paper", "conference paper", "miscellaneous" ];
    var range = ["#F8766D", "#00BA38", "#619CFF"];
  }
  else if (category == 1){
    var keys = ["<30", "30~50", ">50" ];
    var range = ["#F8766D", "#00BA38", "#619CFF"];
  }
  else if (category == 2){
    var keys = ["no award", "has award"];
    var range = ["#F8766D", "#00BA38"];
  }
  const color = d3.scaleOrdinal()
    .domain(keys)
    .range(range)

  const legend = d3.select("#scatterplot")
  .append("svg")
    .attr("id", "mylegend")
    .attr("width", width / 2)
    .attr("height", height / 2)
    .attr("transform", `translate(${1.2*width}, ${-height})`);
  
  legend.selectAll("mydots")
    .data(keys)
    .enter()
    .append("circle")
      .attr("cx", 100)
      .attr("cy", function(d,i){ return 100 + i*25}) // 100 is where the first dot appears. 25 is the distance between dots
      .attr("r", 7)
      .style("fill", function(d){ return color(d)})
  
  legend.selectAll("mylabels")
    .data(keys)
    .enter()
    .append("text")
      .attr("x", 120)
      .attr("y", function(d,i){ return 100 + i*25})
      .style("fill", function(d){ return color(d)})
      .text(function(d){ return d})
      .attr("text-anchor", "left")
      .style("alignment-baseline", "middle")
}
