/*
coding: utf-8 -*-
__author__ = 'XaviTorello'

orakwlum-frontend - Table Support functions
 */


//Create a new odded table
function create_table_odded (nom, scenarios, div) {
/*
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

*/
        $(div).html("LOL");

    /*
              <div class="box">
                <div class="box-header">
                  <h3 class="box-title">Striped Full Width Table</h3>
                </div><!-- /.box-header -->
                <div class="box-body no-padding">
                  <table class="table table-striped">
                    <tr>
                      <th style="width: 10px">#</th>
                      <th>Task</th>
                      <th>Progress</th>
                      <th style="width: 40px">Label</th>
                    </tr>
                    <tr>
                      <td>1.</td>
                      <td>Update software</td>
                      <td>
                        <div class="progress progress-xs">
                          <div class="progress-bar progress-bar-danger" style="width: 55%"></div>
                        </div>
                      </td>
                      <td><span class="badge bg-red">55%</span></td>
                    </tr>
                    <tr>
                      <td>2.</td>
                      <td>Clean database</td>
                      <td>
                        <div class="progress progress-xs">
                          <div class="progress-bar progress-bar-yellow" style="width: 70%"></div>
                        </div>
                      </td>
                      <td><span class="badge bg-yellow">70%</span></td>
                    </tr>
                    <tr>
                      <td>3.</td>
                      <td>Cron job running</td>
                      <td>
                        <div class="progress progress-xs progress-striped active">
                          <div class="progress-bar progress-bar-primary" style="width: 30%"></div>
                        </div>
                      </td>
                      <td><span class="badge bg-light-blue">30%</span></td>
                    </tr>
                    <tr>
                      <td>4.</td>
                      <td>Fix and squish bugs</td>
                      <td>
                        <div class="progress progress-xs progress-striped active">
                          <div class="progress-bar progress-bar-success" style="width: 90%"></div>
                        </div>
                      </td>
                      <td><span class="badge bg-green">90%</span></td>
                    </tr>
                  </table>
                </div><!-- /.box-body -->
              </div><!-- /.box -->

        */




}