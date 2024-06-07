url = "http://127.0.0.1:5000/data"

d3.json(url).then(function(data){
    let properties = data.features.map(feature => feature.properties);
    let xValues = properties.map(data => data.EVENT_TYPE);
    let yValues = properties.map(data => data.DAMAGE_PROPERTY);
    //console.log(xValues)
    //console.log(yValues)
    
    let barTrace = [{
        x: xValues,
        y: yValues,
        type: 'bar',
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
            title: 'Damage'
        }
    };
    Plotly.newPlot("bar-1", barTrace, layout);

});
