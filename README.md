# oraKWlum-frontend
Web based frontend for [oraKWlum](https://github.com/gisce/oraKWlum), an energy forecasting lib based on enerdata.

Show all the proposals and provides an easy way to compare the different scenarios.

Includes a REST Api to consume the Proposals from Mongo.

Integrates all the elements involved to run, a REST API server and the frontend server.




## Usage

1. Adapt your settings

Get and adapt the [settings.py model](https://github.com/gisce/oraKWlum-frontend/blob/master/orakwlum_frontend/api/settings.py)

```
MONGO_HOST = 'localhost'
MONGO_PORT = 27017
MONGO_DBNAME = 'orakwlum'
```


2. Start the servers

### Daemonizing oraKWlum-frontend

It's simple, just adapt and deploy the [oraKWlum-frontend init.d script file](https://github.com/gisce/oraKWlum-frontend/blob/master/utils/oraKWlum-frontend)

* Take care to adapt the following VARS to your installation:

```
ORA_PATHH
ENV_PATHH
USER
GROUP
``` 

* Copy it to the init.d
```
$ cp utils/orakwlum-frontend /etc/init.d/
```

* Ensure that the script can be executed
```
$ chmod +x /etc/init.d/orakwlum-frontend
```

* Start it!
```
$ /etc/init.d/orakwlum-frontend start
```

* Finally, think about if it's needed to start it at boot time




### From scratch

```
from orakwlum_frontend import *

#Run API server
api = Api(settings="PATH_TO_YOUR/settings.py")

#Run Frontend server
frontend = Frontend(port=8000)
```


3. Call the web frontend

Open your favourite browser and **enjoy** at [http://127.0.0.1:8000](http://127.0.0.1:8000)



## Screenshots

### Proposal view
![Proposal](https://raw.githubusercontent.com/gisce/oraKWlum-frontend/master/screenshots/proposal.png)
![Proposal](https://raw.githubusercontent.com/gisce/oraKWlum-frontend/master/screenshots/proposal2.png)
![Proposal](https://raw.githubusercontent.com/gisce/oraKWlum-frontend/master/screenshots/proposal3.png)

### Chart view
![Chart](https://raw.githubusercontent.com/gisce/oraKWlum-frontend/master/screenshots/chart.png)
![Chart](https://raw.githubusercontent.com/gisce/oraKWlum-frontend/master/screenshots/chart2.png)
![Chart](https://raw.githubusercontent.com/gisce/oraKWlum-frontend/master/screenshots/chart3.png)
![Chart](https://raw.githubusercontent.com/gisce/oraKWlum-frontend/master/screenshots/chart4.png)

### Table view
![Table](https://raw.githubusercontent.com/gisce/oraKWlum-frontend/master/screenshots/table.png)
![Table](https://raw.githubusercontent.com/gisce/oraKWlum-frontend/master/screenshots/table2.png)
![Table](https://raw.githubusercontent.com/gisce/oraKWlum-frontend/master/screenshots/table3.png)
![Table](https://raw.githubusercontent.com/gisce/oraKWlum-frontend/master/screenshots/table4.png)
