# Import the Flask module that has been installed.
from flask import Flask
from flask import send_file
from flask import jsonify
from flask import request
from flask_pymongo import PyMongo
from flask_cors import CORS

# Creating a new "app" by using the Flask constructor. Passes __name__ as a parameter.
app = Flask(__name__)
CORS(app)

# Stringa di connessione al DB
app.config["MONGO_URI"] = "mongodb+srv://user_spiegazioni:2xR9laRHWUaSUDhi@cluster0.7ftto.mongodb.net/relab?retryWrites=true&w=majority" #Importante qui va specificato il nome del DB

# Per rispondere alle chiamate cross origin


# Annotation that allows the function to be hit at the specific URL.
@app.route("/")

# Generic Python functino that returns "Hello world!"
def index():
    return "Hello world!"

# Annotation that allows the function to be hit at the specific URL (/books).
@app.route("/books")
# Generic Python function that returns books.json
def books():
    return send_file('/workspace/ReLab/ReLab2/src/books.json')

# Questa route effettua una find() su tutto il DB (si limita ai primi 100 risultati)
@app.route('/addresses', methods=['GET'])
def get_all_addresses():
    mil4326WKT = mongo.db.Mil4326WKT
    output = []
    for s in mil4326WKT.find().limit(100):
        output.append(s['INDIRIZZO'])
    return jsonify({'result': output})

project = {
    '_id': 0,
    "INDIRIZZO": 1,
    "WGS84_X": 1,
    "WGS84_Y":1,
    "CLASSE_ENE":1,
    "EP_H_ND":1,
    "FOGLIO":1,
    "CI_VETTORE":1
}

@app.route('/ci_vettore/<foglio>', methods=['GET'])
def get_vettore(foglio):
    mil4326WKT = mongo.db.Mil4326WKT
    query = {
        "FOGLIO" : foglio
    }

    return jsonify(list(mil4326WKT.find(query, project)))#Nota che abbiamo eliminato la chiave result perchè i dati sono già formattati

@app.route('/ci_vettore/sezione/<sezione>', methods=['GET'])
def get_vettoreeie(sezione):
    mil4326WKT = mongo.db.Mil4326WKT
    query = {
        "SEZ" : sezione
    }

    return jsonify(list(mil4326WKT.find(query, project)))

mongo = PyMongo(app)



# Checks to see if the name of the package is the run as the main package.
if __name__ == "__main__":
    # Runs the Flask application only if the main.py file is being run.
    app.run()
    
