# __        __    _ _                                  _____             _                  _    
# \ \      / /_ _| | |_ __   __ _ _ __   ___ _ __     | ____|_ __   __ _(_)_ __   ___   ___| |__ 
#  \ \ /\ / / _` | | | '_ \ / _` | '_ \ / _ \ '__|____|  _| | '_ \ / _` | | '_ \ / _ \ / __| '_ \ 
#   \ V  V / (_| | | | |_) | (_| | |_) |  __/ | |_____| |___| | | | (_| | | | | || __/_\__ \ | | |
#    \_/\_/ \__,_|_|_| .__/ \__,_| .__/ \___|_|       |_____|_| |_|\__, |_|_| |_|\___(_)___/_| |_|
#                    |_|         |_|                               |___/        
#
# by ohSystemmm <3 - 2024 

# Default images
DirDefault=~/ohSystemmm-doties/System-Area.d/7_Defaults/
MWallpaperDefault="${DirDefault}Wallpaper_Default.jpg"
BWallpaperDefault="${DirDefault}Blurred-Wallpaper_Default.jpg"
ProfileDefault="${DirDefault}Profile_Default.jpg"
RofiDefault="${DirDefault}Rofi-Banner_Default.jpg"

# Interface Files
DirInterface=~/ohSystemmm-doties/System-Area.d/6_Temp-Files/
MWallpaperInterface="${DirInterface}Active-Wallpaper.sh"
BWallpaperInterface="${DirInterface}Blurred-Wallpaper.sh"
ProfileInterface="${DirInterface}Active-Profile.sh"
RofiInterface="${DirInterface}Rofi-Banner.sh"

if [ ! -e "$MWallpaperInterface" ]; then
  touch "$MWallpaperInterface" && chmod +x "$MWallpaperInterface"
fi 

if [ ! -e "$BWallpaperInterface" ]; then
  touch "$BWallpaperInterface" && chmod +x "$BWallpaperInterface"
fi   

if [ ! -e "$ProfileInterface" ]; then
  touch "$ProfileInterface" && chmod +x "$ProfileInterface"
fi   

if [ ! -e "$RofiInterface" ]; then
  touch "$RofiInterface" && chmod +x "$RofiInterface"
fi   

# Getting Wallpapers
MWallpaperActive=$(cat "${MWallpaperInterface}")
BWallpaperActive=$(cat "${BWallpaperInterface}")
ProfileActive=$(cat "${ProfileInterface}")
RofiActive=$(cat "${RofiInterface}")

# Debug output to verify the variables
echo "MWallpaperActive: ${MWallpaperActive}"
echo "BWallpaperActive: ${BWallpaperActive}"
echo "ProfileActive: ${ProfileActive}"
echo "RofiActive: ${RofiActive}"



# Set Wallpaper
# Progress-Notification
# Create Blurred-Wallpaper
# Refresh Active-Wallpaper + Blurred-Wallpaper + User-Profile + Rofi-Banner
# End-Notification
