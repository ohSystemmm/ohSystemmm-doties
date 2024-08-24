#   ___  ______     __    _ _     _       _                 _     
#  / _ \/ ___\ \   / /_ _| (_) __| | __ _| |_ ___  _ __ ___| |__  
# | | | \___ \\ \ / / _` | | |/ _` |/ _` | __/ _ \| '__/ __| '_ \ 
# | |_| |___) |\ V / (_| | | | (_| | (_| | || (_) | | _\__ \ | | |
#  \___/|____/  \_/ \__,_|_|_|\__,_|\__,_|\__\___/|_|(_)___/_| |_|
# 
# by ohSystemmm <3 - 2024

if [ -f /etc/os-release ]; then
  . /etc/os-release
  if grep -q "Arch Linux" /etc/os-release && [ "$ID" == "arch" ]; then
    echo "This system is running Arch Linux."
  else
    echo "This system is not running Arch Linux. (ID: $ID)"
    exit 1
  fi
else
  echo "This system is not running Arch Linux."
  exit 1
fi

if command -v pacman &>/dev/null; then
  echo "The pacman package manager is present."
  if pacman -Q archlinux-keyring &>/dev/null; then
    echo "Arch Linux Keyring found."
  else
    echo "This system is not running Arch Linux (archlinux-keyring not found)."
    exit 1
  fi
else
  echo "This system is not running Arch Linux (pacman not found)."
  exit 1
fi
