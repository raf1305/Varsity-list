from bs4 import BeautifulSoup as soup
from urllib.request import urlopen as uReq
import sys
import re
import pandas as pd
my_url="https://en.wikipedia.org/wiki/List_of_districts_of_Bangladesh"
uClient = uReq(my_url)
page_html=uClient.read()
uClient.close()
page_soup = soup(page_html,"html5lib")

#dates=page_soup.find("div",class_="mw-parser-output")

dates=page_soup.find("table",{'class',"wikitable sortable"})
#print(dates)
dist=dates.find_all('a')
districts=[]
for i in dist:
    districts.append(str(i.get('title')).replace(' District',''))
print(districts)
df=pd.DataFrame()
df['districts']=districts
df.to_csv('districts.csv')