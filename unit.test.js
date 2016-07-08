QUnit.module("unit.test.js", function (hooks) {


	function ArrayModule(){
		var value = [];
		var fontColor = [];
		var backgroundColor = [];

		var Push = function(_value, _fontColor, _backgroundColor){
			value.push(_value);
			fontColor.push(_fontColor);
			backgroundColor.push(_backgroundColor);
		};

		var getValue = function(idx){
			return value[idx];
		};
		
		return {
			getValue : getValue,
			Push : Push
		};
	}
	
	QUnit.test( "hello test", function( assert ) {
		var a = new ArrayModule();
		var a2 = new ArrayModule();
		//a.Push(1);
		//a2.PUsh(2);
		console.log(a);
		console.log(a2);
		//var a2 = new ArrayModule;
		a.Push(1,"red","white");
		a2.Push(2,"black","blue");
		var t = a.getValue(0);
		assert.ok(a.getValue(0) === 1);
		t = 2 ;
		assert.ok(t=== 2);
		assert.ok(a.getValue(0) === 2);

		assert.ok(a2.getValue(0) === 2);
		//assert.ok(1=="1");
		//assert.ok(a.a ===1);
	});


});


