#  ____                   ____      _     _                 _     
# / ___| _   _ _ __   ___/ ___|  __| | __| |_ __ ___    ___| |__  
# \___ \| | | | '_ \ / __\___ \ / _` |/ _` | '_ ` _ \  / __| '_ \ 
#  ___) | |_| | | | | (__ ___) | (_| | (_| | | | | | |_\__ \ | | |
# |____/ \__, |_| |_|\___|____/ \__,_|\__,_|_| |_| |_(_)___/_| |_|
#        |___/      
#
# by ohSystemmm <3 - 2024

sudo cp -r ~/ohSystemmm-doties/System-Area.d/8_SDDM/Sddm-Theme/ /usr/share/sddm/themes/ 

if [ -e "/etc/sddm.conf" ]; then
  sudo rm /etc/sddm.conf
fi 

sudo cp ~/ohSystemmm-doties/System-Area.d/0_Global-Config/sddm.conf /etc/sddm.conf

