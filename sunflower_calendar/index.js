var initial_year = 2011
var year_index = 1

$(".box").css('visibility','hidden');
$("#date-input").click(function(){
	$('#date-picker').css('visibility','hidden')
	$(".box").css('visibility','visible');
})

var updateYear = function(initial_year){
	$('#year-bar span').each(function(){
	$(this).text(initial_year)
	initial_year++
	year_index++
	$("#pre-zone span").text($("#year-bar span").eq(0).text())
	$("#next-zone span").text($("#year-bar span").eq(12).text())
})
}

updateYear(initial_year)

$("#next, #pre").each(function(){
	$(this).hover(
		function(){
			$(this).css("transform","scale(1.5)")
	},
		function(){
					$(this).css("transform","scale(1)")
				}
	)

	$(this).click(function(){
		if($(this).attr("id")=="next"){
			initial_year += 13
			updateYear(initial_year)
		}
		else if($(this).attr("id")=="pre"){
			initial_year -= 13
			updateYear(initial_year)
		}
	})
})

var increaseYear = function(){
	initial_year++
	updateYear(initial_year)
}

var decreaseYear = function(){
	initial_year--
	updateYear(initial_year)
}


var increase_1, increase_2, increase_3, decrease_1, decrease_2, decrease_3
var top_val = $("#show-pre").get(0).offsetTop,
 bottom_val = top_val + $("#show-pre").get(0).clientHeight,
 next_left = $("#show-next").get(0).offsetLeft,
 next_right = $('body').get(0).offsetWidth,
 next_1_x = $("#show-next-1").get(0).offsetLeft,
 next_2_x = $("#show-next-2").get(0).offsetLeft,
 next_3_x = $("#show-next-3").get(0).offsetLeft,
 pre_left = $("#show-pre").get(0).offsetLeft,
 pre_right = pre_left + $("#show-pre").get(0).clientWidth,
 pre_1_x = $("#show-pre-1").get(0).offsetLeft,
 pre_2_x = $("#show-pre-2").get(0).offsetLeft,
 pre_3_x = $("#show-pre-3").get(0).offsetLeft
 
 //console.log(top_val, bottom_val, next_left, next_right, next_1_x, next_2_x, next_3_x, pre_left, pre_right, pre_1_x, pre_2_x, pre_3_x)

var month_bar_width = $('#month-bar').width()
var month_block_len = 0
$('.month-block').each(function(){
	month_block_len += $(this).width()
})
var month_block_margin = Math.floor((month_bar_width - month_block_len)/24)

$('.month-block span').css({
	"margin-left":month_block_margin+"px",
	"margin-right":month_block_margin+"px"
})


$('body').mousemove(function(event){

	if($('.box').css('visibility')=='visible'){
		if(event.pageY>top_val && event.pageY<bottom_val && event.pageX>next_left && event.pageX<next_right){

		$("#next-zone span").css("visibility", "visible")

		if(event.pageX > next_left && event.pageX <= next_2_x){
			$('#next-zone i').eq(0).css("visibility", "visible")
			$('#next-zone i').eq(1).css("visibility", "hidden")
			$('#next-zone i').eq(2).css("visibility", "hidden")
			window.clearInterval(increase_2)
			increase_2=null
			window.clearInterval(increase_3)
			increase_3=null
			if(increase_1==null)
				increase_1 = setInterval(increaseYear,500)
		}
		else if(event.pageX > next_2_x && event.pageX <= next_3_x){
			$('#next-zone i').eq(0).css("visibility", "visible")
			$('#next-zone i').eq(1).css("visibility", "visible")
			$('#next-zone i').eq(2).css("visibility", "hidden")
			window.clearInterval(increase_1)
			increase_1=null
			window.clearInterval(increase_3)
			increase_3=null
			if(increase_2==null)
				increase_2 = setInterval(increaseYear,250)
		}
		else if(event.pageX > next_3_x && event.pageX <= next_right){
			$('#next-zone i').eq(0).css("visibility", "visible")
			$('#next-zone i').eq(1).css("visibility", "visible")
			$('#next-zone i').eq(2).css("visibility", "visible")
			window.clearInterval(increase_1)
			increase_1=null
			window.clearInterval(increase_2)
			increase_2=null
			if(increase_3==null)
				increase_3 = setInterval(increaseYear,100)
		}

	}
	else if(event.pageY>top_val && event.pageY<bottom_val && event.pageX>0 && event.pageX<pre_right){
		$("#pre-zone span").css("visibility", "visible")

		if(event.pageX < pre_right && event.pageX >= pre_1_x){
			$('#pre-zone i').eq(0).css("visibility", "visible")
			$('#pre-zone i').eq(1).css("visibility", "hidden")
			$('#pre-zone i').eq(2).css("visibility", "hidden")
			window.clearInterval(decrease_2)
			decrease_2=null
			window.clearInterval(decrease_3)
			decrease_3=null
			if(decrease_1==null)
			decrease_1 = setInterval(decreaseYear,500)
		}
		else if(event.pageX < pre_1_x && event.pageX >= pre_2_x){
			$('#pre-zone i').eq(0).css("visibility", "visible")
			$('#pre-zone i').eq(1).css("visibility", "visible")
			$('#pre-zone i').eq(2).css("visibility", "hidden")
			window.clearInterval(decrease_1)
			decrease_1=null
			window.clearInterval(decrease_3)
			decrease_3=null
			if(decrease_2==null)
			decrease_2 = setInterval(decreaseYear,250)
		}
		else if(event.pageX < pre_2_x && event.pageX > pre_3_x){
			$('#pre-zone i').eq(0).css("visibility", "visible")
			$('#pre-zone i').eq(1).css("visibility", "visible")
			$('#pre-zone i').eq(2).css("visibility", "visible")
			window.clearInterval(decrease_1)
			decrease_1=null
			window.clearInterval(decrease_2)
			decrease_2=null
			if(decrease_3==null)
			decrease_3 = setInterval(decreaseYear,100)
		}
	}
	else{

		$("#next-zone span").css("visibility", "hidden")
		$("#pre-zone span").css("visibility", "hidden")
		$('#next-zone i').eq(0).css("visibility", "hidden")
		$('#next-zone i').eq(1).css("visibility", "hidden")
		$('#next-zone i').eq(2).css("visibility", "hidden")
		window.clearInterval(increase_1)
		increase_1=null
		window.clearInterval(increase_2)
		increase_2=null
		window.clearInterval(increase_3)
		increase_3=null
		$('#pre-zone i').eq(0).css("visibility", "hidden")
		$('#pre-zone i').eq(1).css("visibility", "hidden")
		$('#pre-zone i').eq(2).css("visibility", "hidden")
		window.clearInterval(decrease_1)
		decrease_1=null
		window.clearInterval(decrease_2)
		decrease_2=null
		window.clearInterval(decrease_3)
		decrease_3=null
	}

	}

	
})


$("#date-block").css({
	"position":"fixed",
	"top":$('.year-block').get(0).offsetTop + $('.year-block').get(0).clientHeight,
	"left":$('#year-bar').get(0).offsetLeft + $('#year-bar').get(0).clientWidth/2 - $('#date-block').get(0).clientWidth/2
})



var selected_date = {}
var saved_year, yearSelected = false
$("#year-bar span").each(function(){
	$(this).hover(
		function(){
			$(this).addClass("hover-rect-2")
	},
		function(){
			$(this).removeClass("hover-rect-2")
		}
	)

	$(this).click(
		function(){
			if(saved_year)
				$("#"+saved_year).removeClass("selected-rect-2")
			$(this).addClass("selected-rect-2")
			yearSelected = true
			saved_year = $(this).attr("id")
			selected_date.year =  $(this).text();
			$("#date-block").css("left", $(this).get(0).offsetLeft - $("#date-block").get(0).clientWidth/2)

	}
	)
})

var saved_month, monthSelected = false 
$(".month-block").each(function(){
	$(this).hover(
		function(){
			if(yearSelected)
				$(this).addClass("hover-circle")


	},
		function(){
			$(this).removeClass("hover-circle")

		}
	)

	$(this).click(
		function(){
			if(saved_month)
				$("#"+saved_month).removeClass("selected-circle")
			if(yearSelected){
				$(this).addClass("selected-circle")
				selected_date.month =  $(this).text();

				monthSelected = true
				saved_month = $(this).attr("id")
			}
	}
	)
})


var saved_day
$(".week-block td div").each(function(){
	$(this).hover(
		function(){
			if(monthSelected)
				$(this).addClass("hover-rect")
	},
		function(){
			$(this).removeClass("hover-rect")

		}
	)

	$(this).click(
		function(){
			if(saved_day)
				$("#"+saved_day).removeClass("selected-rect")
			if(monthSelected){
				$(this).addClass("selected-rect")
				saved_day = $(this).attr("id")
				selected_date.day = $(this).text();
			}			
	}
	)
})

$("#confirm img").click(function(){
	$('.box').css('visibility','hidden')
	$('#date-picker').css('visibility','visible')
	if(selected_date.year && selected_date.month && selected_date.day)
		$('#date-picker input').attr('value', selected_date.year+'-'+selected_date.month+'-'+selected_date.day)
})