# __        __    _ _                                  _____             _                  _    
# \ \      / /_ _| | |_ __   __ _ _ __   ___ _ __     | ____|_ __   __ _(_)_ __   ___   ___| |__ 
#  \ \ /\ / / _` | | | '_ \ / _` | '_ \ / _ \ '__|____|  _| | '_ \ / _` | | '_ \ / _ \ / __| '_ \ 
#   \ V  V / (_| | | | |_) | (_| | |_) |  __/ | |_____| |___| | | | (_| | | | | || __/_\__ \ | | |
#    \_/\_/ \__,_|_|_| .__/ \__,_| .__/ \___|_|       |_____|_| |_|\__, |_|_| |_|\___(_)___/_| |_|
#                    |_|         |_|                               |___/        
#
# by ohSystemmm <3 - 2024 

Header() {
  HeaderText=$1 
  File=$2
  Ascii=$(figlet -w 100 "$HeaderText") 
  {
  echo "$Ascii" | while IFS= read -r line; do
    echo "# $line"
  done
  echo -e "# by ohSystemmm <3 - 2024\n"
  } > "$File"
}

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
  Header "Active-Wallpaper.sh" "$MWallpaperInterface"
  echo -e "$MWallpaperDefault" >> "$MWallpaperInterface"
fi 

if [ ! -e "$BWallpaperInterface" ]; then
  touch "$BWallpaperInterface" && chmod +x "$BWallpaperInterface"
  Header "Blurred-Wallpaper.sh" "$BWallpaperInterface"
  echo -e "$BWallpaperDefault" >> "$BWallpaperInterface"
fi   

if [ ! -e "$ProfileInterface" ]; then
  touch "$ProfileInterface" && chmod +x "$ProfileInterface"
  Header "Active-Profile.sh" "$ProfileInterface"
  echo -e "$ProfileDefault" >> "$ProfileInterface"
fi   

if [ ! -e "$RofiInterface" ]; then
  touch "$RofiInterface" && chmod +x "$RofiInterface"
  Header "Rofi-Banner.sh" "$RofiInterface"
  echo -e "$RofiDefault" >> "$RofiInterface"
fi   

# Getting Wallpapers
MWallpaperActive=$(tail -n 1 "${MWallpaperInterface}")
BWallpaperActive=$(tail -n 1 "${BWallpaperInterface}")
ProfileActive=$(tail -n 1 "${ProfileInterface}")
RofiActive=$(tail -n 1  "${RofiInterface}")

# Debug
echo "MWallpaperActive: ${MWallpaperActive}"
echo "BWallpaperActive: ${BWallpaperActive}"
echo "ProfileActive: ${ProfileActive}"
echo "RofiActive: ${RofiActive}"

# Set Wallpaper
# Progress-Notification
# Create Blurred-Wallpaper
# Refresh Active-Wallpaper + Blurred-Wallpaper + User-Profile + Rofi-Banner
# End-Notification
