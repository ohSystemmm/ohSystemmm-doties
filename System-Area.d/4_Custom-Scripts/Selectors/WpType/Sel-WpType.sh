#  ____       _    __        __   _____                       _     
# / ___|  ___| |   \ \      / / _|_   _|   _ _ __   ___   ___| |__  
# \___ \ / _ \ |____\ \ /\ / / '_ \| || | | | '_ \ / _ \ / __| '_ \ 
#  ___) |  __/ |_____\ V  V /| |_) | || |_| | |_) |  __/_\__ \ | | |
# |____/ \___|_|      \_/\_/ | .__/|_| \__, | .__/ \___(_)___/_| |_|
#                            |_|       |___/|_| 
#
# by ohSystemmm <3 - 2024

WpType="Static\nDiashow"
WallpaperTypePath=~/ohSystemmm-doties/System-Area.d/5_Temp-Files/Background/WallpaperType.sh

Choice=$(echo -e "$WpType" | rofi -dmenu -i -p "Choose a Wallpaper Type")

mkdir -p "$(dirname "$WallpaperTypePath")"

case $Choice in
  "Static")
    echo "static" > "$WallpaperTypePath"
  ;;
  "Diashow")
    echo "diashow" > "$WallpaperTypePath"
    source ~/ohSystemmm-doties/System-Area.d/4_Custom-Scripts/WallpaperEngine.sh &
  ;;
  *)
    echo "No valid option selected."
    exit 1
  ;;
esac

chmod +x "$WallpaperTypePath"
