

function queue(){
	// var drag = d3.drag()
 //    .on("start", dragstarted)
 //    .on("drag", dragged)
 //    .on("end", dragended);

    var zoom = d3.zoom()
    .scaleExtent([0.1,10])
    .on("zoom",zoomed);

	var container = d3.select("#section1")
	.append("svg")
	.attr("width",1000)
	.attr("height",700)
	.attr("id","container")
	.append("g");
   	

	var controler = d3.select("#section2")
	.append("svg")
	.attr("width",1000)
	.attr("height",500)
	.append("g");



	var queue;
	var queueData = [];
	
	var top = -1;
	var front = -1;
	var rear = -1;
	var rectWidth = 80;
	var rectHeight = 80;

	var padding = 5;

	var Push = function(_value, done){
		var newElem;

		top++;
		rear++;
		queueData.push(_value);

		async.series([
			function(callback){
				setTimeout(function(){
					newElem = container.append("g");
					 newElem.append("rect")
						.attr("x",800)
						.attr("y",300)
						.attr("width",rectWidth)
						.attr("height",rectHeight)
						.attr("fill","#FAAF08")
						.attr("rx",10)
						.attr("ry",10);

					newElem.append("text")
						.text(_value)
						.attr("x",function(){return 800+rectWidth/2;})
					 	.attr("y",function(){return 300+rectHeight/5*3;})
						.attr("fill","black")
						.attr("font-family","Consolas")
						.attr("font-size","20px")
						.attr("text-anchor","middle");
		
					var distance = -(800-(rectWidth+padding)*rear-100);
					newElem.transition()
						.attr("transform","translate("+distance+",0)").ease(d3.easeSinOut);
						callback(null);
						//newElem.remove().exit();
				},1000);
			},
			function(callback){
				setTimeout(function(){
					newElem.remove().exit();
					drawQueue();

					callback(null);
				},500);
			}
		], function(err, results){
			done();
			console.log("완료");
		});
	}

	var Pop = function(done){

		if(top === -1)
			return ;

		var newElem;

		var _value = queueData[top];
		queueData.pop();
		top--;

		async.series([
			function(callback){
				setTimeout(function(){
	
					drawQueue();

					newElem = container.append("g");
					 newElem.append("rect")
						.attr("x",300)
						.attr("y",700-(rectHeight+padding)*(top+1))
						.attr("width",rectWidth)
						.attr("height",rectHeight)
						.attr("fill","#FAAF08")
						.attr("rx",10)
						.attr("ry",10);

					newElem.append("text")
						.text(_value)
						.attr("x",function(){return 300+rectWidth/2;})
					 	.attr("y",function(){return 700-(rectHeight+padding)*(top+1)+rectHeight/5*3;})
						.attr("fill","black")
						.attr("font-family","Consolas")
						.attr("font-size","20px")
						.attr("text-anchor","middle");
		
					var distance = -(700-(rectHeight+padding)*(top+1)-100);
					newElem.transition()
						.attr("transform","translate(0,"+distance+")").ease(d3.easeSinOut);
						callback(null);
						
				},1000);
			},
			function(callback){
				setTimeout(function(){
					newElem.remove().exit();
					drawQueue();
					callback(null);
				},500);
			}
		], function(err, results){
			done();
			console.log("완료");
		});
	}


	var drawQueue = function(){
		
		if( queue !== undefined){
			queue.remove().exit();
		}

		if(queueData.length === 0)
			return ;
		d3.selectAll("#container").call(zoom);


		queue = container.append("g");
		queue.selectAll("g.rect")
			.data(queueData)
			.enter()
			.append("rect")
			.attr("x",function(d,i){return 100+(rectWidth+padding)*i;})
			.attr("y",300)
			.attr("width",rectWidth)
			.attr("height",rectHeight)
			.attr("rx",10)
			.attr("ry",10)
			.attr("fill","#FAAF08")
			.attr("id",function(d,i){return "rectIdx"+i;})
			.attr("opacity",1.0)
			.on("mouseover",mouseOver)
			.on("mouseout",mouseOut);

		queue.selectAll("g.text")
			.data(queueData)
			.enter()
			.append("text")
			.text(function(d,i){return d;})
			.attr("x",function(d,i){return 100+(rectWidth+padding)*i +rectWidth/2;})
		 	.attr("y",function(){return 300+rectHeight/5*3;})
			.attr("fill","black")
			.attr("font-family","Consolas")
			.attr("font-size","20px")
			.attr("text-anchor","middle")
			.attr("id",function(d,i){return "textIdx"+i;});

		queue.append("text")
			.text("top →")
			.attr("x",function(){return 300-rectWidth/2;})
		 	.attr("y",function(){return 700-(rectHeight+padding)*top +rectHeight/5*3;})
			.attr("fill","black")
			.attr("font-family","Consolas")
			.attr("font-size","20px")
			.attr("text-anchor","middle");
	
	}

	
	var mouseOver = function(d,i){
		//console.log(d3.select(this));
		d3.select("#rectIdx"+i)
		.attr("fill","#FA812F")
		.attr("width",rectWidth*1.1)
		.attr("height",rectHeight*1.1)
		.attr("transform","translate("+(-rectHeight*0.05)+","+(-rectWidth*0.05)+")");

		
		queue.append("text")
		.text(function(){return "queue["+i+"] = "+ queueData[i];})
		.attr("font-family","Consolas")
		.attr("font-size","20px")
		.attr("fill","black")
		.attr("id","arrInfo")
		.attr("x",function(){return 300+rectWidth*1.5;})
		.attr("y",function(){return 700-(rectHeight+padding)*i +rectHeight/5*3;})
		
	}

	var mouseOut = function(d,i){
		d3.select(this)
		.attr("fill","#FAAF08")
		.attr("width",rectWidth)
		.attr("height",rectHeight)
		.attr("transform","translate(0,0)");

		d3.select("#arrInfo").remove();
		
		
	}

	

	// function dragstarted(d) {
	//   d3.event.sourceEvent.stopPropagation();
	//   d3.select(this).classed("dragging", true);
	// }

	// function dragged(d) {
	//   d3.select(this).attr("cx", d.x = d3.event.x).attr("cy", d.y = d3.event.y);
	// }

	// function dragended(d) {
	//   d3.select(this).classed("dragging", false);
	// }

	function zoomed() {
	//	console.log("zooom");
	 	container.attr("transform", d3.event.transform);
	}

	return {
		Push : Push,
		Pop : Pop,
		drawQueue : drawQueue
	};
}

var queueEnqueue = function (_data){
	a.Push(_data.elements[0].value,function(){});
	//a.drawQueue();
}

var queueDequeue = function(){
	a.Pop(function(){});
}

var a = new queue();
a.drawQueue();
