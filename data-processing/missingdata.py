#fill in days of missing data starting from november 16 
import requests
from pymongo import MongoClient
import config
#make api call for day
url = "https://covid-193.p.rapidapi.com/history"
headers = {
    'x-rapidapi-key': config.API_KEY,
    'x-rapidapi-host': "covid-193.p.rapidapi.com"
    }


for i in range(15,26):
    date = "2020-11-"+str(i)
    querystring = {"country":"UK","day":date}

    response = requests.request("GET", url, headers=headers, params=querystring)
    data = response.json()

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

    

    #connect to database 
    
    client = MongoClient(config.MONGO_URI)
    db = client[config.MONGO_DB]

    US_col = db["UK"]

    #add to database
    oldData = US_col.find_one({"Category":"new_cases"}, {"data":1})["data"]
    newDate = "2020-11-"+str(i-1)
    oldData[newDate] = newCases

    print(newDate, newCases, newDeaths)

    query = {"Category":"new_cases"}
    newValues = {"$set":{"data":oldData}}

    US_col.update_one(query, newValues)


#repeat until current day