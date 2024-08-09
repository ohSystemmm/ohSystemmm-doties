#  ____       _           _     _____         _                        _____     _     _               _     
# / ___|  ___| | ___  ___| |_  |_   _|____  _| |_ _   _ _ __ ___      |  ___|__ | | __| | ___ _ __ ___| |__  
# \___ \ / _ \ |/ _ \/ __| __|   | |/ _ \ \/ / __| | | | '__/ _ \_____| |_ / _ \| |/ _` |/ _ \ '__/ __| '_ \ 
#  ___) |  __/ |  __/ (__| |_    | |  __/>  <| |_| |_| | | |  __/_____|  _| (_) | | (_| |  __/ | _\__ \ | | |
# |____/ \___|_|\___|\___|\__|___|_|\___/_/\_\\__|\__,_|_|  \___|     |_|  \___/|_|\__,_|\___|_|(_)___/_| |_|
#                           |_____|     
#
# by ohSystemmm <3 - 2024

TextureDirectory=~/Downloads/ # Test
Textures=$(find "$TextureDirectory" -type d | sort)

if [ -z "$Textures" ]; then
  echo "empty"
  exit 1
fi

SelectedTexture=$(echo "$Textures" | rofi -dmenu -p "Select a folder:" -theme-str 'listview { lines: 10; }')

if [ -n "$SelectedTexture" ]; then
    echo "$SelectedTexture"
else
    echo "canceled" >&2
    exit 1
fi
