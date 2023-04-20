import time
import board
import adafruit_vcnl4040
import RPi.GPIO as GPIO
import adafruit_mpu6050_Test
import numpy as np
import board
import adafruit_tca9548a
import json

import threading
import logging

import websocket as wss


def sensorInit():   
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
    encoderx = adafruit_vcnl4040.VCNL4040(tca[2])
    encodery = adafruit_vcnl4040.VCNL4040(tca[1])
    gyroscope = adafruit_mpu6050_Test.MPU6050(tca[7])
    return encoderx,encodery,gyroscope


def encoderDist(xx,yy):
    x_dist_master = (-8.945 * (10**-8)) * (xx**5) + (2.741 * (10**-5) * (xx**4)) - (0.003206 * (xx**3)) + (0.1809 * (xx**2)) - (5.264 * (xx)) + 79.69
    #x_dist_1 = (-1.103 * (10**-7)) * (xx**5) + (3.267 * (10**-5) * (xx**4)) - (0.003674* (xx**3)) + (0.1984 * (xx**2)) - (5.503 * (xx)) + 80.13
    y_dist = (-1.484 * (10**-7) *(yy**5)) + (4.025* (10**-5) *(yy**4)) - (0.004191 * (yy**3)) + (0.2127 * (yy**2)) - (5.648 * (yy)) + 78.02
    return x_dist_master, y_dist


def dataCollect():
    encoderx,encodery,gyroscope = sensorInit();
    gyroscope.measure()
    #ws = wss.create_connection("ws://130.215.8.138:8080")

    while True:
        #print("X Proximity:", encoderx.proximity)
        #print("Y Proximity:", encodery.proximity)
        #print("Acceleration: X:%.2f, Y: %.2f, Z: %.2f m/s^2" % (gyroscope.acceleration))
        #print("Gyro X:%.2f, Y: %.2f, Z: %.2f rad/s" % (gyroscope.gyro))
        #print("Temperature: %.2f C" % gyroscope.temperature)
        #print("")
        #gyroscope.measure()
        #print(gyroscope.getRoll(), gyroscope.getPitch())

        x_prox,y_prox = encoderDist(encoderx.proximity,encodery.proximity)

        proxData = {"x":x_prox,"y":y_prox}
        gyroData = {"Roll":gyroscope.getRoll(),"Pitch":gyroscope.getPitch()}

        data_string = [proxData, gyroData]
        data_string = json.dumps(data_string)
        print(data_string)
        #ws.send(data_string)
        time.sleep(0.1)

def thread_start():
    collectThread = threading.Thread(target = dataCollect())
    collectThread.start()
    collectThread.join

thread_start();


