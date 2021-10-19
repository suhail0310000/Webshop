#FØRSTE ALTERNATIV MED SQL
# from typing import Collection
from flask import Flask, render_template, request, jsonify ,make_response,json, url_for,redirect
import flask
# from flask_restful import Api, Resource, reqparse
import mysql.connector
import time
import logging

logging.basicConfig(format="%(levelname)s: %(message)s",level=logging.DEBUG)
from google.oauth2 import id_token as goog_token
from google.auth.transport import requests as goog_req


# api = Api(app)


time.sleep(30)

oauth_id = '202265633567-a7p3rejn0cpau3r242ar8074bhhu8gpv.apps.googleusercontent.com'

db=mysql.connector.connect(
    host="database",
    user="root",
    passwd="admin",
    database="testdatabase"
)

mycursor = db.cursor()


try:

    #Tabell for produkter
    mycursor.execute("CREATE TABLE products_mainTest (name VARCHAR(50), description VARCHAR(300), price DOUBLE, stock VARCHAR(150), discount DOUBLE, image VARCHAR(1024) default 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/23/The_Jolly_Nero.jpg/1024px-The_Jolly_Nero.jpg', productID int PRIMARY KEY AUTO_INCREMENT)")
    
    data = [
        ('Bilde1', 'Description for pic1', 100, 10, 10, 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/23/The_Jolly_Nero.jpg/1024px-The_Jolly_Nero.jpg'),
        ('Bilde2', 'Description for pic2', 200, 10, 10, 'https://static.wikia.nocookie.net/mlp/images/b/b2/Pinkie_Pie_ID_S4E11.png'),
        ('Bilde3', 'Description for pic3', 250, 10, 10, 'https://i.ytimg.com/vi/RDhfnPSTqmk/maxresdefault.jpg'),
        ('Bilde4', 'Description for pic4', 300, 10, 10, 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/23/The_Jolly_Nero.jpg/1024px-The_Jolly_Nero.jpg')
    ]

    #Sett inn info i produkter
    commandQuery = "INSERT INTO products_mainTest (name,description,price,stock,discount,image) VALUES (%s,%s,%s,%s,%s,%s)"
    mycursor.executemany(commandQuery, data)

    #Tabell for kontaktskjema
    mycursor.execute("CREATE TABLE kontaktskjema_test (Name VARCHAR(50), email VARCHAR(150), message VARCHAR(200), kontaktID int PRIMARY KEY AUTO_INCREMENT)")
    mycursor.execute("INSERT INTO kontaktskjema_test (Name,email,message) VALUES(%s,%s,%s)",("Tim","Suhail_0310@hotmail.com","hei"))
    
    #table for users
    mycursor.execute("CREATE TABLE webUsers (name VARCHAR(150), email VARCHAR(150), access_level INT unsigned NOT NULL default 0, userID int PRIMARY KEY AUTO_INCREMENT)")
    data = [
        ('super', 'superbruker11@gmail.com', 100),
        ('vanlig', 'testskole12@gmail.com', 10),
        ('test', 'funker@gmail.com', 0),
        ('test2', 'hei@gmail.com', 0)
    ]

    #Setter inn data for users
    commandQuery = "INSERT INTO webUsers (name,email,access_level) VALUES (%s,%s,%s)"
    mycursor.executemany(commandQuery, data)

    #Split users og product (one to many relationship)
    mycursor.execute("CREATE TABLE user_order_products (orderID int PRIMARY KEY AUTO_INCREMENT, userID int, productID int,FOREIGN KEY(userID) REFERENCES webUsers(userID) ,FOREIGN KEY(productID) REFERENCES products_mainTest(productID))")
    mycursor.execute("INSERT INTO user_order_products (userID, productID) VALUES(%s,%s)",(1,1))





except mysql.connector.Error as err:
    print("Something went wrong: {}".format(err))   


db.commit()





app = Flask(__name__)
# api = Api(app)

mycursor.execute("SELECT * FROM webUsers")
myresult = mycursor.fetchall()
#db.commit()

logging.info("Hei python")
for name, email, access, i in myresult:
    logging.info("Name: {} ,Email: {}, Access: {}, ID: {}".format(name, email, access, i))


@app.route('/')
def index():
    return render_template('index.html')




#Vurderes å slette
# @app.route('/productss')
# def getAllUsers():
#     mycursor = db.cursor()
#     mycursor.execute("SELECT * FROM testUsers")
#     fetchProducts = mycursor.fetchall()
#     products = []
#     convertProducts = {}
#     for jsonProducts in fetchProducts:
#         convertProducts = {'name' : jsonProducts[0], 'email' : jsonProducts[1], 'access_level' : jsonProducts[2], 'userID' : jsonProducts[3]}
#         products.append(convertProducts)
#         convertProducts = {}
        
#     logging.info(products)
#     respone = make_response(jsonify(products))
#     logging.info(products)
#     return respone


#hoved-fungerer mye
@app.route('/users', methods = ['GET'])
def users():
    if flask.request.method == 'GET':
        logging.info("Requested users")
        mycursor = db.cursor()
        mycursor.execute("SELECT * FROM webUsers")
        myresult = mycursor.fetchall()
        logging.info(myresult)
  
        auth_token = flask.request.headers.get("Authorization")
        if(auth_token):
            logging.info("fetch in progress")
            logging.info("AUTHENTICATION ATTEMPT. Token: {}".format(auth_token))
            valid_user = validate_token(auth_token)

            if not valid_user:
                return flask.jsonify([])

            logging.info("{} is a valid Google user".format(valid_user['given_name']))
            auth_email = valid_user['email']
            logging.info(auth_email)
             

            #admin
            access = 0
            for name, email, acc, id in myresult:
                logging.info("{}, {}, {}, {}".format(name, email, acc, id))
                if email == auth_email:
                    logging.info("{} is a registered user in this app, access level {}"
                        .format(name, acc))
                    access = acc

            if (access >= 100):
                # return render_template("checkout.html")
                logging.info("denne fungerer admin")
                return redirect(url_for('shoppingcart'))
        return flask.jsonify(myresult)

def validate_token(token):
    some_token = "eyJhbGciOiJSUzI1NiIsImtpZCI6IjY5ZWQ1N2Y0MjQ0OTEyODJhMTgwMjBmZDU4NTk1NGI3MGJiNDVhZTAiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJhY2NvdW50cy5nb29nbGUuY29tIiwiYXpwIjoiMTk5MTgxNjM0NTkyLW04YmVuaTUzM2Y5ZThhYWJmZWRwZ2ZlZzc3dWhraTk1LmFwcHMuZ29vZ2xldXNlcmNvbnRlbnQuY29tIiwiYXVkIjoiMTk5MTgxNjM0NTkyLW04YmVuaTUzM2Y5ZThhYWJmZWRwZ2ZlZzc3dWhraTk1LmFwcHMuZ29vZ2xldXNlcmNvbnRlbnQuY29tIiwic3ViIjoiMTA2MDA0Mzg5OTc5NzEzNjc5ODc1IiwiZW1haWwiOiJkZXJlay5iaXBhcnRpc2FuQGdtYWlsLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJhdF9oYXNoIjoiejN6dW5vUUtDcGlDS2xrUHdmVjhrUSIsIm5hbWUiOiJEZXJlayBCaXBhcnRpc2FuIiwicGljdHVyZSI6Imh0dHBzOi8vbGgzLmdvb2dsZXVzZXJjb250ZW50LmNvbS9hL0FBVFhBSnlvdGZfSy01S0c2cFg4emZDX05JblI4OGpBbUE0V3ZSYXRUR1c3PXM5Ni1jIiwiZ2l2ZW5fbmFtZSI6IkRlcmVrIiwiZmFtaWx5X25hbWUiOiJCaXBhcnRpc2FuIiwibG9jYWxlIjoiZW4iLCJpYXQiOjE2MjAyOTUzNzQsImV4cCI6MTYyMDI5ODk3NCwianRpIjoiYmNlYmE0M2FkM2RlZTFhNjlmYjgwOTIxZGI4ZWJjNGY0ZGU3YzQxMCJ9.EyOWk8Sph7mawEy5HTSvCgQNWObVp6DmJEMp1fWgmcH6m4q6YNf2Ubge7M_dwP2zp39XoWPrgRQXs2hceFKVlhKnhvGVeVaxS4e-0C9hnQFfKUDTOFMjY-hgBd0UoP9N8cUIcK1MiLgatkRiajX9Rykdf2QSAxXQd0LkD1AAueoCyrwJsDyLnogzlBnvtCc_hN8r9_TLC7v-XBrZPeW3pOrsrmGzQkCnDCtTYg7TtFv-1r5p6OK74DB3x-BqRFVyp7u_9d-zxoG__8sq2WnocutwieXUSf7q1NNWGSzcba0SmOHpg35u5dqWFhGirZRRhTvHlI5D2lqGl1ctR7XWOA"
    if (token == some_token):
        print("Token is re-used. OK.")
        return True
    else:
        print("Never seen this token before...")

    try:
        # Specify the CLIENT_ID of the app that accesses the backend:
        idinfo = goog_token.verify_oauth2_token(token, goog_req.Request(), oauth_id)
        print("\nTOKEN VALID. User: {}\nUser data: \n{}\n"
            .format(idinfo['given_name'],idinfo))
        return idinfo

    except ValueError as err:
        # Invalid token
        print(f"Token validation failed: {err}")
    return False



@app.route('/products')
def getAllProducts():
    mycursor = db.cursor()
    mycursor.execute("SELECT * FROM products_mainTest")
    fetchProducts = mycursor.fetchall()
    products = []
    convertProducts = {}
    for jsonProducts in fetchProducts:
        convertProducts = {'name' : jsonProducts[0], 'description' : jsonProducts[1], 'price' : jsonProducts[2], 'stock' : jsonProducts[3], 'discount' : jsonProducts[4], 'image' : jsonProducts[5], 'productID' : jsonProducts[6]}
        products.append(convertProducts)
        convertProducts = {}
    logging.info(products)
    respone = make_response(jsonify(products))
    logging.info(products)
    return respone



@app.route('/cartProducts', methods = ['GET'])
def getProducts():
    if flask.request.method == 'GET':
        logging.info("Requested productitems")
        mycursor = db.cursor()
        mycursor.execute("SELECT * FROM products_mainTest")
        fetchProducts = mycursor.fetchall()
        products = []
        convertProducts = {}
        for jsonProducts in fetchProducts:
            convertProducts = {'name' : jsonProducts[0], 'description' : jsonProducts[1], 'price' : jsonProducts[2], 'stock' : jsonProducts[3], 'discount' : jsonProducts[4], 'image' : jsonProducts[5], 'productID' : jsonProducts[6]}
            products.append(convertProducts)
            convertProducts = {}
        logging.info(products)
        respone = make_response(jsonify(products))
        logging.info(products)
        return respone



@app.route('/cartProductss/create-order', methods = ['POST'])
def postOrder():
    if flask.request.method == 'POST':
        req = request.get_json()
        logging.info(req)
        return req

@app.route('/customer')
def customer():
    return render_template('customerservice.html')
    

@app.route('/customer/create-schema', methods=["POST"])
def postSchema():
    # #get JSON object
    req = request.get_json()

    #no needed, just for debugging
    logging.info("fetch in progress")
    logging.info(req)

    #values
    inpName = req['innNavn']
    inpEmail = req['innEmail']
    inpMessage = req['innMessage']
    
    #no needed, just for debugging
    logging.info(inpName)
    logging.info(inpEmail)
    logging.info(inpMessage)

    #insert a new user
    mycursor.execute("INSERT INTO kontaktskjema_test (name,email,message) VALUES(%s,%s,%s)",(inpName,inpEmail,inpMessage))
    
    #no needed, just for debugging
    db.commit()

    # msg = {"Message ": "User created succsessfully"}, 201
    res = make_response(jsonify(req)), 200
    return jsonify(res)


@app.route('/checkout')
def checkout():
    return render_template('checkout.html')
    #return ("hello world")

@app.route('/shoppingCart')
def shoppingcart():
    return render_template('shoppingCart.html')
    #return ("hello world")


@app.route('/login')
def login():
    return render_template('loggInn.html')


if __name__ == '__main__':
    app.run(debug=True, host="0.0.0.0") 