from flask import Flask, jsonify
import pandas as pd

app = Flask(__name__)

""" # Load the cleaned data with error handling
try:
    data = pd.read_csv('Resources/clean_data.csv')
    data_json = data.to_dict(orient='records')
except Exception as e:
    data_json = {"error": str(e)}

@app.route('/', methods=['GET'])
def home():
    return "Welcome to the Storm Data API!"

@app.route('/api/data', methods=['GET'])
def get_data():
    return jsonify(data_json)

if __name__ == '__main__':
    app.run(debug=True)
 """