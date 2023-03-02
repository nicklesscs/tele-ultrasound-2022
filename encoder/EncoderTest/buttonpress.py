import RPi.GPIO as GPIO # Import Raspberry Pi GPIO library
import time
import threading
from encGyro_Testing import sensorInit

GPIO.setwarnings(False) # Ignore warning for now
GPIO.setmode(GPIO.BCM) # Use physical pin numbering
GPIO.setup(23, GPIO.IN, pull_up_down=GPIO.PUD_DOWN) # Set pin 10 to be an input pin and set initial value to be pulled low (off)

encoderx, encodery, gyroscope = sensorInit()
gyroscope.measure()

def buttonScan():
    while True:
        buttonState = GPIO.input(23)
        if GPIO.input(23) != GPIO.HIGH:
            print("Robot Stopped")
            time.sleep(1)
        if GPIO.input(23) == GPIO.HIGH:
            print("X Proximity:", encoderx.proximity)
            print("Y Proximity:", encodery.proximity)
            #print("Acceleration: X:%.2f, Y: %.2f, Z: %.2f m/s^2" % (gyroscope.acceleration))
            #print("Gyro X:%.2f, Y: %.2f, Z: %.2f rad/s" % (gyroscope.gyro))
            #print("Temperature: %.2f C" % gyroscope.temperature)
            #print("")
            print(gyroscope.getRoll(), gyroscope.getPitch())
            print("Data")
            time.sleep(0.3)

def buttonPress():
    buttonThread = threading.Thread(target = buttonScan)
    buttonThread.start()
