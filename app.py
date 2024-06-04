from flask import Flask, jsonify, request
import psycopg2
from datetime import date, datetime, time


# Connecting to PostgreSQL database

app = Flask(__name__)

def get_db_connection():
    conn = psycopg2.connect(
        host="localhost",
        database="storm_data_db",
        user="postgres",
        password="LL]Ov>54?3(\\"
    )
    return conn