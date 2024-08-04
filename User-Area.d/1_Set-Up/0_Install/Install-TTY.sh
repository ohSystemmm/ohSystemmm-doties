#  ___           _        _ _     _____ _______   __    _
# |_ _|_ __  ___| |_ __ _| | |   |_   _|_   _\ \ / /___| |__
#  | || '_ \/ __| __/ _` | | |_____| |   | |  \ V // __| '_ \
#  | || | | \__ \ || (_| | | |_____| |   | |   | |_\__ \ | | |
# |___|_| |_|___/\__\__,_|_|_|     |_|   |_|   |_(_)___/_| |_|
#
# by ohSystemmm <3 - 2024

source include/Assets.sh
source include/Colors.sh
source include/Packages.sh
cd /
clear
echo -e "\n${BYellow}Updating System before starting.${Normal}\n"
sudo pacman -Syyu --noconfirm
sudo pacman -S --needed figlet gum fd --noconfirm

# Pre-Warning
SlideHeader "Warning!"
echo -e "Please ensure you back up your configurations and important files as some"
echo -e "may be overwritten or deleted. The ohSystemmm-doties team is not responsible"
echo -e "for any data loss. It is recommended to run this script on a fresh Arch Linux"
echo -e "installation without any desktop environment installed. Carefully read the"
echo -e "introductions to understand the processes being executed. If something fails,"
echo -e "check the installation log at 'path/to/log.txt'. Please remain at your device"
echo -e "until the installation is complete and ensure a stable internet connection."
echo -e "\nLet's get started."
NextSlide

# Introduction
SlideHeader "Welcome!"
NextSlide

# Verifying OS Compatibility
SlideHeader "Validating OS"
echo -e "Checking compatibility: "
echo -e "The ohSystemmm-doties are designed specifically for Arch Linux & Hyprland"
echo -e "and do not support any forks or derivatives of Arch Linux.\n"
gum spin --spinner meter --title "Checking OS..." --show-output -- sleep 2
if [ -f /etc/os-release ]; then
  . /etc/os-release
  if grep -q "Arch Linux" /etc/os-release && [ "$ID" == "arch" ]; then
    echo "This system is running Arch Linux."
  else
    echo "This system is not running Arch Linux. (ID: $ID)"
    exit 1
  fi
else
  echo "This system is not running Arch Linux."
  exit 1
fi
if command -v pacman &>/dev/null; then
  echo "The pacman package manager is present."
  if pacman -Q archlinux-keyring &>/dev/null; then
    echo "All checks passed: This system is running Arch Linux."
  else
    echo "This system is not running Arch Linux (archlinux-keyring not found)."
    exit 1
  fi
else
  echo "This system is not running Arch Linux (pacman not found)."
  exit 1
fi
NextSlide

# Moving Folder to Home
SlideHeader "Folder Location."
gum spin --spinner meter --title "Locating Folder..." --show-output -- sleep 1
DotiesPath="/$(fd --type d ohSystemmm-doties)"
echo -e "Dotfiles detected."
Destination="$HOME"
if [ -n "$DotiesPath" ]; then
  base_name=$(basename "$DotiesPath")
  destination_path="$HOME/$base_name"
  if [ "$DotiesPath" != "$destination_path" ] && [ ! -e "$destination_path" ]; then
    mv "$DotiesPath" "$HOME/"
    echo -e "Moved $DotiesPath to $HOME/"
    cd ~/ohSystemmm-doties/
  else
    echo -e "No action needed."
    cd ~/ohSystemmm-doties/
  fi
else
  echo -e "\n${BRed}Error: Dotfile Folder Not Found.$Normal"
  exit 1
fi
NextSlide

# License
SlideHeader "License."
cat User-Area.d/0_Info/0_License.txt
echo -e "$BYellow\nBy proceeding, you accept the license agreement.$Normal"
NextSlide

# Terms of Service
SlideHeader "Terms of Service."
NextSlide

# Setting up pacman
SlideHeader "Configuring pacman."
echo -e "Configuring pacman: enabling multilib, setting maximum downloads to 10,"
echo -e "enabling colors, and activating the easter egg.\n"
cd ~/ohSystemmm-doties/System-Area.d/0_Global-Config
sudo cp -f pacman.conf /etc/pacman.conf
cd ~/ohSystemmm-doties/
echo -e "\n${BGreen}Configuration Complete.${Normal}"
NextSlide

# Setting up yay
SlideHeader "Installing yay."
echo -e "Downloading and installing the AUR package manager 'yay'.\n"
git clone https://aur.archlinux.org/yay.git
cd yay
makepkg -si --noconfirm
cd ..
rm -rf yay/
echo -e "\n${BGreen}Installation Complete.${Normal}"
NextSlide

# Setting up paru
SlideHeader "Installing paru."
echo -e "Installing the package manager 'paru'.\n"
yay -S --needed paru parui --noconfirm
echo -e "\n${BGreen}Installation Complete.${Normal}"
NextSlide

# Installing Required Packages
SlideHeader "Installing Required Packages."
echo -e "Installing all necessary packages. This may take some time.\n"
gum spin --spinner meter --title "Installing Required Packages..." --show-output -- sleep 3
InstallRequired
NextSlide

# Installing Optional & ohSystemmm Packages
SlideHeader "Installing Additional Packages."
echo -e "Installing selected optional packages which enhance user experience. These"
echo -e "are not required by the system but are recommended. The ohSystemmm packages"
echo -e "include development tools and utilities that help set up a complete desktop.\n"
options=("Skip" "Optional" "ohSystemmm")
selected=$(gum choose --no-limit "${options[@]}")
IFS=$'\n' read -r -d '' -a selected_array <<< "$selected"
for option in "${selected_array[@]}"; do
  case "$option" in
    "Skip")
      break
      echo -e "Skipped."
      ;;
    "Optional")
      gum spin --spinner meter --title "Installing Optional Packages..." --show-output -- sleep 1.5
      echo -e "\nDownloading & Installing Optional Packages\n"
      sleep 2
      InstallOptional
      echo -e "\n${BGreen}Installation Complete.${Normal}"
      ;;
    "ohSystemmm")
      gum spin --spinner meter --title "Installing ohSystemmm Packages..." --show-output -- sleep 1.5
      echo -e "\nDownloading & Installing ohSystemmm Packages\n"
      sleep 2
      InstallohSystemmm
      echo -e "\n${BGreen}Installation Complete.${Normal}"
      ;;
  esac
done
NextSlide

# Changing Shell
SlideHeader "Choosing Default Shell."
echo -e "Select your preferred shell. Bash is the default and basic; Fish offers"
echo -e "user-friendly autocompletion; Zsh is recommended for advanced users.\n"
choice=$(gum choose --cursor="> " --cursor-prefix="* " "bash" "fish" "zsh")
case $choice in
  "bash")
    echo -e "Setting default shell to bash."
    chsh -s /usr/bin/bash
    echo -e "\n${BGreen}Default Shell Set.${Normal}"
    ;;
  "fish")
    echo -e "Setting default shell to fish."
    chsh -s /usr/bin/fish
    echo -e "\n${BGreen}Default Shell Set.${Normal}"
    ;;
  "zsh")
    echo -e "Setting default shell to zsh."
    chsh -s /usr/bin/zsh
    echo -e "\n${BGreen}Default Shell Set.${Normal}"
    ;;      
esac    
NextSlide

# Installing & Enabling SDDM
SlideHeader "Installing and Enabling SDDM."
echo -e "Installing and enabling the Simple Desktop Display Manager (SDDM).\n"
sudo pacman -S --needed sddm --noconfirm
echo -e "\nEnabling SDDM service."
sudo systemctl enable sddm.service
echo -e "\n${BGreen}SDDM Installed and Enabled.${Normal}"
NextSlide

# Installing & Enabling TLP
SlideHeader "Installing and Configuring TLP."
echo -e "You can choose to skip or install TLP for laptop power management.\n"
tlp=$(gum choose --cursor="> " --cursor-prefix="* " "Skip" "Laptop")
case $tlp in
  "Skip")
    break    
    echo -e "Skipped."
    ;;
  "Laptop")
    echo -e "Installing TLP for power management.\n"
    sudo pacman -S --needed tlp --noconfirm
    cd ~/ohSystemmm-doties/System-Area.d/0_Global-Config
    echo -e "\nConfiguring maximum battery capacity to 80%."
    sudo cp -f tlp.conf /etc/tlp.conf
    cd ~/ohSystemmm-doties/
    echo -e "\n${BGreen}TLP Installed and Configured.${Normal}"
    ;;
esac    
NextSlide

# Customizing Bootloader
SlideHeader "Customizing Bootloader."
gum spin --spinner meter --title "Checking Bootloader..." --show-output -- sleep 2

if [ -f /boot/grub/grub.cfg ]; then
  echo "GRUB configuration file found: /boot/grub/grub.cfg"
  echo "It appears that GRUB is being used as the bootloader."
  bootloader="grub"
elif pacman -Q grub &>/dev/null; then
  echo "GRUB package is installed."
  echo "It appears that GRUB is being used as the bootloader."
  bootloader="grub"
elif command -v bootctl &>/dev/null; then
  if bootctl status | grep -q "grub"; then
    echo "GRUB boot loader is found in bootctl status."
    echo "It appears that GRUB is being used as the bootloader."
    bootloader="grub"
  else
    echo "GRUB does not appear to be the bootloader on this system."
    bootloader="not_grub"
  fi
else
  echo "GRUB does not appear to be the bootloader on this system."
  bootloader="not_grub"
fi
if [ "$bootloader" = "grub" ]; then
  echo -e "\nPerforming GRUB-specific tasks..."
else
  echo -e "\nSkipping GRUB-specific tasks."
fi
NextSlide

# Setting Default Apps
SlideHeader "Configuring Default Apps."
NextSlide

# Setting up Hyprland DE
SlideHeader "Setting up Hyprland."
NextSlide

# Linking Customized Packages
SlideHeader "Linking Customized Packages."
NextSlide

# Credits
SlideHeader "Credits."
cat User-Area.d/0_Info/1_Credits.txt
NextSlide

# Cleaning Cache, Garbage Collecting
SlideHeader "Cleanup."
echo -e "Clearing package manager caches."
sudo pacman -Scc --noconfirm
yay -Scc --noconfirm
paru -Scc --noconfirm
echo -e "${BGreen}Cleanup Complete.${Normal}"
NextSlide

# Rebooting
SlideHeader "Installation Complete!"
echo -e "The installation process is complete! You may now reboot your system.\n"
if gum confirm "Reboot" --affirmative "Confirm" --negative "Exit"; then
  echo -e "Rebooting the system!"
  reboot
else
  echo -e "${BGreen}Installation finished.${Normal}\n"
  exit 1
fi
