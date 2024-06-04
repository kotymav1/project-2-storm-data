  // Create the map object
  let myMap = L.map("map", {
    center: [37.7749, -122.4194],
    zoom: 5
  });

  // Add the tile layer
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
  }).addTo(myMap);

  // Load the data from the new API using a CORS proxy
  let apiData = "https://project-3-storm-data-5f60c95dd410.herokuapp.com/api/data";
  let proxyUrl = "https://api.allorigins.win/get?url=";
  let url = proxyUrl + encodeURIComponent(apiData);

  // Function to determine marker color based on event type
  function markerColor(eventType) {
    switch (eventType) {
      case 'Thunderstorm Wind': return "#FF0000";
      case 'Tornado': return "#FFA500";
      case 'Flash Flood': return "#0000FF";
      case 'Flood': return "#0000FF";
      case 'Hail': return "#00FF00"
      case 'Lightning': return "#ADD8E6";
      default: return "#808080";
    }
  }

  // Get the data with d3
  d3.json(url).then(function(response) {
    let data;
    try {
      let cleanResponse = response.contents.replace(/NaN/g, 'null'); // Replaces NaNs with null so it is compatible with JSON
      data = JSON.parse(cleanResponse);
    } catch (e) {
      console.error("Error parsing JSON data: ", e);
      return;
    }

    if (!data || data.length === 0) {
      console.error("No data found or data is empty");
      return;
    }
    
    console.log("Data received: ", data);

    data.forEach(function(event) {
      let lat = event.BEGIN_LAT;
      let lon = event.BEGIN_LON;
      let eventType = event.EVENT_TYPE;

      if (lat && lon && eventType) {
        // Add circle marker to the map
        L.circleMarker([lat, lon], {
          radius: 8,
          fillColor: markerColor(eventType),
          color: "#000",
          weight: 1,
          opacity: 1,
          fillOpacity: 0.8
        }).bindPopup(`<strong>Event Type:</strong> ${eventType}<br>
                      <strong>Location:</strong> (${lat}, ${lon})`)
          .addTo(myMap);
      } else {
        console.warn("Invalid event data: ", event);
      }
    });

    // Set up the legend
    let legend = L.control({ position: "bottomright" });
    legend.onAdd = function() {
      let div = L.DomUtil.create("div", "legend");
      let eventTypes = ['Thunderstorm', 'Tornado', 'Flood', 'Hail', 'Other'];
      let colors = ["#FF0000", "#FFA500", "#0000FF", "#00FF00", "#808080"];

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
  }).catch(function(error) {
    console.error("Error fetching data: ", error);
  });