import './extranlib/ol/ol-6.5.0.js';

var map = new ol.Map({
    layers: [
        new ol.layer.Tile({
          source: new ol.source.OSM(),
        }) ],
      target: 'map',
      view: new ol.View({
        center: [0, 0],
        zoom: 2,
      }),
});