// Create the map object
let myMap = L.map("map", {
  center: [37.7749, -122.4194],
  zoom: 5
});

// Add the tile layer
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(myMap);

// Load the data from the local API
let apiData = "http://127.0.0.1:5000/data";

// Function to determine marker size based on property damage
function markerSize(damageProperty) {
  return damageProperty > 0 ? Math.log(damageProperty) * .75 : 0.75; // Adjusting the size for better visualization
}

// Function to determine marker color based on event type
function markerColor(eventType) {
  switch (eventType) {
    case 'Thunderstorm': return "#FF0000";
    case 'Tornado': return "#FFA500";
    case 'Flash Flood': return "#0000FF";
    case 'Flood': return "#0000FF";
    case 'Hail': return "#00FF00";
    case 'Lightning': return "#ADD8E6";
    default: return "#808080";
  }
}

// Create layer groups for each event type
let thunderstormLayer = L.layerGroup().addTo(myMap);
let tornadoLayer = L.layerGroup().addTo(myMap); 
let floodLayer = L.layerGroup().addTo(myMap); 
let hailLayer = L.layerGroup().addTo(myMap); 
let lightningLayer = L.layerGroup().addTo(myMap); 

d3.json(apiData).then(function(data) {
  let events = data.features;

  if (Array.isArray(events)) {
    if (events.length === 0) {
      return;
    }

    events.forEach(function(event) {
      let lat = event.geometry.coordinates[1];
      let lon = event.geometry.coordinates[0];
      let properties = event.properties;
      let eventType = properties.EVENT_TYPE;
      let state = properties.STATE;
      let damageProperty = properties.DAMAGE_PROPERTY;
      let timeOfDay = properties.TIME_OF_DAY;
      let month = properties.MONTH_NAME;
      let day = properties.BEGIN_DAY;
      let torFScale = properties.TOR_F_SCALE;

      if (lat !== undefined && lon !== undefined && eventType) {
        // Create a circle marker
        let marker = L.circleMarker([lat, lon], {
          radius: markerSize(damageProperty),
          fillColor: markerColor(eventType),
          color: "#000",
          weight: 1,
          opacity: 1,
          fillOpacity: 0.8
        }).bindPopup(`
          <strong>Event Type:</strong> ${eventType}<br>
          <strong>Tornado F Scale:</strong> ${torFScale}<br>
          <strong>Location:</strong> (${lat}, ${lon})<br>
          <strong>State:</strong> ${state}<br>
          <strong>Damage Property:</strong> $${damageProperty.toLocaleString()}<br>
          <strong>Month:</strong> ${month}<br>
          <strong>Day:</strong> ${day}<br>
          <strong>Time:</strong> ${timeOfDay}
        `);

        // Add the marker to the layer group
        switch (eventType) {
          case 'Thunderstorm': marker.addTo(thunderstormLayer); break;
          case 'Tornado': marker.addTo(tornadoLayer); break;
          case 'Flash Flood':
          case 'Flood': marker.addTo(floodLayer); break;
          case 'Hail': marker.addTo(hailLayer); break;
          case 'Lightning': marker.addTo(lightningLayer); break;
        }
      }
    });

    // Add layer control to the map
    L.control.layers(null, {
      "Thunderstorm": thunderstormLayer,
      "Tornado": tornadoLayer,
      "Flood": floodLayer,
      "Hail": hailLayer,
      "Lightning": lightningLayer
    }).addTo(myMap);

    // Set up the legend
    let legend = L.control({ position: "bottomright" });
    legend.onAdd = function() {
      let div = L.DomUtil.create("div", "legend");
      let eventTypes = ['Thunderstorm', 'Tornado', 'Flood', 'Hail', 'Lightning'];
      let colors = ["#FF0000", "#FFA500", "#0000FF", "#00FF00", "#ADD8E6"];

      let legendInfo = "<h1>Event Types</h1>";
      div.innerHTML = legendInfo;

      // Loop through event types and generate a label with a colored square for each type
      for (let i = 0; i < eventTypes.length; i++) {
        div.innerHTML +=
          '<i style="background:' + colors[i] + '"></i> ' +
          eventTypes[i] + '<br>';
      }

      return div;
    };

    // Adding the legend to the map
    legend.addTo(myMap);
  }
}).catch(function(error) {
  console.error("Error fetching data: ", error);
});