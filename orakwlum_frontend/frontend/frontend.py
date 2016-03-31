# -*- coding: utf-8 -*-
__author__ = 'XaviTorello'

from frontend import *

import SimpleHTTPServer
import SocketServer
import threading
import os

class Frontend(object):
    Handler = SimpleHTTPServer.SimpleHTTPRequestHandler
    PORT = 8000

    #Handler.extensions_map.update({
    #    '.json': 'application/x-web-app-manifest+json',
    #});

    def __init__(self, path):
        self.thread = threading.Thread(target=self.start, args=())
        self.thread.daemon = True
        self.thread.start()
        self.path = path

        #change working dir
        os.chdir(path)


    def __del__(self):
        self.shutdown()

    def start(self):
        try:
            self.httpd = SocketServer.TCPServer(("", self.PORT), self.Handler)
            print "Web server started at port", self.PORT
            self.httpd.serve_forever()
        except:
            self.shutdown()

    def shutdown(self):
        print "Shutting down the web server"
        self.httpd.socket.close()
