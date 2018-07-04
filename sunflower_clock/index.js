var hour_rect = $('g:eq(0) rect');
var minute_rect = $('g:eq(1) rect');
var second_rect = $('g:eq(2) rect');

var hour_text = $('g:eq(0) text')
var minute_text = $('g:eq(1) text')
var second_text = $('g:eq(2) text')

var second_line = $('#rotate-second')
var minute_line = $('#rotate-minute')
var hour_line = $('#rotate-hour')

var second_line_len = 0.95
var minute_line_len = 0.8
var hour_line_len = 0.6

var width = $(window).get(0).innerWidth
var height = $(window).get(0).innerHeight
var radius = Math.min(height*0.5, width*0.4)-20

var now = new Date()

var second = now.getUTCSeconds();
var minute = now.getUTCMinutes() + second/60;
var hour = (now.getUTCHours()-now.getTimezoneOffset()/60)%24 + minute/60;

var initiateTime = function(){

	if(second<60){
		second++
		minute += 1/60
		hour += 1/3600
	}
	if(second==60)
		second=0

	if(minute>=60){
		second=0
		minute=0
	}

	if(hour>=24){
		second=0
		minute=0
		hour=0
	}
		
	

	console.log((24.012222222222274>=24))
	console.log(hour,minute,second)

	hour_text.text(parseInt(hour) + " \u65f6")
	minute_text.text(parseInt(minute) + " \u5206")
	second_text.text(second + " \u79d2")
	
}

var runInterval = setInterval("initiateTime(); drawTimeLines()",1000)



var setlinesPosition = function (line, text, index){
	line.attr('x1',width * 0.4)
	line.attr('y1',height * 0.5)
	line.attr('x2', width * 0.4 + radius * Math.sin(Math.PI*index/6))
	line.attr('y2', height * 0.5 - radius * Math.cos(Math.PI*index/6))
	line.attr('stroke','#242424')
	line.attr('stroke-width','4')
	text.attr('x', width * 0.4 + radius * 0.85 * Math.sin(Math.PI*index/6))
	text.attr('y', height * 0.5 - radius * 0.85 * Math.cos(Math.PI*index/6)+radius*0.07)
	text.attr('text-anchor','middle')
}

var createLines = function(num){

	var circle_lines = document.getElementById("circle-lines")
	var hour = document.getElementById("rotate-hour")
	var group = document.getElementsByTagName('g')[3]
	// var new_group = document.createElementNS('http://www.w3.org/2000/svg','g')	
	for(var i=0; i<num; i++){

		var line = document.createElementNS('http://www.w3.org/2000/svg','line')
		var clock_num = document.createElementNS('http://www.w3.org/2000/svg','text')
		if(i==0)
			var clock_num_text = document.createTextNode(12)
		else
			var clock_num_text = document.createTextNode(i)

		clock_num.appendChild(clock_num_text);
		group.insertBefore(line,circle_lines)
		group.insertBefore(clock_num,hour)

		setlinesPosition($('g:eq(3) line:eq('+i+')'), $('g:eq(3) text:eq('+i+')'), i)
	}

}
createLines(12)

var calAngel = function(s, m, h, r){
	var coors = []
	coors[0] = r * Math.sin(s/60 * Math.PI*2)
	coors[1] = r * Math.cos(s/60 * Math.PI*2)
	coors[2]= r * Math.sin(m/60 * Math.PI*2) * minute_line_len
	coors[3] = r * Math.cos(m/60 * Math.PI*2) * minute_line_len
	coors[4] = r * Math.sin(h/12 * Math.PI*2) * hour_line_len
	coors[5] = r * Math.cos(h/12 * Math.PI*2) * hour_line_len
	return coors
}

// var adaptTransform = function(x1,y1,x2,y2,obj){
// 	if(x1<=x2 && y1>y2)
// 		obj.css('transform-origin','0% 100%')
// 	else if(x1<x2 && y1<=y2)
// 		obj.css('transform-origin','0% 0%')
// 	else if(x1>=x2 && y1<y2)
// 		obj.css('transform-origin','100% 0%')
// 	else if(x1>x2 && y1>=y2)
// 		obj.css('transform-origin','100% 100%')
// }


$(window).resize(resizeCanvas);
 function resizeCanvas() {
 		width = $(window).get(0).innerWidth
		height = $(window).get(0).innerHeight

 		var svg_time = $('#timepad');

 		svg_time.attr("width", width*0.2);
        svg_time.attr("height", height);

		var rect_gap = 10
		var rect_height = (height - 4*rect_gap)/3
		var rect_width = (width - 2*rect_gap)

		hour_rect.attr('x', rect_gap)
		hour_rect.attr('y', rect_gap)
		hour_rect.attr('width', rect_width);
		hour_rect.attr('height', rect_height)
		hour_text.attr('x', '50%')
		hour_text.attr('y', rect_gap+rect_height/2)
		hour_text.attr('text-anchor', 'middle')

		minute_rect.attr('x',rect_gap)
		minute_rect.attr('y', rect_height + rect_gap*2)
		minute_rect.attr('width',rect_width)
		minute_rect.attr('height',rect_height)
		minute_text.attr('x', '50%')
		minute_text.attr('y', '50%')
		minute_text.attr('text-anchor','middle')

		second_rect.attr('x',rect_gap);
		second_rect.attr('y',rect_height*2 + rect_gap*3)
		second_rect.attr('width',rect_width)
		second_rect.attr('height',rect_height)
		second_text.attr('x','50%');
		second_text.attr('y',rect_height*5/2 + rect_gap*3);
		second_text.attr('text-anchor','middle')

		// draw clock panel
 		var svg_clock = $('#clockpad');

		var circle_clock = $('g:eq(3) circle:eq(0)');
		var circle_for_lines = $('g:eq(3) circle:eq(1)');
		var point = $('g:eq(3) circle:eq(2)');

		radius = Math.min(height*0.5, width*0.4)-20

		svg_clock.attr("width", width*0.8);
        svg_clock.attr("height", height);

		circle_clock.attr('cx',width * 0.4);
		circle_clock.attr('cy',height * 0.5);
		circle_clock.attr('r',radius);

		circle_for_lines.attr('cx',width * 0.4);
		circle_for_lines.attr('cy',height * 0.5);
		circle_for_lines.attr('r',radius * 0.95);

		point.attr('cx',width * 0.4);
		point.attr('cy',height * 0.5);
		point.attr('r',radius * 0.01);

		for(var i=0; i<12; i++){
			setlinesPosition($('g:eq(3) line:eq('+i+')'), $('g:eq(3) text:eq('+i+')'), i)
		}

		drawTimeLines()
		
 };

var drawTimeLines = function(){
	//get current time

		var line_coors = calAngel(second, minute, hour, radius)

		second_line.attr('x1',width * 0.4)
		second_line.attr('y1',height * 0.5)
		second_line.attr('x2',width * 0.4 + line_coors[0])
		second_line.attr('y2',height * 0.5 - line_coors[1])
		second_line.attr('stroke','#FF0000')
		second_line.attr('stroke-width','2')
		// adaptTransform(width * 0.4,height * 0.5, width * 0.4 + line_coors[0], height * 0.5 - line_coors[1], second_line);

		minute_line.attr('x1',width * 0.4)
		minute_line.attr('y1',height * 0.5)
		minute_line.attr('x2',width * 0.4 + line_coors[2])
		minute_line.attr('y2',height * 0.5 - line_coors[3])
		minute_line.attr('stroke','#656565')
		minute_line.attr('stroke-width','3')
		// adaptTransform(width * 0.4,height * 0.5, width * 0.4 + line_coors[2], height * 0.5 - line_coors[3], minute_line);


		hour_line.attr('x1',width * 0.4)
		hour_line.attr('y1',height * 0.5)
		hour_line.attr('x2',width * 0.4 + line_coors[4])
		hour_line.attr('y2',height * 0.5 - line_coors[5])
		hour_line.attr('stroke','#656565')
		hour_line.attr('stroke-width','4')
		// adaptTransform(width * 0.4,height * 0.5, width * 0.4 + line_coors[4], height * 0.5 - line_coors[5], hour_line);
}

resizeCanvas();


var setMode = false;
var setHour = false;
var setMinute = false;
var setSecond = false;
var ctx = $('canvas').get(0).getContext("2d");


$('canvas').click(function(){
	setMode = false
	setHour = false;
	setMinute = false;
	setSecond = false;
	$(this).hide();
})

$("canvas").mousemove(function(e){
	if(setMode){

		var cursor_angel = Math.PI - Math.atan2(e.pageX-width/2, e.pageY-height/2)
		var ratio = cursor_angel / (2*Math.PI)
		
		var text_x = Math.min(width, height)/2.3 * Math.sin(Math.PI-cursor_angel) + width/2
		var text_y = Math.min(width, height)/2.3 * Math.cos(Math.PI-cursor_angel) + height/2
		
		ctx.font="40px Arial";

		function updateTime(time, total){


			ctx.strokeStyle = "#000000"
			ctx.lineWidth =Math.min(width, height)/2 - Math.min(width, height)/3.8
			ctx.beginPath();
			ctx.arc(width/2,height/2,Math.min(width, height)/3,0,2*Math.PI);
			ctx.stroke();
			ctx.fillStyle="#FFFFFF";
			if(time>=0 && time<=total/4)
				ctx.fillText(time, text_x-55, text_y+25)
			else if (time>total/4 && time<=total/2)
				ctx.fillText(time, text_x-55, text_y)
			else if (time>total/2 && time<=total*3/4)
				ctx.fillText(time, text_x, text_y)
			else if (time>total*3/4 && time<=total)
				ctx.fillText(time, text_x, text_y+25)
			ctx.strokeStyle = "#8000FF"
			ctx.lineWidth = 30
			ctx.beginPath();
			ctx.arc(width/2,height/2,Math.min(width, height)/2.1,-Math.PI/2,cursor_angel-Math.PI/2);
			ctx.stroke();

			ctx.strokeStyle = "#F2F2F2"
			ctx.lineWidth = 30
			ctx.beginPath();
			ctx.arc(width/2,height/2,Math.min(width, height)/2.1,cursor_angel-Math.PI/2,3*Math.PI/2);
			ctx.stroke();

			//redraw the original circle
			console.log(cursor_angel)
			if(cursor_angel>6.27){
				ctx.strokeStyle = "#F2F2F2"
				ctx.lineWidth = 30
				ctx.beginPath();
				ctx.arc(width/2,height/2,Math.min(width, height)/2.1,0,2*Math.PI);
				ctx.stroke();
			}
		}

		if(setHour){
			hour = parseInt(24*ratio) + minute/60
			//$('#setting-hour').text(parseInt(24*ratio))
			updateTime(parseInt(24*ratio),24)

		}
		else if(setMinute){
			minute = parseInt(60*ratio) + second/60
			hour = parseInt(hour) + minute/60
			//$('#setting-minute').text(parseInt(60*ratio))
			updateTime(parseInt(60*ratio),60)

		}
		else if(setSecond){
			second = parseInt(60*ratio)
			minute = parseInt(minute) + second/60
			hour = parseInt(hour) + minute/60
			//$('#setting-second').text(parseInt(60*ratio))
			updateTime(parseInt(60*ratio),60)

		}
	}
})


$(".time-rect").each(function(){
	$(this).click(function(){
		var time_unit = $(this).children('rect').attr('id');
		setTime(time_unit)
		setMode = true;
		$('canvas').show();
		$('canvas').get(0).width = width
		$('canvas').get(0).height = height
		ctx.fillStyle="#000000";
		ctx.fillRect(0,0,width,height);
		ctx.strokeStyle = "#F2F2F2"
		ctx.lineWidth = 30
		ctx.beginPath();
		ctx.arc(width/2,height/2,Math.min(width, height)/2.1,0,2*Math.PI);
		ctx.stroke();
	})
})

var setTime = function (timeunit){
	switch (timeunit){
		case 'hour':
			setHour = true
			break
		case 'minute':
			setMinute = true
			break
		case 'second':
			setSecond = true
			break
	}
}
