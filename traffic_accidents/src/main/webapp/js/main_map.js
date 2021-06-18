import './extranlib/ol/ol-6.5.0.js';
// import { ol } from './extranlib/ol/ol-6.5.0.js';

// 지도 객체 생성
export default function InitMap(policy) {

  if (!(this instanceof InitMap)) {
    throw new Error("New 를 통해 생성 하십시오.");
  }

  // 공통사용값
  const zoomSize = 0.5;
  const zoomDuration = 250;
  let sketch = null;
  let helpTooltipElement = null;
  let helpTooltip = null;
  let measureTooltipElement = null;
  let measureTooltip = null;

  let select = new ol.interaction.Select();
  let selectedFeature = null;

  // geoserver
  const geoserverDataUrl = policy.geoserverDataUrl;
  const geoserverDataWorkspace = policy.geoserverDataWorkspace;
  const geoserverDataStore = policy.geoserverDataStore;
  const coordinate = policy.layerTargetCoordinate; //EPSG:3857 (WGS84)

  const layerInitMapCenter = [];
	const mapCenterArray = policy.layerInitMapCenter.split(",");
	for( let i=0; i<mapCenterArray.length; i++) {
		layerInitMapCenter.push(parseFloat(mapCenterArray[i]));
	}

  // 마우스 좌표
  const mousePosition = new ol.control.MousePosition({
    className: 'mousePosition',
    coordinateFormat: function(coordinate) {
        return ol.coordinate.format(coordinate, '{x}, {y}', 6);
    },
    projection: ol.proj.get('EPSG:4326'),
    target: document.getElementById('mouse-position'),
    undefinedHTML: ' '
  });

  const scaleLineControl = new ol.control.ScaleLine();

  // default controls
  const controls = ol.control.defaults({
      attributionOptions: /** @type {olx.control.AttributionOptions} */ ({
          collapsible: false
      }), zoom: false, rotate: false
  }).extend([
    scaleLineControl,
    mousePosition
  ]);


  // 레이어
  const layers = [];
  // osm 레이어
	const layerInitOsm = policy.layerInitOsm;
	const layerInitOsmVisible = policy.layerInitOsmVisible;
	// 시도 레이어(ctprvn)
	const layerInitSido = policy.layerInitSido;
	const layerInitSidoVisible = policy.layerInitSidoVisible;
  // 시군구 레이어(cgg)
  const layerInitCgg = policy.layerInitCgg;
  const layerInitCggVisible = policy.layerInitCggVisible;
  // 읍면동 레이어(emd)
  const layerInitEmd = policy.layerInitEmd;
  const layerInitEmdVisible = policy.layerInitEmdVisible;


  // OSM 배경지도
	const osmLayer = new ol.layer.Tile({
		id : layerInitOsm,
		source: new ol.source.OSM(),
		visible : layerInitOsmVisible
	});

  layers.push(osmLayer);

  // 시도|시군구|읍면동 레이어
  var baseLayerEmd = new ol.layer.Tile({
    id : layerInitEmd,
    visible : layerInitEmdVisible,
    source : new ol.source.TileWMS({
      url: geoserverDataUrl + '/' + geoserverDataWorkspace + '/wms',
      params: {
        'VERSION' : '1.1.1',
        tiled: true,
        // CQL_FILTER: queryString,
        srs: coordinate,
        layers: [geoserverDataWorkspace + ":" + 'emd'],
        // env: env,
        // STYLES : [geoserverDataWorkspace + "_" + geometryType]
      },
      crossOrigin: 'anonymous'
    })
  });

  layers.push(baseLayerEmd);

  var baseLayerSido = new ol.layer.Tile({
    id : layerInitSido,
    visible : layerInitSidoVisible,
    source : new ol.source.TileWMS({
      url: geoserverDataUrl + '/' + geoserverDataWorkspace + '/wms',
      params: {
        'VERSION' : '1.1.1',
        tiled: true,
        // CQL_FILTER: queryString,
        srs: coordinate,
        layers: [geoserverDataWorkspace + ":" + 'sido'],
        // env: env,
        // STYLES : [geoserverDataWorkspace + "_" + geometryType]
      },
        crossOrigin: 'anonymous'
    })
  });

  layers.push(baseLayerSido);

  var baseLayerCgg = new ol.layer.Tile({
    id : layerInitCgg,
    visible : layerInitCggVisible,
    source : new ol.source.TileWMS({
      url: geoserverDataUrl + '/' + geoserverDataWorkspace + '/wms',
      params: {
        'VERSION' : '1.1.1',
        tiled: true,
        // CQL_FILTER: queryString,
        srs: coordinate,
        layers: [geoserverDataWorkspace + ":" + 'cgg'],
        // env: env,
        // STYLES : [geoserverDataWorkspace + "_" + geometryType]
      },
        crossOrigin: 'anonymous'
    })
  });

  layers.push(baseLayerCgg);

	// 거리 측정 벡터 레이어
	const measureLayer = new ol.layer.Vector({
		id: 'measure_layer',
		visible: true,
		source: new ol.source.Vector(),
		style: new ol.style.Style({
      fill: new ol.style.Fill({
        color: 'rgba(255, 255, 255, 0.5)'
      }),
      stroke: new ol.style.Stroke({
        color: '#ff0000',
        width: 3
      }),
      image: new ol.style.Circle({
        radius: 7,
        fill: new ol.style.Fill({
          color: '#ff0000'
        })
      })
    })
	});

  layers.push(measureLayer);


  // 좌표계
  const proj = new ol.proj.Projection({
    code: coordinate,
    units: 'm',
    global: false,
  });
  // view
  const view = new ol.View({
    zoom: 7,
    maxZoom: 18,
    minZoom: 3,
    center: layerInitMapCenter,
    projection : proj
  });

  // 지도 위 툴팁
  const drawToolOverlay = new ol.Overlay({
    id: 'drawTool-overlay',
    element: document.getElementById('drawToolTip'),
    offset: [10, 10],
    positioning: 'top'
  });

  var map;

  /**
   * public
   */
  return {
    mouseOver: () => {
      return mouseOver;
    },
    create: (element) => {
      // 맵 생성
      map = new ol.Map({
        controls : controls,
        layers : layers,
        overlays: [drawToolOverlay],
        view : view,
        target : element
      });

      map.on('click', (e) => {
        if($('.oinfo').hasClass('on')) {
          let coordinate = map.getCoordinateFromPixel(e.pixel);
          let point = 'POINT(' + coordinate[0] + ' ' + coordinate[1] + ')';

          $.ajax({
            url: '/info/point',
            type: 'POST',
            contentType:'application/json; charset=UTF-8',
            headers: {"X-Requested-With": "XMLHttpRequest"},
            data: JSON.stringify({point : point}),
            datatype: 'json',
            success: (res) => {
              let info = res.info;

              if(info == null) {
                alert('선택된 점이 없습니다.');
                return;
              }

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
              accidentInfoItem.find('.address').text(info.address);
              // 사고종류
              accidentInfoItem.find('input[name="drnkg"]').attr('checked', info.drnkg != null? true:false);
              accidentInfoItem.find('input[name="kid"]').attr('checked', info.kid != null? true:false);
              accidentInfoItem.find('input[name="odsn"]').attr('checked', info.odsn != null? true:false);
              accidentInfoItem.find('input[name="wlkg"]').attr('checked', info.wlkg != null? true:false);

              $('#accidentDetailWrap').find('.boardForm').append(accidentInfoItem);
              $('#accidentDetailWrap').show();

              $('#accidentList').find('tr').removeClass('selected');
              $('#accidentList').find('#' + String(info.objtId)).addClass('selected');
            },
            error: (request, status, error) => {
              ajaxErrorHandler(request);
            }
          });
        }
      });
    },
    getMap: () => {
      return map;
    },
    getLayerById: function(layerId) {
      var layer = null;

      if(layerId){
        var layers = map.getLayers().getArray();

        for(var i in layers){	 // 브라우저 호환성 - ie6~, chrome
          if(layers[i].get('id') === layerId){
            layer = layers[i];
            break;
          }
        }
      }

      return layer;
    },
    /**
    * 현재 맵의 좌표계를 얻는다.
    * @returns {Object} ol.Proj
    */
     getCurProj: function() {
      return map.getView().getProjection();
    },
    /**
     * WKT를 이용하여, 피쳐 생성
     * @param  {string} wkt
     * @return {Object} ol.Feature
     */
    getFeatureFromWkt: function(wkt){
      var format = new ol.format.WKT();
      var projection = this.getCurProj();

      var feature = format.readFeature(wkt, {
          dataProjection: projection,
          featureProjection: projection
      });
      return feature;
    },
    /**
     * WKT를 이용하여, 지오메트리 생성
     * @param  {string} wkt
     * @return {Object} ol.Geometry
     */
    getGeometryFromWkt: function(wkt){
      var format = new ol.format.WKT();
      var geometry = format.readGeometry(wkt);
      return geometry;
    },
    /**
     * 지오메트리를 이용하여, WKT 생성
     * @param  {Object} ol.Geometry
     * @return {string} wkt
     */
    getWktByGeometry: function(geometry) {
      var wkt = (new ol.format.WKT()).writeGeometry(geometry);
      return wkt;
    },
    zoomIn: () => {
      const view = map.getView();
      const zoom = view.getZoom();

      view.animate({
        zoom: zoom + zoomSize,
        duration: zoomDuration
      });
    },
    zoomOut: () => {
      const view = map.getView();
      const zoom = view.getZoom();

      view.animate({
        zoom: zoom - zoomSize,
        duration: zoomDuration
      });
    },
    clearDrawGeometry: () => {
      map.getInteractions().forEach((interaction) => {
        // Draw interaction 삭제
        if(interaction instanceof ol.interaction.Draw) {
            map.removeInteraction(interaction);
        }
      });
    },
    /* 거리측정 */
    addMeasureDrawInteraction : function() {
      var listener;
      const layer = this.getLayerById('measure_layer');
      const draw = new ol.interaction.Draw({
        source : layer.getSource(),
        type : 'LineString',
        style: new ol.style.Style({
          fill: new ol.style.Fill({
            color: 'rgba(255, 255, 255, 0.2)'
          }),
          stroke: new ol.style.Stroke({
            color: 'rgba(0, 0, 0, 0.5)',
            lineDash: [10, 10],
            width: 2
          }),
          image: new ol.style.Circle({
            radius: 5,
            stroke: new ol.style.Stroke({
                color: 'rgba(0, 0, 0, 0.7)'
            }),
            fill: new ol.style.Fill({
                color: 'rgba(255, 255, 255, 0.2)'
            })
          })
        }),
        layers : [layer]
      });
      map.addInteraction(draw);

      this.createMeasureTooltip();
      this.createHelpTooltip();

      let _this = this;
      draw.on('drawstart', (evt) => {
        // set sketch
        sketch = evt.feature;

        let tooltipCoord = evt.coordinate;

        listener = sketch.getGeometry().on('change', function(evt) {
          const geom = evt.target;
          const output = formatLength(geom);
          tooltipCoord = geom.getLastCoordinate();

          measureTooltipElement.innerHTML = output;
          measureTooltip.setPosition(tooltipCoord);
        });
      }, this);

      draw.on('drawend', () => {
        measureTooltipElement.className = 'tooltip tooltip-static';
        measureTooltip.setOffset([0, -7]);
        // unset sketch
        sketch = null;
        // unset tooltip so that a new one can be created
        measureTooltipElement = null;
        _this.createMeasureTooltip();
        ol.Observable.unByKey(listener);
      }, this);
    },
    clearMeasure: function() {
      // $('.measures').removeClass('on');
      var layer = this.getLayerById('measure_layer');
      if(layer) {
        layer.getSource().clear();
      }
      this.clearDrawGeometry();
      this.clearOverlay();
    },
    clearOverlay: () => {
      map.getOverlays().getArray().slice(0).forEach(function(overlay, a, b) {
        // Overlay 삭제
        if(overlay && (overlay.getId() === 'info-tooltip' || overlay.getId() === 'measure-tooltip')) {
          map.removeOverlay(overlay);
        }
      });
    },
    createMeasureTooltip: () => {
      if (measureTooltipElement) {
        measureTooltipElement.parentNode.removeChild(measureTooltipElement);
      }
      measureTooltipElement = document.createElement('div');
      measureTooltipElement.className = 'mtooltip mtooltip-measure';
      measureTooltip = new ol.Overlay({
        id: 'info-tooltip',
        element: measureTooltipElement,
        offset: [0, -15],
        positioning: 'bottom-center'
      });
      map.addOverlay(measureTooltip);
    },
    createHelpTooltip: () => {
      if (helpTooltipElement) {
        helpTooltipElement.parentNode.removeChild(helpTooltipElement);
      }
      helpTooltipElement = document.createElement('div');
      helpTooltipElement.className = 'mtooltip hidden';
      helpTooltip = new ol.Overlay({
        id: 'measure-tooltip',
        element: helpTooltipElement,
        offset: [15, 0],
        positioning: 'center-left'
      });
      map.addOverlay(helpTooltip);
    },
    pointerMoveHandler: (evt) => {
      if (evt.dragging) {
        return;
      }

      let helpMsg = '지도를 클릭하세요.';
      var continueLineMsg = '측정할 거리를 클릭하고, 더블 클릭하면 종료됩니다.';

      if (sketch) {
        var geom = (sketch.getGeometry());
        if (geom instanceof ol.geom.LineString) {
          helpMsg = continueLineMsg;
        }
      }

      if(helpTooltipElement) {
        helpTooltip.setPosition(evt.coordinate);
        helpTooltipElement.innerHTML = helpMsg;
        helpTooltipElement.classList.remove('hidden');
      }
    },
    /* 사고위치 레이어 */
    getAccidentLayer : function(layerKey, visible, queryString) {
      layerKey = layerKey.toLowerCase();
      map.removeLayer(this.getLayerById(layerKey));

      const layerName = geoserverDataWorkspace + ":" + layerKey;
      const layer = new ol.layer.Tile({
        id: layerKey,
        visible: (visible == undefined) ? false : visible,
        source: new ol.source.TileWMS({
          url: geoserverDataUrl + '/' + geoserverDataWorkspace + '/wms',
          params: {
            'VERSION' : '1.1.1',
            tiled: true,
   					  CQL_FILTER: queryString == '' ? null : queryString,
              srs: coordinate,
              layers: [layerName],
            // env: env,
            STYLES : ['traffic_accident']
          },
            crossOrigin: 'anonymous'
        })
      });
      // 맵 생성
      map.addLayer(layer);
    },
    getSelectedVectorFeatureByWkt: function(wkt) {
      var feature = this.getFeatureFromWkt(wkt);
      map.addInteraction(select);

      selectedFeature = select.getFeatures();

      selectedFeature.clear();
      selectedFeature.push(feature);
    },
    clearSelectedVectorFeature: function() {
      selectedFeature = null;
      map.removeInteraction(select);
    },
    flyToPoint: function(wkt) {
      let point = this.getGeometryFromWkt(wkt);

      map.getView().fit(point.getExtent());
      this.clearSelectedVectorFeature();
      this.getSelectedVectorFeatureByWkt(wkt);
    },
    makeClusters: function(distance, layerKey) {

      // filter 파라미터를 받아와서 필터 형성 필요
      // 발생일시, 발생시간, 사고형태(lclas), 사고구분(sclas), 사고종류(is not null)

      let source = new ol.source.Vector();

      const featureRequest = new ol.format.WFS().writeGetFeature({
        srsName: coordinate,
        featureNS: geoserverDataUrl + '/' + geoserverDataWorkspace + '/',
        featurePrefix: 'accident',
        featureTypes: [layerKey],
        outputFormat: 'application/json',
        // filter: ol.format.filter.equalTo('enable_yn', 'Y'),
      });

      fetch(geoserverDataUrl + '/' + geoserverDataWorkspace + '/wfs', {
        method: 'POST',
        body: new XMLSerializer().serializeToString(featureRequest)
      }).then(function(response) {
        return response.json();
      }).then(function(json) {
        showHideSpinner(false, $('#wrap'));
        var features = new ol.format.GeoJSON().readFeatures(json);
        source.addFeatures(features);
      });

      const clusterSource = new ol.source.Cluster({
        distance: parseInt(distance, 10),
        source: source
      });

      let styleCache = {};
      let clusters = new ol.layer.Vector({
        id: 'cluster',
        source: clusterSource,
        style: function(feature) {
          let size = feature.get('features').length;
          let style = styleCache[size];
          if(!style) {
            style = new ol.style.Style({
              image: new ol.style.Circle({
                radius: setRadiusInCluster(size), // 일종의 범례처럼 일정하게 크기조절할 함수 만들기
                stroke: new ol.style.Stroke({
                  color: '#ffffff'
                }),
                fill: new ol.style.Fill({
                  color: '#ff9933'
                })
              }),
              text: new ol.style.Text({
                text: size.toString(),
                font: 'Bold 10px Verdana',
                fill: new ol.style.Fill({
                  color: '#ffffff'
                })
              })
            });
            styleCache[size] = style;
          }
          return style;
        }
      });

      map.addLayer(clusters);
    }
  }
}

function setRadiusInCluster(size) {
  if(size < 10) {
    return 10;
  } else if(size < 100) {
    return 20;
  } else if(size < 1000) {
    return 30;
  } else if(size < 10000) {
    return 40;
  } else if(size < 100000) {
    return 50;
  } else {
    return 60;
  }
}