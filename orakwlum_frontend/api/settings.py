# -*- coding: utf-8 -*-
__author__ = 'XaviTorello'

## Settings file for Eve

MONGO_HOST = '127.0.0.1'
MONGO_PORT = 27017
MONGO_DBNAME = 'orakwlum'

RESOURCE_METHODS = ['GET']
ITEM_METHODS = ['GET']

X_DOMAINS = '*'

schema = {
    # Schema definition, based on Cerberus grammar. Check the Cerberus project
    # (https://github.com/nicolaiarocci/cerberus) for details.
    'name': {
        'type': 'string',
        'minlength': 1,
        'maxlength': 10,
        'unique': True,
    },
    'scenarios': {
        'type': 'list'
    },
    'dates': {
        'type': 'list'
    }
}

proposals = {
    'item_title': 'Proposal',

    # by default the standard item entry point is defined as
    # '/people/<ObjectId>'. We leave it untouched, and we also enable an
    # additional read-only entry point. This way consumers can also perform
    # GET requests at '/people/<lastname>'.
    'additional_lookup': {
        'url': 'regex("[\w]+")',
        'field': 'name'
    },

    # We choose to override global cache-control directives for this resource.
    'cache_control': 'max-age=10,must-revalidate',
    'cache_expires': 10,

    # most global settings can be overridden at resource level
    'resource_methods': ['GET'],
    'schema': schema
}

DOMAIN = {'proposals': proposals}
