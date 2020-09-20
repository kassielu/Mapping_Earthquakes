// Add console.log to check to see if our code is working.
console.log("working");

// Create the map object with center and zoom level.
// let map = L.map('mapid').setView([30, 30], 2);

// We create the tile layer that will be the background of our map.
let streets = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'streets-v11',
    accessToken: API_KEY
});

// We create the dark view tile layer that will be an option for our map.
let satelliteStreets = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/satellite-streets-v11/tiles/{z}/{x}/{y}?access_token={accessToken}', {
attribution: 'Map data © <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    accessToken: API_KEY
});

// Then we add our 'graymap' tile layer to the map.
// streets.addTo(map);

// Create a base layer that holds both maps.
let baseMaps = {
  Streets: streets,
  "Satellite Streets": satelliteStreets
};

// Create the map object with center, zoom level and default layer.
let map = L.map('mapid', {
  center: [43.7, -79.3],
  zoom: 11,
  layers: [streets]
})

//Pass our map layers into our layer control and add the layer control to the map.
L.control.layers(baseMaps).addTo(map);

// // // Accessing the airport GeoJSON URL
// let airportData = "https://raw.githubusercontent.com/kassielu/Mapping_Earthquakes/master/majorAirports.json";
// Accessing the Toronto neighborhoods GeoJSON URL.
let torontoHoods = "https://raw.githubusercontent.com/kassielu/Mapping_Earthquakes/master/torontoNeighborhoods.json";


// Create a style for the lines.
let myStyle = {
  fillColor: "yellow",
  weight: 1
}

// Grabbing our GeoJSON data.
d3.json(torontoHoods).then(function(data) {
  console.log(data);
  L.geoJson(data, {
    style: myStyle,
    onEachFeature: function(feature, layer) {
      layer.bindPopup("<h2> Neighborhood: " + feature.properties.AREA_NAME  + "</h2>");
    }       
  })
  .addTo(map);
  });


// // // Grabbing our GeoJSON data.
// d3.json(airportData).then(function(data) {
//   console.log(data);
//   L.geoJson(data, {
//     // We turn each feature into a marker on the map.
//     pointToLayer: function(feature, latlng) {
//       return L.marker(latlng)
//       .bindPopup("<h2> Airport code: " + feature.properties.name + "</h2> <hr> <h3>" + feature.properties.city +  ", " + feature.properties.country + "</h3>") 
//   }
// }).addTo(map);
// })