/*
http://www.chartjs.org/

===================== */
/*=====================

DATA

===================== */
var citymarkers = "https://shayda.cartodb.com/api/v2/sql?format=GeoJSON&q=SELECT * FROM pennjobsdatatable20160220 WHERE city1 IN ('New York', 'Philadelphia', 'Washington', 'Boston', 'Pittsburgh','Baltimore', 'Chicago')";
var phlzipcodes = 'https://shayda.cartodb.com/api/v2/sql?format=GeoJSON&q=SELECT * FROM philadelphia_zipcodes_poly201302';
var densestZC = "https://shayda.cartodb.com/api/v2/sql?format=GeoJSON&q=SELECT * FROM philadelphia_zipcodes_poly201302 WHERE code IN ('19109', '19103', '19107', '19139', '19104', '19102', '19130', '19123')";
var biketypes = 'https://shayda.cartodb.com/api/v2/sql?format=GeoJSON&q=SELECT * FROM bikedata';
var sixtypes = 'https://shayda.cartodb.com/api/v2/sql?format=GeoJSON&q=SELECT * FROM bikenetworkdensityzipcodes';
var cyclephilly = "https://shayda.cartodb.com/api/v2/sql?format=GeoJSON&q=SELECT * FROM bikenetworkdensityzipcodes WHERE streetname = (')";
var fifthstreet = "https://shayda.cartodb.com/api/v2/sql?format=GeoJSON&q=SELECT * FROM cyclephilly_roadsegmenttrips WHERE linkname IN ('N 5th St', '05TH')";
var crash = "https://shayda.cartodb.com/api/v2/sql?format=GeoJSON&q=SELECT * FROM cyclephilly_roadsegmenttrips WHERE linkname IN ('N 5th St', '05TH', 'S 5th St', '20TH')";
//5th Street, 20th Street, Chestnut Street, John F Kennedy Street, Market Street, and Spring Garden.
// var dataset4 =
// var dataset5 =

var myFeatureGroup;

var allFeatureGroups = [];

legend = null;
var addLayer= function(url, options){
  $.ajax(url).done(function(data){
    console.log(url, data);
    var geoJson = L.geoJson(data, options).addTo(map);
    allFeatureGroups.push(geoJson);
  });

};
var removeAllLayers = function(){
  $.each(allFeatureGroups, function(i, geoJson){
    geoJson.clearLayers();
  });
  allFeatureGroups = [];
  if(legend){
    legend.removeFrom(map);
    legend = null;
  }
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



/*=====================

STYLES

===================== */


//
// //('New York', 'Philadelphia', 'Washington', 'Boston', 'Pittsburgh','Baltimore', 'Chicago')";

// function highlightFeature(e) {
//     var layer = e.target;
//
//     layer.setStyle({
//         weight: 5,
//         color: '#666',
//         dashArray: '',
//         fillOpacity: 0.7
//     });
//
//     if (!L.Browser.ie && !L.Browser.opera) {
//         layer.bringToFront();
//     }
// }
//
// function resetHighlight(e) {
//   var layer = e.target;
//
//   layer.setStyle(cityMarkerOptions);
//
//   if (!L.Browser.ie && !L.Browser.opera) {
//       layer.bringToFront();
//   }
// }
//
//
// function onEachFeature(feature, layer) {
//     layer.on({
//         mouseover: highlightFeature,
//         mouseout: resetHighlight,
//
//     });
// }
// //
// var cityEachFeature = function(feature, layer) {
//   layer.on('mouseover', function (e) {
//     $(e.layer._icon).addClass('selectedMarker');
//  });
//  layer.on('mouseout', function (e) {
//    $(e.layer._icon).removeClass('selectedMarker');
// });
// layer.on('click', function(e){
//   e.layer.feature.properties['marker-color'] = '#ff8888';
// });
// console.log("WOOOO", feature, layer);
// };

var cityMarkerOptions = {
    radius: 8,
    fillColor: "grey",
    color: "grey",
    weight: 1,
    opacity: 1,
    fillOpacity: 0.8,
    onEachFeature: onEachFeature

};

function highlightFeature(e) {
    var layer = e.target;

    layer.setStyle({
        radius: 8,
        weight: 1,
        fillColor: "#16174f",
        color: "#16174f",
        dashArray: '',
        fillOpacity: 1
    });

    if (!L.Browser.ie && !L.Browser.opera) {
        layer.bringToFront();
    }
}

function resetHighlight(e) {
  var layer = e.target;

  layer.setStyle(cityMarkerOptions);

  if (!L.Browser.ie && !L.Browser.opera) {
      layer.bringToFront();
  }
}


function onEachFeature(feature, layer) {
    layer.on({
        mouseover: highlightFeature,
        mouseout: resetHighlight,

    });
}
    // switch(feature.properties.city1) {
    //   case "New York":
    //       $(me.layer._icon).addClass('selectedMarker');
    //   break;
    //   case "Philadelphia":
    //
    //   break;
    //   case "Washington":
    //
    //   break;
    //   case "Boston":
    //
    //   break;
    //   case "Pittsburgh":
    //
    //   break;
    //   case "Baltimore":
    //
    //   break;
    //   case "Chicago":
    //
    //   break;
    //   default:
    //
    //   break;
    // }
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
  return {fillColor: "blue",
          color: "blue",
          opacity:0
};
};
var phlZCstyle = function(feature) {
  return {fillColor: "grey",
          color: "grey",
          opacity:0};
};


var bikeStyle = function(feature) {
  switch(feature.properties.type_) {
      case "Conventional":
      color = "red";
      break;
      case "Sharrow":
      color = "yellow";
      break;
      case "Buffered":
      color = "orange";
      break;
      case "Buffered w Conventional":
      color = "green";
      break;
      case "Conventional w Sharrows":
      color = "blue";
      break;
      case "Contraflow w Conventional, same":
      color = "purple";
      break;
      default:
      color = "gray";
      break;
    }
  return {color: color,
    weight: 4};
};
// switch(feature.properties.type_) {
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


/* =====================

SLIDES

===================== */
addLayer(citymarkers,{
  pointToLayer: function (feature, loc){
    return L.circleMarker(loc, cityMarkerOptions);
  },
  onEachFeature: onEachFeature
});

var showSlide1 = function() {

  removeAllLayers();
  addLayer(citymarkers,{
    pointToLayer: function (feature, loc){
      return L.circleMarker(loc, cityMarkerOptions);
    },
    onEachFeature: onEachFeature
  });

  $('#content2').hide();
  $('#content1').show();
  $('#content3').hide();
  $('#content4').hide();
  $('#content5').hide();
  $('#content6').hide();
  map.setView([39.840463, -81.475359],5);
};

var showSlide2 = function(){
  removeAllLayers();
  addLayer(phlzipcodes,{style: phlZCstyle});
  addLayer(biketypes,{style: bikeStyle});
  legend = L.control({position: 'bottomright'});

  legend.onAdd = function (map) {

      var div = L.DomUtil.create('div', 'info legend'),
          types = ["Buff", "BuffC", "Sharrow", "Conv", "ConSh", "Cont"],
          labels = ["Buffered"];


      // loop through our density intervals and generate a label with a colored square for each interval
      for (var i = 0; i < types.length; i++) {
          div.innerHTML += '<div> <i class = "legendbox ' + types[i] + '"></i> ' + labels[i] +'</div>';
      }

      return div;
  };

  legend.addTo(map);
  $('#content1').hide();
  $('#content2').show();
  $('#content3').hide();
  $('#content4').hide();
  $('#content5').hide();
  $('#content6').hide();
  map.setView([40.010305, -75.125318],11);
};

var showSlide3 = function(){
  removeAllLayers();
  addLayer(phlzipcodes,{style: phlZCstyle});
  addLayer(sixtypes, {style: bikeStyle});
  addLayer(densestZC,{style: densestZCstyle});
  legend = L.control({position: 'bottomright'});

  legend.onAdd = function (map) {

      var div = L.DomUtil.create('div', 'info legend'),
          types = ["Buff", "BuffC", "Sharrow", "Conv", "ConSh", "Cont"],
          labels = ["Buffered"];


      // loop through our density intervals and generate a label with a colored square for each interval
      for (var i = 0; i < types.length; i++) {
          div.innerHTML += '<div> <i class = "legendbox ' + types[i] + '"></i> ' + labels[i] +'</div>';
      }

      return div;
  };

  legend.addTo(map);
  $('#content1').hide();
  $('#content2').hide();
  $('#content3').show();
  $('#content4').hide();
  $('#content5').hide();
  $('#content6').hide();
  map.setView([39.955720, -75.182261],13);
};

var showSlide4 = function(){
    removeAllLayers();
    addLayer(phlzipcodes,{style: phlZCstyle});
    addLayer(cyclephilly);
  $('#content1').hide();
  $('#content2').hide();
  $('#content3').hide();
  $('#content4').show();
  $('#content5').hide();
$('#content6').hide();
  map.setView([39.968456, -75.124256],12);
};

var showSlide5 = function(){
  removeAllLayers();
  addLayer(crash);
  addLayer(phlzipcodes,{style: phlZCstyle});

  $('#content1').hide();
  $('#content2').hide();
  $('#content3').hide();
  $('#content4').hide();
  $('#content5').show();
  $('#content6').hide();
  map.setView([39.968456, -75.124256],14);
};

var showSlide6 = function(){
  removeAllLayers();
  addLayer(phlzipcodes,{style: phlZCstyle});
  $('#content1').hide();
  $('#content2').hide();
  $('#content3').hide();
  $('#content4').hide();
  $('#content5').hide();
  $('#content6').show();
  map.setView([40.000, -75.1090],10);
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
  center: [40.922555, -79.745942],
  zoom: 5
});
var Stamen_TonerLite = L.tileLayer('http://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png', {
  attribution: 'Map tiles by <State`="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
  subdomains: 'abcd',
  minZoom: 0,
  maxZoom: 20,
  ext: 'png'
}).addTo(map);
