import time
import RPi.GPIO as GPIO
from AngleMeterAlpha import AngleMeterAlpha

angleMeter = AngleMeterAlpha()
angleMeter.measure()



while True:
    #print(angleMeter.get_kalman_roll(),",", angleMeter.get_complementary_roll(), ",",angleMeter.get_kalman_pitch(),",", angleMeter.get_complementary_pitch(),".")
    #print(angleMeter.get_int_roll(), angleMeter.get_int_pitch())
    print(angleMeter.getRoll(), angleMeter.getPitch())
    time.sleep(0.3)

