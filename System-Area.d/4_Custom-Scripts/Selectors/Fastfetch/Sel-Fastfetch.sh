#  ____       _       _____         _    __      _       _           _     
# / ___|  ___| |     |  ___|_ _ ___| |_ / _| ___| |_ ___| |__    ___| |__  
# \___ \ / _ \ |_____| |_ / _` / __| __| |_ / _ \ __/ __| '_ \  / __| '_ \ 
#  ___) |  __/ |_____|  _| (_| \__ \ |_|  _|  __/ || (__| | | |_\__ \ | | |
# |____/ \___|_|     |_|  \__,_|___/\__|_|  \___|\__\___|_| |_(_)___/_| |_|  
#
# by ohSystemmm <3 - 2024

FastfetchDirectory=~/ohSystemmm-doties/User-Area.d/4_Fastfetch/
Fastfetches=$(find "$FastfetchDirectory" -type f -iname "*.png" | sort)

if [ -z "$Fastfetches" ]; then
  notify-send "Warning!" "Empty Fastfetch folder"
  exit 1
fi

SelectedFastfetch=$(echo "$Fastfetches" | rofi -dmenu -p "Select new Fastfetch" -theme-str 'listview { lines: 10; }')

if [ -n "$SelectedFastfetch" ]; then
  if [ -f ~/.config/fastfetch/Image.png ]; then
    rm ~/.config/fastfetch/Image.png
  fi

  cp "$SelectedFastfetch" ~/.config/fastfetch/Image.png
  rm -rf ~/.cache/fastfetch/
else
  exit 1
fi
