#  ____       _       ____  _           _                       _     
# / ___|  ___| |     |  _ \(_) __ _ ___| |__   _____      _____| |__  
# \___ \ / _ \ |_____| | | | |/ _` / __| '_ \ / _ \ \ /\ / / __| '_ \ 
#  ___) |  __/ |_____| |_| | | (_| \__ \ | | | (_) \ V  V /\__ \ | | |
# |____/ \___|_|     |____/|_|\__,_|___/_| |_|\___/ \_/\_(_)___/_| |_|                                                                 
# 
# by ohSystemmm <3 - 2024

DiashowDirectory=~/ohSystemmm-doties/User-Area.d/3_Diashow/Diashow_1/
Diashows=$(find "$DiashowDirectory" -type d | sort)

if [ -z "$Diashows" ]; then
    notify-send "Warning!" "Empty Diashow folder"
    exit 1
fi

SelectedDiashow=$(echo "$Diashows" | rofi -dmenu -p "Select new Diashow" -theme-str 'listview { lines: 10; }')
ScriptPath=~/ohSystemmm-doties/System-Area.d/5_Temp-Files/Background/DiashowFolder.sh

if [ -n "$SelectedDiashow" ]; then
    mkdir -p "$(dirname "$ScriptPath")"
    echo -e "$SelectedDiashow" > "$ScriptPath"
    chmod +x "$ScriptPath"
else
    exit 1
fi
