

function hash(){


    var zoom = d3.zoom()
    .scaleExtent([0.1,10])
    .on("zoom",zoomed);

	var container = d3.select("#section1")
	.append("svg")
	.attr("width",1000)
	.attr("height",800)
	.attr("id","container")
	.append("g");
   	



	var MAX_TABLE = 4096
	var hash;
	var hashData = [];
	
	var top = -1;
	var rectWidth = 200;
	var rectHeight = 500/MAX_TABLE;

	var padding = 250/MAX_TABLE;

	var init = function(){
		for(var i = 0; i < MAX_TABLE; i++){
			hashData.push({key: "", data:""});
		}
	}

	var Push = function(_value, done){
		var newElem;

		top++;
		hashData.push(_value);

		async.series([
			function(callback){
				setTimeout(function(){

					var position = 700-(rectHeight+padding)*top;
					var distance = 300;

					newElem = container.append("g");
					 newElem.append("rect")
						.attr("x",300)
						.attr("y",position-distance)
						.attr("width",rectWidth)
						.attr("height",rectHeight)
						.attr("fill","#FAAF08")
						.attr("rx",10)
						.attr("ry",10);

					newElem.append("text")
						.text(_value)
						.attr("x",function(){return 300+rectWidth/2;})
					 	.attr("y",function(){return position-distance+rectHeight/5*3;})
						.attr("fill","black")
						.attr("font-family","Consolas")
						.attr("font-size","20px")
						.attr("text-anchor","middle");
		

					newElem.transition()
						.attr("transform","translate(0,"+distance+")").ease(d3.easeSinOut);
						callback(null);
						//newElem.remove().exit();
				},700);
			},
			function(callback){
				setTimeout(function(){
					newElem.remove().exit();
					drawHash();

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

		var _value = hashData[top];
		hashData.pop();
		top--;

		async.series([
			function(callback){
				setTimeout(function(){
	
					drawHash();
					var position = 700-(rectHeight+padding)*(top+1);
					var distance = 300;

					newElem = container.append("g");
					 newElem.append("rect")
						.attr("x",300)
						.attr("y",position)
						.attr("width",rectWidth)
						.attr("height",rectHeight)
						.attr("fill","#FAAF08")
						.attr("rx",10)
						.attr("ry",10);

					newElem.append("text")
						.text(_value)
						.attr("x",function(){return 300+rectWidth/2;})
					 	.attr("y",function(){return position+rectHeight/5*3;})
						.attr("fill","black")
						.attr("font-family","Consolas")
						.attr("font-size","20px")
						.attr("text-anchor","middle");
		
					
					newElem.transition()
						.attr("transform","translate(0,"+(-distance)+")").ease(d3.easeSinOut);
						callback(null);
						
				},700);
			},
			function(callback){
				setTimeout(function(){
					newElem.remove().exit();
					drawHash();
					callback(null);
				},500);
			}
		], function(err, results){
			done();
			console.log("완료");
		});
	}


	var drawHash = function(){
		
		if( hash !== undefined){
			hash.remove().exit();
		}

		if(hashData.length === 0)
			return ;
		d3.selectAll("#container").call(zoom);


		hash = container.append("g");
		hash.selectAll("g.rect")
			.data(hashData)
			.enter()
			.append("rect")
			.attr("x",300)
			.attr("y",function(d,i){return 30+(rectHeight+padding)*i;})
			.attr("width",rectWidth)
			.attr("height",rectHeight)
			.attr("rx",10)
			.attr("ry",10)
			.attr("fill","#FFCCAC")
			.attr("id",function(d,i){return "rectIdx"+i;})
			.attr("opacity",1.0)
			.on("mouseover",mouseOver)
			.on("mouseout",mouseOut);

		// hash.selectAll("g.text")
		// 	.data(hashData)
		// 	.enter()
		// 	.append("text")
		// 	.text(function(d,i){return d;})
		// 	.attr("x",function(){return 300+rectWidth/2;})
		//  	.attr("y",function(d,i){return 700-(rectHeight+padding)*i +rectHeight/5*3;})
		// 	.attr("fill","black")
		// 	.attr("font-family","Consolas")
		// 	.attr("font-size","20px")
		// 	.attr("text-anchor","middle")
		// 	.attr("id",function(d,i){return "textIdx"+i;});

		// hash.append("text")
		// 	.text("top →")
		// 	.attr("x",function(){return 300-rectWidth/2;})
		//  	.attr("y",function(){return 700-(rectHeight+padding)*top +rectHeight/5*3;})
		// 	.attr("fill","black")
		// 	.attr("font-family","Consolas")
		// 	.attr("font-size","20px")
		// 	.attr("text-anchor","middle");
	
	}

	
	var mouseOver = function(d,i){
		//console.log(d3.select(this));
		d3.select("#rectIdx"+i)
		.attr("fill","#C60000")
		.attr("width",rectWidth*1.01)
		.attr("height",rectHeight*10)
		.attr("transform","translate("+(-rectHeight*5)+","+(-rectWidth*0.005)+")");

		
		hash.append("text")
		.text(function(){
			var str = "Hash["+ i +"] : " ;
			if( hashData[i].key !== undefined)
				str += "key = "+hashData[i].key;
			
			
			if( hashData[i].data !== undefined)
				str += " , data = "+ hashData[i].data;


			return str;})
		.attr("font-family","Consolas")
		.attr("font-size","20px")
		.attr("fill","black")
		.attr("id","arrInfo")
		.attr("x",function(){return 300+rectWidth*1.1;})
		.attr("y",function(){return 30+(rectHeight+padding)*i+rectHeight*50})
		
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
		init : init,
		Push : Push,
		Pop : Pop,
		drawHash : drawHash
	};
}

var add = function (_data){
	console.log(_data.elements[0].value);
	console.log(_data.elements[1].value);
	a.Push(_data.elements[0].value,function(){});
	//a.drawHash();
}

var find = function(_data){
	console.log(_data.elements[0].value);
	console.log(_data.elements[1].value);
	a.Pop(function(){});
}

var a = new hash();
a.init();
a.drawHash();
