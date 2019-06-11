var format = function(d) {
    d = d / 1000000;
    return d3.format(',.02f')(d) + 'M';
}

var map = d3.choropleth()
    .geofile('/d3-geomap/topojson/world/countries.json')
    .colors(d3.schemeYlGnBu[9])
    .column('YR2010')
    .format(format)
    .legend(true)
    .unitId('iso3');

d3.csv('/data/sp.pop.totl.csv').then(data => {
    var selection = d3.select('#map').datum(data);
    map.draw(selection);
});