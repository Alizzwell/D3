var sstatus = 0;


function Array2(){
	 var zoom = d3.zoom()
    .scaleExtent([0.1,20])
    .on("zoom",zoomed);
	var container =  d3.select("#section1")
					.append("svg")
					.attr("width",N0)
					.attr("height",N0)
					.attr("id","container")
					.append("g");

	var N = 10;
	var value = [];
	var arr,visit;
	
	var rectWidth = 10;
	var rectHeight = 10;
	var padding = 0;
	var arrive = 0;
	var sx, sy, queue = [], front , back,ex,ey;

	var init = function(){
		//console.log(input);
		var inputText =  input.split('\n');
		for(var i =0 ; i < N; i++){
			var tmp = [];
			for(var j = 0 ; j < N; j++){
				tmp.push(parseInt(inputText[i][j]));
				if(inputText[i][j] == 2){
					sx = i;
					sy = j;
					//console.log(i+" "-j);
				}
				else if(inputText[i][j] == 3){
					ex = i;
					ey = j;
					// console.log("end : " + ex +" "+ ey);
				}
			}
			value.push(tmp);
		}

		visit = new Array(N);
		for(var i = 0; i < N; i++){
			visit[i] = new Array(N);
			for(var j = 0; j< N; j++)
				visit[i][j] = 0;
		}
		front = 0, back = -1;
		drawArray();
		////console.log(inputText[0] +'\n'+inputText[1]);
		//console.log(arr[0] +'\n'+arr[1]);

		qPush(sx,sy);
	}



	

	var drawArray = function(){
		console.log("draw");
		if( arr !== undefined ){
			arr.remove().exit();
		}
		d3.selectAll("#container").call(zoom);


		var rectNum = 0;

		arr = container.append("g");
		arr.selectAll("g.arr")
			.data(value)
			.enter()
			.append("g")
			.attr("transform", function(d,i){
				return "translate(0,"+(padding+rectHeight)*i+")";
			})
			.selectAll("g.rect")
			.data(function(d){return d;})
			.enter()
			.append("image")
			.attr("id",function(d,i){return "rectIdx"+(rectNum++);})
			.attr("x",function(d,i){return (rectHeight+padding)*i;})
			.attr("y",0)
			.attr("xlink:href",function(d){
				if( d == 1)
					return "vlc.png";//#011A27";
				else if( d == 2)
					return "red";
				else if( d == 3)
					return "green";
				else return "grass.jpg";
			})
			.attr("width",rectWidth)
			.attr("height",rectHeight);
			//.attr("opacity",0.5);
	

		container
		.append("image")
		.attr("id","car")
		.attr("xlink:href","car.png")
		.attr("x",sx*(rectWidth+padding))
		.attr("y",sy*(rectHeight+padding))
		.attr("width",10)
		.attr("height",10);
		


		
	}


	var highlight = function(i){
		async.series([
			function(callback){
				setTimeout(function(){
					d3.select("#rectIdx"+i).transition().attr("fill","#E99787").attr("opacity",0.8);
					// d3.select("#rectIdx"+i).transition().attr("opacity",0.8);
					// d3.select("#rectIdx"+i).transition().attr("opacity",0.5);
					callback(null);
				},300);
			},
			function(callback){
				setTimeout(function(){
					d3.select("#rectIdx"+i).transition().attr("opacity",0.5);
					callback(null);
				},300);
			}
			], function(err, results){
				console.log("완료");
			});
	}

	var unhighlight = function(i){
		async.series([
			function(callback){
				setTimeout(function(){
				 	d3.select("#rectIdx"+i).transition().attr("fill","#EED8C9");
					callback(null);

				},300);
			}
			], function(err, results){
				console.log("완료");
			});
	}

	var qPush = function(i,j){
		visit[i][j] = 1;
		queue.push({x:i, y:j});
		++back;
	}


	var curBack;

	var fn = function () {
			if (sstatus == 0) return;

			if(arrive)
				return ;
			if (front <= back) {
				fn2(fn)
			}
		}


		function fn2(ff) {
			if( arrive ) return ;
			async.series([
			function(callback){
				for(var i = front; i<= back && arrive == 0; i++){
						//onsole.log("i : " + i +" qx : "+ queue[i].x + " qy : "+ queue[i].y);
						d3.select("#rectIdx"+(queue[i].x*N+queue[i].y))
							.attr("fill","#EFB509");//"#A4CABC");
						if( queue[i].x == ex && queue[i].y == ey){
							arrive = 1;
						}
					}

					callback(null);
			},
			function(callback){
				var dx = [-1,1,0,0];
					var dy = [0,0,-1,1];
					curBack = back;
					for(var i = front; i <= curBack && !arrive; i++){
						var cx = queue[i].x, cy = queue[i].y;
						for(var j = 0; j < 4; j++){
							var nx = cx + dx[j];
							var ny = cy + dy[j];
							if( nx >= 0 && nx < N &&
								ny >= 0 && ny < N &&
								(value[nx][ny] == 0 || value[nx][ny] == 3) && visit[nx][ny] ==0){
								qPush(nx,ny);

								// d3.select("#rectIdx"+(nx*i+ny))
								// .transition().attr("fill","#red");
								//console.log("nx : "+ nx + "ny: "+ny);
								//visit[nx][ny] = 1;
							}
						}
					}
					callback(null);
			},
			function(callback){
				setTimeout(function(){
					front = curBack+1;
					//console.log("front : "+front + " back : "+back);
			
				//	console.log(front + " f " + back);
					callback(null);
				},0);
			}
			], function(err, results){
				//console.log("완료");
				ff();
			});
		}


	var go = function(){
		curBack = back;
		console.log("go!!1");
		fn2(fn);
	}

	function zoomed() {
		// console.log("zooom");
	 	container.attr("transform", d3.event.transform);
	}

	return {
		init : init,
		drawArray : drawArray,
		highlight : highlight,
		unhighlight : unhighlight,
		qPush : qPush,
		go : go
	};
}

var queueEnqueue = function (_data){
	a.Push(_data.elements[0].value,function(){});
}



var file = document.querySelector('#inputFile');
var input, a;
file.onchange = function(){

	var reader = new FileReader();
	reader.readAsText(file.files[0]);

	reader.onload = function(){
		input = reader.result;
		a = new Array2();
		a.init();
	};

};


var go = function(){
	if (sstatus == 0) {
		sstatus = 1;
		a.go();
	}
}

var stop = function(){
	sstatus = 0; 
}

var oneStep = function(){
	sstatus = 0; 
	a.go();
}
