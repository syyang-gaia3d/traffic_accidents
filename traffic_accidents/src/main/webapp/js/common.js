// 공통기능 모음

// jquery Calendar 초기화
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

// 지도상 길이 측정 함수
function formatLength(line) {
	var length = ol.sphere.getLength(line); // TODO : 문제!!!!!!!!!!!
	var output;
	if (length > 100) {
		output = (Math.round(length / 1000 * 100) / 100) + ' ' + 'km';
	} else {
		output = (Math.round(length * 100) / 100) + ' ' + 'm';
	}
	return output;
}