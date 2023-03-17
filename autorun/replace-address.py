# -*- coding: utf-8 -*-
"""
Created on Thu Sep 16 08:06:00 2021

@author: micha
"""
import codecs
import time
from bs4 import BeautifulSoup
 
time.sleep(5)
 
ws_location = 148

# Using readline() on outputed address
file1 = open('address.txt', 'r')
line = file1.readline().rstrip()
# print(line)
file1.close()

# Open previous HTML file
html_file = codecs.open('/home/pi/Desktop/tele-ultrasound-2022-main/server/index.html','r','utf-8')
soup = BeautifulSoup(html_file, 'html.parser')
strhtm = soup.prettify()
html_lines = strhtm.splitlines()
address_html = html_lines[ws_location]
# print(address_html)
html_file.close()

# Current and past adresses
a = line.find('://')
current_address = line[a:]
# print(current_address)
b = address_html.find('://')
past_address = address_html[b:len(address_html)-3]
# print(past_address)

# Get parts of new line to put in ws_location
first_part =  address_html[0:b]
# print(first_part)
second_part = current_address
len_third_start = len(past_address) + len(first_part)
len_third_end = len(address_html)
# print(len_third_start)
# print(len_third_end)
third_part = address_html[len_third_start:len_third_end]
# print(third_part)

# Update ws address
updated_line = first_part + second_part + third_part
# print(address_html)
# print(updated_line)
html_lines[ws_location] = updated_line
print(html_lines[ws_location])

# Write updated file
html_file_2 = codecs.open('/home/pi/Desktop/tele-ultrasound-2022-main/server/index.html','w','utf-8')
for element in html_lines:
    html_file_2.write(element + "\n")
html_file_2.close()
