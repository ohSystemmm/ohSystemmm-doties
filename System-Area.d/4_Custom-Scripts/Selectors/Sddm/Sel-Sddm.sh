#  ____       _      ____      _     _                 _     
# / ___|  ___| |    / ___|  __| | __| |_ __ ___    ___| |__  
# \___ \ / _ \ |____\___ \ / _` |/ _` | '_ ` _ \  / __| '_ \ 
#  ___) |  __/ |_____|__) | (_| | (_| | | | | | |_\__ \ | | |
# |____/ \___|_|    |____/ \__,_|\__,_|_| |_| |_(_)___/_| |_|
# 
# by ohSystemmm <3 - 2024

SddmDirectory=~/ohSystemmm-doties/User-Area.d/4_Sddm/
Sddms=$(find "$SddmDirectory" -type f -iname "*.png" | sort)

if [ -z "$Sddms" ]; then
  notify-send "Warning!" "Empty Sddm folder"
  exit 1
fi

SelectedSddm=$(echo "$Sddms" | rofi -dmenu -p "Select new Loginimage" -theme-str 'listview { lines: 10; }')


