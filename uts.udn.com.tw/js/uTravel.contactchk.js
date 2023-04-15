function checkEmail(input){			
	if(input.length!=0){
		if (input.charAt(0)=="." ||input.charAt(0)=="@"||input.indexOf('@', 0) == -1 || 
			input.indexOf('.', 0) == -1 ||input.lastIndexOf("@")==input.length-1 || 
			input.lastIndexOf(".")==input.length-1){			
			$('#contactmail').attr('class','form-row error');
			$('#mailmsg').show();
			return false;
		}
	}else{		
		$('#contactmail').attr('class','form-row error');
		$('#mailmsg').show();
		return false;
	}
 return true;
}

function errorClose(divID,msgID){
	$('#'+divID).attr('class','form-row');
	$('#'+msgID).hide();
}

function contactFormChk(){console.log("aa");
	if($('#userfirstname').val()=='' || $('#userlastname').val()==''){
		$('#contactname').attr('class','form-row error');
		$('#namemsg').show();
		return;
	}
	if($('#userphone').val()=='' && $('#usermobile').val()==''){
		$('#contactphone').attr('class','form-row error');
		$('#contactmobile').attr('class','form-row error');		
		$('#phonemsg').show();	
		return;
	}
	if($('#usermail').val()!=''){
		checkEmail($('#usermail').val());
	}
	if($('#vpic').val()==''){
		$('#validatecode').attr('class','form-row error');	
		$('#validatemsg').show();
		return;
	}
	$('#contactfrm').submit();
}
