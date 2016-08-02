<script src="http://d3js.org/d3-path.v1.min.js"></script>
<script src="http://d3js.org/d3.js"></script>

<script>
	function GraphModule(){
		var svgContainer = d3.select("body")
		.append("svg")
		.attr("width", 200)
		.attr("height", 200);

		var getID = function(val){
			return document.getElementById(val);
		};
		
		var duration = 500;
		
		var makeNode = function(id, x, y, size, color, shape){
			if(getID("node" + id) === null){
				//var circle = svgContainer.selectAll("circle")
				//console.log(svgContainer)
				
				//make circle part
				if(shape === "circle"){
					var circleAttributes = svgContainer
					.append("circle")
					.attr("class", "node")
					.attr("id", "node" + id)
					.attr("cx", x)
					.attr("cy", y)
					.attr("r", size)
					.attr("node_x", x)
					.attr("node_y", y)
					.attr("size", size)
					.attr("fill", color)
					.attr("highlight", "off");
					
					// circle text expression part

				}
				
				if(shape === "rect"){
					size /= 1.2;
					var rectAttributes = svgContainer
					.append("rect")
					.attr("class", "node")
					.attr("id", "node" + id)
					.attr("x", x-size)
					.attr("y", y-size)
					.attr("size", size)
					.attr("node_x", x)
					.attr("node_y", y)
					.attr("width", size*2)
					.attr("height", size*2)
					.attr("fill", color)
					.attr("highlight", "off");
				}
				
				var nodeText = svgContainer
					.append("text")
					.attr("id", "node_text" + id)
					.attr("dx", x-5)	
					.attr("dy", y+5)
					.attr("fill", "white")
					.text(id);
			}
		}
		
		//draw edge a to b
		
		var makeArrow = function(a, b){	
			if(getID("arrow" + a + "_" + b) === null){
				var a_node = d3.select("#node" + a);
				var b_node = d3.select("#node" + b);
				var a_x = a_node.attr("node_x");  // arrow start point_x
				var a_y = a_node.attr("node_y");   
				var b_x = b_node.attr("node_x");  // arrow end point_x
				var b_y = b_node.attr("node_y");
				var a_size = a_node.attr("size");
				var b_size = b_node.attr("size");
				var theta = Math.acos ( (b_x - a_x) / ( Math.sqrt( (b_x - a_x) * (b_x - a_x) + (b_y - a_y) * (b_y - a_y) ) ) )  * 180 / Math.PI;
				var sum_2string = function(a, b){ return String( Number(a) + Number(b) ) ;};
				var dec_2string = function(a, b){ return String( Number(a) - Number(b) ) ;};
				var margin_x = 5;
				var margin_y = 5;
				
				if(Number(a_x) === Number(b_x)) margin_x = 0;
				else if(Number(a_x) < Number(b_x)) margin_x = Number(a_size) / 1.5;
				else margin_x = -1*Number(a_size) / 1.5;
				
				if(Number(a_y) === Number(b_y)) margin_y = 0;
				else if(Number(a_y) < Number(b_y)) margin_y = Number(a_size) / 1.5;
				else margin_y = -1*Number(a_size) / 1.5;
				
				a_x = sum_2string(a_x, margin_x);
				a_y = sum_2string(a_y, margin_y);
				
				b_x = dec_2string(b_x, margin_x);
				b_y = dec_2string(b_y, margin_y);
				
				
				defs = svgContainer.append("defs")

				defs.append("marker")
				.attr("id", "arrow")
				.attr("viewBox", "0 -5 10 10")
				.attr("refX", 5)
				.attr("refY", 0)
				.attr("markerWidth", 4)
				.attr("markerHeight", 4)
				.attr("orient", "auto")
				.append("path")
				.attr("d", "M0,-5L10,0L0,5");
				
			
				//Draw the line
				var line = svgContainer.append("line")
				.attr("marker-end", "url(#arrow)")
				.attr("id", "arrow"+a+"_"+b)
				.attr("x1", a_x)
				.attr("y1", a_y)
				.attr("x2", b_x)
				.attr("y2", b_y)
				.attr("stroke-width", 2)
				.attr("stroke", "black")
				.attr("highlight", "off");

				/*		
				var arrow = d3.select("svg").append("path") 
				.attr("class", "arrow")
				.attr("d", function(d) { return 'M 50 130 L 200 130 L 125 242 z'; } )
				.attr("")
				*/	
			}
		};
		
		var makeEdge = function(a, b){	
			if(getID("edge" + a + "_" + b) === null){
				var a_node = d3.select("#node" + a);
				var b_node = d3.select("#node" + b);
				var a_x = a_node.attr("node_x");  // arrow start point_x
				var a_y = a_node.attr("node_y");   
				var b_x = b_node.attr("node_x");  // arrow end point_x
				var b_y = b_node.attr("node_y");
				var a_size = a_node.attr("size");
				var b_size = b_node.attr("size");
				var theta = Math.acos ( (b_x - a_x) / ( Math.sqrt( (b_x - a_x) * (b_x - a_x) + (b_y - a_y) * (b_y - a_y) ) ) )  * 180 / Math.PI;
				var sum_2string = function(a, b){ return String( Number(a) + Number(b) ) ;};
				var dec_2string = function(a, b){ return String( Number(a) - Number(b) ) ;};
				var margin_x = 5;
				var margin_y = 5;
				
				if(Number(a_x) === Number(b_x)) margin_x = 0;
				else if(Number(a_x) < Number(b_x)) margin_x = Number(a_size) / 1.5;
				else margin_x = -1*Number(a_size) / 1.5;
				
				if(Number(a_y) === Number(b_y)) margin_y = 0;
				else if(Number(a_y) < Number(b_y)) margin_y = Number(a_size) / 1.5;
				else margin_y = -1*Number(a_size) / 1.5;
				
				a_x = sum_2string(a_x, margin_x);
				a_y = sum_2string(a_y, margin_y);
				
				b_x = dec_2string(b_x, margin_x);
				b_y = dec_2string(b_y, margin_y);
				
				
				//Draw the line
				var line = svgContainer.append("line")
				.transition()
				.duration(duration)
				.attr("class", "edge")
				.attr("id", "edge"+a+"_"+b)
				.attr("x1", a_x)
				.attr("y1", a_y)
				.attr("x2", b_x)
				.attr("y2", b_y)
				.attr("stroke-width", 2)
				.attr("stroke", "black")
				.attr("highlight", "off");
			}
		};
		
		
		
		
		/* highLight 해주는 색깔 지정은 임의로 하드코딩 해놓았음.. 색 가변적으로 바뀔 수 있게 수정필요 */
		var highLight_Arrow = function(a, b){
			var edge = d3.select("#line" + a + "_" + b);

			edge
			.attr("stroke", "red")
			.attr("highlight", "on");
		};
		
		var highLight_Edge = function(a, b){
			var edge = d3.select("#edge" + a + "_" + b);
			
			edge
			.attr("stroke", "red")
			.attr("highlight", "on");
		};
		
		var highLight_Node = function(id){
			var node = d3.select("#node" + id);
			
			node
			.attr("fill", "rgb(125, 0, 125)")   
			.attr("highlight", "on");
		};
		/* highLight 해주는 색깔 지정은 임의로 하드코딩 해놓았음.. 색 가변적으로 바뀔 수 있게 수정필요 */
		
		
		
		
		var removeNode = function(id){		
			if(getID("node" + id) != null){
				d3.selectAll("#node"+id).remove();
				d3.selectAll("#text"+id).remove();
			}
		};
		
		var removeArrow = function(a, b){
			if(getID("arrow" + a + "_" + b) != null){
				d3.select("#arrow" + a + "_" + b).remove();	
			}
		};
		
		var removeEdge = function(a, b){
			if(getID("edge" + a + "_" + b) != null){
				d3.select("#edge" + a + "_" + b).remove();
			}
		};

		return {
			makeArrow : makeArrow,
			makeEdge : makeEdge,
			makeNode : makeNode,
			highLight_Arrow : highLight_Arrow,
			highLight_Edge : highLight_Edge,
			highLight_Node : highLight_Node,
			removeNode : removeNode,
			removeArrow : removeArrow,
			removeEdge : removeEdge
		};
		
	}

	
	var graph = new GraphModule();
	
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
			graph.removeNode(id);
		};
		
		var removeEdge = function(a, b){
			graph.removeEdge(a, b);
		};
		
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
	
	
	var data;
	
	
	function onBind(scheduler) {
		data = scheduler.getTargets();
		var N = data["N"];
		for(i=0;i<N;i++){
			graph.makeNode(i);
		}
	}
	
	function onStep(scheduler) {
		show_graph(scheduler.getTargets());
		console.log(scheduler.getLine());
		// update(scheduler.getTarget('A').data);
	}
	
	function onChange(scheduler, info) {
	}
	
	function update(arr) {
	}
</script>