# encoding=utf-8
import app.base as base
import os
import logging as l

class system(base.BaseHandler):
    pass

class MainHandler(system):
    def get(self):
        if self.current_user:
            self.render("sys.html")
        else:
            self.redirect('/login')

class UploadHandler(system):
    '''
    yf - 文件上传
    '''
    def check_xsrf_cookie(self):
        pass
    def post(self):
        l.info(os.path.join(os.path.dirname(__file__), 'p'))
        pass