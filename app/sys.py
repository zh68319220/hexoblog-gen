# encoding=utf-8
import tornado.web

import logging as l

class system(tornado.web.RequestHandler):
    def db(self):
        return self.application.db()

class MainHandler(system):
    def get(self):
        self.u = self.get_secure_cookie('u')
        if self.u:
            self.render("sys.html")
        else:
            self.render("sys.html")
            # self.redirect('/login')