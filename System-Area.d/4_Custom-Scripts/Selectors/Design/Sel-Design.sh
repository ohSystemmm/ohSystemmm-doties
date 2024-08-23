#  ____       _       ____            _                   _     
# / ___|  ___| |     |  _ \  ___  ___(_) __ _ _ __    ___| |__  
# \___ \ / _ \ |_____| | | |/ _ \/ __| |/ _` | '_ \  / __| '_ \ 
#  ___) |  __/ |_____| |_| |  __/\__ \ | (_| | | | |_\__ \ | | |
# |____/ \___|_|     |____/ \___||___/_|\__, |_| |_(_)___/_| |_|
#                                       |___/    
#
# by ohSystemmm <3 - 2024

Design="Dark\nLight"
Choice=$(echo -e "$Design" | rofi -dmenu -i -p "Choose a Design")

ScriptPath=~/ohSystemmm-doties/System-Area.d/5_Temp-Files/General/Design.sh
mkdir -p "$(dirname "$ScriptPath")"

case $Choice in
  "Dark")
    echo "dark" > "$ScriptPath"
  ;;
  "Light")
    echo "light" > "$ScriptPath"
  ;;
  *)
    echo "No valid option selected."
    exit 1
  ;;
esac

chmod +x "$ScriptPath"

source ~/ohSystemmm-doties/System-Area.d/4_Custom-Scripts/RofiColors.sh
