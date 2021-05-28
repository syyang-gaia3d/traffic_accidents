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

$.fn.serializeObject = function() {
	"use strict"
	var result = {}
	var extend = function(i, element) {
		var node = result[element.name]
		if ("undefined" !== typeof node && node !== null) {
			if ($.isArray(node)) {
				node.push(element.value)
			} else {
				result[element.name] = [ node, element.value ]
			}
		} else {
			result[element.name] = element.value
		}
	}

	$.each(this.serializeArray(), extend);
	return result
}

// ajax 오류 공통 처리
function ajaxErrorHandler(request) {
	alert(request.responseJSON.error.message);
}

// 검색결과가 없는 경우 표기할 td
function makeNoResults(table) {
	const colspan = table.find('th').length;
	const noResults = '<tr><td colspan=' + colspan + '>검색 결과가 없습니다.</td></tr>';

	return noResults;
}

var PAGING_FORMAT = {
	format: '[ < nncnn > ]',
	perpage: 10,
	page: 1,
	stepwidth: 5,
	onFormat: function(type) {
		if (this.active) {
			switch (type) {
				case 'first': return '<a href="#" class="ico first" title="first">Go to the first page</a>';
				case 'prev': return '<a href="#" class="ico prev" title="prev">Go to the previous page</a>';
				case 'block':
					if (this.value == this.page) return '<a href="#" class="active">' + this.value + '</a>';
					else return '<a href="#">' + this.value + '</a>';
				case 'next': return '<a href="#" class="ico next" title="next">Go to the next page</a>';
				case 'last': return '<a href="#" class="ico last" title="last">Go to the last page</a>';
				default: return '';
			}
		}
		return '';
	}
};