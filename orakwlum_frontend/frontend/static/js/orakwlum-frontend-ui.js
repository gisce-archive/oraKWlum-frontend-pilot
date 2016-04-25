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



//Clean right history Proposals menu
function clear_hist() {
    $('#llistat_historic ul').empty();
}

//Append history to right history Proposals menu
//function append_hist(name, on="execucio", metode="append_chart") {
function append_hist(name, on, metode) {

    if (typeof(on) == undefined) on="execucio";
    if (typeof(metode) == undefined) metode = "append_chart";


    $('#llistat_historic ul').append("<li><a id='" + name + "' href='javascript:"+ metode + "(\"#" + on + "\", \""+ name + "\");' draggable='true' ondragstart='drag(event)'>"
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


//Scroll to chart
function go_to_div (div) {
    $('html, body').animate({
        scrollTop: $(div).offset().top
    }, 2000);
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
