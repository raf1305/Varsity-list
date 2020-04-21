import mysql.connector
mydb=mysql.connector.connect(host="localhost",user="root",passwd="1305",database="hello")
mycursor=mydb.cursor()
mycursor.execute("select * from employee")
myresult=mycursor.fetchall()
for row in myresult:
    print(row)