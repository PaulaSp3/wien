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
    "BasemapAT Terrain" : L.tileLayer.provider('BasemapAT.terrain'),
    "BasemapAT Surface" : L.tileLayer.provider('BasemapAT.surface'),
    "BasemapAT High dpi" : L.tileLayer.provider('BasemapAT.highdpi'),
    "BasemapAT Orthofoto" : L.tileLayer.provider('BasemapAT.orthofoto'),
    "BasemapAT Overlay" : L.tileLayer.provider('BasemapAT.overlay'),
}).addTo(map)