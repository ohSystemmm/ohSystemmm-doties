# __        __    _ _                             _____             _                  _     
# \ \      / /_ _| | |_ __   __ _ _ __   ___ _ __| ____|_ __   __ _(_)_ __   ___   ___| |__  
#  \ \ /\ / / _` | | | '_ \ / _` | '_ \ / _ \ '__|  _| | '_ \ / _` | | '_ \ / _ \ / __| '_ \ 
#   \ V  V / (_| | | | |_) | (_| | |_) |  __/ |  | |___| | | | (_| | | | | |  __/_\__ \ | | |
#    \_/\_/ \__,_|_|_| .__/ \__,_| .__/ \___|_|  |_____|_| |_|\__, |_|_| |_|\___(_)___/_| |_|
#                    |_|         |_|                          |___/     
#
# by ohSystemmm <3 - 2024 

WallpaperTypeDirectory=~/ohSystemmm-doties/System-Area.d/5_Temp-Files/Background/Wallpaper-Type.sh
Default_WallpaperType="static"
if [ ! -e "$WallpaperTypeDirectory" ]; then
    touch "$WallpaperTypeDirectory" && chmod +x "$WallpaperTypeDirectory"
    echo -e "${Default_WallpaperType}" > "$WallpaperTypeDirectory"
fi
    
while true; do
  WallpaperType=$(tail -n 1 "$WallpaperTypeDirectory")
  case $WallpaperType in
    "static")
      exit 1
    ;;
    "diashow")
      source ~/ohSystemmm-doties/System-Area.d/4_Custom-Scripts/RandomImage.sh
      ;;
    *)
      notify-send -u critical -i dialog-error "Critical Warning!" "Unknown Wallpaper Type '$WallpaperType'"
    ;;
  esac
done
