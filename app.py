from flask import Flask, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
import pandas as pd
import json
import os
from datetime import datetime

app = Flask(__name__)
CORS(app)  # Enables CORS so that index.html does not return a JavaScript error
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///storm_data_db.sqlite'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)

class StormData(db.Model):  # Creating the database
    __tablename__ = 'Storm_Data'
    id = db.Column(db.Integer, primary_key=True)
    YEAR = db.Column(db.Integer)
    MONTH_NAME = db.Column(db.String(9))
    BEGIN_DAY = db.Column(db.Integer)
    BEGIN_DATE_TIME = db.Column(db.TIMESTAMP, unique=True)
    TIME_OF_DAY = db.Column(db.Time)
    DAMAGE_PROPERTY = db.Column(db.Integer)
    EVENT_TYPE = db.Column(db.String)
    STATE = db.Column(db.String)
    TOR_F_SCALE = db.Column(db.String(3))
    BEGIN_LOCATION = db.Column(db.String)
    BEGIN_LAT = db.Column(db.Float)
    BEGIN_LON = db.Column(db.Float)
    EVENT_NARRATIVE = db.Column(db.String)

    def to_geojson(self):
        return {
            "type": "Feature",
            "geometry": {
                "type": "Point",
                "coordinates": [self.BEGIN_LON, self.BEGIN_LAT]
            },
            "properties": {
                "YEAR": self.YEAR,
                "MONTH_NAME": self.MONTH_NAME,
                "BEGIN_DAY": self.BEGIN_DAY,
                "BEGIN_DATE_TIME": self.BEGIN_DATE_TIME.isoformat() if self.BEGIN_DATE_TIME else None,
                "TIME_OF_DAY": str(self.TIME_OF_DAY) if self.TIME_OF_DAY else None,
                "DAMAGE_PROPERTY": self.DAMAGE_PROPERTY,
                "EVENT_TYPE": self.EVENT_TYPE,
                "STATE": self.STATE,
                "TOR_F_SCALE": self.TOR_F_SCALE,
                "BEGIN_LOCATION": self.BEGIN_LOCATION,
                "EVENT_NARRATIVE": self.EVENT_NARRATIVE
            }
        }

@app.route('/data')
def get_data():
    data = StormData.query.all()
    features = [storm.to_geojson() for storm in data]
    return jsonify({"type": "FeatureCollection", "features": features})

def clear_db():
    db.session.query(StormData).delete()
    db.session.commit()

def populate_db_from_csv():
    csv_file_path = 'Resources/clean_data.csv'
    if os.path.exists(csv_file_path):
        data = pd.read_csv(csv_file_path)
        for index, row in data.iterrows():
            begin_date_time = datetime.strptime(row['BEGIN_DATE_TIME'], '%Y-%m-%d %H:%M:%S')
            time_of_day = datetime.strptime(row['TIME_OF_DAY'], '%H:%M:%S').time()
            existing_record = StormData.query.filter_by(
                BEGIN_DATE_TIME=begin_date_time,
                EVENT_TYPE=row['EVENT_TYPE'],
                BEGIN_LOCATION=row['BEGIN_LOCATION']
            ).first()
            if not existing_record:
                storm_data = StormData(
                    YEAR=row['YEAR'],
                    MONTH_NAME=row['MONTH_NAME'],
                    BEGIN_DAY=row['BEGIN_DAY'],
                    BEGIN_DATE_TIME=begin_date_time,
                    TIME_OF_DAY=time_of_day,
                    DAMAGE_PROPERTY=row['DAMAGE_PROPERTY'],
                    EVENT_TYPE=row['EVENT_TYPE'],
                    STATE=row['STATE'],
                    TOR_F_SCALE=row['TOR_F_SCALE'],
                    BEGIN_LOCATION=row['BEGIN_LOCATION'],
                    BEGIN_LAT=row['BEGIN_LAT'],
                    BEGIN_LON=row['BEGIN_LON'],
                    EVENT_NARRATIVE=row['EVENT_NARRATIVE']
                )
                db.session.add(storm_data)
        db.session.commit()

if __name__ == '__main__':
    with app.app_context():
        db.create_all()
        clear_db()
        populate_db_from_csv()
    app.run(debug=True)

# Open http://127.0.0.1:5000/data in your browser to test the API and confirm the JSON is loading.