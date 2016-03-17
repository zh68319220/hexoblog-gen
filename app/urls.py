# coding: utf-8
import app.main as index

urls = [
    (r'^/$', index.MainHandler),
    (r'^/examples', index.ExampleHandler),
    (r'^/about', index.AboutHandler)
]