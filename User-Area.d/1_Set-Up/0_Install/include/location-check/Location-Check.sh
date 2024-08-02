#  _                    _   _                    ____ _               _          _
# | |    ___   ___ __ _| |_(_) ___  _ __        / ___| |__   ___  ___| | __  ___| |__
# | |   / _ \ / __/ _` | __| |/ _ \| '_ \ _____| |   | '_ \ / _ \/ __| |/ / / __| '_ \
# | |__| (_) | (_| (_| | |_| | (_) | | | |_____| |___| | | |  __/ (__|   < _\__ \ | | |
# |_____\___/ \___\__,_|\__|_|\___/|_| |_|      \____|_| |_|\___|\___|_|\_(_)___/_| |_|
#
# by ohSystemmm <3 - 2024

cd /
DotiesPath="/$(fd --type d ohSystemmm-doties)"

Destination="$HOME"

if [ -n "$DotiesPath" ]; then
  base_name=$(basename "$DotiesPath")
  destination_path="$HOME/$base_name"
  if [ "$DotiesPath" != "$destination_path" ] && [ ! -e "$destination_path" ]; then
    mv "$DotiesPath" "$HOME/"
    echo "Moved $DotiesPath to $HOME/"
  else
    echo "Nothing to do."
  fi
else
  echo "Error Dotfile-Folder Not Found."
fi
