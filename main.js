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

/*
//Sehenswürdigkeiten in Layercontrol
let sightLayer = L.featureGroup();

layerControl.addOverlay(sightLayer, "Sehenswürdigkeiten");

let mrk = L.marker([stephansdom.lat, stephansdom.lng]).addTo(sightLayer);

sightLayer.addTo(map);
*/

//Massstab
L.control.scale({
    imperial : false,
}).addTo(map);

//Fullscreen
L.control.fullscreen().addTo(map);

//Minimap
let miniMap = new L.Control.MiniMap(
    L.tileLayer.provider("BasemapAT"),
    {"toggleDisplay" : "True"}
).addTo(map);

// Asynchrone Funktion zum Laden der GeoJSON datei mit Sehenswürdigkeiten
// und Einfügen in Karte
async function loadSites(url) {
    let response = await fetch(url);
    let geojson = await response.json();
    //console.log(geojson);

    //Sehenswürdigkeiten in Layercontrol
    let overlay = L.featureGroup();

    layerControl.addOverlay(overlay, "Sehenswürdigkeiten");
    overlay.addTo(map);
    L.geoJSON(geojson).addTo(overlay); // https://leafletjs.com/reference.html#geojson
}
loadSites("https://data.wien.gv.at/daten/geo?service=WFS&request=GetFeature&version=1.1.0&typeName=ogdwien:SEHENSWUERDIGOGD&srsName=EPSG:4326&outputFormat=json")

//Haltestellen Vienna Sightseeing
async function loadStops(url) {
    let response = await fetch(url);
    let geojson = await response.json();
    //console.log(geojson);

    //Sightseeing in Layercontrol
    let overlay = L.featureGroup();

    layerControl.addOverlay(overlay, "Sightseeing Stops");
    overlay.addTo(map);
    L.geoJSON(geojson).addTo(overlay); // https://leafletjs.com/reference.html#geojson
}
loadStops("https://data.wien.gv.at/daten/geo?service=WFS&request=GetFeature&version=1.1.0&typeName=ogdwien:TOURISTIKHTSVSLOGD&srsName=EPSG:4326&outputFormat=json")

//Linien Vienna Sightseeing
async function loadLines(url) {
    let response = await fetch(url);
    let geojson = await response.json();
    //console.log(geojson);

    //Sightseeing in Layercontrol
    let overlay = L.featureGroup();

    layerControl.addOverlay(overlay, "Sightseeing Liniennetz");
    overlay.addTo(map);
    L.geoJSON(geojson).addTo(overlay); // https://leafletjs.com/reference.html#geojson
}
loadLines("https://data.wien.gv.at/daten/geo?service=WFS&request=GetFeature&version=1.1.0&typeName=ogdwien:TOURISTIKLINIEVSLOGD&srsName=EPSG:4326&outputFormat=json")

//Fußgängerzonen
async function loadZones(url) {
    let response = await fetch(url);
    let geojson = await response.json();
    //console.log(geojson);

    //Fußgängerzonen in Layercontrol
    let overlay = L.featureGroup();

    layerControl.addOverlay(overlay, "Fußgängerzonen");
    overlay.addTo(map);
    L.geoJSON(geojson).addTo(overlay); // https://leafletjs.com/reference.html#geojson
}
loadZones("https://data.wien.gv.at/daten/geo?service=WFS&request=GetFeature&version=1.1.0&typeName=ogdwien:FUSSGEHERZONEOGD&srsName=EPSG:4326&outputFormat=json")

//Hotels und Unterkünfte
async function loadHotels(url) {
    let response = await fetch(url);
    let geojson = await response.json();
    //console.log(geojson);

    //Fußgängerzonen in Layercontrol
    let overlay = L.featureGroup();

    layerControl.addOverlay(overlay, "Hotels und Unterkünfte");
    overlay.addTo(map);
    L.geoJSON(geojson).addTo(overlay); // https://leafletjs.com/reference.html#geojson
}
loadHotels("https://data.wien.gv.at/daten/geo?service=WFS&request=GetFeature&version=1.1.0&typeName=ogdwien:UNTERKUNFTOGD&srsName=EPSG:4326&outputFormat=json")