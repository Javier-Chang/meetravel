var newType;
function chkDelFollow(aid,type,cateID){
	if(confirm("確定要刪除追蹤嗎?")){
		delFollow(aid,type,cateID);
	}else{
		location.href=location.href;
	}
}
function delFollow(aid,type,cateID) {	
	jQuery.ajax({
		url: '/mytravel/del_follow.jsp?aid='+aid,
		cache: false,
		//contentType: "application/x-www-form-urlencoded",
		dataType: 'html',
			type:'GET',
		error: function(xhr) {
			console.log('xhr='+xhr);
			 alert('系統忙碌中');
		},
		success: function(response) {
			if(response.match("true")){
				alert("刪除成功");
			}else{
				alert("刪除失敗，請再試一次");
			}
			location.href=location.href;			
		}
	});
}

function addFollow(aid,type,cateID){
	jQuery.ajax({
		url: '/mytravel/add_follow.jsp?aid='+aid,
		cache: false,
		//contentType: "application/x-www-form-urlencoded",
		dataType: 'html',
			type:'GET',
		error: function(xhr) {
			console.log('xhr='+xhr);
			 alert('系統忙碌中');
		},
		success: function(response) {
			if(response.match("true")){
				alert("追蹤成功");
			}else{
				alert("追蹤失敗，請再試一次");
			}
			location.href="https://utravel.udn.com/activities/travel_intro.jsp?type="+type+"&cate="+cateID+"&aid="+aid;
		}
	});
}

function chkLogin(aid,type,cateID){
	jQuery.ajax({
		url: '/glb/chklogin.jsp',
		cache: false,
		//contentType: "application/x-www-form-urlencoded",
		dataType: 'html',
			type:'POST',
		error: function(xhr) {
			console.log('xhr='+xhr);
			 alert('系統忙碌中');
		},
		success: function(response) {
			if(response.match("false")){
				setCookie('redirecURL','https://utravel.udn.com/activities/travel_intro.jsp?type=new&cate='+cateID+'&aid='+aid,3600,'','/')
				location.href="https://utravel.udn.com/mytravel/index.jsp";
			}
			if(response.match("true")){
				addFollow(aid,type,cateID);
			}
		}
	});
}

function isFollow(){
	jQuery.ajax({
		url: '/mytravel/check_already_follow.jsp',
		cache: false,
		//contentType: "application/x-www-form-urlencoded",
		dataType: 'html',
			type:'POST',
		error: function(xhr) {
			console.log('xhr='+xhr);
			 alert('系統忙碌中');
		},
		success: function(response) {
			var num=parseInt(response);
			if(num==0){				
				addFollow(aid,type,cateID);
			}else{
				alert("已追蹤過此行程");
			}
		}
	});
}