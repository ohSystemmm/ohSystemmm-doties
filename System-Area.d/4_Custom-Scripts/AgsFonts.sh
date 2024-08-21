#     _             _____           _             _     
#    / \   __ _ ___|  ___|__  _ __ | |_ ___   ___| |__  
#   / _ \ / _` / __| |_ / _ \| '_ \| __/ __| / __| '_ \ 
#  / ___ \ (_| \__ \  _| (_) | | | | |_\__ \_\__ \ | | |
# /_/   \_\__, |___/_|  \___/|_| |_|\__|___(_)___/_| |_|
#         |___/                 
#
# by ohSystemmm <3 - 2024

Fonts=~/ohSystemmm-doties/System-Area.d/0_Global-Config/Fonts
Destination=~/.local/share/fonts/NFP/

if [ ! -d "$Destination" ]; then
  mkdir -p "$Destination"
fi

cp "$Fonts"/* "$Destination"
fc-cache -fv
