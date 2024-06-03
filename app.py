from flask import Flask, jsonify
import pandas as pd

app = Flask(__name__)

# Load the cleaned data
data = pd.read_csv('Resources/clean_data.csv')

# Convert DataFrame to JSON
data_json = data.to_dict(orient='records')

@app.route('/api/data', methods=['GET'])
def get_data():
    return jsonify(data_json)

if __name__ == '__main__':
    app.run(debug=True)