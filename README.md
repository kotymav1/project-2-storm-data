# project-3-storm-data
## Overview
This project aims to tell the story of the NCDC Storm Events data for the whole 2023 year with a dashboard of interactive visualizations.<br/>
The goal is for the user to be able to interact with the dashboard in order to uncover their own insights within the data.
#### Proposal<br/>
https://docs.google.com/document/d/1_Zlcbl28L-0dDCiK31wB3f2-jCWFeoyEUfSzGCX6jZU/edit?usp=sharing <br/>
#### Presentation<br/>
https://docs.google.com/presentation/d/13Jh3_HNbYNKF5pLHfqMqs7FiBzYZsISfN_2KnpDJZN0/edit?usp=sharing

## Steps to Replicate
### 1. Run Jupyter Notebook
Open & run all blocks in storm-data-cleaning.ipynb, this will take the raw data source from data.gov and output the clean_data.csv

### 2. Create the database & API
Open & run app.py, this will create the database and the local API on your machine that will be used for the data visualization. Open http://127.0.0.1:5000/data in your browser to test the API and confirm the JSON is loading.

Note: be sure to run **pip install flask-cors** in your terminal to enable CORS for the Flask app, otherwise the API will not work.

### 3. Load the visualization
Open index.html in your browser, this will show the data visualization.

## Resources Used
### 1. Data Source
https://catalog.data.gov/dataset/ncdc-storm-events-database2
### 2. Other Sources
https://stackoverflow.com/questions/25594893/how-to-enable-cors-in-flask
https://sqlite.org/lang_delete.html#:~:text=The%20DELETE%20command%20removes%20records,expression%20is%20true%20are%20deleted.
