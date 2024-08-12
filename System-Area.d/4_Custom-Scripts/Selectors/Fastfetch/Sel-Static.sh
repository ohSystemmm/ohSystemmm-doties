#  ____       _      ____  _        _   _            _
# / ___|  ___| |    / ___|| |_ __ _| |_(_) ___   ___| |__
# \___ \ / _ \ |____\___ \| __/ _` | __| |/ __| / __| '_ \
#  ___) |  __/ |_____|__) | || (_| | |_| | (__ _\__ \ | | |
# |____/ \___|_|    |____/ \__\__,_|\__|_|\___(_)___/_| |_|
#
# by ohSystemmm <3 - 2024

FastfetchDirectory=~/ohSystemmm-doties/User-Area.d/4_Fastfetch/ 
Fastfetches=$(find "$FastfetchDirectory" -type f \( -iname "*.jpg" -o -iname "*.png" -o -iname "*.jpeg" \) | sort)
if [ -z "$Fastfetches" ]; then
    notify-send "Warning!" "Empty Fastfetchfolder"
    exit 1
fi
SelectedFastfetch=$(echo "$Fastfetches" | rofi -dmenu -p "Select new Fastfetch" -theme-str 'listview { lines: 10; }')
if [ -n "$SelectedFastfetch" ]; then
   echo -e "$SelectedFastfetch" > ~/ohSystemmm-doties/System-Area.d/5_Temp-Files/Fastfetch/Fastfetch-Image.sh
else
    exit 1
fi
