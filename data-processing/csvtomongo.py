#initial transfer of covid data from csv file to mongodb database
#now to be used for graphing on client side

from pymongo import MongoClient
import pandas as pd
import config


#load in data for each country
df = pd.read_csv("full_data.csv", index_col=0)

#get separate dataframe for each country
canada_df = df[df["location"]=="Canada"]
US_df = df[df["location"]=="United States"]
UK_df = df[df["location"]=="United Kingdom"]


#replace NaN with 0.0
canada_df = canada_df.fillna(0.0)
US_df = US_df.fillna(0.0)
UK_df = UK_df.fillna(0.0)

#separate each country df to categories
#convert dataframe into dict/json object
canada_cases = canada_df[["total_cases"]].to_dict()["total_cases"]
canada_deaths = canada_df[["total_deaths"]].to_dict()["total_deaths"]
canada_newcases = canada_df[["new_cases"]].to_dict()["new_cases"]
canada_newdeaths = canada_df[["new_deaths"]].to_dict()["new_deaths"]

US_cases = US_df[["total_cases"]].to_dict()["total_cases"]
US_deaths = US_df[["total_deaths"]].to_dict()["total_deaths"]
US_newcases = US_df[["new_cases"]].to_dict()["new_cases"]
US_newdeaths = US_df[["new_deaths"]].to_dict()["new_deaths"]

UK_cases = UK_df[["total_cases"]].to_dict()["total_cases"]
UK_deaths = UK_df[["total_deaths"]].to_dict()["total_deaths"]
UK_newcases = UK_df[["new_cases"]].to_dict()["new_cases"]
UK_newdeaths = UK_df[["new_deaths"]].to_dict()["new_deaths"]


#connect to database 
client = MongoClient(config.MONGO_URI)
db = client[config.MONGO_DB]
canada_col = db["Canada"]
UK_col = db["UK"]
US_col = db["USA"]

#insert it in into db

#CANADA 
canada_col.insert_one({
    "Category":"cases", 
    "data": canada_cases
})
canada_col.insert_one({
    "Category":"deaths", 
    "data": canada_deaths
})
canada_col.insert_one({
    "Category":"new_cases", 
    "data": canada_newcases
})
canada_col.insert_one({
    "Category":"new_deaths", 
    "data": canada_newdeaths
})
print("canada data inserted!")


#US 
US_col.insert_one({
    "Category":"cases", 
    "data": US_cases
})
US_col.insert_one({
    "Category":"deaths", 
    "data": US_deaths
})
US_col.insert_one({
    "Category":"new_cases", 
    "data": US_newcases
})
US_col.insert_one({
    "Category":"new_deaths", 
    "data": US_newdeaths
})
print("US data inserted!")

#US 
UK_col.insert_one({
    "Category":"cases", 
    "data": UK_cases
})
UK_col.insert_one({
    "Category":"deaths", 
    "data": UK_deaths
})
UK_col.insert_one({
    "Category":"new_cases", 
    "data": UK_newcases
})
UK_col.insert_one({
    "Category":"new_deaths", 
    "data": UK_newdeaths
})
print("UK data inserted!")