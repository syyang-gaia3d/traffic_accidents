import InitMap from './main_map.js';

/*********** 전역 변수 선언 ***********/
const $mapWrap = $('#mapWrap');
var chart = null;

const initMap = new InitMap(policy);
initMap.create('map');

$(document).ready(() => {

    const map = initMap.getMap();
    map.on('pointermove', (evt) => {
        if (evt.dragging) return;

        //그리기 이벤트
        if($('.distance').hasClass("on")) initMap.pointerMoveHandler(evt);
    });

    /*********** click, onchange 등 초기 바인딩 셋팅 ***********/
    // 닫기
    $mapWrap.find('button.close').click(function() {
        $(this).parents('div').removeClass('on');
        $('#layersBtn').removeClass('on');
    });

    $mapWrap.find('button.layerClose').click(function() {
        $(this).parents('div.layerWrap').hide();
        $('#accidentList').find('tr').removeClass('selected');
        $('#graphBtn').removeClass('on');
    });

    // ul 메뉴
    $mapWrap.find('#layerBtn').click(function() {
        $(this).toggleClass('on');

        if($(this).hasClass('on')) {
            $mapWrap.find('#searchLayer').addClass('on');
        } else {
            $mapWrap.find('#searchLayer').removeClass('on');
        }
    });

    // div 팝업 draggable
	$('.layerWrap').draggable({
        handle: '.layerHead'
    });

    // layer on/off
    $mapWrap.find('#layers').click(function() {
        $(this).toggleClass('on');

        if($(this).hasClass('on')) {
            $mapWrap.find('#onOffLayer').addClass('on');
        } else {
            $mapWrap.find('#onOffLayer').removeClass('on');
        }
    });

    $mapWrap.find('#onOffLayer').find('input[name="layerId"]').click(function() {
        const layerId = this.value;
        const checked = $(this).prop('checked');

        controlLayerVisible(layerId, checked);
    });

    // cluster on/off
    $mapWrap.find('#cluster').click(function() {
        $(this).toggleClass('on');

        if($(this).hasClass('on')) {
            initMap.makeClusters(50, 'traffic_accident');
        }
    });

    // 검색
    $mapWrap.find('#searchBtn').click(function(e) {
        e.preventDefault();
        searchAccidentList(null, 'desc');
    });

    // 시간대 검색 설정
    $mapWrap.find('input[name="isTimeSlot"]').change(function() {
        if($(this).is(':checked')){
            $mapWrap.find('input[name="startTime"]').attr('disabled', false);
            $mapWrap.find('input[name="endTime"]').attr('disabled', false);
        } else {
            $mapWrap.find('input[name="startTime"]').val('');
            $mapWrap.find('input[name="endTime"]').val('');

            $mapWrap.find('input[name="startTime"]').attr('disabled', true);
            $mapWrap.find('input[name="endTime"]').attr('disabled', true);
        }
    });

    // 페이지 당 표시할 사고건수 수정 시
    $mapWrap.find('#searchLayer').find('.page-size').on('change', function() {
        searchAccidentList(null, 'desc');
    });

    // 사고상세 창 on/off
    $('#accidentList tbody').on('click', 'tr', function() {
        $(this).siblings().removeClass('selected');
        $(this).toggleClass('selected');

        let objtId = $(this).data('id');
        showAccidentInfo(objtId);
        $('#accidentDetailWrap').show();
    });

    // 정렬
    $('#accidentList').find('.sort-list').click(function() {
		var $target = $(this);
		var $sibling = $target.siblings('.sort-list');
		var ascending = '\▲';
		var descending = '\▼';

		$sibling.removeClass('desc').removeClass('asc');
		var siblingText = $sibling.text().replace(ascending, '').replace(descending, '');
		$sibling.text(siblingText);

		var text = $target.text().replace(ascending, '').replace(descending, '');

		$target.toggleClass('desc').removeClass('asc');
		if(!$target.hasClass('desc')) {
			$target.toggleClass('asc').removeClass('desc');
		}

		if($target.hasClass('desc')) {
			$target.text(text + descending);
			searchAccidentList(null, 'desc');
		} else if($target.hasClass('asc')) {
			$target.text(text + ascending);
			searchAccidentList(null, 'asc');
		}
	});

    // 그래프 창 on/off
    $('#graphBtn').click(function() {
        $(this).toggleClass('on');
        if($(this).hasClass('on')) {
            $('#graphLayerWrap').show();
        } else {
            // 그래프 초기화 필요
            $('#graphLayerWrap').hide();
        }
    });

    // 그래프 선택
    $('#graphLayerWrap').find('button.sectionMenu').click(function() {
        $(this).toggleClass('on');

        if($(this).hasClass('on')) {
            $(this).siblings().removeClass('on');

            if(chart != null) chart.destroy();

            const id = this.id;
            const graphType = $(this).data('graph');
            const params = $('#searchForm').serializeObject();

            let data = {};
            // 그래프 요청 함수 ajax
            $.ajax({
                url: '/graph/' + id,
                type: 'GET',
                headers: {'X-Requested-With': 'XMLHttpRequest'},
                data: params,
                datatype: 'json',
                success: (res) => {
                    data = res.data;

                    // console.log(data);

                    // 그래프 그리기 - 각 그래프마다 data, color, chart를 따로 해야함
                    chart = createChart(graphType, id, data);
                },
                error: (request, status, error) =>{
                    ajaxErrorHandler(request);
                }
            });
        }
    });

    /*********** map setting ***********/

    $mapWrap.find('.zoomin').click(() => {
        initMap.zoomIn();
    });

    $mapWrap.find('.zoomout').click(() => {
        initMap.zoomOut();
    });

    $mapWrap.find('.distance').click(function() {
		var $target = $(this);
        // 초기화
		initMap.clearDrawGeometry();

		// class 설정 및 기능 설정 -- 변경 필요
        if($target.hasClass('on')) {
        	initMap.clearMeasure();
            $target.removeClass('on');
        } else {
        	$target.addClass('on');
            // add interaction
            initMap.addMeasureDrawInteraction();
        }
    });

    $mapWrap.find('.oinfo').click(function() {
        $(this).toggleClass('on');
    });
    /*********** click, onchange 등 초기 바인딩 셋팅 ***********/

    // 검색
    const searchAccidentList = function(searchCondition, orderBy) {
        const searchParams = searchCondition? searchCondition : $('#searchForm').serializeObject();
        var queryString = setQueryString(searchParams);
        console.log(queryString);
        searchParams.orderBy = orderBy;

        // 페이징 파라미터
        let page = searchParams.page ? searchParams.page : 1;
        let size = $mapWrap.find('#searchLayer').find('.page-size').val();
        let offset = (page - 1) * size;

        searchParams.use = true;
        searchParams.page = page;
        searchParams.size = size;
        searchParams.offset = offset;

        $.ajax({
            url: '/list',
            type: 'GET',
            headers: {'X-Requested-With': 'XMLHttpRequest'},
            data: searchParams,
            dataType: 'json',
            success: (res) => {
                const table = $('#accidentList');
                const list = res.list;

                setAccidentList(table, list);
                makePagination(searchParams, res.totalCount);
                // 지도에 point
                initMap.getAccidentLayer('traffic_accident', true, queryString);
            },
            error: (request, status, error) =>{
                ajaxErrorHandler(request);
            }
        });
    }

    // 페이징
    function makePagination(searchCondition, totalCount) {
        const paginationDiv = $('#searchLayer').find('.pagination');

        if (searchCondition.page != 1) {
        return;
        }

        PAGING_FORMAT.perpage = searchCondition.size;
        var paginating = paginationDiv.paging(totalCount, PAGING_FORMAT);
        paginating.setOptions({onSelect: function(page) {
        searchCondition.page = page;
        searchAccidentList(searchCondition, searchCondition.orderBy);

        return false;
        }});
    }

    // 상세
    const showAccidentInfo = function(objtId) {
        $.ajax({
            url: '/' + objtId,
            type: 'GET',
            headers: {'X-Requested-With': 'XMLHttpRequest'},
            dataType: 'json',
            success: (res) => {
                console.log(res);
                const info = res.info;
                setAccidentInfo(info);
                initMap.flyToPoint(info.geom);
            },
            error: (request, status, error) => {
                ajaxErrorHandler(request);
            }
        });
    }
});

function setAccidentList(table, list) {
    const tbody = table.find('tbody');
    let html = '';

    if(list.length == 0) {
        html += makeNoResults(table);
    } else {
        for(var i in list) {
            html += '<tr data-id="'+ list[i].objtId +'">';
            html +=     '<td>'+ list[i].occuDate + '</td>';
            html +=     '<td>' + list[i].lclas + '</td>';
            html +=     '<td>' + list[i].death + '/' + list[i].swpsn + '/' + list[i].sinjpsn + '</td>';
            html += '</tr>';
        }
    }

    tbody.empty();
    tbody.append(html);
}

function setAccidentInfo(info) {
    $('#accidentDetailWrap').find('.boardForm').empty();

    let accidentInfoItem = $('#accidentInfoItem')
                            .clone(true)
                            .removeAttr('id')
                            .removeClass('hide-custom');

    accidentInfoItem.find('.date-time').text(info.occuYear + '.' + info.occuMt + '.' + info.occuDe + ' ' + info.occuTm + ':00');
    accidentInfoItem.find('.injury-type').text(info.lclas);
    accidentInfoItem.find('.accident-type').text(info.sclas);
    accidentInfoItem.find('.death').text(info.death);
    accidentInfoItem.find('.slander').text(info.swpsn);
    accidentInfoItem.find('.slightly-injured').text(info.sinjpsn);
    accidentInfoItem.find('.violation').text(info.violtCn);
    accidentInfoItem.find('.location').text('주소입력예정');
    // 사고종류
    accidentInfoItem.find('input[name="drnkg"]').attr('checked', checkCategory(info.drnkg));
    accidentInfoItem.find('input[name="kid"]').attr('checked', checkCategory(info.kid));
    accidentInfoItem.find('input[name="odsn"]').attr('checked', checkCategory(info.odsn));
    accidentInfoItem.find('input[name="wlkg"]').attr('checked', checkCategory(info.wlkg));

    $('#accidentDetailWrap').find('.boardForm').append(accidentInfoItem);
}

function checkCategory(category) {
    return category != null ? true : false;
}

// 레이어 on/off
function controlLayerVisible(layerId, visible) {
    const targetLayerId = policy[layerId];
    const targetLayer = initMap.getLayerById(targetLayerId);
    if(targetLayer != null) {
        targetLayer.setVisible(visible);
    }
}

// traffic_accident cql filter
function setQueryString(params) {
    let queryString = '';

    if(params['isTimeSlot']) {
        if(params['startDate'] && params['endDate']) {
            queryString += ' AND occu_date >= \'' + params['startDate'] + '\'';
            queryString += ' AND occu_date <= \'' + params['endDate'] + '\'';
        }
        if(params['startTime'] && params['endTime']) {
            queryString += ' AND occu_tm >= \'' + params['startTime'] + '\'';
            queryString += ' AND occu_tm <= \'' + params['endTime'] + '\'';
        }
    } else {
        if(params['startDate'] && params['endDate']) {
            queryString += ' AND occu_date >= \'' + params['startDate'] + '\'';
            queryString += ' AND occu_date <= \'' + params['endDate'] + '\'';
        }
        if(params['startTime'] && params['endTime']) {
            queryString += ' OR (occu_tm >= \'' + params['startTime'] + '\' AND occu_tm <= \'' + params['endTime'] + '\')';
        }
    }

    if(params['injuryTypes'] != null) {
        let injuryTypes = '';
        if(typeof params['injuryTypes'] == 'string') {
            queryString += ' AND lclas = \'' + params['injuryTypes'] + '\'';
        }

        if(typeof params['injuryTypes'] == 'object') {
            for(var i in params['injuryTypes']) {
                if(i == params['injuryTypes'].length-1) {
                    injuryTypes += '\'' + params['injuryTypes'][i] + '\'';
                } else {
                    injuryTypes += '\'' + params['injuryTypes'][i] + '\', ';
                }
            }
            queryString += ' AND lclas IN (' + injuryTypes + ')';
        }
    }

    if(params['accidentTypes'] != null) {
        let accidentTypes = '';
        if(typeof params['accidentTypes'] == 'string') {
            queryString += ' AND sclas = \'' + params['accidentTypes'] + '\'';
        }

        if(typeof params['accidentTypes'] == 'object') {
            for(var i in params['accidentTypes']) {
                if(i == params['accidentTypes'].length-1) {
                    accidentTypes += '\'' + params['accidentTypes'][i] + '\'';
                } else {
                    accidentTypes += '\'' + params['accidentTypes'][i] + '\', ';
                }
            }
            queryString += ' AND sclas IN (' + accidentTypes + ')';
        }
    }

    if(params['category'] != null) {
        if(typeof params['category'] == 'object') {
            for(var i in params['category']) {
                let category = params['category'][i];
                queryString += ' AND ' + category + ' IS NOT NULL';
            }
        } else {
            queryString += ' AND ' + params['category'] + ' IS NOT NULL';
        }
    }

    return queryString.replace(' AND', '');
}