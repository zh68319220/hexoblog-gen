#encoding=utf-8
import app.base as base
import logging as l

class main(base.BaseHandler):
    pass

class MainHandler(main):
    def get(self):
        # Read records
        # sql = "SELECT `id`, `name` FROM `category` WHERE `is_del`= 0"
        # cursor.execute(sql)
        # result = cursor.fetchall()
        result = []
        self.render("main.html", result=result, highlight='main')

class AboutHandler(main):
    def get(self):
        self.render("about.html", highlight='about')

class ExampleHandler(main):
    def get(self):
        self.render("example.html", highlight='example')

class LoginHandler(main):
    def get(self):
        self.render("login.html", info=None)
    def post(self):
        username = self.get_argument('username')
        userpsw = self.get_argument('password')
        condi = [{'key': 'username', 'value': username}, {'key': 'password', 'value': userpsw}]
        rs = self.db().findone("user", condi)
        if rs is None:
            self.render('login.html', info="用户名或密码不正确!")
        else:
            self.set_secure_cookie('u', str(rs['id']))
            self.redirect('/sys')