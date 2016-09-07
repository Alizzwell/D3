function Array2(){
	 var zoom = d3.zoom()
    .scaleExtent([0.1,10])
    .on("zoom",zoomed);
	var container =  d3.select("#section1")
					.append("svg")
					.attr("width",1000)
					.attr("height",1000)
					.attr("id","container")
					.append("g");

	var N = 100;
	var value = [];
	var arr,visit;
	
	var rectWidth = 10;
	var rectHeight = 10;
	var padding = 0;
	var arrive = 0;
	var sx, sy, queue = [], front , back,ex,ey, PQ, pqSize;

	var setData = function(){
		//console.log(input);
		var inputText =  input.split('\n');
		for(var i =0 ; i < 100; i++){
			var tmp = [];
			for(var j = 0 ; j < 100; j++){
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

		PQ = new Array(N*N + 1);
		visit = new Array(N);
		for(var i = 0; i < N; i++){
			visit[i] = new Array(N);
			for(var j = 0; j< N; j++)
				visit[i][j] = 0;
		}
		pqSize = 0;
		drawArray();
		////console.log(inputText[0] +'\n'+inputText[1]);
		//console.log(arr[0] +'\n'+arr[1]);
	}

	var init = function(){
		visit = new Array(row);
		for(var i = 0; i < row; i++){
			visit[i] = new Array(column);
			for(var j = 0; j< column; j++)
				visit[i][j] = 0;
		}

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
			.append("rect")
			.attr("id",function(d,i){return "rectIdx"+(rectNum++);})
			.attr("x",function(d,i){return (rectHeight+padding)*i;})
			.attr("y",0)
			.attr("fill",function(d){
				if( d == 1)
					return "1E1F26";//#011A27";
				else if( d == 2)
					return "red";
				else if( d == 3)
					return "green";
				else return "#F1F1F2";
			})
			.attr("width",rectWidth)
			.attr("height",rectHeight);
			//.attr("opacity",0.5);
	

	
		


		
	}

	var ABS = function(x){
		if( x <= 0)
			return -x;
		return x;
	}

	var swap = function(i,j){
		var tmp = PQ[i];
		PQ[i] = PQ[j];
		PQ[j] = tmp;
	}

	var pqPush = function(i,j,pg){
		visit[i][j] = 1;
		PQ[++pqSize] = {x:i, y:j, g : pg+1, h : ABS(i-ex)+ABS(j-ey)};
		var idx = pqSize;
		while(idx >= 2){
			var par = parseInt(idx/2);

			if( PQ[par].g + PQ[par].h > PQ[idx].g + PQ[idx].h){
				swap(par,idx);
				idx = parseInt(idx/2);
			}
			else
				break;

		}
		//console.log("push"+i + " " +j + " " + pg);
		//console.log(pqSize);
		console.log(PQ[pqSize]);
	}

	var pqPop = function(){
		var ret = PQ[1];
		console.log(ret);
		PQ[1] = PQ[pqSize--];
		var idx = 1;
		while(idx * 2 <= pqSize){
			var child = idx * 2;
			if( child+1 <= pqSize && PQ[child].g + PQ[child].h > PQ[child+1].g + PQ[child+1].h )
				child++;
			if( PQ[child].g + PQ[child].h < PQ[idx].g + PQ[idx].h){
				swap(PQ[child],PQ[idx]);
				idx = child;
			}
			else
				break;

		}
		return ret;
	}

	// var qPush = function(i,j){
	// 	visit[i][j] = 1;
	// 	queue.push({x:i, y:j});
	// 	++back;
	// }

	var go = function(){

		var curBack = back;
		pqPush(sx,sy,0);

		var t = 0;
		
		var fn = function () {
			console.log("fn!!!!");
			if(arrive)
				return ;
			if (pqSize) {
				fn2(fn)
			}
		}


		function fn2(ff) {
			if( arrive || pqSize == 0 ) return ;
			var top ;
			async.series([
			function(callback){
				top = pqPop();
				console.log("top" + top);
				d3.select("#rectIdx"+(top.x*N+top.y))
					.attr("fill","#EFB509");//"#A4CABC");
				console.log(d3.select("#rectIdx"+(top.x*N+top.y)));
				if( top.x == ex && top.y == ey){
					arrive = 1;
				}
				// for(var i = front; i<= back && arrive == 0; i++){
				// 		//onsole.log("i : " + i +" qx : "+ queue[i].x + " qy : "+ queue[i].y);
				// 		d3.select("#rectIdx"+(queue[i].x*N+queue[i].y))
				// 			.attr("fill","#EFB509");//"#A4CABC");
				// 		if( queue[i].x == ex && queue[i].y == ey){
				// 			arrive = 1;
				// 		}
				// 	}

					callback(null);
			},
			function(callback){
				var dx = [-1,1,0,0];
				var dy = [0,0,-1,1];
				var cx = top.x, cy = top.y;
				for(var j = 0; j < 4; j++){
					var nx = cx + dx[j];
					var ny = cy + dy[j];
					if( nx >= 0 && nx < N &&
						ny >= 0 && ny < N &&
						(value[nx][ny] == 0 || value[nx][ny] == 3) && visit[nx][ny] ==0){
						pqPush(nx,ny,top.g);

						}
					
				}
				callback(null);
			},
			function(callback){
				setTimeout(function(){
				// 	front = curBack+1;
				// 	//console.log("front : "+front + " back : "+back);
			
				// //	console.log(front + " f " + back);
					callback(null);
				},0);
			}
			], function(err, results){
				//console.log("완료");
				ff();
			});
		}

		fn2(fn);
		
			
		
	}

	function zoomed() {
		// console.log("zooom");
	 	container.attr("transform", d3.event.transform);
	}

	return {
		setData : setData,
		init : init,
		drawArray : drawArray,
		go : go
	};
}

var file = document.querySelector('#inputFile');
var input;
file.onchange = function(){

	var reader = new FileReader();
	reader.readAsText(file.files[0]);

	reader.onload = function(){
		input = reader.result;
		var a = new Array2();
		a.setData();
		a.go();
	};

};

