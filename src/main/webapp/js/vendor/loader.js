function tagLoader(value,tagVal) {
												$.blockUI({
															message : "<p class='loader' style='padding-top: 20px'><img src=\"img/ajax-loader.gif\" width='100' height='100'/><p><div class='hide-for-small'>You're going to fall in love...</div></p></p>",
															css: { backgroundColor: '#fff', color: '#000' }
														});

												if(!tagVal) {
													tagVal = dataValue;
													//alert(tagVal);
												}
												
												var params = {
													tag : tagVal,
													searchSongs: value
												};

												$
														.ajax({
															type : 'GET',
															url : "/hackitaly/hack",
															dataType : 'json',
															data : params,
															success : function(
																	data) {
																//  $("#example").html(JSON.stringify(data));
																 //	alert(JSON.stringify(data));
																
																for (var i = 0; i < data.images.length-2; i+=3) {
																	var dataImg = "<div class=\"row\">"+
																	"<div class=\"large-4 small-12 columns automargin\">"+
																	"<img class='imgEffect' src='" + data.images[i] + "' width=\"400\" height=\"400\"/>"+
																	"</div>"+
																	
																	"<div class=\"large-4 small-12 columns automargin\">"+
																	"<img class='imgEffect' src='" + data.images[i+1] + "' width=\"400\" height=\"400\"/>"+
																	"</div>"+
																	
																	"<div class=\"large-4 small-12 columns automargin\">"+
																	"<img class='imgEffect' src='" + data.images[i+2] + "' width=\"400\" height=\"400\"/>"+
																	"</div>"+
																	"</div>";
																	//		alert(dataImg);
																	$("#example").append(dataImg);
																}

																if(value)
																	playerAppender(data.tracks);
																
																var randomtag=Math.floor(Math.random()*data.tags.length);
																
																var newTag = data.tags[randomtag];
																
																while(tagVal==newTag) {
																	randomtag=Math.floor(Math.random()*(data.tags.length-1));
																	newTag = data.tags[randomtag];
																}
																
																dataValue = newTag;
																
															$.unblockUI();
															verticalScroller();
															}
														});
}


function verticalScroller() {
	setInterval(function(){var pos = $(window).scrollTop(); 
	
	pos = pos + 4;
	$(window).scrollTop(pos);}, 100);
}

function playerAppender(trackIds) {
	
	$("#dz-root").html("");
	
	DZ.init({
		appId : '122045',
		channelUrl : 'http://localhost:8080/hackitaly',
		player : {
			container : 'dz-root',
			onload : function() {
				DZ.player.playTracks(trackIds, 0, function(response){
					console.log("track list", response.tracks);
				});
			}
		}
	});
	
	$("#dz-root").css("display","block");
	//alert(trackIds);
	
	
	//$("#musicPlayer").html("");
	//$("#musicPlayer").append("<iframe class='imgEffect' scrolling='no' frameborder='0' allowTransparency='true' src='http://www.deezer.com/it/plugins/player?autoplay=false&playlist=true&width=960&height=240&scover=true&type=tracks&id="+trackId+"&title=&app_id=undefined' width='960' height='240'></iframe>");
}