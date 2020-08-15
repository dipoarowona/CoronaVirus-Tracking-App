# grab data from api every 15 minutes
# grab - grand totals 
# grab - data per country 
# total in its own collection 
# replace totals every 15 minutes until day is over
# each day is a new entry include time in entry 
import requests 
import pymongo
from datetime import datetime as dt 
import pytz
from config import Database_URI

#grabing total covid info
def get_totals():
    url_total = "https://covid-19-data.p.rapidapi.com/totals"
    querystring = {"format":"json"}
    headers = {
        'x-rapidapi-host': "covid-19-data.p.rapidapi.com",
        'x-rapidapi-key': "491f353b91msh4d6e560099cab14p16dc45jsn2ebbe77bc738"
        }

    response = requests.request("GET", url_total, headers=headers, params=querystring)

    json_response = response.json()

    total_cases = json_response[0]["confirmed"]
    total_deaths = json_response[0]["deaths"]
    total_crital = json_response[0]["critical"]
    total_recovered = json_response[0]["recovered"]
    total_active = json_response[0]["confirmed"] - (total_recovered + total_deaths)

    return(total_deaths,total_recovered,total_crital,total_active,total_cases)

def get_timeStamp():
    est_tz = pytz.timezone("US/Eastern")
    return dt.now(est_tz)

#check to see if date in last database entry is today 
#else make a new entry 

client = pymongo.MongoClient(Database_URI)
db = client["Covid"]
total_col = db["total_data"]

last_item = total_col.find().sort("_id",-1).limit(1) #returns a list with only one value

if last_item[0]["date"] == get_timeStamp().strftime("%m/%d/%Y"):
    total_data = get_totals()
    date_query = {"date":get_timeStamp().strftime("%m/%d/%Y")}
    
    total_col.update_one(date_query, { "$set": {
        "timestamp":get_timeStamp().strftime("%m/%d/%Y - %H:%M:%S.%f"), 
        "date":get_timeStamp().strftime("%m/%d/%Y"),
        "total_cases":total_data[4],
        'recovered_cases':total_data[1],
        'deaths':total_data[0],
        'critical_cases':total_data[2],
        'active_cases':total_data[3]
    }})

    print("info updated")

    #update the total info 
else:
    total_data = get_totals()

    total_col.insert_one({
        "timestamp":get_timeStamp().strftime("%m/%d/%Y - %H:%M:%S.%f"), 
        "date":get_timeStamp().strftime("%m/%d/%Y"),
        "total_cases":total_data[4],
        'recovered_cases':total_data[1],
        'deaths':total_data[0],
        'critical_cases':total_data[2],
        'active_cases':total_data[3]
    })
    print("new entry made")
    #make new entry info
#country data