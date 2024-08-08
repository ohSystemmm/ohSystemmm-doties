#  ____       _           _   __        __    _ _                                 _     
# / ___|  ___| | ___  ___| |_ \ \      / /_ _| | |_ __   __ _ _ __   ___ _ __ ___| |__  
# \___ \ / _ \ |/ _ \/ __| __| \ \ /\ / / _` | | | '_ \ / _` | '_ \ / _ \ '__/ __| '_ \ 
#  ___) |  __/ |  __/ (__| |_   \ V  V / (_| | | | |_) | (_| | |_) |  __/ | _\__ \ | | |
# |____/ \___|_|\___|\___|\__|___\_/\_/ \__,_|_|_| .__/ \__,_| .__/ \___|_|(_)___/_| |_|
#                           |_____|              |_|         |_|   
# 
# by ohSystemmm <3 - 2024

WallpaperDirectory=~/Downloads/
Wallpapers=$(find "$WallpaperDirectory" -type f \( -iname "*.jpg" -o -iname "*.png"  \) | sort)

if [ -z "$Wallpapers" ]; then
    echo "empty"
    exit 1
fi

SelectedWallpaper=$(echo "$Wallpapers" | rofi -dmenu -p "Select an image:" -theme-str 'listview { lines: 10; }')

if [ -n "$SelectedWallpaper" ]; then
    echo "$SelectedWallpaper"
else
    echo "canceled" >&2
    exit 1
fi
