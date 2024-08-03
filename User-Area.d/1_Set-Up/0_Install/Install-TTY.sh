#  ___           _        _ _     _____ _______   __    _
# |_ _|_ __  ___| |_ __ _| | |   |_   _|_   _\ \ / /___| |__
#  | || '_ \/ __| __/ _` | | |_____| |   | |  \ V // __| '_ \
#  | || | | \__ \ || (_| | | |_____| |   | |   | |_\__ \ | | |
# |___|_| |_|___/\__\__,_|_|_|     |_|   |_|   |_(_)___/_| |_|
#
# by ohSystemmm <3 - 2024

source include/Assets.sh
source include/Colors.sh

# Pre-Warning
# SlideHeader "Warning!"
# NextSlide

# Installing essential Packages
# SlideHeader "Prerequisite Packages."
# NextSlide

# Introduction
# SlideHeader "Welcome!"
# NextSlide

# Verifying OS Compatibility
SlideHeader "Validating OS"
echo -e "Checking compatibility: "
echo -e "The ohSystemmm-doties are only made for Arch Linux & Hyprland"
echo -e "and do not support any forks or versions of ArchLinux.\n"
gum spin --spinner meter --title "Checking OS..." --show-output -- sleep 3
if [ -f "/etc/os-release" ]; then
    source /etc/os-release
    if [ "$ID" == "arch" ]; then
        echo "OS is Arch Linux."
    else
        echo "Unsupported OS."
    fi
else
    echo "Could Not Determine OS Version."
fi
NextSlide

# Licence
# SlideHeader "Licence."
# gum pager < /home/ohsystemmm/ohSystemmm-doties/User-Area.d/0_Info/0_Licence.txt
# NextSlide

# Terms of Service
# SlideHeader "Terms of Service."
# NextSlide

# Moving Folder to Home
# SlideHeader "Folder Location."
# NextSlide

# Setting up pacman
# SlideHeader "pacman."
# NextSlide

# Setting up yay
# SlideHeader "yay."
# NextSlide

# Setting up paru
# SlideHeader "paru."
# NextSlide

# Installing Required Packages
# SlideHeader "Required Packages."
# NextSlide

# Installing Optional & ohSystemmm Packages
# SlideHeader "Other Packages."
# NextSlide

# Changing Shell
# SlideHeader "Setting Shell."
# NextSlide

# Installing & Enabeling SDDM
# SlideHeader "Enabeling sddm." 
# NextSlide

# Installing & Enabeling tlp
# SlideHeader "Enabeling tlp."
# NextSlide

# Customizing Bootloader
# SlideHeader "Customizing Bootloader."
# NextSlide

# Setting up Timeshift
# SlideHeader "Setting up Timeshift."
# NextSlide

# Setting Default Apps
# SlideHeader "Setting Default Apps."
# NextSlide

# Setting up Hyprland DE
# SlideHeader "Setting up Hyprland."
# NextSlide

# Linking customized Packages
# SlideHeader "Linking Apps."
# NextSlide

# Cleaning cache, garbage collecting
# SlideHeader "Clean Up."
# NextSlide

# Rebooting
# SlideHeader "Done!"
# NextSlide
