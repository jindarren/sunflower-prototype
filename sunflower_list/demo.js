/*
@author: Jin
*/

/*---------script for scroll list---------*/
var title = ''

$(document).ready(function(){
	$('#extra-list').hide()

	$('#more-btn').click(function(){
		$('#default-list').hide(500);
		$('#extra-list').show(500, function(){
			$('.item-border').click(function(){
				console.log($(this).text())
				$('#selected-val').text($(this).text());
			})
		})
	})

	$('#extra-list').click(function(){
		$('#extra-list').hide(500);
		$('#default-list').show(500);
	})

})


var loadData = function(path){
	$.getJSON(path, function(data){
		$.each(data,function(key,value){
			createList(value)
		})
	})
}

var checkColNum = function(data,name){
	$('#extra-list').append("<span class="+name+">"+data+"</span>")
}

var createList = function(data){
	if(data.charAt(0) != title){
		title = data.charAt(0)
		checkColNum(title, "title-border")
	}
	checkColNum(data, "item-border")
}

loadData("country_en.json")

$('.item-border').click(function(){
	console.log($(this).text())
	$('#selected-val').text($(this).text());
})

/*
---------script for menu---------
*/

var level =0
var makeMenu = function(level, numOfItem){
	$(".m-menu").append("<ul class ='level', id= level-"+level+"></ul>")
	for(var interationIndex = 0; interationIndex<numOfItem; interationIndex++)
		$("#level-"+level).append("<li>Item "+interationIndex+"</li>")

	
	$("#level-"+level).mouseover(function(){


			var index = $(this).attr("id").replace(/[^0-9]+/g, '');
			$(".m-menu ul:gt("+index+")").remove()
			level=index
	
	})

	// $("#level-"+level).mouseout(function(){
	// 	$(this).remove()
	// })


		$("#level-"+level).click(function(){
		var index = $(this).attr("id").replace(/[^0-9]+/g, '');
		console.log("index-"+index)
		console.log("level-"+level)
		console.log(index==level)
		if(index==level){
			console.log("i do")
			level++
			makeMenu(level, 5)
		}

		})
	}

makeMenu(0,5)














