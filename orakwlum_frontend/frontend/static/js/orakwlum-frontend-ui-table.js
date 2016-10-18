/*
coding: utf-8 -*-
__author__ = 'XaviTorello'

orakwlum-frontend - Table Support functions
 */

//Colors definition
colors = ["danger", "yellow", "primary", "success"];

//Return a String with the display_friendly hour definition "HH:00 DD/MM"; i.e. "22:00 23/03"
function getFormatedTime(datee){
    return ("0" + datee.getUTCHours()).slice(-2) + ":00 " + ("0"+datee.getDate()).slice(-2) + "/" + ("0"+datee.getMonth()).slice(-2);
}

//Return an HTML progress bar
//function getProgressBar(amount, color=0) {
function getProgressBar(amount, color) {
    return '<div class="progress progress-xs">' +
              '<div class="progress-bar progress-bar-'+ colors[color%colors.length] + '" style="width: '+  amount + '%"></div>' +
            '</div>';
}

//Create a new odded table
function create_table_odded (nom, scenarios, div, type) {
    table = '<div class="box-header"><h3 class="box-title">' + nom + '</h3></div>' +
        '<div class="box-body no-padding">';

    num_scenarios = scenarios.prediction.length

    mida_per_td = (num_scenarios+1) / 100

    if (! scenarios.prediction.length>0)
        return;

    num_hores = scenarios.prediction[0].consumption.length;
    max_value = 0;

    // Set table header and reach the max value
    table = '<tr><th style="width: 100px">Hora</th>';

    for (i=0; i< num_scenarios; i++) {
        table += '<th>' + scenarios.prediction[i].day + '</th>';
    }
    console.log("LOL");

    // Prepare table content and set max values
    for (hora = 0; hora < num_hores; hora++) {
        //horaa = new Date(scenarios.prediction[0].);
        horaa = hora;
        tr = '<tr><td>' + (horaa); + '</td>';
        $.each(scenarios.prediction, function (idxScenario, scenario) {

            prediction = scenario.consumption[hora];

            //console.log(hora + scenario.name + " " + prediction.sum_consumption_proposal);

            tr += '<td class="consumption" color="' + idxScenario + '" value=" ' + prediction + '">' + prediction + '</td>';

            max_value = Math.max(max_value, prediction);

        });
        table += tr + '</tr>';
    }
    table += '</table>' +
        '</div>';

    table = '<table class="table table-striped table-bordered" style="table-layout: fixed;" id="' + nom + '" max="' + max_value + '">' + table;

    $(div).append(table);

    change_table_type(div, last, type, max_value);
}

//Return a selector for the type of the table
function table_type_selector(id) {
    return "<form>" +
        '<div class="form-group pull-right  ">' +

        "<input type=radio name='" + id + "' value='text'> Text&nbsp;&nbsp;" +
        "<input type=radio name='" + id + "' value='bar'> Barres&nbsp;&nbsp;" +
        "<input type=radio name='" + id + "' value='all' checked> Conjunt&nbsp;&nbsp;" +
        "</div></form>";
}

//onChange chart type trigger
function radioTableValueChanged() {
    name = $(this).attr('name');
    type = $(this).val();

    reset_table(name, name, type);
}

//Clean an existing chart
function reset_table(div, id, type){

    child_div = "table_" + id

    //Delete previous chart
    //$("#"+child_div + " table").remove();
   // create_table("#"+child_div,id,type);

    change_table_type("#" + child_div,id,type);

    //go_to_div ("#" + child_div);

}

//function change_table_type(div, id, type, max_value=null) {
function change_table_type(div, id, type, max_value) {

    //set the table container on the filter expression
    div += " table";


    if (max_value == null)
        max_value = $(div + "").attr("max");

    if (max_value==0)
        return;

    switch(type) {
        case 'bar':
            //Apply colored bar for each consumption   [not done previously to avoid process N elements over scenarios to fetch the max]
            $(div + " .consumption").each( function(id, val) {
                valuee=($(this).attr("value"));
                colorr=($(this).attr("color"));
                $(this).html(getProgressBar(valuee/max_value*100, colorr));
            });
            break;

        case 'text':
            //Apply colored bar for each consumption   [not done previously to avoid process N elements over scenarios to fetch the max]
            $(div + " .consumption").each( function(id, val) {
                valuee=($(this).attr("value"));
                colorr=($(this).attr("color"));
                $(this).html(valuee);
            });
            break;

        default:
        case 'all':
            //Append colored bar for each consumption   [not done previously to avoid process N elements over scenarios to fetch the max]
            $(div + " .consumption").each( function(id, val) {
                valuee=($(this).attr("value"));
                colorr=($(this).attr("color"));

                //Set text and later progressbar
                $(this).html(getProgressBar(valuee/max_value*100, colorr));
                $(this).append(valuee);
            });
            break;
    }
}

//Append new table
function append_table(div, id, type){

    child_div = "table_" + id

    //create a child element on Proposals zone if not exists
    if ($("#"+child_div).length==0){

        $(div).append("<div><h3 class='grafic_title'>"+ convert_date_to_title(id));
        $(div).append(table_type_selector(id));
        $(div).append("<div id=" + child_div +" class='taula col-md-4'></div></div>");

        $("input[name='" + id + "']").change(radioTableValueChanged);
    }

    //insert the chart
    create_table("#"+child_div,id,type);

    go_to_div ("#" + child_div);
}
