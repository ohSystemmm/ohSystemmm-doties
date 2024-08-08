# __        __    _ _                                  _____             _                  _    
# \ \      / /_ _| | |_ __   __ _ _ __   ___ _ __     | ____|_ __   __ _(_)_ __   ___   ___| |__ 
#  \ \ /\ / / _` | | | '_ \ / _` | '_ \ / _ \ '__|____|  _| | '_ \ / _` | | '_ \ / _ \ / __| '_ \ 
#   \ V  V / (_| | | | |_) | (_| | |_) |  __/ | |_____| |___| | | | (_| | | | | || __/_\__ \ | | |
#    \_/\_/ \__,_|_|_| .__/ \__,_| .__/ \___|_|       |_____|_| |_|\__, |_|_| |_|\___(_)___/_| |_|
#                    |_|         |_|                               |___/        
#
# by ohSystemmm <3 - 2024 

# Define Defaults
Default_Directory="~/ohSystemmm-doties/System-Area.d/6_Defaults/"
Default_Avatar="${Default_Directory}Avatar_Default.jpg"
Default_Wallpaper="${Default_Directory}Wallpaper_Default.jpg"
Default_RofiBanner="${Default_Directory}Rofi-Banner_Default.jpg"
Default_BlurredWallpaper="${Default_Directory}Blurred-Wallpaper_Default.jpg"

# Creating Wallpaper Type if not Exist
WallpaperTypeDirectory=~/ohSystemmm-doties/System-Area.d/1_Dotfile-Settings/Wallpaper-Type.sh
Default_WallpaperType="static"
if [ ! -e "$WallpaperTypeDirectory" ]; then
    touch "$WallpaperTypeDirectory" && chmod +x "$WallpaperTypeDirectory"
    Header=$(figlet -w 100 "Wallpaper-Type.sh")
    {
        echo "$Header" | while IFS= read -r line; do
            echo "# $line"
        done
        echo -e "#\n# by ohSystemmm <3 - 2024\n"
        echo -e "# static / diashow / texture"
        echo -e "${Default_WallpaperType}"
    } > "$WallpaperTypeDirectory"
fi
    
# Getting Wallpaper Type
WallpaperType=$(tail -n 1 "$WallpaperTypeDirectory")

case $WallpaperType in 
  "static")
    source ~/ohSystemmm-doties/System-Area.d/4_Custom-Scripts/Select_Wallpaper.sh
  ;;
  "diashow")
    source ~/ohSystemmm-doties/System-Area.d/4_Custom-Scripts/Select_Diashow-Folder.sh
  ;;
  "texture")
    source ~/ohSystemmm-doties/System-Area.d/4_Custom-Scripts/Select_Texture-Folder.sh
    
  ;;
  *)
    notify-send -u critical -i dialog-error "Critical Warning!" "Unknown Wallpaper Type"
  ;;
esac
#DefaultWallpaper=
# WallpaperInterface=
# NewWallpaper=

# Debug
echo -e "Wallpaper Type:\t${WallpaperType}"
