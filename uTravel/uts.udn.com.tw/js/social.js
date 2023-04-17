function addPlurk(){
	var orURL=$('meta[property="og:url"]').attr('content');
	var ogTitle=$('meta[property="og:title"]').attr('content');
	ogTitle=ogTitle.replace("<br>","\n");
	window.open('http://www.plurk.com/?qualifier=shares&status=' .concat(encodeURIComponent(location.href)) .concat(' ') .concat('&#40;') .concat(ogTitle) .concat('&#41;'));
}

function addTwitter(){
	var ogUrl=$('meta[property="og:url"]').attr('content');
	var ogTitle=$('meta[property="og:title"]').attr('content');
	ogTitle=ogTitle.replace(/\<br>/g,"");
	window.open('http://twitter.com/home/?status='.concat(encodeURIComponent(ogTitle)) .concat(' ') .concat(encodeURIComponent(location.href)));
}

function addGooglePlus(){
	var ogUrl=$('meta[property="og:url"]').attr('content');
	window.open('https://plus.google.com/share?url='.concat(encodeURIComponent(location.href)), '', 'menubar=no,toolbar=no,resizable=yes,scrollbars=yes,height=600,width=600');
}

addFacebook=function(type,img){
	var clUrl=encodeURIComponent("http://uts.udn.com.tw/html/share_close.html");
	var ogUrl=$('meta[property="og:url"]').attr('content');
	ogUrl=encodeURIComponent(ogUrl);
	var ogTitle=$('meta[property="og:title"]').attr('content');
	ogTitle=ogTitle.replace("<br>","\n");
	ogTitle=encodeURIComponent(ogTitle);
	if(type=="img"){
		var image=img;img=encodeURIComponent(image);
		var desc=encodeURIComponent(getImgDesc(image));
	}else{
		var image=$('meta[property="og:image"]').attr('content');img=encodeURIComponent(image);
		var desc=encodeURIComponent(getImgDesc(image));
	}
	window.open("https://www.facebook.com/dialog/feed?app_id=490842924419122&display=popup&link="+ogUrl+"&picture="+img+"&name="+ogTitle+"&caption="+ogUrl+"&description="+desc+"&redirect_uri="+clUrl,'Facebook Share Picture','toolbar=no,width=1024,height=480,directories=no,status=no,scrollbars=no,resize=no,menubar=no');
}
getImgDesc=function(img){
	var desc='';
	$("div.photo_center > a > img").each(function(){
		var imgSrc=$(this).attr("src");
		if(imgSrc.indexOf(img)!=-1){
			desc=$(this).parent().parent().find("h4").html();
			console.log("desc: "+desc);
		}
	});
	$("div.photo_left > a > img").each(function(){
		var imgSrc=$(this).attr("src");
		if(imgSrc.indexOf(img)!=-1){
			desc=$(this).parent().parent().find("h4").html();
			console.log("desc: "+desc);
		}
	});
	$("div.photo_right > a > img").each(function(){
		var imgSrc=$(this).attr("src");
		if(imgSrc.indexOf(img)!=-1){
			desc=$(this).parent().parent().find("h4").html();
			console.log("desc: "+desc);
		}
	});
	return desc;
}




