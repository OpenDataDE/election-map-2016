L.Control.ParkingInput = L.Control.extend({
  options: {
    position: 'topright'
  },
  initialize: function (options) {

  },
  onAdd: function (map) {
    const container = L.DomUtil.create('div', 'container')

    const inputPanel = L.DomUtil.create('div', 'panel panel-default', container)
    inputPanel.innerHTML = '<div class="row align-items-end">' +
      '<div class="col-xs-12"><font size="+6">Wilmington, DE Parking</font></div>' +
      '<div class="col-xs-2">Metered Parking</div>' +
      '<div class="col-xs-10"><input type="checkbox" id="hasMeters">&nbsp;</input></div>' +
      '<div class="col-xs-2">Accepts Credit Cards</div>' +
      '<div class="col-xs-10"><input type="checkbox" id="acceptsCreditCards">&nbsp;</input></div>' +
      '<div class="col-xs-2">Accepts Park Mobile</div>' +
      '<div class="col-xs-10"><input type="checkbox" id="acceptsParkMobile">&nbsp;</input></div>' +
      '<div class="col-xs-2">Accepts Coins</div>' +
      '<div class="col-xs-10"><input type="checkbox" id="acceptsCoins">&nbsp;</input></div>' +
      '<div class="col-xs-2">Free Saturday Parking</div>' +
      '<div class="col-xs-10"><input type="checkbox" id="freeSaturdayParking">&nbsp;</input></div>' +
      '<div class="col-xs-2">Free Sunday Parking</div>' +
      '<div class="col-xs-10"><input type="checkbox" id="freeSundayParking">&nbsp;</input></div>' +
      '</div>'

    return container
  },
  onRemove: function (map) {

  }
});

L.control.parkingInput = function(id, options) {
  return new L.Control.ParkingInput(id, options)
}
