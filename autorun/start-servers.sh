cd && cd Desktop/tele-ultrasound-2022-main/controller && node xyController &
cd && cd Desktop/tele-ultrasound-2022-main/controller && node tendonController &
cd && cd Desktop/tele-ultrasound-2022-main/controller && node kzController &
sleep 5 &&
cd && cd Desktop/tele-ultrasound-2022-main/controller && node poseController &
sleep 5 &&
cd && cd Desktop/tele-ultrasound-2022-main/server && node ws-server.js &
sleep 5 &&
cd && lt --host http://loca.lt --port 8080 2>&1 | tee Desktop/tele-ultrasound-2022-main/autorun/address.txt