import numpy as np
import scipy.stats as stats
import pandas as pd
import matplotlib.pyplot as plt


###Dataset 1###
raw_proximity1 = [104, 83, 72, 71, 63, 59.22, 54.909, 48.83, 
45.66 ,41.07, 40.08, 36.17, 33.65,30.9, 29.596, 27.77, 24.71, 24.182,
22.35, 20.77, 19.55, 18.51, 18.061, 17.77, 16.27, 15.576, 15.51333333,
14.669, 13.97366667, 13.84233333, 13.04766667, 12.7, 11.739, 11.03166667, 
10.63533333, 10.536, 9.818, 9.388833333, 8.6231, 8.605333333, 7.827133333, 
7.4997, 6.6004, 6.6744, 6.516]

measured_mm1 = [0, 4.36, 5.3, 6.37, 7.82, 8.55, 9.63, 11.38, 12.26, 13.76, 14.31, 15.67, 16.67,
17.77, 18.54, 19.38, 20.97, 21.99, 23.12, 24.53, 25.9, 26.82, 27.63, 28.03,
29.76, 30.83, 30.74, 31.73, 32.81, 33.44, 34.5, 35.53, 36.7,37.93, 38.93,39.96,
41, 42.7, 44.4,45.53,46.85, 49.47, 51.43, 52.74, 53.23]

model1 = np.poly1d(np.polyfit(raw_proximity1, measured_mm1, 5))
print("Encoder Polynomial Model = ")
print("X Model 1",model1)
print("========================")

"""#add fitted polynomial line to scatterplot
polyline = np.linspace(0, 110)       #polyline = np.linspace(1, 60, 50)
plt.scatter(raw_proximity1, measured_mm1)
plt.plot(polyline, model1(polyline))
plt.xlim([0,110])
plt.ylim([0,60])
plt.title("X Encoder Model 1: Measured mm vs Proximity Value")
plt.ylabel("Measured mm")
plt.xlabel("Raw Proximity Value")

plt.show()

y1 = np.polyval(model1,55)
print("measured mm =", y1)"""

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
print("X Model 2",model2)
print("========================")
#add fitted polynomial line to scatterplot
"""polyline = np.linspace(0, 110)       #polyline = np.linspace(1, 60, 50)
plt.scatter(raw_proximity2, measured_mm2)
plt.plot(polyline, model2(polyline))
plt.xlim([0,110])
plt.ylim([0,60])
plt.title("X Encoder Model 2: Measured mm vs Proximity Value")
plt.ylabel("Measured mm")
plt.xlabel("Raw Proximity Value")

plt.show()"""

"""y2 = np.polyval(model2,55)
print("measured mm =", y2)"""

##Concatecating the arrays together for one large x-model
x_prox_master = np.concatenate((raw_proximity1,raw_proximity2))
x_mm_master = np.concatenate((measured_mm1,measured_mm2))
x_mm_master = -np.sort(-x_mm_master)
x_prox_master = np.sort(x_prox_master)

x_master_model = np.poly1d(np.polyfit(x_prox_master, x_mm_master, 5))
print("x Master Model:", x_master_model)
print("========================")
"""polyline = np.linspace(0, 110)       #polyline = np.linspace(1, 60, 50)
plt.scatter(x_prox_master, x_mm_master)
plt.plot(polyline, x_master_model(polyline))
plt.xlim([0,110])
plt.ylim([0,60])
plt.title("X Encoder Master Model: Measured mm vs Proximity Value")
plt.ylabel("Measured mm")
plt.xlabel("Raw Proximity Value")

plt.show()"""

###Finding Standard Deviation of the x encoder tests



####Start of y encoder Tests Data###
encodery_mm = [52.66,51.84,51.02,50.2,49.52,48.95,48.07,47.76,47.06,46.5,45.75,45.07,
               45.03,44.34,43.8,42.82,41.88,41.14,40.4,39.34,38.7,37.89,36.93,36.05,35.3,34.59,
               33.81,32.65,31.97,31.46,30.77,30.68,30.11,29.32,29.25,28.58,28.55,27.77,27.06,26.55,
               25.99,25.53,25.46,25.03,24.56,24.17,23.65,23.01,22.78,22.24,21.71,21.02,20.69,20.24,
               19.7,19.1,18.5,17.74,17.11,16.6,16.07,15.7,15.18,14.97,14.63,14.05,13.73,13.37,13.06,
               12.72,12.25,11.97,11.2,10.7,10.44,10.1,9.66,9.18,8.6,8.41,7.92,7.21,6.9,6.55,6.04,5.61,5.25,4.88,4.13, 4,3.7,2.89,0]
encodery_prox = [6.0268,6.02354,6.4827,6.449,6.5117,6.557,6.8947,7.0396,7.2858,7.4749,7.5545,7.5449,
                 7.5229,7.7131,7.8505,8.3435,8.7075,8.9843,9.5279,9.66057,9.8723,10.5238,10.5516,10.91316,11.53067,11.67336,
                 12.412,12.531,13.1328,13.5927,13.5559,13.6212,14.1649,14.54417,14.5768,15.1503,15.288,
                 15.4589,16.2665,16.533,17.2102,17.5209,17.53946,18.335,18.50966,18.9132,19.5692,20.258,20.4839,
                 20.8025,21.4757,22.3978,22.5959,23.35542,23.7971,24.79067,26.00407,26.85572,27.9011,28.8438,
                 29.5031,30.5535,31.5064,31.529,32.5475,34.4693,34.62,35.5946,36.453,36.611,38.3319,39.1612,40.9745,
                 43.0303,43.48532,43.969,45.567,47.639,50.498,51.6894,52.5249,55.39838,56.9261,59.1437,61.0177,
                 63.301,66.5994,67.6042,75.541,75.93208,79.570639,82.439,93.215]


ymodel = np.poly1d(np.polyfit(encodery_prox, encodery_mm, 5))
print("Encoder Polynomial Model = ")
print("Y Model",ymodel)
print("========================")

"""
polyline = np.linspace(0, 110)       #polyline = np.linspace(1, 60, 50)
plt.scatter(encodery_prox, encodery_mm)
plt.plot(polyline, ymodel(polyline))
plt.xlim([0,110])
plt.ylim([0,60])
plt.title("Y Encoder: Measured mm vs Proximity Value")
plt.ylabel("Measured mm")
plt.xlabel("Raw Proximity Value")

plt.show()"""

##Standard Deviation of y



def encoderDist(xx,yy):
    x_dist_master = (-8.945 * (10**-8)) * (xx**5) + (2.741 * (10**-5) * (xx**4)) - (0.003206 * (xx**3)) + (0.1809 * (xx**2)) - (5.264 * (xx)) + 79.69
    x_dist_1 = (-1.103 * (10**-7)) * (xx**5) + (3.267 * (10**-5) * (xx**4)) - (0.003674* (xx**3)) + (0.1984 * (xx**2)) - (5.503 * (xx)) + 80.13
    y_dist = (-1.484 * (10**-7) *(yy**5)) + (4.025* (10**-5) *(yy**4)) - (0.004191 * (yy**3)) + (0.2127 * (yy**2)) - (5.648 * (yy)) + 78.02
    return x_dist_master, x_dist_1, y_dist
  
