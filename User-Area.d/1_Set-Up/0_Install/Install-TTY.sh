#  ___           _        _ _     _____ _______   __    _
# |_ _|_ __  ___| |_ __ _| | |   |_   _|_   _\ \ / /___| |__
#  | || '_ \/ __| __/ _` | | |_____| |   | |  \ V // __| '_ \
#  | || | | \__ \ || (_| | | |_____| |   | |   | |_\__ \ | | |
# |___|_| |_|___/\__\__,_|_|_|     |_|   |_|   |_(_)___/_| |_|
#
# by ohSystemmm <3 - 2024

Next() {
  sleep 1
  echo -n -e "\nPress Enter to continue..."
  read -r
  clear
}

# Intoduction
clear
echo -e -n "\033[1;35m"
cat include/headers/Welcome.txt
echo -e "\033[0m\n"
echo -e "Welcome to the Installation Process, @\033[1;35m${USER}\033[0m!\n"
echo -e "This script will guide you through the installation"
echo -e "of the ohSystemmm-doties. Dotfiles are configuration"
echo -e "files that customize and streamline your environment,"
echo -e "making your system setup more efficient and tailored"
echo -e "to your preferences.\n"
echo -e "By using these dotfiles, you'll benefit from a more"
echo -e "consistent and optimized workflow, with settings and"
echo -e "customizations for your shell, editor, and other tools."
echo -e "Please ensure you follow the guidelines carefully and"
echo -e "review any options presented during the process.\n"
echo -e "With that being said, let's get started!"
Next

# Checking OS
echo -e -n "\033[1;35m"
cat include/headers/Checking-OS.txt
echo -e "\033[0m\n"
echo -e "These dotfiles are specifically designed for Arch Linux &"
echo -e "Hyprland.If you're using a different distribution, you're"
echo -e "welcome to adapt and use these configurations as needed.\n"
echo -e "Checking the operating system:"
./include/checking-os/Checking-OS.sh
Next

# Legal Agreements
echo -e -n "\033[1;35m"
cat include/headers/Legal-Agreements.txt
echo -e "\033[0m\n"
echo -e "Please make sure to read the following files:"
echo -e "  - License"
echo -e "  - Terms of Service"
echo -e "  - User Manual"
echo -e "These files are located in: ~/ohSystemmm-doties/User-Area.d/0_Info/"
sleep 1
echo -n -e "\nAccept & continue..."
read -r
clear

# Setting Up Pacman
echo -e -n "\033[1;35m"
cat include/headers/Set-Pacman.txt
echo -e "\033[0m\n"
echo -e "Setting Pacman Up."
cd ../../../
cd System-Area.d/0_Global-Config/
sudo cp -f pacman.conf /etc/pacman.conf
cd ../../
cd User-Area.d/1_Set-Up/0_Install
echo -e "Done\n"
Next

# Installing First Required Packages
echo -e -n "\033[1;35m"
cat include/headers/First-Packages.txt
echo -e "\033[0m\n"
echo -e "We will now install some required packages"
echo -e "that are essential for the installation process."
echo -e "\nThis includes:"
echo -e "- fd"
echo -e "- git"
echo -e "- yay"
echo -e "- paru"
echo -e "- figlet\n"
echo -e "Updating System."
sudo pacman -Syyu --noconfirm
echo -e "Installing Packages"
sudo pacman -S --needed base-devel git --noconfirm
sudo pacman -S --needed fd figlet --noconfirm
git clone https://aur.archlinux.org/yay.git
cd yay
makepkg -si --noconfirm
cd ..
rm -rf yay/
yay -S paru
echo -e "Done."
Next

# Moving Dotfile Folder
echo -e -n "\033[1;35m"
figlet -w 100 Moving-Folder
echo -e "by ohSystemmm <3 - 2024\033[0m\n\n"
./include/location-check/Location-Check.sh
Next

# Include Colors
source ~/ohSystemmm-doties/System-Area.d/0_Global-Config/Shell-Colors.sh

# Install Packages
echo -e -n "$BPurple"
figlet -w 100 Install-Packages
echo -e "by ohSystemmm <3 - 2024($Normal)\n"
cd include/packages
./0_Install-Required.sh
./1_Install-Optional.sh
./2_Install-ohSystemmm.sh
cd ../..
Next

# Setting up TLP
# LINKING Configs
# 
# CLEANUP Clean Cache
