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

# Define API endpoints 

def serialize_data(data):
    serialized = []
    for row in data:
        serialized_row = []
        for item in row:
            if isinstance(item, (date, datetime, time)):
                serialized_row.append(item.isoformat())
            else:
                serialized_row.append(item)
        serialized.append(serialized_row)
    return serialized

@app.route('/data', methods=['GET'])
def get_data():
    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute('SELECT * FROM storm_data')  # Replace with your table name
    rows = cursor.fetchall()
    cursor.close()
    conn.close()

    serialized_rows = serialize_data(rows)
    return jsonify(serialized_rows)

if __name__ == '__main__':
    app.run(debug=True)