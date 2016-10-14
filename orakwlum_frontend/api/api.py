# -*- coding: utf-8 -*-
__author__ = 'XaviTorello'

from eve import Eve

import threading

# Loads API settings
from .settings import *


class Api(object):
    def __init__(self, settings, port=5000, host="127.0.0.1"):
        """
        Creates a new API
        """

        self.settings = settings

        #self.api = Eve(settings=settings)

        self.port = port
        self.host = host
        self.thread = threading.Thread(target=self.run, args=())
        self.thread.daemon = True
        self.thread.start()


    def run(self):
        """
        Start the API
        """
        self.api = Eve(settings=self.settings)
        self.api.run(port=self.port, host= self.host)

    def stop(self):
        pass

    def status(self):
        self.api.isAlive()
