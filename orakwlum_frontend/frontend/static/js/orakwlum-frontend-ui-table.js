/*
coding: utf-8 -*-
__author__ = 'XaviTorello'

orakwlum-frontend - Table Support functions
 */


colors = ["danger", "yellow", "primary", "success"];


function getFormatedTime(datee){
    return ("0" + datee.getUTCHours()).slice(-2) + ":00 " + datee.getDate() + "/" + datee.getMonth();
}


function getProgressBar(amount, color=0) {

    return '<div class="progress progress-xs">' +
              '<div class="progress-bar progress-bar-'+ colors[color%colors.length] + '" style="width: '+  amount + '%"></div>' +
            '</div>';
}

//Create a new odded table
function create_table_odded (nom, scenarios, div, type) {

    table = '<div class="box-header"><h3 class="box-title">' + nom + '</h3></div>' +
        '<div class="box-body no-padding">';

    numScenarios = scenarios.length

    if (! scenarios.length>0) {
        return;
    }

    numHores = scenarios[numScenarios-1].prediction.length;

    max_value = 0;

    // Set table header and reach the max value
    table = '<tr><th>Hora</th>';

    for (i=0; i< numScenarios; i++) {
        table += '<th>' + scenarios[i].name + '</th>';
    }

    // Prepare table content and set max values
    for (hora=0; hora<numHores; hora++) {
        horaa = new Date(scenarios[0].prediction[hora]._id);
        tr = '<tr><td>' + getFormatedTime(horaa); + '</td>';
        $.each(scenarios, function (idxScenario, scenario) {

            prediction = scenario.prediction[hora];

            //console.log(hora + scenario.name + " " + prediction.sum_consumption_proposal);

            tr += '<td class="consumption" color="' + idxScenario + '" value=" ' + prediction.sum_consumption_proposal + '">' + prediction.sum_consumption_proposal + '</td>';

            max_value = Math.max(max_value, prediction.sum_consumption_proposal);

        });
        table += tr + '</tr>';
    }
    table += '</table>' +
        '</div>';


    table = '<table class="table table-striped" id="' + nom + '" max="' + max_value + '">' + table;

    $(div).html(table);

    switch(type) {
        case 'bar':
            //Apply colored bar for each consumption   [not done previously to avoid process N elements over scenarios to fetch the max]
            $(".consumption").each( function(id, val) {
                valuee=($(this).attr("value"));
                colorr=($(this).attr("color"));
                $(this).html(getProgressBar(valuee/max_value*100, colorr));
            });
            break;

        case 'all':
            //Append colored bar for each consumption   [not done previously to avoid process N elements over scenarios to fetch the max]
            $(".consumption").each( function(id, val) {
                valuee=($(this).attr("value"));
                colorr=($(this).attr("color"));
                $(this).append(getProgressBar(valuee/max_value*100, colorr));
            });
            break;
    }
}

function table_type_selector(id) {
    return "<form>" +
        '<div class="form-group pull-right  ">' +

        "<input type=radio name='" + id + "' value='text' checked> Text&nbsp;&nbsp;" +
        "<input type=radio name='" + id + "' value='bar'> Barres&nbsp;&nbsp;" +
        "<input type=radio name='" + id + "' value='all'> Conjut&nbsp;&nbsp;" +
        "</div></form>";
}

//Append new table
function append_table(div, id, type){

    child_div = "table_" + id

    //create a child element on Proposals zone if not exists
    if ($("#"+child_div).length==0){

        $(div).append("<div><h3 class='grafic_title'>"+ convert_date_to_title(id));
        $(div).append(table_type_selector(id));
        $(div).append("<div id=" + child_div +" class='taula'></div></div>");

        $("input[name='" + id + "']").change(radioTableValueChanged);
    }

    //insert the chart
    create_table("#"+child_div,id,type);

    go_to_div ("#" + child_div);
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
    $("#"+child_div + " table").remove();

    create_table("#"+child_div,id,type);
    //alert("change");

}