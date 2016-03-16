#encoding=utf-8
import tornado.web
import pymysql.cursors
import logging as l

class main(tornado.web.RequestHandler):
    def db(self):
        return self.application.db

class MainHandler(main):
    def get(self):
        try:
            with self.db().cursor() as cursor:
                # Read a single record
                sql = "SELECT `id`, `name` FROM `category` WHERE `is_del`= 0"
                cursor.execute(sql)
                result = cursor.fetchall()
                self.render("index.html", result=result)
        finally:
            pass