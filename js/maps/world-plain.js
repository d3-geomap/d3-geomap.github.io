var map = d3.geomap()
    .geofile('/d3-geomap/topojson/world/countries.json');

d3.select('#map')
    .call(map.draw, map);