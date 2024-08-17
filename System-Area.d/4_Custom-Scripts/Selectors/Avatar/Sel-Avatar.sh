#  ____       _         _             _                 _
# / ___|  ___| |       / \__   ____ _| |_ __ _ _ __ ___| |__
# \___ \ / _ \ |_____ / _ \ \ / / _` | __/ _` | '__/ __| '_ \
#  ___) |  __/ |_____/ ___ \ V / (_| | || (_| | | _\__ \ | | |
# |____/ \___|_|    /_/   \_\_/ \__,_|\__\__,_|_|(_)___/_| |_|
# 
# by ohSystemmm - 2024

AvatarDirectory=~/ohSystemmm-doties/User-Area.d/5_Avatars/
Avatars=$(find "$AvatarDirectory" -type f -iname "*.png" | sort)

if [ -z "$Avatars" ]; then
  notify-send "Warning!" "Empty Avatar folder"
  exit 1
fi 

SelectedAvatar=$(echo "$Avatars" | rofi -dmenu -p "Select new Avatar" -theme-str 'listview { lines: 10; }')

if [ -n "$SelectedAvatar" ]; then
  if [ -f ~/ohSystemmm-doties/System-Area.d/5_Temp-Files/Avatar/Avatar.png ]; then
    rm -f ~/ohSystemmm-doties/System-Area.d/5_Temp-Files/Avatar/*
  fi
  
  cp "$SelectedAvatar" ~/ohSystemmm-doties/System-Area.d/5_Temp-Files/Avatar/Avatar.png
fi
