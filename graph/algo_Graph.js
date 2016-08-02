var graph = new GraphModule();
//var makeNode = function(id, x, y, radius, color, shape){
	
//user example
/*
graph.makeNode(1, 30, 30, 20, "green", "circle");
graph.makeNode(2, 70, 70, 20, "green", "rect");
graph.makeNode(3, 140, 140, 20, "green", "rect");

graph.makeNode(4, 180, 70, 20, "green", "rect");
graph.makeNode(5, 70, 180, 20, "green", "rect");
graph.makeNode(6, 190, 180, 20, "green", "rect");
graph.makeNode(7, 70, 220, 20, "green", "rect");
graph.makeEdge(1, 2);
*/

function show_Graph(data){
	var i=0, j=0;
	var N = data["N"];
	var V = data["V"];
	var Visit = data["Visit"];
	var getID = function(val){
		return document.getElementById(val);
	};
	var size = 30;
	var distance = 100;
	var theta = 2*Math.PI/N;
	var center_x = 300;
	var center_y = 300;
	
	d3.selectAll(".edge").attr("stroke", "black").attr("hightLight", "off"); // 색깔 수정 필요
	d3.selectAll(".node").attr("fill", "green").attr("highLight", "off");    // 색깔 수정 필요

	var makeNode = function(id, i, j){
		graph.makeNode(id,  center_x - size*5 * Math.cos(theta*(id+1)) , center_y - size*5 * Math.sin(theta*(id+1)) , size, "green", "circle");
	};
	
	var makeEdge = function(i, j){
		graph.makeEdge(i, j);
		graph.highLight_Edge(i, j);	
	};
	
	var removeNode = function(id){
		if(getID("node" + id) != null){
			graph.removeNode(id);
		}
	};
	
	var removeEdge = function(a, b){
		if(getID("edge" + a + "_" + b) != null){
			graph.removeEdge(a, b);
		}
	};
	
	for(i=0;i<N;i++){
		makeNode(i);
	}
	
	for(i=0;i<N;i++){
		for(j=0;j<N;j++){
			if(Visit[i][j] === 1){
				makeEdge(i ,j);
			}
			else{
				removeEdge(i, j);
			}
		}
	}
	if(getID("node" + V) != null) {
		graph.highLight_Node(V);
	}
	
};

/* use example */ 
data = { "N" : 4  , 
			"Visit" : [ [0, 1, 0, 0], [0, 0, 0, 1], [0, 0, 0, 0], [1, 0, 0, 0] ] ,
		"V" : 3
};
show_Graph(data);

data = { "N" : 4  , 
			"Visit" : [ [0, 1, 1, 0], [0, 0, 0, 1], [0, 0, 0, 0], [1, 0, 0, 0] ] ,
		"V" : 2
};
show_Graph(data);