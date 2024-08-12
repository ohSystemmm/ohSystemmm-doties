#  ____       _      ____  _        _   _            _
# / ___|  ___| |    / ___|| |_ __ _| |_(_) ___   ___| |__
# \___ \ / _ \ |____\___ \| __/ _` | __| |/ __| / __| '_ \
#  ___) |  __/ |_____|__) | || (_| | |_| | (__ _\__ \ | | |
# |____/ \___|_|    |____/ \__\__,_|\__|_|\___(_)___/_| |_|
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
