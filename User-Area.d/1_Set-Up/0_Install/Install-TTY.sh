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
echo -e "These dotfiles are specifically designed for Arch Linux"
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
Next


# Installing First Required Packages
echo -e -n "\033[1;35m"
cat include/headers/First-Packages.txt
echo -e "\033[0m\n"
Next

# Moving Dotfile Folder

# echo "Moving Folder To Home"
# ./include/location-check/Location-Check.sh
# Include Colors
# source ~/ohSystemmm-doties/System-Area.d/0_Global-Config/Shell-Colors.sh

# Installing 
# echo $Red
# Header


# Install Packages
# cd include/packages
# ./0_Install-Required.sh
# ./1_Install-Optional.sh
# ./2_Install-ohSystemmm.sh
