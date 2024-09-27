#  __  __                _____     _     _               _     
# |  \/  | _____   _____|  ___|__ | | __| | ___ _ __ ___| |__  
# | |\/| |/ _ \ \ / / _ \ |_ / _ \| |/ _` |/ _ \ '__/ __| '_ \ 
# | |  | | (_) \ V /  __/  _| (_) | | (_| |  __/ | _\__ \ | | |
# |_|  |_|\___/ \_/ \___|_|  \___/|_|\__,_|\___|_|(_)___/_| |_|
# 
# by ohSystemmm <3 - 2024

cd /
DotiesPath="/$(fd --type d ohSystemmm-doties)"
echo -e "Dotfiles detected."

Destination="$HOME"
if [ -n "$DotiesPath" ]; then
  base_name=$(basename "$DotiesPath")
  destination_path="$HOME/$base_name"
  
  if [ "$DotiesPath" != "$destination_path" ] && [ ! -e "$destination_path" ]; then
    mv "$DotiesPath" "$HOME/"
    echo -e "Moved $DotiesPath to $HOME/"
    cd ~/ohSystemmm-doties/
  
  else
    echo -e "No action needed."
    cd ~/ohSystemmm-doties/
  fi

else
  echo -e "\n${BRed}Error: Dotfile Folder Not Found.$Normal"
  exit 1
fi

cd 
