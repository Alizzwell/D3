function ArrayModule(){
	var value = [];
	var fontColor = [];
	var backgroundColor = [];


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

	var drawArray = function(){
		var container = d3.select("body")
		.append("svg")
		.attr("width",1000)
		.attr("height",1000);

		var text = container.selectAll("text")
		.data(value)
		.enter()
		.append("text");

		var textLabel = text.attr("x",function(d,i){return 50+i*50})
		.attr("y",100)
		.text(function(d){return d;})
		.attr("font-family","sans-serif")
		.attr("font-size","20px")
		.attr("fill","black");

	};
	
	return {
		getValue : getValue,
		Push : Push,
		Concat : Concat,
		drawArray : drawArray
	};
}



var a = new ArrayModule();
var arr = [1,2,3,4,5];
a.Concat(arr);
//assert.ok(a.getValue(4)=== 5);
console.log(a.getValue(4));
a.drawArray();