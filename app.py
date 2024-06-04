from flask import Flask, jsonify
from datetime import date, datetime, time
from sqlalchemy import create_engine, text
from sqlalchemy.orm import sessionmaker
import os

# Define your database URL
DATABASE_URL = "postgresql+psycopg2://postgres:LL]Ov>54?3(\\@localhost/storm_data_db"

# Connecting to PostgreSQL database
app = Flask(__name__)

# Create an engine and a session
engine = create_engine(DATABASE_URL)
Session = sessionmaker(bind=engine)

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
    session = Session()
    result = session.execute(text('SELECT * FROM storm_data')).fetchall()
    session.close()

    serialized_rows = serialize_data(result)
    return jsonify(serialized_rows)

if __name__ == '__main__':
    app.run(debug=True)

# run app.py in terminal
# navigate to http://127.0.0.1:5000/data
