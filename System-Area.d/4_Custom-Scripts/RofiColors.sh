#  ____        __ _  ____      _                      _     
# |  _ \ ___  / _(_)/ ___|___ | | ___  _ __ ___   ___| |__  
# | |_) / _ \| |_| | |   / _ \| |/ _ \| '__/ __| / __| '_ \ 
# |  _ < (_) |  _| | |__| (_) | | (_) | |  \__ \_\__ \ | | |
# |_| \_\___/|_| |_|\____\___/|_|\___/|_|  |___(_)___/_| |_|
# 
# by ohSystemmm <3 - 2024

Design=$(cat ~/ohSystemmm-doties/System-Area.d/5_Temp-Files/General/Design.sh)
RofiColorDir=~/ohSystemmm-doties/System-Area.d/3_Package-Config/0_App-Configs/rofi/config-Colors

case $Design in
  "dark")
    rm -rf ~/ohSystemmm-doties/System-Area.d/3_Package-Config/0_App-Configs/rofi/config-Colors/*
    cp ~/.cache/wal/colors-rofi-dark.rasi "$RofiColorDir/Colors-Dark.rasi"
  ;;
  "light")
    rm -rf ~/ohSystemmm-doties/System-Area.d/3_Package-Config/0_App-Configs/rofi/config-Colors/*    
    cp ~/.cache/wal/colors-rofi-light.rasi "$RofiColorDir/Colors-Light.rasi"
  ;;
  *)
    notify-send "Warning!" "Unknown Design Type"
    exit 1
  ;;
esac


