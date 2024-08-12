#  ____       _       ____                 _                       _
# / ___|  ___| |     |  _ \ __ _ _ __   __| | ___  _ __ ___    ___| |__
# \___ \ / _ \ |_____| |_) / _` | '_ \ / _` |/ _ \| '_ ` _ \  / __| '_ \
#  ___) |  __/ |_____|  _ < (_| | | | | (_| | (_) | | | | | |_\__ \ | | |
# |____/ \___|_|     |_| \_\__,_|_| |_|\__,_|\___/|_| |_| |_(_)___/_| |_|
#
# by ohSystemmm <3 - 2024

FastfetchDirectory=~/ohSystemmm-doties/User-Area.d/4_Fastfetch/
Fastfetches=$(find "$FastfetchDirectory" -type f \( -iname "*.jpg" -o -iname "*.png" -o -iname "*.jpeg" \) | sort)

if [ -z "$Fastfetches" ]; then
    notify-send "Warning!" "Empty Fastfetchfolder"
    exit 1
fi

SelectedFastfetch=$(echo "$Fastfetches" | shuf -n 1)

if [ -n "$SelectedFastfetch" ]; then
  echo -e "$SelectedFastfetch" > ~/ohSystemmm-doties/System-Area.d/5_Temp-Files/Fastfetch/Fastfetch-Image.sh
else
  exit 1
fi

