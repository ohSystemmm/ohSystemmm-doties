#   ____            _             _       _     
#  / ___|___  _ __ | |_ _ __ ___ | |  ___| |__  
# | |   / _ \| '_ \| __| '__/ _ \| | / __| '_ \ 
# | |__| (_) | | | | |_| | | (_) | |_\__ \ | | |
#  \____\___/|_| |_|\__|_|  \___/|_(_)___/_| |_|
#
# by ohSystemmm <3 - 2024

# Source color definitions
source ~/ohSystemmm-doties/User-Area.d/1_Set-Up/0_Install/include/Colors.sh

# Figlet check
if ! command -v figlet &> /dev/null; then
  echo -e "\n${BRed}Figlet is required but not installed. Please install it and try again.${Normal}\n"
  exit 1
fi

Header() {
  clear
  local Message=$1
  echo -e -n "${BCyan}"
  figlet -w 200 "$Message"
  echo -e "\nby ohSystemmm <3 - 2024"
  echo -e -n "${Normal}\n"
}

showMainMenu() {
  Header "Main Menu"
  gum choose --cursor=" " \
    "Cosmetic Settings" \
    "Default Settings" \
    "System Settings" \
    "Exit"
}

showCosmeticMenu() {
  Header "Cosmetic Menu"
  gum choose --cursor=" " \
    "Option 0" \
    "Option 1" \
    "Back" \
    "Exit"
}

showDefaultMenu() {
  Header "Defaults Menu"
  gum choose --cursor=" " \
    "Option 0" \
    "Option 1" \
    "Back" \
    "Exit"
}

showSystemMenu() {
  Header "System Menu"
  gum choose --cursor=" " \
    "Option 0" \
    "Option 1" \
    "Back" \
    "Exit"
}

# Main loop
while true; do
  MainMenu=$(showMainMenu)
  
  case $MainMenu in 
    "Cosmetic Settings")
      while true; do
        CosmeticMenu=$(showCosmeticMenu)
        case $CosmeticMenu in
          "Back") break ;;
          "Exit") exit 0 ;;  # Change to exit 0 to indicate normal exit
          *) echo "Cosmetic menu option selected: $CosmeticMenu" ;;
        esac
      done
      ;;
      
    "Default Settings")
      while true; do
        DefaultMenu=$(showDefaultMenu)
        case $DefaultMenu in
          "Back") break ;;
          "Exit") exit 0 ;;  # Change to exit 0 to indicate normal exit
          *) echo "Default menu option selected: $DefaultMenu" ;;
        esac
      done
      ;;
      
    "System Settings")
      while true; do
        SystemMenu=$(showSystemMenu)
        case $SystemMenu in
          "Back") break ;;
          "Exit") exit 0 ;;  # Change to exit 0 to indicate normal exit
          *) echo "System menu option selected: $SystemMenu" ;;
        esac
      done
      ;;
    
    "Exit")
      exit 0  # Changed to exit 0 for consistent exit code
      ;;
    
    *)
      echo "Invalid option, exiting."
      exit 1
      ;;
  esac
done

