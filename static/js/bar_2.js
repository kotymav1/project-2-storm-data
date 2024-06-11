url = "http://127.0.0.1:5000/data"
d3.json(url).then(function(data){
    let properties = data.features.map(feature => feature.properties);
    let xValues = properties.map(data => data.STATE);
    let yValues = properties.map(data => data.DAMAGE_PROPERTY);
    //console.log(xValues)
    //console.log(yValues)
    let barTrace = [{
        values: yValues,
        labels: xValues,
        textinfo: 'none',
        type: 'pie',
        transforms: [{
            type: 'aggregate',
            groups: xValues,
            aggregations: [
                {target: 'values', func: 'sum', enabled: true},
            ]
        }]
    }];
    let layout = {
        title: 'Damage by State',
        autosize: true,
        margin: { t: 30, r: 30, b: 30, l: 30 },
        paper_bgcolor: 'rgba(0,0,0,0)',
        plot_bgcolor: 'rgba(0,0,0,0)',
        showlegend: false
    };
    Plotly.newPlot("bar-2", barTrace, layout, {responsive: true});
});