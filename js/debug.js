var map = d3.geomap()
    .geofile('/d3-geomap/topojson/countries/USA.json')
    .projection(d3.geo.albersUsa)
    .scale(1000)
    .postUpdate(function() {
        map.svg.selectAll('.unit').style('fill', 'red');
    });

d3.select('#map')
    .call(map.draw, map);
