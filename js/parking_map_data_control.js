L.Control.ParkingInput = L.Control.extend({
  options: {
    position: 'topright'
  },
  initialize: function (options) {

  },
  onAdd: function (map) {
    const container = L.DomUtil.create('div', 'container')

    const inputPanel = L.DomUtil.create('div', 'panel panel-default', container)
    inputPanel.innerHTML = 
      '<h4>Wilmington, DE</h4>' +
      '<form id="filter-parking-form">' +
        '<div>' +
        '<label>' +
          '<input type="checkbox" id="hasMeters" /> Metered Parking' +
        '</label>' +
        '</div>' +
        '<div>' +
        '<label>' +
          '<input type="checkbox" id="acceptsCreditCards" /> Accepts Credit Cards' +
        '</label>' +
        '</div>' +
        '<div>' +
        '<label>' +
          '<input type="checkbox" id="acceptsParkMobile" /> Accepts Park Mobile' +
        '</label>' +
        '</div>' +
        '<div>' +
        '<label>' +
          '<input type="checkbox" id="acceptsCoins" /> Accepts Coins' +
        '</label>' +
        '</div>' +
        '<div>' +
        '<label>' +
          '<input type="checkbox" id="freeSaturdayParking" /> Free Saturday Parking' +
        '</label>' +
        '</div>' +
        '<div>' +
        '<label>' +
          '<input type="checkbox" id="freeSundayParking" /> Free Sunday Parking' +
        '</label>' +
        '</div>' +
      '</form>'

    return container
  },
  onRemove: function (map) {

  }
});

L.control.parkingInput = function(id, options) {
  return new L.Control.ParkingInput(id, options)
}
