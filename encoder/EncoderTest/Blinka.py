import time
import board
import adafruit_vcnl4040

from mpu6050 import mpu6050


i2c = board.I2C()
sensor = adafruit_vcnl4040.VCNL4040(i2c)

#White Light Values and prox
#sensor2 = mpu6050(0x68)

#accelerometer_data = sensor2.get_accel_data()
"""Gets and returns the X, Y and Z values from the accelerometer.
If g is True, it will return the data in g
If g is False, it will return the data in m/s^2
Returns a dictionary with the measurement results.
"""
#gyro_data = sensor2.get_gyro_data()
"""Reads the range the gyroscope is set to.
If raw is True, it will return the raw value from the GYRO_CONFIG
register.
If raw is False, it will return 250, 500, 1000, 2000 or -1. If the
returned value is equal to -1 something went wrong.
"""

#print("Accelerometer:", accelerometer_data)

#print("Gyroscope:",gyro_data)

'''
for i in range(1,1000):
    gyro_data[i] = sensor2.get_gyro_data()
    
print("Gyroscope:",gyro_data)
'''

'''
while True:
    #print("Proximity:", sensor.proximity)
    #print(accelerometer_data)
    gyro_data = sensor2.get_gyro_data()
    print("Gyroscope:",gyro_data)
    #print("Light:", sensor.light)
    #print("White:", sensor.white)
    time.sleep(0.5)
'''


'''
Proximity data.

    This example prints the proximity data. Move your hand towards the sensor to see the values
    change.
'''

while True:
    raw_prox = sensor.proximity
    #cal_prox = raw_prox
    
    print("Proximity:", raw_prox)
    time.sleep(0.1)


