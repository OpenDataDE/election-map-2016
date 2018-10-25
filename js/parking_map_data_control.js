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
      '<h3>Wilmington, DE</h3>' +
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
        '<div>' +
          '<label>' +
            'How Long: <select id="parkingTime"/>' +
              '<option value="15">15 minutes</option>' +
              '<option value="30">30 minutes</option>' +
              '<option value="60">1 hour</option>' +
              '<option value="120">2 hours</option>' +
              '<option value="240">4 hours</option>' +
            '</select>' +
          '</label>' +
        '</div>'
      '</form>'

    return container
  },
  onRemove: function (map) {

  }
});

L.control.parkingInput = function(id, options) {
  return new L.Control.ParkingInput(id, options)
}
