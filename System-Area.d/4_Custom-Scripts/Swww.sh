#  ____                                  _     
# / ___|_      ____      ____      _____| |__  
# \___ \ \ /\ / /\ \ /\ / /\ \ /\ / / __| '_ \ 
#  ___) \ V  V /  \ V  V /  \ V  V /\__ \ | | |
# |____/ \_/\_/    \_/\_/    \_/\_(_)___/_| |_|
# 
# by ohSystemmm <3 - 2024

Wallpaper=$(cat ~/ohSystemmm-doties/System-Area.d/5_Temp-Files/Background/ActiveWallpaper.sh)
swww img "$Wallpaper" \
    --transition-bezier .43,1.19,1,1 \
    --transition-fps=60 \
    --transition-type=grow \
    --transition-duration=0.5 \
    --transition-pos "$(hyprctl cursorpos)"
