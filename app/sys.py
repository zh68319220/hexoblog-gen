# encoding=utf-8
import app.base as base
import logging as l

class system(base.BaseHandler):
    pass

class MainHandler(system):
    def get(self):
        if self.current_user:
            self.render("sys.html")
        else:
            self.redirect('/login')