#  ____  _            _     _       _     _   _____ _ _ _                _     
# | __ )| |_   _  ___| |   (_) __ _| |__ | |_|  ___(_) | |_ ___ _ __ ___| |__  
# |  _ \| | | | |/ _ \ |   | |/ _` | '_ \| __| |_  | | | __/ _ \ '__/ __| '_ \ 
# | |_) | | |_| |  __/ |___| | (_| | | | | |_|  _| | | | ||  __/ | _\__ \ | | |
# |____/|_|\__,_|\___|_____|_|\__, |_| |_|\__|_|   |_|_|\__\___|_|(_)___/_| |_|
#                             |___/    
#
# by ohSystemmm <3 - 2025

Options="Enable\nDisable"

Choice=$(echo -e "$Options" | rofi -dmenu -i -p "Set Blue Light Filter")


case $Choice in
  "Enable")
    wlsunset -t 4500 -T 6500 -g 0.95 &
  ;;
  "Disable")
    pkill wlsunset
  ;;
  *)
    echo "No valid option selected."
    exit 1
  ;;
esac
