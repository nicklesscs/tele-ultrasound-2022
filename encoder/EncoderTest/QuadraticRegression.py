import numpy as np
import scipy.stats as stats
import pandas as pd
import matplotlib.pyplot as plt

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

y = np.polyval(model,55)
print("measured mm =", y)