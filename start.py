# -*- coding: utf-8 -*-
__author__ = 'XaviTorello'

from orakwlum_frontend import *
import time

frontend = Frontend(port=8000, host="0.0.0.0")

api = Api(host="0.0.0.0", settings="orakwlum_frontend/api/settings.py")

while True:
    # Do something
    time.sleep(600)
    print('Frontend and API server still working in background..')
