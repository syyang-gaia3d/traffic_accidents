import { InitMap } from './main_map.js';

/*********** html 요소 변수 선언 ***********/
const $mapWrap = $('#mapWrap');
const $map = $('#map');

$(document).ready(() => {

    // var policy = {
    //     layerInitMapCenter : '240175.364,324954.256',
    //     layerInitMapExtent : '-80000,0,300000,64000'
    // };

    const initMap = new InitMap(policy);
    initMap.create('map');
    /*********** click, onchange 등 초기 바인딩 셋팅 ***********/
    // 닫기
    $mapWrap.find('button.close').click(() => {
        $(this).parents('div').removeClass('on');
        $('#layersBtn').removeClass('on');
    });

    $mapWrap.find('button.layerClose').click(() => {
        $(this).parents('div.layerWrap').hide();
    });

    // ul 메뉴
    $('#layersBtn').click(() => {
        $(this).toggleClass('on');

        if($(this).hasClass('on')) {
            $mapWrap.find('#searchLayer').addClass('on');
        } else {
            $mapWrap.find('#searchLayer').removeClass('on');
        }
    });

    $('#layers').click(() => {
        $(this).toggleClass('on');

        if($(this).hasClass('on')) {
            $mapWrap.find('#onOffLayer').addClass('on');
        } else {
            $mapWrap.find('#onOffLayer').removeClass('on');
        }
    });

    $('#cluster').click(() => {
        $(this).toggleClass('on');
        console.log('클러스터 on/off');
    });

    // 그래프 창 on/off
    $('#graphBtn').click(() => {
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
    })

    /*********** click, onchange 등 초기 바인딩 셋팅 ***********/
});