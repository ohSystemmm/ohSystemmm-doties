#  ____       _           _   __        __    _ _                                 _     
# / ___|  ___| | ___  ___| |_ \ \      / /_ _| | |_ __   __ _ _ __   ___ _ __ ___| |__  
# \___ \ / _ \ |/ _ \/ __| __| \ \ /\ / / _` | | | '_ \ / _` | '_ \ / _ \ '__/ __| '_ \ 
#  ___) |  __/ |  __/ (__| |_   \ V  V / (_| | | | |_) | (_| | |_) |  __/ | _\__ \ | | |
# |____/ \___|_|\___|\___|\__|___\_/\_/ \__,_|_|_| .__/ \__,_| .__/ \___|_|(_)___/_| |_|
#                           |_____|              |_|         |_|   
# 
# by ohSystemmm <3 - 2024

WallpaperDirectory=~/Images/Wallpapers/ # Test
Wallpapers=$(find "$WallpaperDirectory" -type f \( -iname "*.jpg" -o -iname "*.png" -o -iname "*.jpeg" \) | sort)
if [ -z "$Wallpapers" ]; then
    notify-send "Warning!" "Empty Wallpaperfolder"
    exit 1
fi
SelectedWallpaper=$(echo "$Wallpapers" | rofi -dmenu -p "Select new Wallpaper" -theme-str 'listview { lines: 10; }')
if [ -n "$SelectedWallpaper" ]; then
   echo -e "$SelectedWallpaper" > ~/ohSystemmm-doties/System-Area.d/5_Temp-Files/Active-Wallpaper.sh
   source ~/ohSystemmm-doties/System-Area.d/4_Custom-Scripts/pywal.sh
   source ~/ohSystemmm-doties/System-Area.d/4_Custom-Scripts/Swww.sh
else
    exit 1
fi
