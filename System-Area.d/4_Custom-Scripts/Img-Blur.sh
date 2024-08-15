#  ___                       ____  _                _
# |_ _|_ __ ___   __ _      | __ )| |_   _ _ __ ___| |__
#  | || '_ ` _ \ / _` |_____|  _ \| | | | | '__/ __| '_ \
#  | || | | | | | (_| |_____| |_) | | |_| | | _\__ \ | | |
# |___|_| |_| |_|\__, |     |____/|_|\__,_|_|(_)___/_| |_|
#                |___/ 
# 
# by ohSystemmm <3 - 2024

ReloadTime=0
BlurPasses=3
BlurSize=3
Contrast=0.8916
Brightness=0.8172
Vibrancy=0.1696
VibrancyDarkness=0.0

InputFile=$(cat ~/ohSystemmm-doties/System-Area.d/5_Temp-Files/Background/Active-Wallpaper.sh)

OutputFile="BlurredWP.png"

VibrancyPercent=$(awk "BEGIN {printf \"%d\", ($Vibrancy * 100)}")
VibrancyDarknessPercent=$(awk "BEGIN {printf \"%d\", ($VibrancyDarkness * 100)}")

convert "$InputFile" \
  -blur 0x$((BlurSize * BlurPasses)) \
  -contrast-stretch "$Contrast" \
  -brightness-contrast "$Brightness" \
  -modulate 100,$((100 + VibrancyPercent)),$((100 + VibrancyDarknessPercent)) \
  "$OutputFile"

rm -rf ~/ohSystemmm-doties/System-Area.d/5_Temp-Files/Background/Blurred/*
cp "$OutputFile" ~/ohSystemmm-doties/System-Area.d/5_Temp-Files/Background/Blurred/BlurredWP.png
