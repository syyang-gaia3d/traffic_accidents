
function initJqueryCalendar() {
	$( ".date" ).datepicker({
		dateFormat : "yy-mm-dd",
		dayNames : [ "일", "월", "화", "수", "목", "금", "토" ],
		dayNamesShort : [ "일", "월", "화", "수", "목", "금", "토" ],
		dayNamesMin : [ "일", "월", "화", "수", "목", "금", "토" ],
		monthNames : [ "1월", "2월", "3월", "4월", "5월", "6월", "7월", "8월", "9월", "10월", "11월", "12월"],
		monthNamesShort : [ "1월", "2월", "3월", "4월", "5월", "6월", "7월", "8월", "9월", "10월", "11월", "12월"],
		prevText : "",
		nextText : "",
		showMonthAfterYear : true,
		yearSuffix : "년"
	});
}

// Calendar 초기화
function initCalendar(idArray, valueArray) {
	for(var i=0; i<idArray.length; i++) {
		$("#" + idArray[i]).datepicker( { dateFormat: 'yy-mm-dd' } );
		if(valueArray[i] != null && valueArray[i] != "") {
			//$("#" + idArray[i]).val(valueArray[i].substring(0,8));
			$("#" + idArray[i]).val(valueArray[i].replace(/([0-9]{4})([0-9]{2})([0-9]{2})/,"$1-$2-$3").substring(0,10));
		}
	}
}