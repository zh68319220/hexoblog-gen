# coding: utf-8
import app.main as main
import app.sys as sys

urls = [
    (r'^/$', main.MainHandler),
    (r'^/examples', main.ExampleHandler),
    (r'^/about', main.AboutHandler),
    (r'^/login', main.LoginHandler),
    (r'^/loginAJ', main.LoginAJHandler),
    (r'^/logout', main.LogoutHandler),
    (r'^/sys', sys.MainHandler),
    (r'^/sys/addblog', sys.BlogHandler),
    (r'^/sys/upload', sys.UploadHandler)
]