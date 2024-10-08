// https://d3-geomap.github.io v4.0.0 Copyright 2024 Ramiro Gómez
(function (global, factory) {
typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('d3-selection'), require('topojson'), require('d3-fetch'), require('d3-geo'), require('d3-array'), require('d3-scale'), require('d3-format')) :
typeof define === 'function' && define.amd ? define(['exports', 'd3-selection', 'topojson', 'd3-fetch', 'd3-geo', 'd3-array', 'd3-scale', 'd3-format'], factory) :
(global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.d3 = global.d3 || {}, global.d3, global.topojson, global.d3, global.d3, global.d3, global.d3, global.d3));
})(this, (function (exports, d3Selection, topojson, d3Fetch, d3Geo, d3Array, d3Scale, d3Format) { 'use strict';

function _assertThisInitialized(e) {
  if (void 0 === e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  return e;
}
function _callSuper(t, o, e) {
  return o = _getPrototypeOf(o), _possibleConstructorReturn(t, _isNativeReflectConstruct() ? Reflect.construct(o, [], _getPrototypeOf(t).constructor) : o.apply(t, e));
}
function _classCallCheck(a, n) {
  if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function");
}
function _defineProperties(e, r) {
  for (var t = 0; t < r.length; t++) {
    var o = r[t];
    o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o);
  }
}
function _createClass(e, r, t) {
  return r && _defineProperties(e.prototype, r), Object.defineProperty(e, "prototype", {
    writable: !1
  }), e;
}
function _get() {
  return _get = "undefined" != typeof Reflect && Reflect.get ? Reflect.get.bind() : function (e, t, r) {
    var p = _superPropBase(e, t);
    if (p) {
      var n = Object.getOwnPropertyDescriptor(p, t);
      return n.get ? n.get.call(arguments.length < 3 ? e : r) : n.value;
    }
  }, _get.apply(null, arguments);
}
function _getPrototypeOf(t) {
  return _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function (t) {
    return t.__proto__ || Object.getPrototypeOf(t);
  }, _getPrototypeOf(t);
}
function _inherits(t, e) {
  if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function");
  t.prototype = Object.create(e && e.prototype, {
    constructor: {
      value: t,
      writable: !0,
      configurable: !0
    }
  }), Object.defineProperty(t, "prototype", {
    writable: !1
  }), e && _setPrototypeOf(t, e);
}
function _isNativeReflectConstruct() {
  try {
    var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {}));
  } catch (t) {}
  return (_isNativeReflectConstruct = function () {
    return !!t;
  })();
}
function _possibleConstructorReturn(t, e) {
  if (e && ("object" == typeof e || "function" == typeof e)) return e;
  if (void 0 !== e) throw new TypeError("Derived constructors may only return object or undefined");
  return _assertThisInitialized(t);
}
function _setPrototypeOf(t, e) {
  return _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function (t, e) {
    return t.__proto__ = e, t;
  }, _setPrototypeOf(t, e);
}
function _superPropBase(t, o) {
  for (; !{}.hasOwnProperty.call(t, o) && null !== (t = _getPrototypeOf(t)););
  return t;
}
function _superPropGet(t, e, o, r) {
  var p = _get(_getPrototypeOf(t.prototype ), e, o);
  return "function" == typeof p ? function (t) {
    return p.apply(o, t);
  } : p;
}
function _toPrimitive(t, r) {
  if ("object" != typeof t || !t) return t;
  var e = t[Symbol.toPrimitive];
  if (void 0 !== e) {
    var i = e.call(t, r);
    if ("object" != typeof i) return i;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (String )(t);
}
function _toPropertyKey(t) {
  var i = _toPrimitive(t, "string");
  return "symbol" == typeof i ? i : i + "";
}

function addAccessor(obj, name, value) {
  obj[name] = function (_) {
    if (typeof _ === 'undefined') return obj.properties[name] || value;
    obj.properties[name] = _;
    return obj;
  };
}

var Geomap = /*#__PURE__*/function () {
  function Geomap() {
    _classCallCheck(this, Geomap);
    // Set default properties optimized for naturalEarth projection.
    this.properties = {
      /**
       * URL to TopoJSON file to load when geomap is drawn. Ignored if geoData is specified.
       *
       * @type {string|null}
       */
      geofile: null,
      /**
       * Contents of TopoJSON file. If specified, geofile is ignored.
       *
       * @type {Promise<object>|object|null}
       */
      geoData: null,
      height: null,
      postUpdate: null,
      projection: d3Geo.geoNaturalEarth1,
      rotate: [0, 0, 0],
      scale: null,
      translate: null,
      unitId: 'iso3',
      unitPrefix: 'unit-',
      units: 'units',
      unitTitle: function unitTitle(d) {
        return d.properties.name;
      },
      width: null,
      zoomFactor: 4
    };

    // Setup methods to access properties.
    for (var key in this.properties) addAccessor(this, key, this.properties[key]);

    // Store internal properties.
    this._ = {};
  }
  return _createClass(Geomap, [{
    key: "clicked",
    value: function clicked(d) {
      var self = this;
      var k = 1,
        x0 = self.properties.width / 2,
        y0 = self.properties.height / 2,
        x = x0,
        y = y0;
      if (!d.target) return;
      var feature = d3Selection.select(d.target).datum();
      if (self._.centered !== feature) {
        var centroid = self.path.centroid(feature);
        x = centroid[0];
        y = centroid[1];
        k = self.properties.zoomFactor;
        self._.centered = feature;
      } else {
        self._.centered = null;
      }
      self.svg.selectAll('path.unit').classed('active', function (unit) {
        return unit === self._.centered;
      });
      self.svg.selectAll('g.zoom').transition().duration(750).attr('transform', "translate(".concat(x0, ", ").concat(y0, ")scale(").concat(k, ")translate(-").concat(x, ", -").concat(y, ")"));
    }

    /**
     * Load geo data once here and draw map. Call update at the end.
     *
     * By default map dimensions are calculated based on the width of the
     * selection container element so they are responsive. Properties set before
     * will be kept.
     */
  }, {
    key: "draw",
    value: function draw(selection) {
      var self = this;
      self.data = selection.datum();
      if (!self.properties.width) self.properties.width = selection.node().getBoundingClientRect().width;
      if (!self.properties.height) self.properties.height = self.properties.width / 1.92;
      self.svg = selection.append('svg').attr('width', self.properties.width).attr('height', self.properties.height);
      self.svg.append('rect').attr('class', 'background').attr('width', self.properties.width).attr('height', self.properties.height).on('click', self.clicked.bind(self));

      // Set map projection and path.
      var proj = self.properties.projection().precision(.1);

      // Apply optional user settings to projection.
      if (self.properties.scale) proj.scale(self.properties.scale);
      if (self.properties.translate) proj.scale(self.properties.translate);

      // Not every projection supports rotation, e. g. albersUsa does not.
      if (proj.hasOwnProperty('rotate') && self.properties.rotate) proj.rotate(self.properties.rotate);
      self.path = d3Geo.geoPath().projection(proj);
      var drawGeoData = function drawGeoData(geo) {
        self.geoFeature = topojson.feature(geo, geo.objects[self.properties.units]);

        // Auto fit size if scale and translate are not set.
        if (self.properties.scale === null && self.properties.translate === null) {
          proj.fitSize([self.properties.width, self.properties.height], self.geoFeature);
        }
        self.svg.append('g').attr('class', 'units zoom').selectAll('path').data(self.geoFeature.features).enter().append('path').attr('class', function (d) {
          return 'unit ' + self.properties.unitPrefix + self.unitName(d.properties);
        }).attr('d', self.path).on('click', self.clicked.bind(self)).append('title').text(self.properties.unitTitle);
        self.update();
      };
      Promise.resolve().then(function () {
        if (self.properties.geoData) {
          return self.properties.geoData;
        }
        return d3Fetch.json(self.properties.geofile);
      }).then(function (geo) {
        return drawGeoData(geo);
      });
    }
  }, {
    key: "unitName",
    value: function unitName(record) {
      var name = record[this.properties.unitId];
      if ('undefined' !== typeof name) {
        return name.toString().trim().replace(/\s/g, '_');
      }
      return '';
    }
  }, {
    key: "update",
    value: function update() {
      if (this.properties.postUpdate) this.properties.postUpdate();
    }
  }]);
}();

var D3_CHROMATIC_SCHEME_OrRd9 = ['#fff7ec', '#fee8c8', '#fdd49e', '#fdbb84', '#fc8d59', '#ef6548', '#d7301f', '#b30000', '#7f0000'];
var Choropleth = /*#__PURE__*/function (_Geomap) {
  function Choropleth() {
    var _this;
    _classCallCheck(this, Choropleth);
    _this = _callSuper(this, Choropleth);
    var properties = {
      colors: Choropleth.DEFAULT_COLORS,
      column: null,
      domain: null,
      duration: null,
      format: d3Format.format(',.02f'),
      legend: false,
      valueScale: d3Scale.scaleQuantize
    };
    for (var key in properties) {
      _this.properties[key] = properties[key];
      addAccessor(_this, key, properties[key]);
    }
    return _this;
  }
  _inherits(Choropleth, _Geomap);
  return _createClass(Choropleth, [{
    key: "columnVal",
    value: function columnVal(d) {
      return +d[this.properties.column];
    }
  }, {
    key: "defined",
    value: function defined(val) {
      return !(isNaN(val) || 'undefined' === typeof val || '' === val);
    }
  }, {
    key: "update",
    value: function update() {
      var self = this;
      self.extent = d3Array.extent(self.data, self.columnVal.bind(self));
      self.colorScale = self.properties.valueScale().domain(self.properties.domain || self.extent).range(self.properties.colors);

      // Remove fill styles that may have been set previously.
      self.svg.selectAll('path.unit').style('fill', null);

      // Add new fill styles based on data values.
      self.data.forEach(function (d) {
        var uid = self.unitName(d),
          val = d[self.properties.column].toString().trim();

        // selectAll must be called and not just select, otherwise the data
        // attribute of the selected path object is overwritten with self.data.
        var unit = self.svg.selectAll(".".concat(self.properties.unitPrefix).concat(uid));
        // Data can contain values for non existing units and values can be empty or NaN.
        if (!unit.empty() && self.defined(val)) {
          var fill = self.colorScale(val),
            text = self.properties.unitTitle(unit.datum());
          if (self.properties.duration) unit.transition().duration(self.properties.duration).style('fill', fill);else unit.style('fill', fill);

          // New title with column and value.
          val = self.properties.format(val);
          unit.select('title').text("".concat(text, "\n\n").concat(self.properties.column, ": ").concat(val));
        }
      });
      if (self.properties.legend) self.drawLegend(self.properties.legend);

      // Make sure postUpdate function is run if set.
      _superPropGet(Choropleth, "update", this)([]);
    }

    /**
     * Draw legend including color scale and labels.
     *
     * If bounds is set to true, legend dimensions will be calculated based on
     * the map dimensions. Otherwise bounds must be an object with width and
     * height attributes.
     */
  }, {
    key: "drawLegend",
    value: function drawLegend() {
      var bounds = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
      var self = this,
        steps = self.properties.colors.length,
        wBox,
        hBox;
      var wFactor = 10,
        hFactor = 3;
      if (bounds === true) {
        wBox = self.properties.width / wFactor;
        hBox = self.properties.height / hFactor;
      } else {
        wBox = bounds.width;
        hBox = bounds.height;
      }
      var wRect = wBox / (wFactor * .75),
        hLegend = hBox - hBox / (hFactor * 1.8),
        offsetText = wRect / 2,
        offsetY = self.properties.height - hBox,
        tr = 'translate(' + offsetText + ',' + offsetText * 3 + ')';

      // Remove possibly existing legend, before drawing.
      self.svg.select('g.legend').remove();

      // Reverse a copy to not alter colors array.
      var colors = self.properties.colors.slice().reverse(),
        hRect = hLegend / steps,
        offsetYFactor = hFactor / hRect;
      var legend = self.svg.append('g').attr('class', 'legend').attr('width', wBox).attr('height', hBox).attr('transform', 'translate(0,' + offsetY + ')');
      legend.append('rect').style('fill', '#fff').attr('class', 'legend-bg').attr('width', wBox).attr('height', hBox);

      // Draw a rectangle around the color scale to add a border.
      legend.append('rect').attr('class', 'legend-bar').attr('width', wRect).attr('height', hLegend).attr('transform', tr);
      var sg = legend.append('g').attr('transform', tr);

      // Draw color scale.
      sg.selectAll('rect').data(colors).enter().append('rect').attr('y', function (d, i) {
        return i * hRect;
      }).attr('fill', function (d, i) {
        return colors[i];
      }).attr('width', wRect).attr('height', hRect);

      // Determine display values for lower and upper thresholds. If the
      // minimum data value is lower than the first element in the domain
      // draw a less than sign. If the maximum data value is larger than the
      // second domain element, draw a greater than sign.
      var minDisplay = self.extent[0],
        maxDisplay = self.extent[1],
        addLower = false,
        addGreater = false;
      if (self.properties.domain) {
        if (self.properties.domain[1] < maxDisplay) addGreater = true;
        maxDisplay = self.properties.domain[1];
        if (self.properties.domain[0] > minDisplay) addLower = true;
        minDisplay = self.properties.domain[0];
      }

      // Draw color scale labels.
      sg.selectAll('text').data(colors).enter().append('text').text(function (d, i) {
        // The last element in the colors list corresponds to the lower threshold.
        if (i === steps - 1) {
          var text = self.properties.format(minDisplay);
          if (addLower) text = "< ".concat(text);
          return text;
        }
        return self.properties.format(self.colorScale.invertExtent(d)[0]);
      }).attr('class', function (d, i) {
        return 'text-' + i;
      }).attr('x', wRect + offsetText).attr('y', function (d, i) {
        return i * hRect + (hRect + hRect * offsetYFactor);
      });

      // Draw label for end of extent.
      sg.append('text').text(function () {
        var text = self.properties.format(maxDisplay);
        if (addGreater) text = "> ".concat(text);
        return text;
      }).attr('x', wRect + offsetText).attr('y', offsetText * offsetYFactor * 2);
    }
  }]);
}(Geomap);
Choropleth.DEFAULT_COLORS = D3_CHROMATIC_SCHEME_OrRd9;

function geomap() {
  return new Geomap();
}
function choropleth() {
  return new Choropleth();
}

exports.choropleth = choropleth;
exports.geomap = geomap;

}));
