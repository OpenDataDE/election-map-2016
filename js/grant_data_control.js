L.Control.GrantData = L.Control.extend({
  options: {
    position: 'topright'
  },
  initialize: function (options) {

  },
  onAdd: function (map) {
    const container = L.DomUtil.create('div', 'container')

    // const checkboxPanel = L.DomUtil.create('div', 'panel panel-default', container)
    // const outer = L.DomUtil.create('div', 'checkbox', checkboxPanel)
    // outer.innerHTML =
    //   '<label>' +
    //   '<input type="checkbox" value="" checked>' +
    //   'Geothermal' +
    //   '</label>' +
    //   '<label>' +
    //   '<input type="checkbox" value="" checked>' +
    //   'Photovoltaic' +
    //   '</label>' +
    //   '<label>' +
    //   '<input type="checkbox" value="" checked>' +
    //   'Solar Water Heat' +
    //   '</label>' +
    //   '<label>' +
    //   '<input type="checkbox" value="" checked>' +
    //   'Wind' +
    //   '</label>'

    const metadataPanel = L.DomUtil.create('div', 'panel panel-default', container)
    metadataPanel.innerHTML = '<div class="row">' +
      '<div class="col-xs-4"><strong>Zip Code</strong></div>' +
      '<div class="col-xs-8" id="zipCode">&nbsp;</div>' +
      '<div class="col-xs-4"><strong>Population</strong></div>' +
      '<div class="col-xs-8" id="population">&nbsp;</div>' +
      '</div>'

    const dataPanel = L.DomUtil.create('div', 'panel panel-default', container)
    dataPanel.innerHTML = '<div class="row">' +
      '<div class="col-xs-4"><strong>Type</strong></div>' +
      '<div class="col-xs-8 text-right"><strong>Amount</strong></div>' +
      '<div class="col-xs-4">Geothermal</div>' +
      '<div class="col-xs-8 text-right" id="geothermalAmount">&nbsp;</div>' +
      '<div class="col-xs-4">Photovoltaic</div>' +
      '<div class="col-xs-8 text-right" id="photovoltaicAmount">&nbsp;</div>' +
      '<div class="col-xs-4">Solar Water</div>' +
      '<div class="col-xs-8 text-right" id="solarwaterAmount">&nbsp;</div>' +
      '<div class="col-xs-4">Wind</div>' +
      '<div class="col-xs-8 text-right" id="windAmount">&nbsp;</div>' +
      '<div class="col-xs-4"><strong>Total</strong></div>' +
      '<div class="col-xs-8 text-right" id="totalAmount">&nbsp;</div>' +
      '</div>'

    return container
  },
  onRemove: function (map) {

  }
});

L.control.grantData = function(id, options) {
  return new L.Control.GrantData(id, options)
}
