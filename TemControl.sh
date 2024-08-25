#   ____            _             _       _     
#  / ___|___  _ __ | |_ _ __ ___ | |  ___| |__  
# | |   / _ \| '_ \| __| '__/ _ \| | / __| '_ \ 
# | |__| (_) | | | | |_| | | (_) | |_\__ \ | | |
#  \____\___/|_| |_|\__|_|  \___/|_(_)___/_| |_|
#
# by ohSystemmm <3 - 2024

# Source Colors
source ~/ohSystemmm-doties/Action-Area.d/assets/Colors.sh

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
echo -e ""
echo -e ""
MainMenu=$(gum choose --cursor=" " \
  "Change Wallpaper Type" \
  "Set Wallpaper" \
  "Set Diashow Folder" \
  "Set new Waifu" \
  "Set new Avatar" \
  "Set new Grub Theme" \
  "Set new Design" \
  "Exit"\
)

case $MainMenu in 
  "Change Wallpaper Type")
    source ~/ohSystemmm-doties/System-Area.d/4_Custom-Scripts/Selectors/WpType/Sel-WpType.sh
    exit 1
  ;;
  "Set Wallpaper")
    source ~/ohSystemmm-doties/System-Area.d/4_Custom-Scripts/Selectors/Background/Sel-Wallpaper.sh
    exit 1
  ;;  
  "Set Diashow Folder")
    source ~/ohSystemmm-doties/System-Area.d/4_Custom-Scripts/Selectors/Background/Sel-Diashow.sh
    exit 1
  ;; 
  "Set new Waifu")
    source ~/ohSystemmm-doties/System-Area.d/4_Custom-Scripts/Selectors/Fastfetch/Sel-Fastfetch.sh
    exit 1
  ;;
  "Set new Avatar")
    source ~/ohSystemmm-doties/System-Area.d/4_Custom-Scripts/Selectors/Avatar/Sel-Avatar.sh
    exit 1
  ;;
  "Set new Grub Theme")
    source ~/ohSystemmm-doties/System-Area.d/4_Custom-Scripts/Selectors/Grub/Sel-Grub.sh
  ;;
  "Set new Design")
    source ~/ohSystemmm-doties/System-Area.d/4_Custom-Scripts/Selectors/Design/Sel-Design.sh
  ;;
  "Exit")
    exit 1
  ;;
esac

