# -*- coding: utf-8 -*-
__author__ = 'XaviTorello'

from frontend import *

import threading

from flask import Flask, render_template, request




class Frontend(object):
    PORT = 8000

    app = Flask(__name__)


    #Handler.extensions_map.update({
    #    '.json': 'application/x-web-app-manifest+json',
    #});

    def __init__(self, path="orakwlum_frontend/frontend/reports", port=8000):
        self.app = Flask(__name__)

        self.thread = threading.Thread(target=self.start, args=())
        self.thread.daemon = True
        self.thread.start()
        self.path = path
        self.PORT = port
        self.httpd = None


    def __del__(self):
        self.shutdown()

    def start(self):
        try:

            ## INDEX
            @self.app.route('/')
            def index():
                return dashboard()


            ## DASHBOARD
            @self.app.route('/dashboard')
            def dashboard():
                return render_template('pages/dashboard.html')


            ## GRAFICS
            @self.app.route('/grafic/ultim')
            @self.app.route('/grafic/')
            def grafic_ultim():
                return render_template('pages/taules.html')

            @self.app.route('/grafic/setmana')
            def grafic_setmana():
                return render_template('pages/taules.html')

            @self.app.route('/grafic/setmana/pasada')
            def grafic_setmana_pasada():
                return render_template('pages/taules.html')


            ## TAULES
            @self.app.route('/taula/ultim')
            @self.app.route('/taula/')
            def taula_ultima():
                return render_template('pages/taules.html')

            @self.app.route('/taula/setmana')
            def taula_setmana():
                return render_template('pages/taules.html')

            @self.app.route('/taula/setmana/pasada')
            def taula_setmana_pasada():
                return render_template('pages/taules.html')

            @self.app.route('/taula/<proposta>')
            def taula_una():
                return render_template('pages/taules.html')



            #print " * xFrontend running on http://127.0.0.1:{}".format(self.PORT)
            self.app.run(port=8000)


        except:
            raise
            self.shutdown()

    def shutdown(self):
        print "Shutting down web server"
