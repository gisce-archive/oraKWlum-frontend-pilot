/*
coding: utf-8 -*-
__author__ = 'XaviTorello'

orakwlum-frontend - Chart Support functions
 */


// Create a new Multiarea chart
function create_chart_multiarea (nom, scenarios, div) {
    create_chart_multiline (nom, scenarios, div, true);
}

// Create a new Multiline chart
function create_chart_multiline (nom, scenarios, div, area, removeAxis) {

    var min=null, max=0;
    var data_scenarios  = new d3.range(0,scenarios.prediction.length).map(function(d,i) {
        scenario = scenarios.prediction[i];
        day = scenarios.days_list[i];

        return {
            area: area,
            strokeWidth: 2,
            classed: 'dashed',
            key: scenario['name'],
            values: new d3.range(0,scenario['consumption'].length).map( function(f,j) {
                value = scenario['consumption'][j];

                if (!min)  min=value;  //take the first value of the current scope as a min

                hour = new Date(day + " " + (j) + ":00"); //.replace("GMT","UTC"));
                hour = new Date(hour - (2 * 60 *60*1000));  //localtime to UTC

                min = Math.min(min, value);
                max = Math.max(max, value);

                console.log(hour, value, min, max);

                return {
                    y: value,
                    x: hour
                }
            })
        };
    });


    console.dir(data_scenarios);

    var chart;

    nv.addGraph(function() {

        chart = nv.models.lineChart()
            .options({
                transitionDuration: 300,
                useInteractiveGuideline: true
            })
            .yDomain([min, max]);
        ;

        chart.margin({bottom: 100, left: 70});

        if (removeAxis == true){
            chart.showXAxis(false);
            chart.showYAxis(false);

            x = d3.scale.ordinal()
               // .rangeRoundBands([0,35])
            ;
            chart.xAxis.scale(x);

            chart.useInteractiveGuideline(false);
        }
        else {
            chart.xAxis
                .showMaxMin(false)
                .axisLabel("Hores (h)")
                .rotateLabels(45)

                //.tickFormat(d3.format(',.1f'))
                .tickFormat(
                    function (d) {
                        return d3.time.format('%d/%m %H:%M')(new Date(d))
                        //return d3.time.format('%d/%m %H:%M')(new Date(d))
                    }
                )
                .staggerLabels(true)
                .ticks(30)
            ;

            chart.xScale(d3.time.scale.utc());

            chart.yAxis
                .axisLabelDistance(10)
                .axisLabel('Energia (kw)')
                .showMaxMin(true)
                .tickFormat(function (d) {
                    if (d == null) {
                        return 'N/A';
                    }
                    return d3.format('.0f')(d);
                })
            ;
        }

        chart.xAxis.axisLabelDistance(20);

        chart.dispatch.on('renderEnd', function(){
            nv.log('Render Complete');
        });

        d3.select(div + ' svg')
            .datum(data_scenarios)
            .call(chart);

        nv.utils.windowResize(chart.update);

        /*
        chart.dispatch.on('stateChange', function(e) {
            nv.log('New State:', JSON.stringify(e));
        });
        chart.state.dispatch.on('change', function(state){
            nv.log('state', JSON.stringify(state));
        });
        */
        return chart;
    });
}

// Create a new Multibar chart
function create_chart_multibar (nom, scenarios, div) {

    var min=null, max=0;

    var data_scenarios  = new d3.range(0,scenarios.length).map(function(d,i) {
        scenario = scenarios[i]

        return {
            key: scenario['name'],
            values: new d3.range(0,(scenario['prediction'].length) ).map( function(f,j) {

                value = scenario['prediction'][j]['sum_consumption_proposal'];

                if (!min)  min=value;  //take the first value of the current scope as a min

                hour = new Date(scenario['prediction'][j]['_id']); //.replace("GMT","UTC"));

                hour = new Date(hour - (2 * 60 *60*1000));  //localtime to UTC

                min = Math.min(min, value);
                max = Math.max(max, value);

                return {
                    y: value,
                    x: hour
                }
            })
        };
    });

    var chart;

    nv.addGraph(function() {
        chart = nv.models.multiBarChart()
            .duration(300)
            .margin({bottom: 100, left: 70})
            .rotateLabels(45)
            .groupSpacing(0.1)
            //.stacked(true)
            .yDomain([min, max])
            .showControls(false)  //disable the option to stack the bars
        ;

        chart.reduceXTicks(false)
            .staggerLabels(true);

        chart.xAxis
            .axisLabel("Hores (h)")
            .axisLabelDistance(45)
            .showMaxMin(false)
            .tickFormat(
                function (d) {
                    return d3.time.format('%d/%m %H:%M')(new Date(d))
                    //return d3.time.format('%d/%m %H:%M')(new Date(d))
                })
        ;

        chart.yAxis
            .axisLabel("Energia (kw)")
            .axisLabelDistance(10)
            .showMaxMin(true)
            .tickFormat(d3.format('.0f'))
        ;

        chart.dispatch.on('renderEnd', function(){
            nv.log('Render Complete');
        });

        d3.select(div + ' svg')
            .datum(data_scenarios)
            .call(chart)
        ;

        nv.utils.windowResize(chart.update);

        /*
        chart.dispatch.on('stateChange', function(e) {
            nv.log('New State:', JSON.stringify(e));
        });
        chart.state.dispatch.on('change', function(state){
            nv.log('state', JSON.stringify(state));
        });
        */
        return chart;
    });

}


//Chart type selector
function graphic_type_selector(id){
    return "<form>" +
    '<div class="form-group pull-right  ">' +

        "<input type=radio name='" + id + "' value='area' checked> Àrea&nbsp;&nbsp;" +
        "<input type=radio name='" + id + "' value='line'> Línies&nbsp;&nbsp;" +
        "<input type=radio name='" + id + "' value='bar'> Barres&nbsp;&nbsp;" +
        "<input type=radio name='" + id + "' value='all'> Conjunt&nbsp;&nbsp;" +
        "</div></form>";
      //  */

    /*
    return "<form>" +
        '<div class="form-group pull-right  ">' +
            create_radio_box(id, "area", "Area", true) +
            create_radio_box(id, "line", "Line") +
            create_radio_box(id, "bar", "Bar");
        '</div></form>';
// */

   // return "<div id='chart_type_" + id + "'></div>";
}


//onChange chart type trigger
function radioChartValueChanged() {
    name = $(this).attr('name');
    type = $(this).val();

    reset_chart(name, name, type);
}

//Clean an existing chart
function reset_chart(div, id, type){

    child_div = "chart_" + id

    //Delete previous chart
    $("#"+child_div + " svg").empty();

    create_chart("#"+child_div,id,type);
    //alert("change");

}



//Append new chart proposal
function append_chart(div, id, type){

    child_div = "chart_" + id;

    //create a child element on Proposals zone if not exists
    if ($("#"+child_div).length==0){

        $(div).append("<div><h3 class='grafic_title'>"+ convert_date_to_title(id));
        $(div).append(graphic_type_selector(id));
        $(div).append("<div id=" + child_div +" class='grafic'><svg class='nvd3-svg'></svg></div></div>");

        $("input[name='" + id + "']").change(radioChartValueChanged);
    }

    //insert the chart
    create_chart("#"+child_div,id,type);

    go_to_div ("#" + child_div);
}

//Permit drop
function allowDrop(ev) {
    ev.preventDefault();
}

//Drag handler
function drag(ev) {
    ev.dataTransfer.setData("chart_id", ev.target.id);
}

//Append drop handler
function dropAppendChart(ev, awon, clear) {
    ev.preventDefault();
    var data = ev.dataTransfer.getData("chart_id");

    if (clear)
        $("#"+awon).empty();

    append_chart("#"+awon, data);
}

//Drop handler
function dropAppendChart(ev, awon) {
    dropAppend(ev,awon, true);
}
