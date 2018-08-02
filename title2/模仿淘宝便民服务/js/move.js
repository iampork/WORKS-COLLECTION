	function startMove(obj,json,fn){
		clearInterval(obj.timer);
		obj.timer=setInterval(function(){
			var flag = true;
			for(var attr in json){// json是一个轻量级的数据交换格式
				var icur = 0;
				if(attr=='opacity'){
					var icur=Math.round(parseFloat(getStyle(obj,attr))*100);
				}else{
					var icur=parseInt(getStyle(obj,attr));
				}
				var speed=(json[attr]-icur)/2;//缓冲运动
				speed=speed>0?Math.ceil(speed):Math.floor(speed);
				if(icur!=json[attr]){
					flag=false;
				}
				if (attr == 'opacity') {
						obj.style.filter = 'alpha(opacity:'+(icur+speed)+')';
						obj.style.opacity=(icur+speed)/100;
					} else {
						obj.style[attr]=icur+speed+'px';
					}
				}
			if(flag){
				clearInterval(obj.timer);
				if(fn){
					fn();
				}
			}
		},30)
	}
	function getStyle(obj,attr){
		if(obj.curentStyle){
			return curentStyle[attr];
		}else{
			return getComputedStyle(obj,false)[attr];
		}
	}