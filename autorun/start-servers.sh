cd && cd Desktop/control/controller && node xyController &
cd && cd Desktop/control/controller && node tendonController &
cd && cd Desktop/control/controller && node kzController &
sleep 5 &&
cd && cd Desktop/control/controller && node poseController &
sleep 5 &&
cd && cd Desktop/control/server && node ws-server.js &
sleep 5 &&
cd && lt --host http://loca.lt --port 8080 2>&1 | tee Desktop/control/autorun/address.txt