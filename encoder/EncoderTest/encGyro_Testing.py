import time
import board
import adafruit_vcnl4040
import RPi.GPIO as GPIO
import adafruit_mpu6050_Test
import numpy as np
import board
import adafruit_tca9548a
'''
# Create I2C bus as normal
i2c = board.I2C()  # uses board.SCL and board.SDA
# Create the TCA9548A object and give it the I2C bus
tca = adafruit_tca9548a.TCA9548A(i2c)
"""for channel in range(8):
    if tca[channel].try_lock():
        print("Channel {}:".format(channel), end="")
        addresses = tca[channel].scan()
        print([hex(address) for address in addresses if address != 0x70])
        tca[channel].unlock()"""

encoderx = adafruit_vcnl4040.VCNL4040(tca[3])
encodery = adafruit_vcnl4040.VCNL4040(tca[2])
gyroscope = adafruit_mpu6050_Test.MPU6050(tca[1])'''


def sensorInit():   
    # Create I2C bus as normal
    i2c = board.I2C()  # uses board.SCL and board.SDA
    # Create the TCA9548A object and give it the I2C bus
    tca = adafruit_tca9548a.TCA9548A(i2c)
    '''for channel in range(8):
        if tca[channel].try_lock():
            print("Channel {}:".format(channel), end="")
            addresses = tca[channel].scan()
            print([hex(address) for address in addresses if address != 0x70])
            tca[channel].unlock()'''
    encoderx = adafruit_vcnl4040.VCNL4040(tca[3])
    encodery = adafruit_vcnl4040.VCNL4040(tca[2])
    gyroscope = adafruit_mpu6050_Test.MPU6050(tca[1])
    return encoderx,encodery,gyroscope



'''
while True:
    print("X Proximity:", encoderx.proximity)
    print("Y Proximity:", encodery.proximity)
    #print("Acceleration: X:%.2f, Y: %.2f, Z: %.2f m/s^2" % (gyroscope.acceleration))
    #print("Gyro X:%.2f, Y: %.2f, Z: %.2f rad/s" % (gyroscope.gyro))
    #print("Temperature: %.2f C" % gyroscope.temperature)
    #print("")
    #gyroscope.measure()
    print(gyroscope.getRoll(), gyroscope.getPitch())
    time.sleep(0.3)'''

'''
encoderx_arr = []
enc_x_loops = []
enc_x_loop_stdev = []

encodery_arr = []
enc_y_loops = []
enc_y_loop_stdev = []

for k in range(0,6):
    for i in range(0,1000):
        encoderx_arr.append(encoderx.proximity)
        encodery_arr.append(encodery.proximity)
        
    enc_x_loops.append(np.round(np.average(encoderx_arr),2))
    enc_x_loop_stdev.append(np.std(encoderx_arr))
    
    enc_y_loops.append(np.round(np.average(encodery_arr),2))
    enc_y_loop_stdev.append(np.std(encodery_arr))

print("x avg:",enc_x_loops)
print("x stDev:",enc_x_loop_stdev)
print()
print("y avg:",enc_y_loops)
print("y stDev:",enc_y_loop_stdev)
'''



