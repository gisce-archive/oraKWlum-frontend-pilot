
$.urlParam = function(name){
    var results = new RegExp('[\?&]' + name + '=([^&#]*)').exec(window.location.href);
    if (results==null){
       return "";
    }
    else{
       return results[1] || 0;
    }
}


function create_chartxx(ON, scenarios) {

//    console.dir(scenarios[0].prediction);

    var data_csv = [];
    $.each(scenarios[0].prediction, function(index,value) {
        date = new Date(value._id);

        year = date.getFullYear();
        month = date.getMonth();
        day = date.getDay();
        hour = date.getHours();

//        console.log(year, month, day, hour);
        data_csv.push([date, ""+value.sum_consumption_proposal]);
    });

   // console.log(data_csv);

   // var data_csv = scenarios[0].prediction;
    var data_csv_pred = data_csv;

    var chart;
    var data;


    nv.addGraph(function () {

        chart = nv.models.lineChart()
            .options({
                transitionDuration: 300,
                useInteractiveGuideline: true
            })
        ;

        chart.xAxis
            .showMaxMin(false)
            .axisLabel("Data")

            //.tickFormat(d3.format(',.1f'))
            .tickFormat(
                function (d) {
                    return d3.time.format('%d/%m %H:%M')(new Date(d))
                    //return d3.time.format('%d/%m %H:%M')(new Date(d))
                }
            )
            .staggerLabels(true)
        ;
        chart.yAxis
            .axisLabel('Energia (kw)')
            .showMaxMin(true)
            .tickFormat(function (d) {
                if (d == null) {
                    return 'N/A';
                }
                return d3.format(',.4f')(d);
            })
        ;
        data = dades(data_csv, data_csv_pred);

    //    console.log("en",data);

        d3.select(ON).append('svg')
            .datum(data)
            .call(chart);
        nv.utils.windowResize(chart.update);
        return chart;
        });


        function dades(data_csv, data_csv_prediccio) {
            var passat = [],
                prediccio = [];

            for (var i = 0; i < data_csv.length; i++) {

                passat.push({
                    x: i,
                    y: "2.1"
                });
                prediccio.push({
                    x: i,
                    y: "2.1"
                });

                /*
                passat.push({
                    x: new Date(data_csv[i][0]),
                    y: data_csv[i][1]
                });
                prediccio.push({
                    x: new Date(data_csv_prediccio[i][0]),
                    y: Math.round(data_csv_prediccio[i][1])
                });

                */

            }

            return [
                {
                    area: true,
                    values: passat,
                    key: "Passat",
                    color: "#ff7f0e",
                    strokeWidth: 2,
                    classed: 'dashed'
                },
                {
                    area: true,
                    values: prediccio,
                    key: "Predicció",
                    color: "#2ca02c",
                    strokeWidth: 2,
                    classed: 'dashed'
                }
            ];
        }
}


function create_chart_multiarea (nom, scenarios, div) {
    create_chart_multiline (nom, scenarios, div, true);
}


function create_chart_multiline (nom, scenarios, div, area) {

    var data_scenarios  = new d3.range(0,scenarios.length).map(function(d,i) {
        //console.dir(scenarios[i]);
        scenario = scenarios[i]
        return {
            area: area,
            strokeWidth: 2,
            classed: 'dashed',
            key: scenario['name'],
            values: new d3.range(0,scenario['prediction'].length).map( function(f,j) {

                hour = new Date(scenario['prediction'][j]['_id']); //.replace("GMT","UTC"));

                hour = new Date(hour - (2 * 60 *60*1000));  //localtime to UTC

                return {
                    y: scenario['prediction'][j]['sum_consumption_proposal'],
                    x: hour
                }
            })
        };
    });

   // console.log('data scenarios',data_scenarios);

    var chart;



    nv.addGraph(function() {

        chart = nv.models.lineChart()
            .options({
                transitionDuration: 300,
                useInteractiveGuideline: true
            })
        ;



        chart.margin({bottom: 100, left: 70});


        chart.xAxis
            .showMaxMin(false)
            .axisLabel("Hores (h)")
            .axisLabelDistance(45)
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
            .axisLabel('Energia (kw)')
            .showMaxMin(true)
            .tickFormat(function (d) {
                if (d == null) {
                    return 'N/A';
                }
                return d3.format('.0f')(d);
            })

        ;

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





function create_chart_multibar (nom, scenarios, div) {

    var data_scenarios  = new d3.range(0,scenarios.length).map(function(d,i) {
        scenario = scenarios[i]
        return {
            key: scenario['name'],
            values: new d3.range(0,(scenario['prediction'].length) ).map( function(f,j) {

                hour = new Date(scenario['prediction'][j]['_id']); //.replace("GMT","UTC"));

                hour = new Date(hour - (2 * 60 *60*1000));  //localtime to UTC

                //console.log(hour);

                return {
                    y: scenario['prediction'][j]['sum_consumption_proposal'],
                    x: hour
                }
            })
        };
    });

//    console.log('data scenarios',data_scenarios);

    var chart;



    nv.addGraph(function() {
        chart = nv.models.multiBarChart()
            .duration(300)
            .margin({bottom: 100, left: 70})
            .rotateLabels(45)
            .groupSpacing(0.1)
            //.stacked(true)
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


function append_hist(name){
    $('#llistat_historic ul').append("<li><a href='javascript:append_chart(\"#execucio\", \""+ name + "\");'>"+ convert_date_to_title(name,1)+"</a></li>");
}


days_in_week = ["Diumenge", "Dilluns", "Dimarts", "Dimecres", "Dijous", "Divendres", "Dissabte"];
days_in_week_lite = ["Dg", "Dl", "Dm", "Dx", "Dj", "Dv", "Ds"];

//From a string like "160401_160402" convert it to a Chart Title
function convert_date_to_title (string, lite){

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


//Fetch all proposals and initializates the right history menu
//Also autoload the last execution
function get_proposals(){
    $.ajax({
        url: 'http://127.0.0.1:5000/proposals?sort=-_id',
        dataType: 'json',

        success: function (data, status, jqXHR) {
            proposals = [];
            parentDiv='#execucio_ultima';

            $.each(data._items, function (index,value) {
                append_hist(value.name);
            });

            //autoload the last element on execucio_ultima div

            last = data._items[0].name;
            //last = $( '#llistat_historic > ul > li:last-child > a').href();

            child_div = "chart_" + last;

            $(parentDiv).append("<h3 class='grafic_title'>" + convert_date_to_title(last) + "</h3>")
            $(parentDiv).append(graphic_type_selector(last));
            $(parentDiv).append("<div id='" + child_div + "'><svg class='nvd3-svg'></svg></div>")
            create_chart(parentDiv, last);

            $("input[name='" + last + "']").change(radioValueChanged);

        },

        error: function (jqXHR, status) {
            $("#chart").append("KO!!!");
        }
    });

}

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

function graphic_type_selector(id){
    return "<form>" +
    '<div class="form-group pull-right  ">' +

        "<input type=radio name='" + id + "' value='area' checked> Area&nbsp;&nbsp;" +
        "<input type=radio name='" + id + "' value='line'> Line&nbsp;&nbsp;" +
        "<input type=radio name='" + id + "' value='bar'> Bar&nbsp;&nbsp;" +
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


function radioValueChanged() {
    name = $(this).attr('name');
    type = $(this).val();

    reset_chart(name, name, type);

}

function reset_chart(div, id, type){

    child_div = "chart_" + id

    //$(div + " svg").html("LOL");

    //console.log (   $("#"+child_div + " svg").html()  );

    //Delete previous chart
    $("#"+child_div + " svg").empty();

    create_chart("#"+child_div,id,type);
    //alert("change");

}


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
}

function create_chart(div, id, type){
    $.ajax({
        url: 'http://127.0.0.1:5000/proposals/'+id,
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
            }
        },

        error: function (jqXHR, status) {
            $(div).append("KO!!!");
        }
    });
}