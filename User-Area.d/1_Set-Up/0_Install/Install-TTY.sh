#  ___           _        _ _     _____ _______   __    _
# |_ _|_ __  ___| |_ __ _| | |   |_   _|_   _\ \ / /___| |__
#  | || '_ \/ __| __/ _` | | |_____| |   | |  \ V // __| '_ \
#  | || | | \__ \ || (_| | | |_____| |   | |   | |_\__ \ | | |
# |___|_| |_|___/\__\__,_|_|_|     |_|   |_|   |_(_)___/_| |_|
#
# by ohSystemmm <3 - 2024

source include/Assets.sh
source include/Colors.sh
cd /

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
echo -e "and do not support any forks or versions of Arch Linux.\n"
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

# Moving Folder to Home
SlideHeader "Folder Location."
DotiesPath="/$(fd --type d ohSystemmm-doties)"
Destination="$HOME"
if [ -n "$DotiesPath" ]; then
  base_name=$(basename "$DotiesPath")
  destination_path="$HOME/$base_name"
  if [ "$DotiesPath" != "$destination_path" ] && [ ! -e "$destination_path" ]; then
    mv "$DotiesPath" "$HOME/"
    echo "Moved $DotiesPath to $HOME/"
    cd ~/ohSystemmm-doties/
  else
    echo "Nothing to do."
    cd ~/ohSystemmm-doties/
  fi
else
  echo "Error Dotfile-Folder Not Found."
  exit 1
fi
NextSlide

# Licence
SlideHeader "License."
echo -e "Please review the License before proceeding.\n"
if gum confirm "View License" --affirmative "Open" --negative "Skip"; then
    gum pager < User-Area.d/0_Info/0_Licence.txt
else
    echo "Skipped."
fi
NextSlide

# Terms of Service
# SlideHeader "Terms of Service."
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
