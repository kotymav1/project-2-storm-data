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

// Function to determine marker color based on event type
function markerColor(eventType) {
  switch (eventType) {
    case 'Thunderstorm Wind': return "#FF0000";
    case 'Tornado': return "#FFA500";
    case 'Flash Flood': return "#0000FF";
    case 'Flood': return "#0000FF";
    case 'Hail': return "#00FF00";
    case 'Lightning': return "#ADD8E6";
    default: return "#808080";
  }
}

// Get the data with d3
d3.json(apiData).then(function(data) {
  // Log the data to inspect its structure
  console.log("Raw data received: ", data);

  // Access the features array
  let events = data.features;

  // Check if events is an array
  if (Array.isArray(events)) {
    if (events.length === 0) {
      console.error("No data found or data is empty");
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

      if (lat !== undefined && lon !== undefined && eventType) {
        // Add circle marker to the map
        L.circleMarker([lat, lon], {
          radius: 8,
          fillColor: markerColor(eventType),
          color: "#000",
          weight: 1,
          opacity: 1,
          fillOpacity: 0.8
        }).bindPopup(`
          <strong>Event Type:</strong> ${eventType}<br>
          <strong>Location:</strong> (${lat}, ${lon})<br>
          <strong>State:</strong> ${state}<br>
          <strong>Damage Property:</strong> $${damageProperty.toLocaleString()}<br>
          <strong>Time of Day:</strong> ${timeOfDay}
        `).addTo(myMap);
      } else {
        console.warn("Invalid event data: ", event);
      }
    });

    // Set up the legend
    let legend = L.control({ position: "bottomright" });
    legend.onAdd = function() {
      let div = L.DomUtil.create("div", "legend");
      let eventTypes = ['Thunderstorm Wind', 'Tornado', 'Flash Flood', 'Flood', 'Hail', 'Lightning'];
      let colors = ["#FF0000", "#FFA500", "#0000FF", "#0000FF", "#00FF00", "#ADD8E6"];

      // Create legend header
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
  } else {
    console.error("Data received is not an array");
  }
}).catch(function(error) {
  console.error("Error fetching data: ", error);
});
