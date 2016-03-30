#encoding=utf-8
import tornado.web
import logging as l

class main(tornado.web.RequestHandler):
    def cursor(self):
        return self.application.db.cursor()

class MainHandler(main):
    def get(self):
        cursor = self.cursor()
        # Read records
        sql = "SELECT `id`, `name` FROM `category` WHERE `is_del`= 0"
        cursor.execute(sql)
        result = cursor.fetchall()
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
        cursor = self.cursor()
        # Read records
        sql = "SELECT * FROM `user` WHERE `username`= " + username + " and" + "`password`=" + userpsw
        cursor.execute(sql)
        result = cursor.fetchone()
        if result is None:
            self.redirect('/login')
        else:
            self.current_user = result['id']
            self.redirect('/sys')