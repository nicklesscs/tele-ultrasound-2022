import time
import board
import adafruit_vcnl4040
import RPi.GPIO as GPIO

import numpy as np

from AngleMeterAlpha import AngleMeterAlpha

angleMeter = AngleMeterAlpha()
angleMeter.measure()

i2c = board.I2C()
encoder = adafruit_vcnl4040.VCNL4040(i2c)
raw_prox = []

i = 0

for i in range(1,100):
    #print(angleMeter.get_kalman_roll(),",", angleMeter.get_complementary_roll(), ",",angleMeter.get_kalman_pitch(),",", angleMeter.get_complementary_pitch(),".")
    #print(angleMeter.get_int_roll(), angleMeter.get_int_pitch())
    #print(angleMeter.getRoll(), angleMeter.getPitch())
    
    raw_prox.append(encoder.proximity)
    #("Proximity:", raw_prox)    
    #time.sleep(0.1)
    

#print("Proximity:",raw_prox)
print("Proximity:", np.mean(raw_prox))

