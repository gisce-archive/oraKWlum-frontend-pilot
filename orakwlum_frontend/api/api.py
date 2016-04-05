# -*- coding: utf-8 -*-
__author__ = 'XaviTorello'

from eve import Eve

import threading

# Loads API settings
from settings import *


class Api(object):
    def __init__(self, settings):
        """
        Creates a new API
        """

        self.settings = settings

        #self.api = Eve(settings=settings)

        self.thread = threading.Thread(target=self.run, args=())
        self.thread.daemon = True
        self.thread.start()

    def run(self):
        """
        Start the API
        """
        self.api = Eve(settings=self.settings)
        self.api.run()

    def stop(self):
        pass

    def status(self):
        self.api.isAlive()
