#  ___                            ____  _                _     
# |_ _|_ __ ___   __ _  __ _  ___| __ )| |_   _ _ __ ___| |__  
#  | || '_ ` _ \ / _` |/ _` |/ _ \  _ \| | | | | '__/ __| '_ \ 
#  | || | | | | | (_| | (_| |  __/ |_) | | |_| | | _\__ \ | | |
# |___|_| |_| |_|\__,_|\__, |\___|____/|_|\__,_|_|(_)___/_| |_|
#                      |___/   
# 
# by ohSystemmm <3 - 2024

BlurPasses=5
BlurSize=5

InputFile=$(cat ~/ohSystemmm-doties/System-Area.d/5_Temp-Files/Background/Active-Wallpaper.sh)
rm -rf ~/ohSystemmm-doties/System-Area.d/5_Temp-Files/Background/Blurred/*
OutputFile=~/ohSystemmm-doties/System-Area.d/5_Temp-Files/Background/Blurred/BlurredWP.png

magick convert "$InputFile" -blur 0x$((BlurSize * BlurPasses)) "$OutputFile"
