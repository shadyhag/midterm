/*
http://www.chartjs.org/

===================== */
/*=====================

DATA

===================== */
var citymarkers = "https://shayda.cartodb.com/api/v2/sql?format=GeoJSON&q=SELECT * FROM pennjobsdatatable20160220 WHERE city1 IN ('New York', 'Philadelphia', 'Washington D.C.', 'Boston', 'Pittsburgh','Baltimore', 'Chicago')";
var phlzipcodes = 'https://shayda.cartodb.com/api/v2/sql?format=GeoJSON&q=SELECT * FROM philadelphia_zipcodes_poly201302';
var densestZC = "https://shayda.cartodb.com/api/v2/sql?format=GeoJSON&q=SELECT * FROM philadelphia_zipcodes_poly201302 WHERE code IN ('19109', '19103', '19107', '19139', '19104', '19102', '19130', '19123')";
var biketypes = 'https://shayda.cartodb.com/api/v2/sql?format=GeoJSON&q=SELECT * FROM bikedata';


// var dataset4 =
// var dataset5 =

var myFeatureGroup;

var allFeatureGroups = [];

var addLayer= function(url, options){
  $.ajax(url).done(function(data){
    var geoJson = L.geoJson(data, options).addTo(map);
    allFeatureGroups.push(geoJson);
  });

};
var removeAllLayers = function(){
  $.each(allFeatureGroups, function(i, geoJson){
    geoJson.clearLayers();
  });
  allFeatureGroups = [];
};


//
// $.ajax(citymarkers).done(function(data) {console.log(data);
//   myFeatureGroup = L.geoJson(data, {
//     // onEachFeature: eachFeature,
//     // style: myStyle1
//     // filter: myFilter
//
//   });
//   myFeatureGroup.addTo(map).bindPopup(feature.properties);
// });

addLayer(citymarkers);

/*=====================

STYLES

===================== */

// Choropleth
function getColor(d) {
    return d > (4.122520)  ? '#E31A1C' :
           d > (2.714700) ? '#FC4E2A' :
           d >  (1.782840)  ? '#FD8D3C' :
           d >   (1.072740) ? '#FEB24C' :
           d > 0   ? '#FED976' :
                      '#25404d';
}

// function style(feature) {
//     return {
//         fillColor: getColor(feature.properties.bikedensit),
//         weight: 2,
//         opacity: 1,
//         color: 'blue',
//         dashArray: '3',
//         fillOpacity: 0.7
//     };
// }


var densestZCstyle = function(feature) {
  return {fillColor: "red",
          color: "red",
          opacity:0.2};
};

var phlZCstyle = function(feature) {
  return {fillColor: "blue",
          color: "blue",
          opacity:0};
};

// var myStyle = function(feature) {
//   switch(feature.properties.code) {
//     case "MON":
//     color = "#25404d";
//     break;
//     case "TUE":
//     color = "yellow";
//     break;
//     case "WED":
//     color = "orange";
//     break;
//     case "THU":
//     color = "green";
//     break;
//     case "FRI":
//     color = "blue";
//     break;
//     default:
//     color = "gray";
//     break;
//   }
//   return {fillColor: color};
// };
// var phlZCstyle = function(feature) {
//   return feature.properties.code
//   :
//   {fillColor: "grey", color: "grey", opacity:0};
// };
// var phlZCstyle = function(feature) {
//   return feature.properties.pop90_sqmi < 100 ? {fillColor: "red", color: "red", opacity:0}:
//   {fillColor: "grey", color: "grey", opacity:0};
// };
//


/* =====================

SLIDES

===================== */

var showSlide1 = function() {

  removeAllLayers();
  addLayer(citymarkers);

  $('#content2').hide();
  $('#content1').show();
  $('#content3').hide();
  $('#content4').hide();
  $('#content5').hide();
  map.setView([39.840463, -81.475359],6);
};

var showSlide2 = function(){
  removeAllLayers();
  addLayer(biketypes);
  addLayer(densestZC,{style: densestZCstyle});
  $('#content1').hide();
  $('#content2').show();
  $('#content3').hide();
  $('#content4').hide();
  $('#content5').hide();

  // $.ajax(biketypes).done(function(data) {console.log(data);
  //   myFeatureGroup = L.geoJson(data, {
  //
  //   }).addTo(map);
  // });
  // $.ajax(densestZC).done(function(data) {console.log(data);
  //   myFeatureGroup = L.geoJson(data, {
  //
  //     style: densestZCstyle,
  //
  //   }).addTo(map);
  // });
  // $.ajax(phlzipcodes).done(function(data) {console.log(data);
  //   myFeatureGroup = L.geoJson(data, {
  //
  //     style: phlZCstyle,
  //
  //   }).addTo(map);
  // });
  map.setView([40.010305, -75.125318],11);
};

var showSlide3 = function(){
  myFeatureGroup.clearLayers();
  $('#content1').hide();
  $('#content2').hide();
  $('#content3').show();
  $('#content4').hide();
  $('#content5').hide();
  $.ajax(phlzipcodes).done(function(data) {console.log(data);
    myFeatureGroup = L.geoJson(data, {

      style: style,

    }).addTo(map);
  });
  map.setView([39.955720, -75.182261],13);
};

var showSlide4 = function(){
  myFeatureGroup.clearLayers();
  $('#content1').hide();
  $('#content2').hide();
  $('#content3').hide();
  $('#content4').show();
  $('#content5').hide();
  // $.ajax(phlzipcodes).done(function(data) {
  //     var myFeatureGroup = L.geoJson(data, {
  //       // onEachFeature: eachFeature,
  //       style: myStyle,
  //       // filter: myFilter
  //     }).addTo(map);
  // });
  // map.setView([40.000, -75.1090],11);
};

var showSlide5 = function(){
  myFeatureGroup.clearLayers();
  $('#content1').hide();
  $('#content2').hide();
  $('#content3').hide();
  $('#content4').hide();
  $('#content5').show();
  $('#content6').hide();
  //   $.ajax(phlzipcodes).done(function(data) {
  //       var myFeatureGroup = L.geoJson(data, {
  //         // onEachFeature: eachFeature,
  //         style: myStyle,
  //         // filter: myFilter
  //       }).addTo(map);
  //   });
  //   map.setView([40.000, -75.1090],11);
};

var showSlide6 = function(){
  myFeatureGroup.clearLayers();
  $('#content1').hide();
  $('#content2').hide();
  $('#content3').hide();
  $('#content4').hide();
  $('#content5').hide();
  $('#content6').show();
  //   $.ajax(phlzipcodes).done(function(data) {
  //       var myFeatureGroup = L.geoJson(data, {
  //         // onEachFeature: eachFeature,
  //         style: myStyle,
  //         // filter: myFilter
  //       }).addTo(map);
  //   });
  //   map.setView([40.000, -75.1090],11);
};



/* =====================
CHART & GRAPHS
===================== */
$(function(){
  var ctx = $("#myChart1").get(0).getContext("2d");
  // This will get the first returned node in the jQuery collection.
  var data = {
    labels: ["New York", "Boston", "Chicago", "Pittsburgh", "Baltimore", "Philadelphia", "Washington D.C."],
    datasets: [
      {
        label: "Annual Average Miles of Bike Lanes Added",
        fillColor: "rgba(220,220,220,0.75)",
        strokeColor: "rgba(220,220,220,0.75)",
        highlightFill: "#16174f",
        highlightStroke: "#16174f",
        data: [34.4, 13.7, 12.3, 8.2, 6.6,6,5.2]
      },
    ]
  };

  var options1= {
    //Boolean - Whether the scale should start at zero, or an order of magnitude down from the lowest value
    scaleBeginAtZero : true,

    //Boolean - Whether grid lines are shown across the chart
    scaleShowGridLines : false,

    //String - Colour of the grid lines
    scaleGridLineColor : "rgba(0,0,0,.05)",

    //Number - Width of the grid lines
    scaleGridLineWidth : 1,

    //Boolean - Whether to show horizontal lines (except X axis)
    scaleShowHorizontalLines: true,

    //Boolean - Whether to show vertical lines (except Y axis)
    scaleShowVerticalLines: true,

    //Boolean - If there is a stroke on each bar
    barShowStroke : true,

    //Number - Pixel width of the bar stroke
    barStrokeWidth : 2,

    //Number - Spacing between each of the X value sets
    barValueSpacing : 5,

    //Number - Spacing between data sets within X values
    barDatasetSpacing : 1,

    //String - A legend template
    legendTemplate : "<ul class=\"<%=name.toLowerCase()%>-legend\"><% for (var i=0; i<datasets.length; i++){%><li><span style=\"background-color:<%=datasets[i].fillColor%>\"></span><%if(datasets[i].label){%><%=datasets[i].label%><%}%></li><%}%></ul>"

  };

  var myBarChart = new Chart(ctx).Bar(data,options1);

});

/* =====================
Leaflet Configuration
===================== */

var map = L.map('map', {
  center: [39.840463, -81.475359],
  zoom: 6
});
var Stamen_TonerLite = L.tileLayer('http://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png', {
  attribution: 'Map tiles by <State`="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
  subdomains: 'abcd',
  minZoom: 0,
  maxZoom: 20,
  ext: 'png'
}).addTo(map);
