# SPDX-FileCopyrightText: 2021 Carter Nelson for Adafruit Industries
# SPDX-License-Identifier: MIT

# This example shows using TCA9548A to perform a simple scan for connected devices
import board
import adafruit_tca9548a
import adafruit_vcnl4040
import time
#import numpy as np
from AngleMeterAlpha_mux import AngleMeterAlpha
#import pandas as pd
# Create I2C bus as normal
i2c = board.I2C()  # uses board.SCL and board.SDA

# Create the TCA9548A object and give it the I2C bus
tca = adafruit_tca9548a.TCA9548A(i2c)
#angleMeter = AngleMeterAlpha()


'''
Defines the Multiplexor Channels for data transfer
'''
for channel in range(8):
    if tca[channel].try_lock():
        print("Channel {}:".format(channel), end="")
        addresses = tca[channel].scan()
        print([hex(address) for address in addresses if address != 0x70])
        tca[channel].unlock()


encoderx = adafruit_vcnl4040.VCNL4040(tca[0])
encodery = adafruit_vcnl4040.VCNL4040(tca[2])
'''
gyro_addr_tca = str(tca[1])
gyro_addr_str = gyro_addr_tca.split("at ",1)[1]
gyro_addr_str = gyro_addr_str.split(">",1)[0]
print("Gyro Address String:", gyro_addr_str)
print("Gyro Address Type:", type(gyro_addr_str))

gyro_addr_int = int(gyro_addr_str,16)
print("Gyro Address int:", gyro_addr_int)
'''


'''
gyro_addr_hex = hex(gyro_addr_int)
print("Gyro Address hex:", gyro_addr_hex)
print("Address Dtype:", type(gyro_addr_hex))
'''
#gyro_addr = hex(int(gyro_addr,16))
#gyro_addr1 = 0xb4bef990
#print(type(gyro_addr1))
#print(type(gyro_addr))
#print(gyro_addr)

'''
while True:
    
    x = encoderx.proximity
    x_dist = ((-1.103e-07)*(x^5) + (3.267e-05)*(x^4) - 0.003647*(x^3) + 0.1984*(x^2) - 5.503*x + 80.13)
    #y = encodery.proximity
    #y_dist = (-1.103e-07)*(y^5) + (3.267e-05)*(y^4) - 0.003647*(y^3) + 0.1984*(y^2) - 5.503*y + 80.13
    print("Proximity X:", x_dist, "mm")
    print()
    #print("Proximity Y:", y_dist, "mm")
    #print(angleMeter.getRoll(), angleMeter.getPitch())
    time.sleep(0.3)
'''

x = 60
x_dist = ((-1.103*(10^-7))*(x^5) + (3.267*(10^-5))*(x^4) - 0.003647*(x^3) + 0.1984*(x^2) - 5.503*x + 80.13)
print(x_dist)
