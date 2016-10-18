# -*- coding: utf-8 -*-
__author__ = 'XaviTorello'

from .frontend import *

import threading

from flask import Flask, render_template, request




class Frontend(object):
    PORT = 80

    app = Flask(__name__)

    #Handler.extensions_map.update({
    #    '.json': 'application/x-web-app-manifest+json',
    #});

    def __init__(self, port=8000, host="0.0.0.0"):
        self.app = Flask(__name__)
        self.PORT = port
        self.HOST = host
        self.thread = threading.Thread(target=self.start, args=())
        self.thread.daemon = True
        self.thread.start()


    def __del__(self):
        self.shutdown()

    def start(self):
        try:
            ## INDEX
            @self.app.route('/')
            def index():
                return proposta_ultim()
                #return dashboard()



            ## REACT
            @self.app.route('/react/')
            def react():
                return render_template('layout_react.html')


            ## DASHBOARD
            @self.app.route('/dashboard')
            def dashboard():
                return render_template('pages/dashboard.html')


            ## PROPOSTES
            @self.app.route('/propostes/ultim')
            @self.app.route('/propostes/')
            def proposta_ultim():
                return render_template('pages/propostes/ultim.html')

            @self.app.route('/propostes/setmana')
            def proposta_setmana():
                return render_template('pages/propostes/setmana.html')

            @self.app.route('/propostes/setmana/pasada')
            def proposta_setmana_pasada():
                return render_template('pages/propostes/setmana_passada.html')


            ## GRAFICS
            @self.app.route('/grafic/ultim')
            @self.app.route('/grafic/')
            def grafic_ultim():
                return render_template('pages/grafics/ultim.html')

            @self.app.route('/grafic/setmana')
            def grafic_setmana():
                return render_template('pages/grafics/setmana.html')

            @self.app.route('/grafic/setmana/pasada')
            def grafic_setmana_pasada():
                return render_template('pages/grafics/setmana_passada.html')


            ## TAULES
            @self.app.route('/taula/ultim')
            @self.app.route('/taula/')
            def taula_ultima():
                return render_template('pages/taules/ultim.html')

            @self.app.route('/taula/setmana')
            def taula_setmana():
                return render_template('pages/taules/setmana.html')

            @self.app.route('/taula/setmana/pasada')
            def taula_setmana_pasada():
                return render_template('pages/taules/setmana_passada.html')

            @self.app.route('/taula/<proposta>')
            def taula_una():
                return render_template('pages/taules.html')


            # ERROR
            @self.app.errorhandler(404)
            def pagina_no_trobada(error):
                return render_template('page_not_found.html'), 404

            @self.app.errorhandler(500)
            def pagina_no_trobada(error):
                return render_template('page_not_found.html'), 500

            #print " * xFrontend running on http://127.0.0.1:{}".format(self.PORT)
            self.app.run(port=self.PORT, host=self.HOST)


        except:
            raise
            self.shutdown()

    def shutdown(self):
        print ("Shutting down web server")
