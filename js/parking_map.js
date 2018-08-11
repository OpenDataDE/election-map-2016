const segments = [
  1713, 1762, 1805, 1833, 1847, 1881, 1908, 1961, 1997, 2041, 2140, 2141, 2094, 2051, 2009, 1957, 1904, 1869,
  1822, 1683, 1747, 1846, 1956, 2054, 2156, 2191, 1880, 1673, 1686, 1815, 1907, 2008, 2114, 2229, 2274, 2158,
  2050, 1960, 1854, 1737, 3545, 1608, 1674, 1722, 1712, 1821, 1852, 1928, 2083, 2109, 1903, 1804, 1694, 1643,
  1542, 1660, 1721, 1761, 1868, 1939, 1973, 1619, 3664, 3665, 3667, 3666, 1620, 1661, 1695, 1726, 1748, 1775,
  1816, 1855, 1901, 1947, 1837, 1785, 1738, 1687, 1618, 1579, 1543, 1520, 1714, 1719, 1784, 1900, 1996, 2093,
  2203, 2319, 2483, 2534, 2372, 2259, 2140, 2040, 1946, 1902, 1836, 1771, 1772, 2207, 2325, 2415, 2516, 2609,
  2691, 2757, 2847, 2898, 3690, 2878, 2786, 2721, 2641, 2554, 2447, 2363, 2393, 2487, 2580, 2667, 2744, 2810,
  2899, 2931, 2952, 2926, 2830, 2780, 2673, 2706, 2620, 2597, 2537, 2430, 2260, 2204, 2159, 2115, 2089, 2055,
  1995, 1940, 1853, 1882, 1929, 2033, 2084, 2110, 2157, 2192, 2230, 2275, 2320, 2373, 2619, 2535, 2484, 2431,
  2394, 2364, 2326, 2370, 2416, 2448, 2488, 2538, 2782, 3754, 2838, 2839, 2781, 2745, 2722, 2692, 2645, 2556,
  2517, 2555, 2581, 2621, 3681, 3680, 2707, 2668, 2642, 2610, 2831, 2811, 2758, 2815, 2845, 3710, 2943, 2952,
  2925, 2900, 2879, 2848, 3689, 2717, 2458, 2272, 2208, 2155, 1832, 1720, 1672, 1665, 2911, 2985, 3421, 3426,
  3424, 3425, 3040, 3010, 3011, 3001, 2981, 2982, 2957,
  2961, 3000, 3423
]

const paymentMethods = {
  'credit_card': 'Credit Card',
  'park_mobile': 'Park Mobile',
  'coins': 'Coins'
}

const freeParkingTypes = {
  'none': 'None',
  '2_hour_8_to_6_sun': '2 hours, 8am-6pm, Except Sunday',
  '2_hour_8_to_6_sat_sun': '2 hours, 8am-6pm, Except Saturday and Sunday'
}

function getPaymentMethods(val) {
  if (val) {
    return val.split(',').map(m => paymentMethods[m]).join(', ')
  } else {
    return 'Unknown'
  }
}

let featuresLayerGroup

function queryArcGIS(map) {
  conditions = []

  // conditions.push('1=1')
  conditions.push(`seg_id IN (${segments.join(',')})`)
  if ($('#hasMeters').is(':checked')) {
    conditions.push('even_metered_spaces_count > 0 OR odd_metered_spaces_count > 0 OR even_accessible_metered_spaces_count > 0 OR odd_accessible_metered_spaces_count > 0')
  }
  if ($('#acceptsCreditCards').is(':checked')) {
    conditions.push('even_metered LIKE \'%credit_card%\' OR odd_metered LIKE \'%credit_card%\'')
  }
  if ($('#acceptsParkMobile').is(':checked')) {
    conditions.push('even_metered LIKE \'%park_mobile%\' OR odd_metered LIKE \'%park_mobile%\'')
  }
  if ($('#acceptsCoins').is(':checked')) {
    conditions.push('even_metered LIKE \'%coins%\' OR odd_metered LIKE \'%coins%\'')
  }
  if ($('#freeSaturdayParking').is(':checked')) {
    conditions.push('even_type_of_free_parking = \'2_hour_8_to_6_sat_sun\' OR odd_type_of_free_parking = \'2_hour_8_to_6_sat_sun\'')
  } else if ($('#freeSundayParking').is(':checked')) {
    conditions.push('even_type_of_free_parking = \'2_hour_8_to_6_sun\' OR odd_type_of_free_parking = \'2_hour_8_to_6_sun\'')
  }

  const query = L.esri.query({
    url: 'https://services.arcgis.com/bkrWlSKcjUDFDtgw/arcgis/rest/services/Wilmington_Streets_All/FeatureServer/0'
  })
  .where(conditions.map(condition => `(${condition})`).join(' AND '))
  .run((err, featureCollection, response) => {
    if (err) {
      console.error(JSON.stringify(err, null, 2))
      console.error(response)
    } else {
      if (featuresLayerGroup) {
        featuresLayerGroup.clearLayers()
      }

      // console.error(response)
      featuresLayerGroup = L.geoJSON(featureCollection).bindTooltip(layer => {
        const props = layer.feature.properties

        const lines = []

        lines.push(`segment id: ${props.seg_id}`)
        lines.push(`<b>${props.label_text} from ${Math.min(props.fr_add_lt, props.fr_add_rt)} to ${Math.max(props.to_add_lt, props.to_add_rt)}</b>`)
        lines.push(`Between <b>${props.fromstreet}</b> and <b>${props.tostreet}</b>`)

        lines.push('<p>')
        lines.push('Even-numbered:')
        if (props.even_is_parking_available === 'yes') {
          lines.push(`Number of metered spaces: ${props.even_metered_spaces_count}`)
          lines.push(`Number of metered accessible spaces: ${props.even_accessible_metered_spaces_count}`)
          lines.push(`Free parking: ${freeParkingTypes[props.even_type_of_free_parking]}`)

          if (props.even_metered_spaces_count > 0 || props.even_accessible_metered_spaces_count > 0) {
            lines.push(`Meter payments: ${getPaymentMethods(props.even_metered)}`)
          }

        } else {
          lines.push('No parking available')

        }

        lines.push('<p>')
        lines.push('Odd-numbered:')
        if (props.odd_is_parking_available === 'yes') {
          lines.push(`Number of metered spaces: ${props.odd_metered_spaces_count}`)
          lines.push(`Number of metered accessible spaces: ${props.odd_accessible_metered_spaces_count}`)
          lines.push(`Free parking: ${freeParkingTypes[props.odd_type_of_free_parking]}`)

          if (props.odd_metered_spaces_count > 0 || props.odd_accessible_metered_spaces_count > 0) {
            lines.push(`Meter payments: ${getPaymentMethods(props.odd_metered)}`)
          }

        } else {
          lines.push('No parking available')

        }

        return lines.join('<br>')

      }).addTo(map)

    }
  })
}

$(document).ready(() => {
  const map = L.map("map").setView([39.743624, -75.549839], 15);

  L.esri.basemapLayer('Topographic').addTo(map);
  L.control.parkingInput().addTo(map);

  queryArcGIS(map)

  $('.leaflet-control-layers').css({ 'width': '100', 'float': 'right' });

  $('#hasMeters').change(queryArcGIS.bind(null, map))
  $('#acceptsCreditCards').change(queryArcGIS.bind(null, map))
  $('#acceptsParkMobile').change(queryArcGIS.bind(null, map))
  $('#acceptsCoins').change(queryArcGIS.bind(null, map))
  $('#freeSaturdayParking').change(queryArcGIS.bind(null, map))
  $('#freeSundayParking').change(queryArcGIS.bind(null, map))
})

