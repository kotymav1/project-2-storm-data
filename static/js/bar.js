url = "http://127.0.0.1:5000/data";
d3.json(url).then(function(data){
    let properties = data.features.map(feature => feature.properties);
    let xValues = properties.map(data => data.EVENT_TYPE);
    let yValues = properties.map(data => data.DAMAGE_PROPERTY);

    function markerColor(eventType) {
        switch (eventType) {
            case 'Thunderstorm': return "#FF0000";
            case 'Tornado': return "#FFA500";
            case 'Flood': return "#0000FF";
            case 'Hail': return "#00FF00";
            case 'Lightning': return "#ADD8E6";
            default: return "#808080";
        }
    }

    let barColors = xValues.map(eventType => markerColor(eventType));

    let barTrace = [{
        x: xValues,
        y: yValues,
        type: 'bar',
        marker: {
            color: barColors
        },
        transforms: [{
            type: 'aggregate',
            groups: xValues,
            aggregations: [
                {target: 'y', func: 'sum', enabled: true},
            ]
        }]
    }];

    let layout = {
        title: 'Damage by Event Type',
        barmode: 'group',
        xaxis: {
            title: 'Event Type'
        },
        yaxis: {
            title: 'Damage ($)'
        },
        autosize: true,
        margin: { t: 30, r: 30, b: 30, l: 30 },
        paper_bgcolor: 'rgba(0,0,0,0)',
        plot_bgcolor: 'rgba(0,0,0,0)',
    };

    Plotly.newPlot("bar-chart", barTrace, layout, {responsive: true});
});
