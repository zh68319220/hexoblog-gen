#encoding=utf-8
import tornado.web
import logging as l
# import pymysql.cursors

class main(tornado.web.RequestHandler):
    def db(self):
        return self.application.db

class MainHandler(main):
    def get(self):
        self.render("main.html", highlight='main')
        # try:
        #     with self.db().cursor() as cursor:
        #         # Read a single record
        #         sql = "SELECT `id`, `name` FROM `category` WHERE `is_del`= 0"
        #         cursor.execute(sql)
        #         result = cursor.fetchall()
        #         self.render("index.html", result=result)
        # finally:
        #     pass

class AboutHandler(main):
    def get(self):
        self.render("about.html", highlight='about')

class ExampleHandler(main):
    def get(self):
        self.render("example.html", highlight='example')

class LoginHandler(main):
    def get(self):
        self.render("login.html")
    def post(self):
        username = self.get_argument('username')
        userpsw = self.get_argument('password')