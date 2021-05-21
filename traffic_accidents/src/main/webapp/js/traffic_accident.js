/*********** html 요소 변수 선언 ***********/
const $mapWrap = $('#mapWrap');
const $map = $('#map');

$(document).ready(function() {

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
    $('#accidentList tr').click(function() {
        $('#accidentDetailWrap').show();
    });

    /*********** click, onchange 등 초기 바인딩 셋팅 ***********/
});