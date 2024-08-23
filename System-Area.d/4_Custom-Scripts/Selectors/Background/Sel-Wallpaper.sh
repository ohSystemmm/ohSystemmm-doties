#  ____       _    __        __    _ _                                 _     
# / ___|  ___| |   \ \      / /_ _| | |_ __   __ _ _ __   ___ _ __ ___| |__  
# \___ \ / _ \ |____\ \ /\ / / _` | | | '_ \ / _` | '_ \ / _ \ '__/ __| '_ \ 
#  ___) |  __/ |_____\ V  V / (_| | | | |_) | (_| | |_) |  __/ | _\__ \ | | |
# |____/ \___|_|      \_/\_/ \__,_|_|_| .__/ \__,_| .__/ \___|_|(_)___/_| |_|
#                                     |_|         |_| 
# 
# by ohSystemmm <3 - 2024

WallpaperDirectory=~/ohSystemmm-doties/User-Area.d/2_Wallpaper/
Wallpapers=$(find "$WallpaperDirectory" -type f \( -iname "*.jpg" -o -iname "*.png" -o -iname "*.jpeg" \) -print0 | sort -z)

if [ -z "$Wallpapers" ]; then
    notify-send "Warning!" "Empty Wallpaper folder"
    exit 1
fi

SelectedWallpaper=$(echo "$Wallpapers" | rofi -dmenu -p "Select new Wallpaper" -theme-str 'listview { lines: 10; }')

if [ -n "$SelectedWallpaper" ]; then
    mkdir -p ~/ohSystemmm-doties/System-Area.d/5_Temp-Files/Background/

    ScriptPath=~/ohSystemmm-doties/System-Area.d/5_Temp-Files/Background/ActiveWallpaper.sh
    echo -e "$SelectedWallpaper" > "$ScriptPath"
    chmod +x "$ScriptPath"

    source ~/ohSystemmm-doties/System-Area.d/4_Custom-Scripts/pywal.sh
    source ~/ohSystemmm-doties/System-Area.d/4_Custom-Scripts/Swww.sh
    source ~/ohSystemmm-doties/System-Area.d/4_Custom-Scripts/ImageBlur.sh

    exit 1
fi

