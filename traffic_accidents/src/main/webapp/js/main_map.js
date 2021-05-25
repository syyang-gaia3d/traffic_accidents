import './extranlib/ol/ol-6.5.0.js';

// 지도 객체 생성
export function InitMap(policy) {

  if (!(this instanceof InitMap)) {
    throw new Error("New 를 통해 생성 하십시오.");
  }

  // 공통사용값
  var zoomSize = 0.5;
  var zoomDuration = 250;
  var helpTooltipElement = null;
  var helpTooltip = null;
  // 지도이동
  var moveArray = [];
  var moveFlag = true;
  var moveIndex = -1;
  // geoserver
  var geoserverDomainUrl = policy.geoserverDomainUrl;
  var geoserverDataWorkspace = policy.geoserverDataWorkspace;
  var geoserverDataStore = policy.geoserverDataStore;
  var coordinate = policy.layerTargetCoordinate; //EPSG:3857 (WGS84)

  var layerInitMapCenter = [];
	var mapCenterArray = policy.layerInitMapCenter.split(",");
	for( var i=0; i<mapCenterArray.length; i++) {
		layerInitMapCenter.push(parseFloat(mapCenterArray[i]));
	}

	var layerInitMapExtent = [];
	var mapExtentArray = policy.layerInitMapExtent.split(",");
	for( var i=0; i<mapExtentArray.length; i++) {
		layerInitMapExtent.push(parseFloat(mapExtentArray[i]));
	}

  // 마우스 좌표
  var mousePosition = new ol.control.MousePosition({
    className: 'mousePosition',
    coordinateFormat: function(coordinate) {
        return ol.coordinate.format(coordinate, '{x}, {y}', 6);
    },
    projection: ol.proj.get('EPSG:3857'),
    target: document.getElementById('mouse-position'),
    undefinedHTML: ' '
  });

  var scaleLineControl = new ol.control.ScaleLine();

  // default controls
  var controls = ol.control.defaults({
      attributionOptions: /** @type {olx.control.AttributionOptions} */ ({
          collapsible: false
      }), zoom: false, rotate: false
  }).extend([
    scaleLineControl,
    mousePosition
  ]);


  // 레이어
  var layers = [];
  // osm 레이어
	var layerInitOsm = policy.layerInitOsm;
	var layerInitOsmVisible = policy.layerInitOsmVisible;
	// 시도 레이어(ctprvn)
	var layerInitCtprvn = policy.layerInitCtprvn;
	var layerInitCtprvnVisible = policy.layerInitCtprvnVisible;
  // 시군구 레이어(cgg)
  var layerInitCgg = policy.layerInitCgg;
  var layerInitCggVisible = policy.layerInitCggVisible;
  // 읍면동 레이어(emd)
  var layerInitEmd = policy.layerInitEmd;
  var layerInitEmdVisible = policy.layerInitEmdVisible;


  // OSM 배경지도
	var osmLayer = new ol.layer.Tile({
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


  // 좌표계
  var proj = new ol.proj.Projection({
    code: coordinate,
    units: 'm',
    global: false,
    extent: layerInitMapExtent
  });
  // view
  var view = new ol.View({
    zoom: 10,
    maxZoom: 18,
    minZoom: 3,
    center: layerInitMapCenter,
    extent: layerInitMapExtent,
    projection : proj
  });


  var map;

  /**
   * public
   */
  return {
    mouseOver: function() {
      return mouseOver;
    },
    create: function(element) {
      // 맵 생성
      map = new ol.Map({
        controls : controls,
        layers : layers,
        view : view,
        target : element
      });
    }
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