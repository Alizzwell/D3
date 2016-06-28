var w = 500;
var h = 100;


var dataset = [
    {
        value : 1,
        color : "red",
        backgroundColor : "#ff8000"
    },
    {
        value : 3,
        color : "black",
        backgroundColor : "#cfffff"
    },
    {
        value : 2,
        color : "blue",
        backgroundColor : "#118000"
    }
];  


var newOne ={
  value : 5,
  color : "orange",
  backgroundColor :"#000001"
};

regist(newOne);

draw();

function regist(newData){
  dataset.push(newData);
}

function draw(){
    /*for (var i = 0; i < 25; i++) {           //Loop 25 times
            var newNumber = Math.round(Math.random() * 30);  //New random number (0-30)
            dataset.push(newNumber);             //Add new number to array
        }
*/
    var svg = d3.select("body")
            .selectAll("#section1")
            .append("svg")
            .attr("width", w)
            .attr("height", h);

    svg.selectAll("rect")
       .data(dataset)
       .enter()
       .append("rect")
       .attr("width",30)
       .attr("height",30)
       .attr("x", function(d,i){
            return i*31;
       })
       .attr("y", 0)
       .attr("fill",function(d){
            return d.backgroundColor;
       });

    svg.selectAll("text")
        .data(dataset)
        .enter()
        .append("text")
        .text(function(d){
            return d.value;
        })
        .attr("x", function(d,i){
            return i*31+10;
       })
       .attr("y", 20)
       .attr("fond-family", "consolas")
       .attr("fond-size","10px")
       .attr("fill",function(d){
            return d.color;
       });
}
