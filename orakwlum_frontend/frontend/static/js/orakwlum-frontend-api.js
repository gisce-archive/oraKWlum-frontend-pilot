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


//Fetch all proposals and initializates the right history menu
//  If main execucion -> autoloads the last execution on main section
//function get_proposals(setMain, on="execucio", tipus="chart"){
function get_proposals(setMain, on, tipus){

    if (typeof(on) == undefined) on="execucio";
    if (typeof(tipus) == undefined) tipus="chart";

    //set action create or append
    metode = (on == "execucio_ultima")? "create_":"append_";

    //concatenate the type (table or chart)
    metode += (tipus == "chart")? "chart":"table";

    if (setMain == undefined)
        setMain = false;

    $.ajax({
        url: 'http://orakwlum.gisce.net:5000/proposals?sort=-_id&max_results='+ max_elements + '&page='+ currentPage,
        dataType: 'json',

        success: function (data, status, jqXHR) {

            proposals = [];
            parentDiv='#execucio_ultima';

            if (!validateNumber(currentPage))
                return false;

            $("#currentPage").html(currentPage);

            clear_hist();

            $.each(data._items, function (index,value) {
                append_hist(value.name, on, metode);
            });

            maxPage = (Math.round(data._meta.total/max_elements));

            validatePaginator(currentPage, maxPage);

            //autoload the last element on execucio_ultima div

            if (setMain) {

                $(parentDiv).empty();
                last = data._items[0].name;
                //last = $( '#llistat_historic > ul > li:last-child > a').href();


                append_element(parentDiv, last, tipus);
            }
        },

        error: function (jqXHR, status) {
            $("#chart").append("KO!!!");
        }
    });
}

function get_selector(type, last){
    switch (type){
        case "chart":
            return graphic_type_selector(last);

        case "table":
            return table_type_selector(last);
            break;
    }
}
function get_selector_listener (type){
    switch (type){
        case "chart":
            return radioChartValueChanged;

        case "table":
            return radioTableValueChanged;
            break;
    }
}

function get_constructor(type, div, child, last){

    switch (type){
        case "chart":
            return create_chart(child, last);
            break;

        case "table":
            return create_table(child, last);
            break;
    }

}

function append_element(parentDiv, last, tipuss){
//    if (typeof(tipuss) == "undefined") alert("lol");

    //assert tipus array
    if (typeof(tipuss) != Array) {
        tipuss = tipuss.replace(/ /g,'');
        tipuss = tipuss.split(',');
    }

    //For each tipus append element
    for (i=0 ; i < tipuss.length; i++){

        tipus=tipuss[i];

        child_div = tipus + "_" + last;

        if (i==0)  //Set title just for the first element
            $(parentDiv).append("<h3 class='grafic_title'>" + convert_date_to_title(last) + "</h3>");

        $(parentDiv).append(get_selector(tipus, last));
        $(parentDiv).append("<div id='" + child_div + "' class=''></div>");

        get_constructor(tipus, parentDiv, "#" + child_div, last);
        //get_constructor(tipus, "#" + child_div, last);

        $("input[name='" + last + "']").change(get_selector_listener(tipus));
    }
}


//Create new proposal chart handling type
function create_chart(div, id, type){

    //assert SVG inside child_div
    if ($(div + " svg").length==0) {
        $(div).append("<svg class='nvd3-svg'></svg>");
    }

    $.ajax({
        url: 'http://orakwlum.gisce.net:5000/proposals/' + id,
        dataType: 'json',

        success: function (data, status, jqXHR) {

            switch(type) {
                default:
                case 'area':
                    create_chart_multiarea (data.name, data.scenarios, div);
                    break;
                case 'line':
                    create_chart_multiline (data.name, data.scenarios, div);
                    break;
                case 'bar':
                    create_chart_multibar(data.name, data.scenarios, div);
                    break;
                case 'all':
                    create_chart_multiline (data.name, data.scenarios, div, false, true);
                    create_chart_multibar(data.name, data.scenarios, div);
                    break;
            }
        },

        error: function (jqXHR, status) {
            $(div).append("KO!!!");
        }
    });
}



//Create new proposal table
function create_table(div, id, type){
    $.ajax({
        url: 'http://orakwlum.gisce.net:5000/proposals/' + id,
        dataType: 'json',

        success: function (data, status, jqXHR) {
            create_table_odded (data.name, data.scenarios, div, type);
        },

        error: function (jqXHR, status) {
            $(div).append("KO!!!");
        }
    });
}
