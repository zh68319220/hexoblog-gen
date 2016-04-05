# encoding=utf-8
# db functions
import tornado.web
import logging as l

class base(tornado.web.RequestHandler):
    def cursor(self):
        return self.application.db.cursor()

class DB(base):
    def findone(self, table, params):
        cursor = self.cursor()
        sql = "SELECT * FROM `" + table + "` WHERE "
        for ind, p in enumerate(params):
            if ind == (len(params) - 1):
                sql += "`" + p['key'] + "`='" + p['value'] + "' "
            else:
                sql += "`" + p['key'] + "`='" + p['value'] + "' and "
        cursor.execute(sql)
        return cursor.fetchone()
    def findmany(self, table, params):
        cursor = self.cursor()
        sql = "SELECT * FROM `" + table + "` WHERE "
        for ind, p in enumerate(params):
            if ind == (len(params) - 1):
                sql += "`" + p['key'] + "`='" + p['value'] + "' "
            else:
                sql += "`" + p['key'] + "`='" + p['value'] + "' and "
        cursor.execute(sql)
        return cursor.fetchall()
    def exist(self):
        pass
    def addone(self, table, params):
        cursor = self.cursor()
        sql = "INSERT INTO `" + table + "` ("
        for ind, p in enumerate(params):
            if ind == (len(params) - 1):
                sql += "`" + p['key'] + "`)"
            else:
                sql += "`" + p['key'] + "`,"
        sql += " VALUES ("
        for ind, p in enumerate(params):
            if ind == (len(params) - 1):
                sql += "'" + p['value'] + "')"
            else:
                sql += "'" + p['value'] + "',"
        l.info(sql)
        cursor.execute(sql)