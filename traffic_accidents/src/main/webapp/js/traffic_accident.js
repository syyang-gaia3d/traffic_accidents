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

    // 사고상세 창 on/off
    $('#accidentList tr').click(() => {
        $('#accidentDetailWrap').show();
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
});