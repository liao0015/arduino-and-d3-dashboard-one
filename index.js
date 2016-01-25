d3.json('alcoholdata.json', function(error, data){
    if(error){
        console.error('Error accessing or parsing the JSON file');
        return error;
    }
    visualizeData(data);
});

function visualizeData(data){
    //map the data and create a new array
    var lineData = data.map(function(obj){
        return obj.alcohol;
    });
    console.log(lineData);
    
    var margin = {top: 20, right: 20, bottom: 30, left: 40},
        width = 960 - margin.left - margin.right,
        height = 500 - margin.top - margin.bottom;
    
    var x = d3.scale.linear()
                .domain([0, lineData.length])
                .range([0, width]);
    
    var y = d3.scale.linear()
                .domain([150, 400])
                .range([height, 0]);
    
    //line function
    var line = d3.svg.line()
                .x(function(d, i){return x(i);})
                .y(function(d, i){return y(d);})
                .interpolate("linear");
    
    var xAxis = d3.svg.axis().scale(x).orient("bottom");
                    //.ticks(d3.time.minutes, 15);
    
    var yAxis = d3.svg.axis().scale(y).orient("left");
    
    
    //the svg container
    var svgContainer = d3.select("body").append("svg")
                            .attr("width", width+margin.left+margin.right)
                            .attr("height", height+margin.top+margin.bottom)
                            .append("g")
                            .attr("transform", "translate("+margin.left+","+ margin.top+")");
    
    var xaxisGraph = svgContainer.append("g")
                        .attr("transform", "translate(0,"+ height/2+")")
                        .call(xAxis);
    
    var yaxisGraph = svgContainer.append("g")  
                        .call(yAxis);
    
    //the line path with svg
    var lineGraph = svgContainer.append("path")
                        .attr("d", line(lineData))
                        .attr("stroke", "black")
                        .attr("stroke-width", 2)
                        .attr("fill", "none");
}











                        