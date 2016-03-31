# -*- coding: utf-8 -*-
__author__ = 'XaviTorello'

from orakwlum_frontend.api import *
import time

api = Api(settings="orakwlum_frontend/api/settings.py")

while True:
    # Do something
    print('API still working in background..')
    time.sleep(60)
