#  ___           _        _ _       _     
# |_ _|_ __  ___| |_ __ _| | |  ___| |__  
#  | || '_ \/ __| __/ _` | | | / __| '_ \ 
#  | || | | \__ \ || (_| | | |_\__ \ | | |
# |___|_| |_|___/\__\__,_|_|_(_)___/_| |_|
# 
# by ohSystemmm <3 - 2024

source assets/Colors.sh
source assets/Assets.sh
source assets/Packages.sh

: <<'COMMENT'
# Updating and installing the necessary packages
clear
echo -e "\n${BYellow}Updating System before starting.${Normal}\n"
sudo pacman -Syyu --noconfirm
sudo pacman -S --needed figlet gum fd --noconfirm
sleep 2


# Pre-Warning
SlideHeader "Warning"
echo -e "Please ensure you back up your configurations and important files as some    "
echo -e "may be overwritten or deleted. The ohSystemmm-doties team is not responsible "
echo -e "for any data loss. It is recommended to run this script on a fresh Arch Linux"
echo -e "installation without any desktop environment installed. Carefully read the   "
echo -e "introductions to understand the processes being executed. If something fails,"
echo -e "check the installation log at 'path/to/log.txt'. Please remain at your device"
echo -e "until the installation is complete and ensure a stable internet connection.  "
echo -e "\nLet's get started."
NextSlide


# Welcoming
SlideHeader "Welcome"
echo -e "Welcome to ohSystemmm-doties. Thank you for selecting our setup. The           "
echo -e "installation process will commence following this slide. Should you            "
echo -e "encounter any issues during the setup, please attempt to abort and restart     "
echo -e "the installation, as this often resolves common problems.                      "
echo -e ""                                                                              
echo -e "If the issue persists and appears to be related to the dotfiles, please feel   "
echo -e "free to reach out for assistance. You can contact me via my GitHub profile     "
echo -e "at ${Blue}https://github.com/ohSystemmm${Normal}. We appreciate your choice of "
echo -e "ohSystemmm-doties and are committed to ensuring a smooth and efficient setup   "
echo -e "process."
NextSlide


# Verifying OS Compatibility
SlideHeader "Validating OS"
echo -e "Checking compatibility: "
echo -e "The ohSystemmm-doties are designed specifically for Arch Linux & Hyprland"
echo -e "and do not support any forks or derivatives of Arch Linux.\n"
gum spin --spinner dot --title "Checking OS..." --show-output -- sleep 1.5
source assets/OSValidator.sh
NextSlide


# Moving Folder to $HOME
SlideHeader "Folder Location"
echo -e "Checking Folder Location:"
echo -e "Please ensure that ohSystemmm-doties is located in your HOME directory."
echo -e "If it isn’t, we will automatically relocate it for you.\n"
gum spin --spinner dot --title "Locating Folder..." --show-output -- sleep 1.5
source assets/MoveFolder.sh
NextSlide


# License
SlideHeader "License"
(cat Information/LICENSE)
echo -e "$BYellow\nBy proceeding, you accept the license agreement.$Normal"
NextSlide


# Setting up pacman
SlideHeader "pacman"
echo -e "Configuring pacman.\n"
sudo cp -f ~/ohSystemmm-doties/System-Area.d/0_Global-Config/pacman.conf /etc/pacman.conf
sudo pacman -Syyu
echo -e "\n${BGreen}Done.${Normal}"
NextSlide


# Setting up yay
SlideHeader "yay"
echo -e "Downloading and installing the AUR package manager 'yay'.\n"
git clone https://aur.archlinux.org/yay.git && cd yay && makepkg -si --noconfirm && cd .. && rm -rf yay/
echo -e "\n${BGreen}Installation Complete.${Normal}"
NextSlide


# Setting up paru
SlideHeader "paru"
echo -e "Installing the package manager 'paru'.\n"
yay -S --needed paru parui --noconfirm
echo -e "\n${BGreen}Installation Complete.${Normal}"
NextSlide


# Installing Required Packages
SlideHeader "Required Packages"
echo -e "Installing all necessary packages. This may take some time.\n"
gum spin --spinner dot --title "Installing Required Packages..." --show-output -- sleep 1.5
InstallRequired
NextSlide


# Installing Optional Packages
SlideHeader "Optional Packages"
echo -e "Installing selected optional packages which enhance user experience. These"
echo -e "are not required by the system but are recommended. The ohSystemmm packages"
echo -e "include development tools and utilities that help set up a complete desktop.\n"
Packages=$(gum choose --no-limit "Skip" "Optional" "ohSystemmm")
for Packages in $Packages; do
  case $Packages in
    "Skip")
      echo "Skipping."
      break
    ;;
    "Optional")
      echo "Installing optional packages..."
      InstallOptional
    ;;
    "ohSystemmm")
      echo "Installing ohSystemmm packages..."
      InstallohSystemmm
    ;;
  esac
done
NextSlide


# Changing Default Shell
SlideHeader "Default Shell"
echo -e "Select your preferred shell. Bash is the default and basic; Fish offers"
echo -e "user-friendly autocompletion; Zsh is recommended for advanced users.\n"
Shell=$(gum choose --cursor="> " --cursor-prefix="* " "bash" "fish" "zsh")
case $Shell in
  "bash")
    echo -e "Setting default shell to bash."
    chsh -s /usr/bin/bash
    echo -e "\n${BGreen}New default Shell Set.${Normal}"
  ;;
  "fish")
    echo -e "Setting default shell to fish."
    chsh -s /usr/bin/fish
    echo -e "\n${BGreen}New default Shell Set.${Normal}"
  ;;
  "zsh")
    echo -e "Setting default shell to zsh."
    chsh -s /usr/bin/zsh
    echo -e "\n${BGreen}New default Shell Set.${Normal}"
  ;;      
esac    
NextSlide


# Installing & Enabling SDDM
SlideHeader "SDDM"
echo -e "Installing and enabling the Simple Desktop Display Manager (SDDM).\n"
sudo pacman -S --needed sddm --noconfirm
echo -e "\nEnabling SDDM Service."
sudo systemctl enable sddm.service
source ../System-Area.d/4_Custom-Scripts/SyncSddm.sh
echo -e "\n${BGreen}SDDM Installed and Enabled.${Normal}"
NextSlide


# Installing & Enabling TLP
SlideHeader "TLP"
echo -e "You can choose to skip or install TLP for laptop power management.\n"
source assets/SetTLP.sh
NextSlide
COMMENT


# Bootloader
SlideHeader "Bootloader"
gum spin --spinner meter --title "Checking Bootloader..." --show-output -- sleep 1.5
source assets/Bootloader.sh
NextSlide
