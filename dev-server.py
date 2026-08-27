#!/usr/bin/env python
"""Local static server that mimics vercel.json's clean-URL rewrites,
so extension-less routes (/about, /services/foley, ...) work the same
way locally as they will on Vercel. Not part of the deployed site."""

import http.server
import os
import sys
import urllib.parse

CLEAN_ROUTES = {
    '/': '/index.html',
    '/about': '/about.html',
    '/services': '/services.html',
    '/contact': '/contact.html',
    '/portfolio': '/portfolio.html',
    '/services/foley': '/services/foley.html',
    '/services/sound-design': '/services/sound-design.html',
    '/services/field-recording': '/services/field-recording.html',
    '/services/music': '/services/music.html',
    '/services/advertising': '/services/advertising.html',
}


class CleanUrlHandler(http.server.SimpleHTTPRequestHandler):
    def do_GET(self):
        parsed = urllib.parse.urlparse(self.path)
        if parsed.path in CLEAN_ROUTES:
            target = CLEAN_ROUTES[parsed.path]
            query = ('?' + parsed.query) if parsed.query else ''
            self.path = target + query
        return super().do_GET()

    def do_HEAD(self):
        parsed = urllib.parse.urlparse(self.path)
        if parsed.path in CLEAN_ROUTES:
            target = CLEAN_ROUTES[parsed.path]
            query = ('?' + parsed.query) if parsed.query else ''
            self.path = target + query
        return super().do_HEAD()


if __name__ == '__main__':
    port = int(sys.argv[1]) if len(sys.argv) > 1 else 5500
    os.chdir(os.path.dirname(os.path.abspath(__file__)))
    http.server.test(HandlerClass=CleanUrlHandler, port=port)
