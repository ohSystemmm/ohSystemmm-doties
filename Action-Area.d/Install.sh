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


