function ArrayModule(){
	var value = [];
	var fontColor = [];
	var backgroundColor = [];
		
	var container = d3.select("body")
						.append("svg")
						.attr("width",1000)
						.attr("height",1000)
						.append("g");

	var Concat = function(_value){
		value = value.concat(_value);
	};

	
	var Push = function(_value, _fontColor, _backgroundColor){
		value.push(_value);
		fontColor.push(_fontColor);
		backgroundColor.push(_backgroundColor);
	};

	var getValue = function(idx){

		return value[idx];
	};


	var redraw = function(array){
		// var text = container.append("text").text(p).attr("x",100).attr("y",100);
		//text.transition().duration(1000).remove();

		//var text = container.selectAll("text").data([1,2,3]).enter().append("text").text(function(d){return d;}).attr("x",100).attr("y",function(d,i){return 100+i*100});
		//text.transition().duration(1000).remove();
		var text2 = container.selectAll("text.arr1").data(array).enter().append("text").text(function(d){return d;}).attr("x",100).attr("y",function(d,i){return 50+i*100});
		text2.transition().duration(1000).attr("opacity",100).remove();
		text2.exit();
	}

	var drawArray = function(){
		var text = container.selectAll("text.arr")
							.data(value)
							.enter()
							.append("text")
							.text(function(d){return d;})
							.attr("x",function(d,i){return 100+100*i;})
							.attr("y",100);
		text.transition().duration(1000).attr("opacity",100).remove();
		text.exit();

		// container = d3.select("body")
		// .append("svg")
		// .attr("width",1000)
		// .attr("height",1000);

		// text = container.selectAll("text")
		// .data(value)
		// .enter()
		// .append("text")
		// .attr("x",function(d,i){return 50+i*50})
		// .attr("y",100)
		// .text(function(d){return d;})
		// .attr("font-family","sans-serif")
		// .attr("font-size","20px")
		// .attr("fill","black");
		

		
	};
	
	var InsertionSortCall = function(i,j,len,temp){
		async.series([
			function(callback){
				setTimeout(function () {
					drawArray();
					callback(null);
				},1000);
			},
			function(callback){
				if(i >= len)
					return;
				else if( temp < value[j] && j>= 0){
					value[j+1] = value[j];
					InsertionSortCall(i,j-1,len,temp);
				}
				else{
					value[j+1] = temp;
					InsertionSortCall(i+1,i,len,value[i+1]);
				}
			}
		],function(err,result){
			console.log(err);
		});

	}


	var InsertionSort = function(){
			// var temp;
			// var i;
			// var j;
			// var len = value.length;
			
			// for(i = 1; i < len; i++){
			// 	temp = value[i];
			// 	j = i-1;
			// 	while((temp < value[j]) && (j>=0)){
			// 		value[j+1] = value[j];
			// 		j = j-1;
			// 	}

			// 	value[j+1] = temp;
				
			// }
			InsertionSortCall(1,0,value.length,value[1]);
			console.log(1);
	}


	return {
		getValue : getValue,
		Push : Push,
		Concat : Concat,
		drawArray : drawArray,
		InsertionSort : InsertionSort,
		redraw : redraw
	};
}


var a = new ArrayModule();
var arr = [5,4,3,2,1];
a.Concat(arr);
a.InsertionSort();