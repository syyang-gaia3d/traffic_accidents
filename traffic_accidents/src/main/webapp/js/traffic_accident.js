import { InitMap } from './main_map.js';

/*********** html 요소 변수 선언 ***********/
const $mapWrap = $('#mapWrap');

$(document).ready(() => {

    const initMap = new InitMap(policy);
    initMap.create('map');

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
    });

    // ul 메뉴
    $('#layersBtn').click(function() {
        $(this).toggleClass('on');

        if($(this).hasClass('on')) {
            $mapWrap.find('#searchLayer').addClass('on');
        } else {
            $mapWrap.find('#searchLayer').removeClass('on');
        }
    });

    $('#layers').click(function() {
        $(this).toggleClass('on');

        if($(this).hasClass('on')) {
            $mapWrap.find('#onOffLayer').addClass('on');
        } else {
            $mapWrap.find('#onOffLayer').removeClass('on');
        }
    });

    $('#cluster').click(function() {
        $(this).toggleClass('on');
        console.log('클러스터 on/off');
    });

    // 그래프 창 on/off
    $('#graphBtn').click(function() {
        $(this).toggleClass('on');
        if($(this).hasClass('on')) {
            $('#graphLayerWrap').show();
        } else {
            $('#graphLayerWrap').hide();
        }
    });

    // 검색
    $('#searchBtn').click(function(e) {
        e.preventDefault();
        searchAccidentList('desc');
    });

    // 사고상세 창 on/off
    $('#accidentList tbody').on('click', 'tr', function() {
        let objtId = $(this).data('id');
        showAccidentInfo(objtId);
        $('#accidentDetailWrap').show();
    });

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
			searchAccidentList('desc');
		} else if($target.hasClass('asc')) {
			$target.text(text + ascending);
			searchAccidentList('asc');
		}

	});

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

    /*********** click, onchange 등 초기 바인딩 셋팅 ***********/

    // 검색
    const searchAccidentList = function(orderBy) {
        let searchParams = $('#searchForm').serializeObject();
        searchParams.orderBy = orderBy;

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
            },
            error: (request, status, error) =>{
                ajaxErrorHandler(request);
            }
        });
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
    accidentInfoItem.find('.category').text('사고...처리...');

    $('#accidentDetailWrap').find('.boardForm').append(accidentInfoItem);
}