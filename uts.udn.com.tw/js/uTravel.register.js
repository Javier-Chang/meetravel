var sex;
function checkRadio(id, field) {
	var element = document.getElementsByName(id);
	var choosed = false;
	for (var i = 0; i <  element.length; i++) {
		if (element[i].checked == true) {
			choosed = true;
			break;
		}
	}
	if (!choosed) {
		alert("您尚未選擇" + field);
		element[0].focus();
		return false;
	}
	else
		return true;
}

function checkEmail(input){			
	if(input.length!=0){
		if (input.charAt(0)=="." ||input.charAt(0)=="@"||input.indexOf('@', 0) == -1 || 
			input.indexOf('.', 0) == -1 ||input.lastIndexOf("@")==input.length-1 || 
			input.lastIndexOf(".")==input.length-1){
			$('#ordermailmsg').show();
			return false;
		}
	}else{	
		$('#ordermailmsg').show();
		return false;
	}
 return true;
}

function errorClose(divID,msgID){
	$('#'+msgID).hide();
}

function getOrderFormStep1(cate,aid,turid,cid){
	location.href="/register/index.jsp?cate="+cate+"&aid="+aid+"&cid="+cid+"&turid="+turid;
}


function chkOrederForm(){
	sex=$("input[name='gender']:checked").val();
	
	if($('#orderFirstName').val()=='' || $('#orderLastName').val()==''){
		$('#ordernamemsg').show();	
	}else if(sex==null){
		$('#ordersexmsg').show();
	}else if($('#orderphone').val()=='' && $('#ordercellphone').val()==''){
		$('#ordertelmsg').show();
	}else {	
		var fobj=document.orderform;
		fobj.submit();	}
}

