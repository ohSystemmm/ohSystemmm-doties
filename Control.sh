#   ____            _             _       _     
#  / ___|___  _ __ | |_ _ __ ___ | |  ___| |__  
# | |   / _ \| '_ \| __| '__/ _ \| | / __| '_ \ 
# | |__| (_) | | | | |_| | | (_) | |_\__ \ | | |
#  \____\___/|_| |_|\__|_|  \___/|_(_)___/_| |_|
#
# by ohSystemmm <3 - 2024

clear

source ~/ohSystemmm-doties/User-Area.d/1_Set-Up/0_Install/include/Colors.sh

echo -e -n $BCyan 
figlet -w 100 Control.sh
echo -e "by ohSystemmm <3 - 2024\n"

Menu=$(gum choose --cursor="-> " \
      "Set New Avatar" "Set New Wallpaper" "" "Exit")
