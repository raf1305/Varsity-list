from bs4 import BeautifulSoup as soup
from urllib.request import urlopen as uReq
import sys
import re
import pandas as pd

def var_link(d2):
    sec=d2.find('a').get('href')
    sec_url="https://en.m.wikipedia.org"+str(sec)
    uClient2 = uReq(sec_url)
    page_html2=uClient2.read()
    uClient2.close()
    page_soup2 = soup(page_html2,"html5lib")
    link=page_soup2.find("table",{'class',"infobox vcard"})
    link2=link.find("span",{'class',"url"})
    final_link=link2.find('a').get('href')
    print(final_link)
def var_link2(d2):
    sec=d2.find('a').get('href')
    sec_url="https://en.m.wikipedia.org"+str(sec)
    uClient2 = uReq(sec_url)
    page_html2=uClient2.read()
    uClient2.close()
    page_soup2 = soup(page_html2,"html5lib")
    link=page_soup2.find("table",{'class',"infobox vcard"})
    link2=link.find("a",{'class',"external text"})
    final_link=link2.get('href')
    print(final_link)
def test(d2):
    try:
        sec=d2.find('a').get('href')
    except:
        return "link does not exist"
    sec_url="https://en.m.wikipedia.org"+str(sec)
    uClient2 = uReq(sec_url)
    page_html2=uClient2.read()
    uClient2.close()
    page_soup2 = soup(page_html2,"html5lib")
    try:
        link=page_soup2.find("table",{'class',"infobox vcard"})
        text=link.find("th",string="Website")
    except:
        return sec_url
    text2=text.find_next_sibling()
    #print(text2.a.get('href'))
    return text2.a.get('href')

my_url="https://en.m.wikipedia.org/wiki/List_of_universities_in_Bangladesh"
uClient = uReq(my_url)
page_html=uClient.read()
uClient.close()
page_soup = soup(page_html,"html5lib")

#dates=page_soup.find("div",class_="mw-parser-output")

dates=page_soup.find_all("table",{'class',"wikitable sortable"})
#print(dates.prettify())

num_table=0
for j in dates:
    num_table=num_table+1
    d1=j.find_all("tr")
    for k in d1:
        d2=k.find_all("td")
        fn=''
        print(d2)
        for i in d2:
            try:
                final_link=test(i)
                fn=fn+str(final_link)+','
                print(final_link)
            except:    
                pass
            break
        k=0
        for i in d2:
            print(i)
            k=k+1
            if(k==4 and ("Division" not in str(i.text))):
                    fn=fn+','        
            fn=fn+str(i.text)+','
            print(i.text)
            

        if(num_table<=6):
            fn=fn+'Public'
        else:
            fn=fn+'Private'
        
        f=open("main_table.csv","a+")
        f.write(fn+'\n')
        f.close()
        break
    break
            
        
# dist=dates.find_all('a')
# districts=[]
# for i in dist:
#     districts.append(str(i.get('title')).replace(' District',''))
# print(districts)
#Link,University Name,Nickname,Founded,Location,Division,Specialization,Ph.d Granting,TypePublic


