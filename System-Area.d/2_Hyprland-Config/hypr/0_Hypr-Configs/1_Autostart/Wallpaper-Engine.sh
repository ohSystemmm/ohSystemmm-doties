# __        __    _ _                                  _____             _                  _    
# \ \      / /_ _| | |_ __   __ _ _ __   ___ _ __     | ____|_ __   __ _(_)_ __   ___   ___| |__ 
#  \ \ /\ / / _` | | | '_ \ / _` | '_ \ / _ \ '__|____|  _| | '_ \ / _` | | '_ \ / _ \ / __| '_ \ 
#   \ V  V / (_| | | | |_) | (_| | |_) |  __/ | |_____| |___| | | | (_| | | | | || __/_\__ \ | | |
#    \_/\_/ \__,_|_|_| .__/ \__,_| .__/ \___|_|       |_____|_| |_|\__, |_|_| |_|\___(_)___/_| |_|
#                    |_|         |_|                               |___/        
#
# by ohSystemmm <3 - 2024 

# Wallpaper

activeWallpaper="~/ohSystemmm-doties/Temp.d/Active-Wallpaper"
blurredWallpaper="~/ohSystemmm-doties/Temp.d/Blurred-Wallpaper"

# Profile
squaredProfile="~/ohSystemmm-doties/Temp.d/User-Profile"

# Rofi
rofiBanner="~/ohSystemmm-doties/Temp.d/Rofi-Banner.rasi"

# Set Default Current-Wallpaper if not exists
if [ ! -f $currentWallpaper ] ;then
    touch $currentWallpaper
    echo "~/ohSystemmm-doties/Defaults.d/Default-Wallpaper.jpg" > "$currentWallpaper"
fi

# Set Default Rofi-Banner if not exists
if [ ! -f $rofiBanner ] ;then
    touch $rofiBanner
    echo "~/ohSystemmm-doties/Defaults.d/Default-Banner.jpg" > "$rofiBanner"
fi

# Set Current-Wallpaper
currentWallpaper=$(cat "activeWallpaper")

# Creating
# Set Wallpaper
# Progress-Notification
# Create Blurred-Wallpaper
# Refresh Active-Wallpaper + Blurred-Wallpaper + User-Profile + Rofi-Banner
# End-Notification
