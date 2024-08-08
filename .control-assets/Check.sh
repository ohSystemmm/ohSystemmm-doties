#   ____ _               _          _     
#  / ___| |__   ___  ___| | __  ___| |__  
# | |   | '_ \ / _ \/ __| |/ / / __| '_ \ 
# | |___| | | |  __/ (__|   < _\__ \ | | |
#  \____|_| |_|\___|\___|_|\_(_)___/_| |_|
#
#  by ohSystemmm <3 - 2024

# Check if 'figlet' or 'gum' command is available
CheckPackages() {
  if ! command -v figlet >/dev/null 2>&1 || ! command -v gum >/dev/null 2>&1; then
    clear
    echo -e -n "\nThe required packages '${BYellow}figlet${Normal}' and '${BYellow}gum${Normal}' are ${BRed}not${Normal} installed. Do you want to install them [${BGreen}y${Normal}/${BRed}n${Normal}]: "
    read -r choice
    choice=$(echo "$choice" | tr '[:upper:]' '[:lower:]')
    if [ $choice == "y" ]; then
      if sudo pacman -S --needed figlet gum --noconfirm > /dev/null 2>&1; then
        echo -e "Packages '${BYellow}figlet${Normal}' and '${BYellow}gum${Normal}' have been ${BGreen}successfully${Normal} installed."
        sleep 5
      else
        echo -e "${BRed}Error${BRed}: Failed to install '${BYellow}figlet${Normal}' and '${BYellow}gum${Normal}'.\n"
        exit 1
      fi
    else
      echo -e "The Control script requires '${BYellow}figlet${Normal}' and '${BYellow}gum${Normal}' to proceed. Exiting.\n"
      exit 1
    fi
  fi
}
