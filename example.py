# -*- coding: utf-8 -*-
__author__ = 'XaviTorello'

from orakwlum_frontend.api import *
from orakwlum_frontend import *
import time

api = Api(settings="orakwlum_frontend/api/settings.py")
frontend = Frontend(path="orakwlum_frontend/frontend/reports")

while True:
    # Do something
    print('Servers still working in background..')
    time.sleep(600)

