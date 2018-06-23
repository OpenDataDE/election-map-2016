const grantPrograms = [
  {
    name: 'geothermal',
    url: 'https://firstmap.delaware.gov/arcgis/rest/services/Environmental/DE_GreenEnergyProgramGrants/MapServer/0',
    fields: {
      zip: 'ZIP5',
      totalRebate: 'SUM_TOTAL_REBATE',
      frequency: 'GEOTHERMALFREQUENCY',
      capacity: 'GEOTHERMALCAPACITYSUM'
    }
  },
  {
    name: 'photovoltaic',
    url: 'https://firstmap.delaware.gov/arcgis/rest/services/Environmental/DE_GreenEnergyProgramGrants/MapServer/1',
    fields: {
      zip: 'ZIP5',
      totalRebate: 'SUM_TOTAL_REBATE',
      frequency: 'PVFREQUENCY',
      capacity: 'PVCAPACITYSUM'
    }
  },
  {
    name: 'solarwater',
    url: 'https://firstmap.delaware.gov/arcgis/rest/services/Environmental/DE_GreenEnergyProgramGrants/MapServer/2',
    fields: {
      zip: 'ZIP5',
      totalRebate: 'SUM_TOTAL_REBATE',
      frequency: 'SOLARWATERFREQUENCY',
      capacity: 'SOLARWATERCAPACTIYSUM'
    }
  },
  {
    name: 'wind',
    url: 'https://firstmap.delaware.gov/arcgis/rest/services/Environmental/DE_GreenEnergyProgramGrants/MapServer/3',
    fields: {
      zip: 'ZIP5',
      totalRebate: 'SUM_TOTAL_REBATE',
      frequency: 'WINDFREQUENCY',
      capacity: 'WINDCAPACITYSUM'
    }
  }
]

// data storage target object for data from green grant programs
const zipCodes = {}

// keep track of how many grant program datum have been loaded
let loadedCount = 0

// keep track of which polygon is currently selected
let selectedPolygon

const unselectedStyle = {
  color: 'grey',
  weight: 1
}

const selectedStyle = {
  color: 'green',
  weight: 3,
  fillOpacity: 0.25
}

const hoveredStyle = {
  color: 'red',
  weight: 1,
  fillOpacity: 0.1
}

function formatDollars(val) {
  if (val < 1) {
    return '--'
  } else {
    return parseInt(val).toLocaleString('en-US', {
      style: 'currency',
      currency: 'USD'
    })
  }
}

$(document).ready(() => {
  // set the map to the center of Delaware at zoom level 9
  const map = L.map("map").setView([39.144974,-75.947085], 9);

  L.esri.basemapLayer('Topographic').addTo(map);

  grantPrograms.forEach(grantProgram => {
    L.esri.featureLayer({
      url: grantProgram.url
    })
    .query()
    // geometry is expensive and we don't care about it yet
    .returnGeometry(false)
    // only load certain fields, the rest are ignored
    .fields(Object.values(grantProgram.fields))
    .run((err, featureCollection) => {
      featureCollection.features.forEach(feature => {
        if (!zipCodes[feature.properties.ZIP5]) {
          zipCodes[feature.properties.ZIP5] = {
            totalRebate: 0
          }
        }

        zipCodes[feature.properties.ZIP5][grantProgram.name] = {
          frequency: feature.properties[grantProgram.fields.frequency],
          totalRebate: feature.properties[grantProgram.fields.totalRebate]
        }

        zipCodes[feature.properties.ZIP5].totalRebate += feature.properties[grantProgram.fields.totalRebate]

      })

      // wait til all the data has been loaded
      if (++loadedCount === 4) {
        // once all zip code data has been loaded, load up the actual polygons
        const zipCodePolygons = L.esri.featureLayer({
          url: grantPrograms[0].url,
          style: unselectedStyle
        }).on('click', e => {
          L.DomEvent.stopPropagation(e);

          const properties = e.layer.feature.properties
          const zip5 = properties.ZIP5

          // if there's a selected polygon, reset its style
          if (selectedPolygon) {
            selectedPolygon.setStyle(unselectedStyle)
          }

          // set the selected polygon's style to be more vibrant and resourceful
          e.layer.setStyle(selectedStyle)
          selectedPolygon = e.layer
          hoveredPolygon = undefined

          $('#zipCode').text(`${zip5} (${properties.POSTOFFICENAME})`)
          $('#population').text(`${properties.POPULATION.toLocaleString('en-US')}`)

          $('#geothermalAmount').text(formatDollars(zipCodes[zip5].geothermal.totalRebate))
          $('#photovoltaicAmount').text(formatDollars(zipCodes[zip5].photovoltaic.totalRebate))
          $('#solarwaterAmount').text(formatDollars(zipCodes[zip5].solarwater.totalRebate))
          $('#windAmount').text(formatDollars(zipCodes[zip5].wind.totalRebate))
          $('#totalAmount').text(formatDollars(zipCodes[zip5].totalRebate))

        }).on('mouseover', e => {
          if (e.layer === selectedPolygon) {
            return
          } else {
            hoveredPolygon = e.layer
            e.layer.setStyle(hoveredStyle)
          }
        }).on('mouseout', e => {
          if (hoveredPolygon) {
            hoveredPolygon.setStyle(unselectedStyle)
            hoveredPolygon = undefined
          }
        }).bindTooltip(layer => {
          const properties = layer.feature.properties

          return `<strong>${properties.ZIP5}</strong>  (${properties.POSTOFFICENAME})`
        }, { sticky: true }).addTo(map);

      }
    })
  })

  L.control.grantData().addTo(map);

})

