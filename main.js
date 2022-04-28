/* OGD Wien Beispiel */

let stephansdom ={
    lat: 48.208493,
    lng: 16.373118,
    title: "Stephansdom",
};

let startLayer = L.tileLayer.provider('BasemapAT.grau');

let map = L.map("map", {
    center : [stephansdom.lat, stephansdom.lng],
    zoom : 12,
    layers : [
        startLayer
    ],
})

let layerControl = L.control.layers({
    "BasemapAT Grau" : startLayer,
    "BasemapAT Standard" : L.tileLayer.provider('BasemapAT.basemap'),
    "BasemapAT High-DPI" : L.tileLayer.provider('BasemapAT.highdpi'),
    "BasemapAT Gelände" : L.tileLayer.provider('BasemapAT.terrain'),
    "BasemapAT Oberfläche" : L.tileLayer.provider('BasemapAT.surface'),
    "BasemapAT Orthofoto" : L.tileLayer.provider('BasemapAT.orthofoto'),
    "BasemapAT Beschriftung" : L.tileLayer.provider('BasemapAT.overlay'),
    "Basemap Orthofoto mit Beschriftung" : L.layerGroup([
        L.tileLayer.provider('BasemapAT.orthofoto'),
        L.tileLayer.provider('BasemapAT.overlay')])
}).addTo(map)

layerControl.expand();

//Sehenswürdigkeiten in Layercontrol
let sightLayer = L.featureGroup();

layerControl.addOverlay(sightLayer, "Sehenswürdigkeiten");

let mrk = L.marker([stephansdom.lat, stephansdom.lng]).addTo(sightLayer);

sightLayer.addTo(map);

//Massstab
L.control.scale({
    imperial : false,
}).addTo(map);