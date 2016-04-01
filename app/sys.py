# encoding=utf-8
import app.base as base
import os
import tornado.web
import logging as l

class system(base.BaseHandler):
    pass

class MainHandler(system):
    def get(self):
        if self.current_user:
            self.render("sys.html")
        else:
            self.redirect('/login')

class BlogHandler(system):
    def get(self):
        pass
    def post(self):
        html = self.get_argument('html')
        title = ''
        params = { 'title': title, 'content': html, 'user_id': self.current_user.id }

class UploadHandler(system):
    '''
    yf - 文件上传
    '''
    def check_xsrf_cookie(self):
        pass
    def post(self):
        import time
        f = self.request.files['wangEditorH5File'][0]
        if f:
            filename = f.filename
            mkdir = "\\assets\\p\\" + time.strftime("%Y%m%d")
            fdir = "\\" + filename
            basepath = os.path.dirname(__file__).replace("\\app", "")
            if os.path.exists(basepath + mkdir):
                open(basepath + mkdir + fdir, 'wb').write(f.body)
            else:
                os.mkdir(basepath + mkdir)
                open(basepath + mkdir + fdir, 'wb').write(f.body)
            self.write(mkdir + fdir)
        else:
            self.write('notfound')