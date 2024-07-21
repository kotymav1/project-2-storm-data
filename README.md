# project-3-storm-data
## Overview
This project aims to tell the story of the NCDC Storm Events data for the entire 2023 year with a dashboard of interactive visualizations built with Leaflet.js and Plotly.<br/>
The original dataset included 75,060 records of storm data in the U.S. After filtering out records of less than $5000 in damage, there were 6,325 records. The remaining
storm events were tornadoes, thunderstorms, floods, hail and lightning. While the goal was for the user to be able to explore the data freely to uncover their own insights, 
the three main questions we aimed to answer are: <br/>
![HailDamage](https://github.com/user-attachments/assets/4d4f13b2-c3b8-4f0d-85a9-a448c261dc4b) <br/>

1. Which storm events occur most often?
2. Which states have the most damage?
3. What storm type causes th most damage?

## Results
1. Which storm events occur most often?
  * Thunderstorm Wind: 3,897 <br/>
  ![Screenshot 2024-07-21 130422](https://github.com/user-attachments/assets/27f71fb4-29d8-4d1f-9c11-3161100844ec) <br/>
  * Flood: 1,072 <br/>
  ![Screenshot 2024-07-21 130330](https://github.com/user-attachments/assets/d27ced99-e991-42e1-9a10-ed398ea1d8a5) <br/>
  * Hail: 669 <br/>
  ![Screenshot 2024-07-21 130307](https://github.com/user-attachments/assets/087be1b5-3c1d-4e58-bf00-f13e44c1b7cd) <br/>
  * Tornado: 536 <br/>
  ![Screenshot 2024-07-21 130407](https://github.com/user-attachments/assets/ea82f0b6-ce4c-415a-aefe-f1ec8e5b653d) <br/>
  * Lightning: 151 <br/>
  ![Screenshot 2024-07-21 130238](https://github.com/user-attachments/assets/56505c31-f0f4-4833-8a53-a98daf4b920a) <br/>

2. Which states have the most damage?
  * Texas (blue): $1,864,507,500
  * California (orange): $1,013,948,000
  * Illinois (green): $565,437,000
  ![StatesDamageAmount](https://github.com/user-attachments/assets/8c3c0713-bbe3-41d7-af58-e78ad7840800) <br/>

3. What storm type causes th most damage?
  * Hail: $1,979,904,000
  * Flood: $1,963,195,000
  * Tornado: $1,371,071,000
  ![Storm_Type_Damage](https://github.com/user-attachments/assets/eb07abaf-e6ae-4a27-82c6-dba1825f60c5) <br/>

#### Proposal<br/>
https://docs.google.com/document/d/1_Zlcbl28L-0dDCiK31wB3f2-jCWFeoyEUfSzGCX6jZU/edit?usp=sharing <br/>
#### Presentation<br/>
https://docs.google.com/presentation/d/13Jh3_HNbYNKF5pLHfqMqs7FiBzYZsISfN_2KnpDJZN0/edit?usp=sharing

## Steps to Replicate
### 1. Run Jupyter Notebook
Open & run all blocks in storm-data-cleaning.ipynb, this will take the raw data source from data.gov and output the clean_data.csv

### 2. Create the database & API
Open & run app.py, this will create the database and the local API on your machine that will be used for the data visualization. Open http://127.0.0.1:5000/data in your browser to test the API and confirm the JSON is loading.

### 3. Load the visualization
Open index.html in your browser, this will show the data visualization.

## Requirements/Libraries Used
- flask-cors
- flask_sqlalchemy
- pandas
- json
- os
- datetime
- plotly
- pathlib
- leaflet

## Resources Used
### 1. Data Source
https://catalog.data.gov/dataset/ncdc-storm-events-database2
### 2. Other Sources
https://stackoverflow.com/questions/25594893/how-to-enable-cors-in-flask
https://sqlite.org/lang_delete.html#:~:text=The%20DELETE%20command%20removes%20records,expression%20is%20true%20are%20deleted.
