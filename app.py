import tornado.ioloop,tornado.web,\
    tornado.httpserver,tornado.process,\
    tornado.netutil,tornado.locale, os
import app.main as main
from tornado.options import options, define
import pymysql.cursors
import logging as l

class Application(tornado.web.Application):
    def __init__(self):
        settings = {
            'template_path': os.path.join(os.path.dirname(__file__), 'templates'),
            'static_path': os.path.join(os.path.dirname(__file__), 'assets'),
            'static_url_prefix': '/assets/',
            'cookie_secret': 'f',
            'cookie_domain': 'localhost',
            'login_url': '/login',
            'debug': True,
            'xsrf_cookies': True,
        }
        super(Application, self).__init__([('/', main.MainHandler)], **settings)

        ## 连接数据库  todo: pymysql异步
        def connect():
            # Connect to the database
            connection = pymysql.connect(host='localhost',
                                         user='root',
                                         password='root',
                                         db='blog',
                                         charset='utf8',
                                         cursorclass=pymysql.cursors.DictCursor)
            return connection
        self.db = connect()

if __name__ == "__main__":
    # tornado.locale.load_translations(os.path.join(options.run_path, "locale"))
    tornado.options.parse_config_file('app/config.conf')
    tornado.options.parse_command_line()
    app = Application()
    if True:
        print('debug --------------------')
        server = tornado.httpserver.HTTPServer(app, xheaders=True)
        server.listen(3000)
    else:
        print('run --------------------')
        sockets = tornado.netutil.bind_sockets(options.port)
        tornado.process.fork_processes(0)
        server = tornado.httpserver.HTTPServer(app, xheaders=True)
        server.add_sockets(sockets)
    tornado.ioloop.IOLoop.current().start()