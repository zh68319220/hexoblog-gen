# encoding=utf-8
import tornado.web
import app.db as db
import logging as l

class BaseHandler(tornado.web.RequestHandler):
    def db(self):
        return db.DB(self.application, self.request)
    def get_current_user(self):
        uid = self.get_secure_cookie('u')
        user = None
        if uid:
            user = self.db().findone('user', [{'key': 'id', 'value': str(uid.decode('utf-8'))}])
        return user
