# encoding=utf-8
import tornado.web

def current_user():
    return tornado.web.RequestHandler.get_secure_cookie("u")