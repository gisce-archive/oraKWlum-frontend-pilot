/*
coding: utf-8 -*-
__author__ = 'XaviTorello'

orakwlum-frontend - Support functions
 */

$.urlParam = function(name){
    var results = new RegExp('[\?&]' + name + '=([^&#]*)').exec(window.location.href);
    if (results==null){
       return "";
    }
    else{
       return results[1] || 0;
    }
}

var max_elements = 8;
var currentPage = $.urlParam("page");
var maxPage = currentPage;

if (!currentPage)
    currentPage=1;

var days_in_week = ["Diumenge", "Dilluns", "Dimarts", "Dimecres", "Dijous", "Divendres", "Dissabte"];
var days_in_week_lite = ["Dg", "Dl", "Dm", "Dx", "Dj", "Dv", "Ds"];


// Create a new Multiarea chart
function create_chart_multiarea (nom, scenarios, div) {
    create_chart_multiline (nom, scenarios, div, true);
}

// Create a new Multiline chart
function create_chart_multiline (nom, scenarios, div, area, removeAxis) {

    var min=null, max=0;
    var data_scenarios  = new d3.range(0,scenarios.length).map(function(d,i) {
        scenario = scenarios[i];

        return {
            area: area,
            strokeWidth: 2,
            classed: 'dashed',
            key: scenario['name'],
            values: new d3.range(0,scenario['prediction'].length).map( function(f,j) {
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

//Clean right history Proposals menu
function clear_hist() {
    $('#llistat_historic ul').empty();
}

//Append history to right history Proposals menu
function append_hist(name) {
    $('#llistat_historic ul').append("<li><a id='" + name + "' href='javascript:append_chart(\"#execucio\", \""+ name + "\");' draggable='true' ondragstart='drag(event)'>"
        + convert_date_to_title(name,1)+"</a></li>");
}

//From a string like "160401_160402" convert it to a Chart Title
function convert_date_to_title (string, lite) {
    //Lite week days (abreviated version)
    days_week = (lite)?days_in_week_lite:days_in_week;

    day = string.substring(4,6);
    month = string.substring(2,4);
    year = string.substring(0,2);

    day_num = new Date(year, month, day).getDay();

    separator = "/";

    title = days_week[day_num] + " " + day + separator + month + separator + year;

    return title;
}

//Validate number format (paginators)
function validateNumber(num){
    return ($.isNumeric(num) && num >0);
}

//WIP fresh selector todo
function create_radio_box(id, value, text, selected){
    checked = (selected)? "checked" : "";

    return "" +
                    '<label>' +
                      '<input type="radio" name="' + id + '" value="' + value + '" ' + checked + 'class="minimal-red" checked>&nbsp;&nbsp;&nbsp;' +
                        text +
                    '&nbsp;&nbsp;&nbsp;</label>';
/*
                  </div>

            '<label class="">' +
              '<div class="icheckbox_flat-green checked"  style="position: relative;">' +
                '<input name="' + id + '" value="' + value + '" type="checkbox" class="flat-red" checked="" style="position: absolute; opacity: 0;" > ' + //text +
                '<ins class="iCheck-helper" style="position: absolute; top: 0%; left: 0%; display: block; width: 100%; height: 100%; margin: 0px; padding: 0px; border: 0px; opacity: 0; background: rgb(255, 255, 255);">' +
                '</ins>' +
              '</div>' +
            '</label>';
*/
}

//Chart type selector
function graphic_type_selector(id){
    return "<form>" +
    '<div class="form-group pull-right  ">' +

        "<input type=radio name='" + id + "' value='area' checked> Àrea&nbsp;&nbsp;" +
        "<input type=radio name='" + id + "' value='line'> Línies&nbsp;&nbsp;" +
        "<input type=radio name='" + id + "' value='bar'> Barres&nbsp;&nbsp;" +
        "<input type=radio name='" + id + "' value='all'> Conjut&nbsp;&nbsp;" +
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
function radioValueChanged() {
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

//Scroll to chart
function go_to_chart (div) {
    $('html, body').animate({
        scrollTop: $(div).offset().top
    }, 2000);
}

//Append new chart proposal
function append_chart(div, id, type){

    child_div = "chart_" + id

    //create a child element on Proposals zone if not exists
    if ($("#"+child_div).length==0){

        $(div).append("<div><h3 class='grafic_title'>"+ convert_date_to_title(id));
        $(div).append(graphic_type_selector(id));
        $(div).append("<div id=" + child_div +" class='grafic'><svg class='nvd3-svg'></svg></div></div>");

        $("input[name='" + id + "']").change(radioValueChanged);
    }

    //insert the chart
    create_chart("#"+child_div,id,type);

    go_to_chart ("#" + child_div);
}

//Validate paginator UI
function validatePaginator(current,max) {
    if (current==max) {
        $("#nextPage").hide();
        $("#prevPage").show();
    }

    else if (current==1) {
        $("#nextPage").show();
        $("#prevPage").hide();
    }

    else {
        $("#nextPage").show();
        $("#prevPage").show();
    }


}

//Increase Pager
function getNextPage() {
    currentPage++;
    validatePaginator(currentPage,maxPage);
    get_proposals();
}

//Decrease Pager
function getPrevPage(max) {

    if (currentPage>1) {
        validatePaginator(currentPage,maxPage);
        currentPage--;
        get_proposals();
    }
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
function dropAppend(ev, awon, clear) {
    ev.preventDefault();
    var data = ev.dataTransfer.getData("chart_id");

    if (clear)
        $("#"+awon).empty();

    append_chart("#"+awon, data);
}

//Drop handler
function drop(ev, awon) {
    dropAppend(ev,awon, true);
}

//Let Propostes right menu follow the scroll!
function div_follow_scroll (div) {

    (function($) {
        var element = $('#' + div),
            originalY = element.offset().top;

        // Space between element and top of screen (when scrolling)
        var topMargin = 20;

        // Should probably be set in CSS; but here just for emphasis
        element.css('position', 'relative');

        $(window).on('scroll', function(event) {
            var scrollTop = $(window).scrollTop();

            element.stop(false, false).animate({
                top: scrollTop < originalY
                        ? 0
                        : scrollTop - originalY + topMargin
            }, 300);
        });
    })(jQuery);
}