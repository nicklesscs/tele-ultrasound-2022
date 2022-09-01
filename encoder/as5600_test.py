#!/usr/bin/env python

from smbus import SMBus
import time

class AS5600():

    def __init__(self,bus):
        self.i2cbus = SMBus(bus)
        self.startAngle = 0
        self.currentAngle = 0
        self.sensor = 0x36
    
    def readRawAngle(self):
        lowbyte = self.i2cbus.read_byte_data(self.sensor,0x0D)
        highbyte = self.i2cbus.read_byte_data(self.sensor,0x0C)
        highbyte = highbyte << 8
        rawAngle = highbyte | lowbyte
        degAngle = float(rawAngle * 360/4096)
        return degAngle

    def correctAngle(self,degAngle,currentAngle,startAngle):
        correctAngle = degAngle + currentAngle - startAngle    
        return correctAngle

    def magnetIsPresent(self):
        #self.i2cbus.write_byte(self.sensor,0x0B)
        #magnetStatus = self.i2cbus.read_byte(self.sensor)
        #return (magnetStatus)
        lowbyte = self.i2cbus.read_byte_data(self.sensor,0x1C)
        highbyte = self.i2cbus.read_byte_data(self.sensor,0x1B)
        highbyte = highbyte << 8
        val = highbyte | lowbyte
        return val > 10

def main():
    s1 = AS5600(3)
    s2 = AS5600(4)
    while(True):
        magnetStatus1 = s1.magnetIsPresent()
        magnetStatus2 = s2.magnetIsPresent()
        value1 = "Magnet 1 not detected"
        value2 = "Magnet 2 not detected"
        if magnetStatus1:
            value1 = "Encoder 1 " + str(s1.readRawAngle())
        if magnetStatus2:
            value2 = "Encoder 2 " + str(s2.readRawAngle())
        valueList = [value1,value2]
        print(valueList)
        time.sleep(1)

if __name__ == "__main__":
    main()