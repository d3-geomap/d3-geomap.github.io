var map = d3.geomap()
    .geofile('/d3-geomap/topojson/world/countries.json')
    .rotate([0, 0, 180])
    .draw(d3.select('#map'));