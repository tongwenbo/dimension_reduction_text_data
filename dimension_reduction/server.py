from flask import Flask, Response, jsonify
import pandas as pd
import sqlite3

app = Flask(__name__)
app.config["DEBUG"] = True

@app.route("/api/v1/pca_data", methods=["GET"])
def pca_data():
    connection = sqlite3.connect("./data.db")
    df = pd.read_sql('''
            SELECT * FROM pca
        ''', con=connection)
    connection.close()
    return Response(
        response=df.to_json(orient="records"),
        headers={"Access-Control-Allow-Origin": "*"}
    )

@app.route("/api/v1/tsne_data", methods=["GET"])
def tsne_data():
    connection = sqlite3.connect("./data.db")
    df = pd.read_sql('''
            SELECT * FROM tsne
        ''', con=connection)
    connection.close()
    return Response(
        response=df.to_json(orient="records"),
        headers={"Access-Control-Allow-Origin": "*"}
    )

@app.route("/api/v1/pca_names", methods=["GET"])
def pca_names():
    connection = sqlite3.connect("./data.db")
    df = pd.read_sql('''
            SELECT * FROM pca_names
        ''', con=connection)
    connection.close()
    return Response(
        response=df.to_json(orient="records"),
        headers={"Access-Control-Allow-Origin": "*"}
    )

@app.route("/api/v1/tsne_names", methods=["GET"])
def tsne_names():
    connection = sqlite3.connect("./data.db")
    df = pd.read_sql('''
            SELECT * FROM tsne_names
        ''', con=connection)
    connection.close()
    return Response(
        response=df.to_json(orient="records"),
        headers={"Access-Control-Allow-Origin": "*"}
    )

app.run(port=8080)
