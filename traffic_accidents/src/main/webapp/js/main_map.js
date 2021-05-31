import './extranlib/ol/ol-6.5.0.js';
// import { ol } from './extranlib/ol/ol-6.5.0.js';

// 지도 객체 생성
export function InitMap(policy) {

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
  // geoserver
  const geoserverDomainUrl = policy.geoserverDomainUrl;
  const geoserverDataWorkspace = policy.geoserverDataWorkspace;
  const geoserverDataStore = policy.geoserverDataStore;
  const coordinate = policy.layerTargetCoordinate; //EPSG:3857 (WGS84)

  const layerInitMapCenter = [];
	const mapCenterArray = policy.layerInitMapCenter.split(",");
	for( let i=0; i<mapCenterArray.length; i++) {
		layerInitMapCenter.push(parseFloat(mapCenterArray[i]));
	}

	const layerInitMapExtent = [];
	const mapExtentArray = policy.layerInitMapExtent.split(",");
	for( let i=0; i<mapExtentArray.length; i++) {
		layerInitMapExtent.push(parseFloat(mapExtentArray[i]));
	}

  // 마우스 좌표
  const mousePosition = new ol.control.MousePosition({
    className: 'mousePosition',
    coordinateFormat: function(coordinate) {
        return ol.coordinate.format(coordinate, '{x}, {y}', 6);
    },
    projection: ol.proj.get('EPSG:3857'),
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
	const layerInitCtprvn = policy.layerInitCtprvn;
	const layerInitCtprvnVisible = policy.layerInitCtprvnVisible;
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
//   var baseLayerCtprvn = new ol.layer.Tile({
//     id : layerInitCtprvn,
//     visible : layerInitCtprvnVisible,
//     source : new ol.source.TileWMS({
//       url: geoserverDomainUrl + '/' + geoserverDataWorkspace + '/wms',
//       params: {
//         'VERSION' : '1.1.1',
//         tiled: true,
// //    					CQL_FILTER: queryString,
//         srs: coordinate,
//         layers: [layerName],
//         env: env,
//         STYLES : [geoserverDataWorkspace + "_" + geometryType]
//       },
//         crossOrigin: 'anonymous'
//     })
//   });

//   layers.push(baseLayerCtprvn);

//   var baseLayerCgg = new ol.layer.Tile({
//     id : layerInitCgg,
//     visible : layerInitCggVisible,
//     source : new ol.source.TileWMS({
//       url: geoserverDomainUrl + '/' + geoserverDataWorkspace + '/wms',
//       params: {
//         'VERSION' : '1.1.1',
//         tiled: true,
// //    					CQL_FILTER: queryString,
//         srs: coordinate,
//         layers: [layerName],
//         env: env,
//         STYLES : [geoserverDataWorkspace + "_" + geometryType]
//       },
//         crossOrigin: 'anonymous'
//     })
//   });

//   layers.push(baseLayerCgg);

//   var baseLayerEmd = new ol.layer.Tile({
//     id : layerInitEmd,
//     visible : layerInitEmdVisible,
//     source : new ol.source.TileWMS({
//       url: geoserverDomainUrl + '/' + geoserverDataWorkspace + '/wms',
//       params: {
//         'VERSION' : '1.1.1',
//         tiled: true,
// //    					CQL_FILTER: queryString,
//         srs: coordinate,
//         layers: [layerName],
//         env: env,
//         STYLES : [geoserverDataWorkspace + "_" + geometryType]
//       },
//         crossOrigin: 'anonymous'
//     })
//   });

//   layers.push(baseLayerEmd);

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
    // extent: layerInitMapExtent
  });
  // view
  const view = new ol.View({
    zoom: 7,
    maxZoom: 18,
    minZoom: 3,
    center: layerInitMapCenter,
    // extent: layerInitMapExtent,
    projection : proj
  });

  // 지도 위 툴팁
  const drawToolOverlay = new ol.Overlay({
    id: 'drawTool-overlay',
    element: document.getElementById('drawToolTip'),
    offset: [10, 10],
    positioning: 'top'
  });

  let map;

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
  }

}
// var map = new ol.Map({
//     layers: [
//         new ol.layer.Tile({
//           source: new ol.source.OSM(),
//         }) ],
//       target: 'map',
//       view: new ol.View({
//         center: [0, 0],
//         zoom: 2,
//       }),
// });