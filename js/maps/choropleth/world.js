var format = function(d) {
    d = d / 1000000;
    return d3.format(',.02f')(d) + 'M';
}

var map = d3.geomap.choropleth()
    .geofile('/d3-geomap/topojson/world/countries.json')
    .colors(colorbrewer.YlGnBu[9])
    .column('YR2010')
    .format(format)
    .legend(true)
    .unitId('Country Code');

d3.csv('/data/sp.pop.totl.csv', function(error, data) {
    d3.select('#map')
        .datum(data)
        .call(map.draw, map);
});