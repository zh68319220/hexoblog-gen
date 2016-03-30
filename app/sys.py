# encoding=utf-8
import tornado.web

import logging as l

class system(tornado.web.RequestHandler):
    def db(self):
        return self.application.db()

class MainHandler(system):
    def get(self):
        if self.current_user:
            self.render("sys.html")
        else:
            self.redirect('/login')