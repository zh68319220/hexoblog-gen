#encoding=utf-8
import app.base as base
import logging as l

class main(base.BaseHandler):
    def render2(self, template_name, **kwargs):
        kwargs['current_user'] = self.get_current_user()
        self.render(template_name, **kwargs)

class MainHandler(main):
    '''
    yf: 首页
    '''
    def get(self):
        condi = [{'key': 'is_del', 'value': '0'}]
        rs = self.db().findmany("category", condi)
        self.render2("main.html", result=rs, highlight='main')

class AboutHandler(main):
    def get(self):
        self.render("about.html", highlight='about')

class ExampleHandler(main):
    '''
    yf: 案例
    '''
    def get(self):
        self.render("example.html", highlight='example')

class LoginHandler(main):
    '''
    yf: 登录
    '''
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

class LoginAJHandler(main):
    '''
    yf: ajax登录
    '''
    def check_xsrf_cookie(self):
        pass
    def post(self):
        username = self.get_argument('username')
        userpsw = self.get_argument('password')
        condi = [{'key': 'password', 'value': userpsw}]
        rs = self.db().findone("user", condi)
        if rs is None:
            self.write({'status': False})
        else:
            self.set_secure_cookie('u', str(rs['id']))
            self.write({'status': True})

class LogoutHandler(main):
    '''
    yf: 退出登录
    '''
    def get(self):
        self.set_secure_cookie('u', '')
        self.redirect('/')