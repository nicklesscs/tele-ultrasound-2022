import numpy as np
import scipy.stats as stats
import pandas as pd
import matplotlib.pyplot as plt

###Dataset 1###
raw_proximity = [104, 83, 72, 71, 63, 59.22, 54.909, 48.83, 
45.66 ,41.07, 40.08, 36.17, 33.65,30.9, 29.596, 27.77, 24.71, 24.182,
22.35, 20.77, 19.55, 18.51, 18.061, 17.77, 16.27, 15.576, 15.51333333,
14.669, 13.97366667, 13.84233333, 13.04766667, 12.7, 11.739, 11.03166667, 
10.63533333, 10.536, 9.818, 9.388833333, 8.6231, 8.605333333, 7.827133333, 
7.4997, 6.6004, 6.6744, 6.516]

measured_mm = [0, 4.36, 5.3, 6.37, 7.82, 8.55, 9.63, 11.38, 12.26, 13.76, 14.31, 15.67, 16.67,
17.77, 18.54, 19.38, 20.97, 21.99, 23.12, 24.53, 25.9, 26.82, 27.63, 28.03,
29.76, 30.83, 30.74, 31.73, 32.81, 33.44, 34.5, 35.53, 36.7,37.93, 38.93,39.96,
41, 42.7, 44.4,45.53,46.85, 49.47, 51.43, 52.74, 53.23]



model = np.poly1d(np.polyfit(raw_proximity, measured_mm, 5))
print("Encoder Polynomial Model = ")
print(model)

#add fitted polynomial line to scatterplot
polyline = np.linspace(0, 110)       #polyline = np.linspace(1, 60, 50)
plt.scatter(raw_proximity, measured_mm)
plt.plot(polyline, model(polyline))
plt.xlim([0,110])
plt.ylim([0,60])
plt.title("X Encoder: mMeasured mm vs Proximity Value")
plt.ylabel("Measured mm")
plt.xlabel("Raw Proximity Value")

plt.show()

###Dataset2###
raw_proximity2 = [6.333333333,7,7.666666667,7.75,7.75,7.75,8.5,8.75,9,9,9.5,9.5,9.714285714,9.857142857,10.71428571,11.14285714
                  ,11.85714286,11.85714286,12.71428571,13.42857143,13.85714286,14.85714286,15.57142857,15.71428571,16.85714286,
                  17.71428571,18.42857143,19.85714286,20.42857143,21.85714286,23.14285714,23.71428571,25,26,26.71428571,28.85714286,
                  30.57142857,31.85714286,33,34.57142857,37.57142857,38.4,40.5,42.4,43.2,45.1,45.7,48,50.4,52.6,53.7,56.8,58.2,60.9,
                  62.7,64.9,66.6,69.6, 72.5, 74.4, 78.8, 81.8, 86.6, 90.4, 96.4,96.7,100.9,103.3,106.5]
measured_mm2 = [53.69,52.5,51.19,50.23,49.2,48.26,47.26,46.44,45.64,44.65,43.45,43.11,42.26,41.39,40.1,39.18,37.37,36.81,35.75,34.9,
                33.76,32.62,31.52,30.82,29.53,28.59,27.45,26.16,25.8,24.23,23.33,22.84,21.61,21.05,20.28,19.29,18.34,17.7,16.76,15.97,
                15.35,14.76,13.99,13.16,12.94,12.36,11.95,11.26,10.83,10.12,9.84,9.11,8.62,8.25,7.95,7.47,7.01,6.67,6.09,5.66,5,4.7,
                4.29,3.91,3.32,3.09,2.87,2.3,0]
model2 = np.poly1d(np.polyfit(raw_proximity1, measured_mm1, 5))
print("Encoder Polynomial Model = ")
print(model2)

#add fitted polynomial line to scatterplot
polyline = np.linspace(0, 110)       #polyline = np.linspace(1, 60, 50)
plt.scatter(raw_proximity2, measured_mm2)
plt.plot(polyline, model2(polyline))
plt.xlim([0,110])
plt.ylim([0,60])
plt.title("X Encoder: mMeasured mm vs Proximity Value")
plt.ylabel("Measured mm")
plt.xlabel("Raw Proximity Value")

plt.show()

"""y2 = np.polyval(model2,55)
print("measured mm =", y2)"""


y = np.polyval(model,55)
print("measured mm =", y)
