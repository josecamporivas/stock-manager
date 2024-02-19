import pymysql.cursors


# Connect to the database
def connect():
    return pymysql.connect(host='localhost',
                           user='manager',
                           password='password_manager',
                           database='stock_manager',
                           charset='utf8mb4',
                           cursorclass=pymysql.cursors.DictCursor)
