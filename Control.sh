#   ____            _             _       _     
#  / ___|___  _ __ | |_ _ __ ___ | |  ___| |__  
# | |   / _ \| '_ \| __| '__/ _ \| | / __| '_ \ 
# | |__| (_) | | | | |_| | | (_) | |_\__ \ | | |
#  \____\___/|_| |_|\__|_|  \___/|_(_)___/_| |_|
#
# by ohSystemmm <3 - 2024

# Source Colors
source ~/ohSystemmm-doties/User-Area.d/1_Set-Up/0_Install/include/Colors.sh

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

Header() {
  clear
  local Message=$1
  echo -e -n "${BCyan}"
  figlet -w 200 "$Message"
  echo -e "\nby ohSystemmm <3 - 2024"
  echo -e -n "${Normal}\n"
}

CheckPackages
Header "Control Center"

MainMenu=$(gum choose --cursor=" " \
  "Change Wallpaper Type" \
  "Set Wallpaper" \
  "Set Diashow Folder" \
  "Exit")

case $MainMenu in 
  "Change Wallpaper Type")
    Type=$(gum choose --cursor=" " \
      "Static" \
      "Diashow")
    case $Type in
      "Static")
        echo "static" > ~/ohSystemmm-doties/System-Area.d/5_Temp-Files/Wallpaper-Type.sh
      ;;
      "Diashow")
        echo "diashow" > ~/ohSystemmm-doties/System-Area.d/5_Temp-Files/Wallpaper-Type.sh 
        source ~/ohSystemmm-doties/System-Area.d/4_Custom-Scripts/Wallpaper-Engine.sh &
      ;;
    esac
  ;;
  "Set Wallpaper")
    source ~/ohSystemmm-doties/System-Area.d/4_Custom-Scripts/Select/Select_Wallpaper.sh
    exit 1
  ;;  
  "Set Diashow Folder")
    source ~/ohSystemmm-doties/System-Area.d/4_Custom-Scripts/Select/Select_Diashow-Folder.sh
    exit 1
  ;; 
  "Exit")
    exit 1
  ;;
esac

