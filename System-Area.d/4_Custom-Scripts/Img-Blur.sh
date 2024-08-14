#  ___                       ____  _                _
# |_ _|_ __ ___   __ _      | __ )| |_   _ _ __ ___| |__
#  | || '_ ` _ \ / _` |_____|  _ \| | | | | '__/ __| '_ \
#  | || | | | | | (_| |_____| |_) | | |_| | | _\__ \ | | |
# |___|_| |_| |_|\__, |     |____/|_|\__,_|_|(_)___/_| |_|
#                |___/ 
# 
# by ohSystemmm <3 - 2024

InputFile=$(cat ~/ohSystemmm-doties/System-Area.d/5_Temp-Files/Background/Active-Wallpaper.sh)

BaseName="${InputFile%.*}"
Extension="${InputFile##*.}"

OutputFile="${BaseName}-Blurred.${Extension}"
convert "$InputFile" -blur 0x8 "$OutputFile"
rm -rf ~/ohSystemmm-doties/System-Area.d/3_Package-Config/0_App-Configs/wlogout/Blurred/*
mv "$OutputFile" ~/ohSystemmm-doties/System-Area.d/3_Package-Config/0_App-Configs/wlogout/Blurred/BlurredWP.png
echo "~/$(basename "$OutputFile")"
