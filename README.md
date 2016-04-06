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
