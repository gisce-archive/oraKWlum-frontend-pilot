# oraKWlum-frontend
Web based frontend for oraKWlum, an energy forecasting lib based on enerdata

Show all the proposals and provides an easy way to compare the different scenarios

Includes a REST Api to consume the Proposals from Mongo


## Screenshots

![Prediction1](https://raw.githubusercontent.com/gisce/oraKWlum-frontend/master/screenshots/demo.png)


## Usage

### Adapt your settings

Get and adapt the [settings.py model](https://github.com/gisce/oraKWlum-frontend/blob/master/orakwlum_frontend/api/settings.py)

```
MONGO_HOST = 'localhost'
MONGO_PORT = 27017
MONGO_DBNAME = 'orakwlum'
```



### Run the API

```
from orakwlum_frontend.api import *

api = Api(settings="PATH_TO_YOUR/settings.py")
```


### Call the web frontend

Open your favourite browser and call the frontend:

```
reports/index.html
```

