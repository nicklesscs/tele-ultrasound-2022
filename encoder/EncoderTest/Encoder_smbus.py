import board
import vcnl4040_TestInit
from smbus2 import SMBus, i2c_msg

import time
import math
import threading

bus = SMBus(3)

sensor = vcnl4040_TestInit.VCNL4040(bus)



'''
sensor = adafruit_vcnl4040.VCNL4040(bus)
while True:
    raw_prox = sensor.proximity
    #cal_prox = raw_prox
    
    print("Proximity:", raw_prox)
    time.sleep(0.1)
'''