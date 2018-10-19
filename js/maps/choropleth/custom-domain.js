var map = d3.geomap.choropleth()
    .geofile('/d3-geomap/topojson/world/countries.json')
    .colors(['green','red'])
    .column('1800')
    .domain([0, 1])
    .legend(false)
    .unitId('iso3');

d3.csv('/data/custom-domain.csv', function(error, data) {
    map.draw(d3.select('#map').datum(data));
});