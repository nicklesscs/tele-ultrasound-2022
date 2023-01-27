import time
import board

from mpu6050 import mpu6050

import time
import board
import adafruit_vcnl4040

i2c = board.I2C()

sensor2 = mpu6050(0x68)

accelerometer_data = sensor2.get_accel_data()
"""Gets and returns the X, Y and Z values from the accelerometer.
If g is True, it will return the data in g
If g is False, it will return the data in m/s^2
Returns a dictionary with the measurement results.
"""
gyro_data = sensor2.get_gyro_data()
"""Reads the range the gyroscope is set to.
If raw is True, it will return the raw value from the GYRO_CONFIG
register.
If raw is False, it will return 250, 500, 1000, 2000 or -1. If the
returned value is equal to -1 something went wrong.
"""

'''
for i in range(1,1000):
    gyro_data[i] = sensor2.get_gyro_data()
print("Gyroscope:",gyro_data)
'''

while True:
    #print("Proximity:", sensor.proximity)
    #print(accelerometer_data)
    gyro_data = sensor2.get_all_data()
    '''Gets all gyroscope data
    '''
    print("Gyroscope Data:",gyro_data)
    #print("Light:", sensor.light)
    #print("White:", sensor.white)
    time.sleep(0.5)

