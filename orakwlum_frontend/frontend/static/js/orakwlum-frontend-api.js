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
function get_proposals(setMain, on="execucio", tipus="chart"){

    //set action create or append
    metode = (on == "execucio_ultima")? "create_":"append_";

    //concatenate the type (table or chart)
    metode += (tipus == "chart")? "chart":"table";

    if (setMain == undefined)
        setMain = false;

    $.ajax({
        url: 'http://127.0.0.1:5000/proposals?sort=-_id&max_results='+ max_elements + '&page='+ currentPage,
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


                if (tipus == "chart") {
                    child_div = "chart_" + last;

                    $(parentDiv).append("<h3 class='grafic_title'>" + convert_date_to_title(last) + "</h3>");
                    $(parentDiv).append(graphic_type_selector(last));
                    $(parentDiv).append("<div id='" + child_div + "'><svg class='nvd3-svg'></svg></div>");
                    create_chart(parentDiv, last);

                    $("input[name='" + last + "']").change(radioChartValueChanged);

                }
                else if (tipus == "taula") {

                    // /*
                    child_div = "table_" + last;

                    $(parentDiv).append("<h3 class='grafic_title'>" + convert_date_to_title(last) + "</h3>");

                    $(parentDiv).append(table_type_selector(last));

                    $(parentDiv).append("<div id='" + child_div + "'></div>");

                    create_table("#" + child_div, last);

                    $("input[name='" + last + "']").change(radioTableValueChanged);

                   // */
                }
            }
        },

        error: function (jqXHR, status) {
            $("#chart").append("KO!!!");
        }
    });
}


//Create new proposal chart handling type
function create_chart(div, id, type){
    $.ajax({
        url: 'http://127.0.0.1:5000/proposals/' + id,
        dataType: 'json',

        success: function (data, status, jqXHR) {
            //  console.log(div)

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
        url: 'http://127.0.0.1:5000/proposals/' + id,
        dataType: 'json',

        success: function (data, status, jqXHR) {
            //  console.log(div)
            create_table_odded (data.name, data.scenarios, div, type);
        },

        error: function (jqXHR, status) {
            $(div).append("KO!!!");
        }
    });
}