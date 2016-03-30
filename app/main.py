#encoding=utf-8
import tornado.web
import logging as l

class main(tornado.web.RequestHandler):
    def db(self):
        return self.application.db

class MainHandler(main):
    def get(self):
        cursor = self.db().cursor()
        # Read records
        sql = "SELECT `id`, `name` FROM `category` WHERE `is_del`= 0"
        cursor.execute(sql)
        result = cursor.fetchall()
        l.info(result)
        self.render("main.html", result=result, highlight='main')

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