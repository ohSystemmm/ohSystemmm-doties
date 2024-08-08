#  ____                                  _     
# / ___|_      ____      ____      _____| |__  
# \___ \ \ /\ / /\ \ /\ / /\ \ /\ / / __| '_ \ 
#  ___) \ V  V /  \ V  V /  \ V  V /\__ \ | | |
# |____/ \_/\_/    \_/\_/    \_/\_(_)___/_| |_|
# 
# by ohSystemmm <3 - 2024

swww-daemon &
swww img $Wallpaper \
        --transition-bezier .43,1.19,1,.4 \
        --transition-fps=60 \
        --transition-type=wipe \
        --transition-duration=0.7 \
        --transition-pos "$( hyprctl cursorpos )"
