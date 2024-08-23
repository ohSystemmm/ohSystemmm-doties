#  ____                 _      ___                       _
# |  _ \ __ _ _ __   __| |    |_ _|_ __ ___   __ _   ___| |__
# | |_) / _` | '_ \ / _` |_____| || '_ ` _ \ / _` | / __| '_ \
# |  _ < (_| | | | | (_| |_____| || | | | | | (_| |_\__ \ | | |
# |_| \_\__,_|_| |_|\__,_|    |___|_| |_| |_|\__, (_)___/_| |_|
#                                            |___/
# 
# by ohSystemmm <3 - 2024

ImageFolder=$(cat ~/ohSystemmm-doties/System-Area.d/5_Temp-Files/Background/DiashowFolder.sh)
ImageFolder="${ImageFolder%/}/"
shopt -s nullglob
Images=("$ImageFolder"*.jpg "$ImageFolder"*.png "$ImageFolder"*.jpeg)
shopt -u nullglob

if [ ${#Images[@]} -eq 0 ]; then
    notify-send "Warning!" "Empty Diashow folder"
    exit 1
fi

RandomImage=${Images[RANDOM % ${#Images[@]}]}
ActiveWallpaperPath=~/ohSystemmm-doties/System-Area.d/5_Temp-Files/Background/ActiveWallpaper.sh
mkdir -p "$(dirname "$ActiveWallpaperPath")"
echo -e "$RandomImage" > "$ActiveWallpaperPath"
chmod +x "$ActiveWallpaperPath"
source ~/ohSystemmm-doties/System-Area.d/4_Custom-Scripts/pywal.sh
source ~/ohSystemmm-doties/System-Area.d/4_Custom-Scripts/Swww.sh
source ~/ohSystemmm-doties/System-Area.d/4_Custom-Scripts/ImageBlur.sh
sleep 60
