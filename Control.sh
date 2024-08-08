#   ____            _             _       _     
#  / ___|___  _ __ | |_ _ __ ___ | |  ___| |__  
# | |   / _ \| '_ \| __| '__/ _ \| | / __| '_ \ 
# | |__| (_) | | | | |_| | | (_) | |_\__ \ | | |
#  \____\___/|_| |_|\__|_|  \___/|_(_)___/_| |_|
#
# by ohSystemmm <3 - 2024

# Source Colors
source ~/ohSystemmm-doties/User-Area.d/1_Set-Up/0_Install/include/Colors.sh
source .control-assets/Check.sh
source .control-assets/Header.sh
source .control-assets/Options.sh

CheckPackages

# Main Menu
Header "Main Menu"
MainMenu=$(gum choose --cursor=" " \
  "Appearance Configuration"        \
  "Hyprland Configuration"          \
  "System Configuration"            \
  "Dotfiles Management"             \
  "Miscellaneous Settings"          \
  "Exit"
)

# Appearance Configuration
if [ "$MainMenu" == "Appearance Configuration" ]; then
  Header "Appearance Configuration"
  echo -e " ┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓ "
  echo -e " ┃  [0] Profile Picture         ┃ "
  echo -e " ┃  [1] Lock Screen             ┃ "
  echo -e " ┃  [2] Wallpaper Style         ┃ "
  echo -e " ┃  [3] Rofi Header             ┃ "
  echo -e " ┃  [4] Theme Design            ┃ "
  echo -e " ┃  [5] SDDM Background         ┃ "
  echo -e " ┠──────────────────────────────┨ "
  echo -e " ┃  [b] Go Back                 ┃ "
  echo -e " ┃  [q] Quick Exit              ┃ "
  echo -e " ┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛ "
  echo -e 
  read -n 1 -p "Select an option: " AppearanceConfiguration_Choice

# Hyprland Configuration
elif [ "$MainMenu" == "Hyprland Configuration" ]; then
  Header "Hyprland Configuration"
  echo -e " ┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓ "
  echo -e " ┃  [0] Display Settings        ┃ "
  echo -e " ┃  [1] Input Devices           ┃ "
  echo -e " ┃  [2] Waybar Configuration    ┃ "
  echo -e " ┃  [3] Language Preferences    ┃ "
  echo -e " ┃  [4] Window Management       ┃ "
  echo -e " ┠──────────────────────────────┨ "
  echo -e " ┃  [b] Go Back                 ┃ "
  echo -e " ┃  [q] Quick Exit              ┃ "
  echo -e " ┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛ "
  echo -e 
  read -n 1 -p "Select an option: " HyprlandConfiguration_Choice

# System Configuration
elif [ "$MainMenu" == "System Configuration" ]; then
  Header "System Configuration"
  echo -e " ┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓ "
  echo -e " ┃  [0] Unlock Database         ┃ "
  echo -e " ┃  [1] System Cleanup          ┃ "
  echo -e " ┃  [2] Configure Hostname      ┃ "
  echo -e " ┃  [3] Update GRUB             ┃ "
  echo -e " ┃  [4] Restart SDDM            ┃ "
  echo -e " ┃  [5] System Diagnosis        ┃ "
  echo -e " ┠──────────────────────────────┨ "
  echo -e " ┃  [b] Go Back                 ┃ "
  echo -e " ┃  [q] Quick Exit              ┃ "
  echo -e " ┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛ "
  echo -e 
  read -n 1 -p "Select an option: " SystemConfiguration_Choice

# Dotfiles Management
elif [ "$MainMenu" == "Dotfiles Management" ]; then
  Header "Dotfiles Management"
  echo -e " ┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓ "
  echo -e " ┃  [0] Terminal Emulator       ┃ "
  echo -e " ┃  [1] Shell Configuration     ┃ "
  echo -e " ┃  [2] Web Browser             ┃ "
  echo -e " ┃  [3] Messaging App           ┃ "
  echo -e " ┃  [4] Music Player            ┃ "
  echo -e " ┃  [5] File Manager            ┃ "
  echo -e " ┃  [6] Text Editor             ┃ "
  echo -e " ┃  [7] Screenshot Utility      ┃ "
  echo -e " ┠──────────────────────────────┨ "
  echo -e " ┃  [b] Go Back                 ┃ "
  echo -e " ┃  [q] Quick Exit              ┃ " 
  echo -e " ┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛ "
  echo -e 
  read -n 1 -p "Select an option: " DotfilesManagement_Choice

# Miscellaneous Settings
elif [ "$MainMenu" == "Miscellaneous Settings" ]; then
  Header "Miscellaneous Settings"
  echo -e " ┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓ "
  echo -e " ┃  [0] Force System Behavior   ┃ "
  echo -e " ┃  [1] Reinstall Dotfiles      ┃ "
  echo -e " ┃  [2] Update Dotfiles         ┃ "
  echo -e " ┃  [3] Reset to Defaults       ┃ "
  echo -e " ┃  [4] Remove Dotfiles         ┃ "
  echo -e " ┠──────────────────────────────┨ "
  echo -e " ┃  [b] Go Back                 ┃ "
  echo -e " ┃  [q] Quick Exit              ┃ " 
  echo -e " ┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛ "
  echo -e 
  read -n 1 -p -e "Select an option: " MiscellaneousSettings_Choice

# Exit
else
  exit 1
fi

