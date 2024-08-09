#  ____       _           _       ____  _           _                        _____     _     _               _     
# / ___|  ___| | ___  ___| |_    |  _ \(_) __ _ ___| |__   _____      __    |  ___|__ | | __| | ___ _ __ ___| |__  
# \___ \ / _ \ |/ _ \/ __| __|   | | | | |/ _` / __| '_ \ / _ \ \ /\ / /____| |_ / _ \| |/ _` |/ _ \ '__/ __| '_ \ 
#  ___) |  __/ |  __/ (__| |_    | |_| | | (_| \__ \ | | | (_) \ V  V /_____|  _| (_) | | (_| |  __/ | _\__ \ | | |
# |____/ \___|_|\___|\___|\__|___|____/|_|\__,_|___/_| |_|\___/ \_/\_/      |_|  \___/|_|\__,_|\___|_|(_)___/_| |_|
#                           |_____| 
# 
# by ohSystemmm <3 - 2024

DiashowDirectory=~/Downloads/ # Test
Diashows=$(find "$DiashowDirectory" -type d | sort)

if [ -z "$Diashows" ]; then
  echo "empty"
  exit 1
fi

SelectedDiashow=$(echo "$Diashows" | rofi -dmenu -p "Select a folder:" -theme-str 'listview { lines: 10; }')

if [ -n "$SelectedDiashow" ]; then
    echo "$SelectedDiashow"
else
    echo "canceled" >&2
    exit 1
fi
