function tagLoader(value,tagVal) {
												$.blockUI({
															message : "<p class='loader'><img src=\"img/ajax-loader.gif\" /> You're going to fall in love...</p>",
															css: { backgroundColor: '#EBEEF4', color: '#000' }
														});

												if(!tagVal) {
													tagVal = dataValue;
													//alert(tagVal);
												}
												
												var params = {
													tag : tagVal
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
															}
														});
}




function playerAppender(trackIds) {
	
	$("#dz-root").html("");
	
	DZ.init({
		appId : '8',
		channelUrl : 'http://developers.deezer.com/examples/channel.php',
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