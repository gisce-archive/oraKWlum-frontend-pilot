# -*- coding: utf-8 -*-
__author__ = 'XaviTorello'

from orakwlum_frontend import *
import time

frontend = Frontend(port=8000)
api = Api(settings="orakwlum_frontend/api/settings.py")

while True:
    # Do something
    time.sleep(600)
    print('Frontend and API server still working in background..')
