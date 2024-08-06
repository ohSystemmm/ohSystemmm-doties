#                            _       _     
#  _ __  _   ___      ____ _| |  ___| |__  
# | '_ \| | | \ \ /\ / / _` | | / __| '_ \ 
# | |_) | |_| |\ V  V / (_| | |_\__ \ | | |
# | .__/ \__, | \_/\_/ \__,_|_(_)___/_| |_|
# |_|    |___/                     
#
# by ohSystemmm <3 - 2024

cache=~/.cache/wal/
PywalColors=~/ohSystemmm-doties/System-Area.d/6_Temp-Files/Pywall-Colors/
Theme=$(tail -n 1 "~/ohSystemmm-doties/System-Area.d/1_Dotfile-Settings/Design.sh")

wal -i $(cat "~/ohSystemmm-doties/System-Area.d/6_Temp-Files/Active-Wallpaper.sh")

cp "${cache}colors" "${PywalColors}"
cp "${cache}colors.css" "${PywalColors}"
cp "${cache}colors.json" "${PywalColors}"
cp "${cache}colors.sh" "${PywalColors}"
cp "${cache}colors-waybar.css" "${PywalColors}"


if [ "$Theme" == "Dark" ]; then
  cp "${cache}colors-rofi-dark.rasi" "${PywalColors}"
fi

if [ "$Theme" == "Light" ]; then
  cp "${cache}colors-rofi-light.rasi" "${PywalColors}"
fi 

rm -rf "${cache}"
