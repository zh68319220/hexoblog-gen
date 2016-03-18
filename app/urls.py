# coding: utf-8
import app.main as index
import app.sys as sys

urls = [
    (r'^/$', index.MainHandler),
    (r'^/examples', index.ExampleHandler),
    (r'^/about', index.AboutHandler),
    (r'^/sys', sys.MainHandler)
]