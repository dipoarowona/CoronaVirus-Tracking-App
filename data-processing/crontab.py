#PURPOSE OF THIS FILE IS TO UPDATE MONGO DB DATABASE DAILY, WITH NEW DATA
import requests
from pymongo import MongoClient
from datetime import datetime as dt, timedelta
import config

#make api call for day
url = "https://covid-193.p.rapidapi.com/history"
headers = {
    'x-rapidapi-key': config.API_KEY,
    'x-rapidapi-host': "covid-193.p.rapidapi.com"
    }

countries =["USA", "Canada", "UK"]

#yesterdays date
date = (dt.now()-timedelta(days=1)).strftime("%Y-%m-%d")

for country in countries:
    
    #GET DATA FROM API FOR EACH COUNTRY 
    querystring = {"country":country,"day":date}

    response = requests.request("GET", url, headers=headers, params=querystring)
    data = response.json()

    #COMPUTE NEW CASES AND NEW DEATHS
    cases = data["response"][0]["cases"]["total"]
    deaths = data["response"][0]["deaths"]["total"]
    try:
        newCases = int(data["response"][0]["cases"]["new"])
    except:
        newCases = 0
    try:
        newDeaths = int(data["response"][0]["deaths"]["new"])
    except:
        newDeaths = 0

    #PUT INTO CORRECT LOCATION IN DATABASE
    #connect to database 
    client = MongoClient(config.MONGO_URI)
    db = client[config.MONGO_DB]

    country_col = db[country]

    #add to database
    cases_oldData = country_col.find_one({"Category":"cases"}, {"data":1})["data"]
    deaths_oldData = country_col.find_one({"Category":"deaths"}, {"data":1})["data"]
    newCases_oldData = country_col.find_one({"Category":"new_cases"}, {"data":1})["data"]
    newDeaths_oldData = country_col.find_one({"Category":"new_deaths"}, {"data":1})["data"]


    cases_oldData[date] = cases
    deaths_oldData[date] = deaths
    newCases_oldData[date] = newCases
    newDeaths_oldData[date] = newDeaths

    print(date)
    print(country,":", cases, deaths, newCases, newDeaths)

    country_col.update_one({"Category":"cases"}, {"$set":{"data":cases_oldData}})
    country_col.update_one({"Category":"deaths"}, {"$set":{"data":deaths_oldData}})
    country_col.update_one({"Category":"new_cases"}, {"$set":{"data":newCases_oldData}})
    country_col.update_one({"Category":"new_deaths"}, {"$set":{"data":newDeaths_oldData}})



    


    


    