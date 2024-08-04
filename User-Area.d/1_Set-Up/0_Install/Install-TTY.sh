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

# Licence
SlideHeader "License."
cat User-Area.d/0_Info/0_License.txt
echo -e "$BYellow\nBy continuing, you automatically accept the license agreement.$Normal"
NextSlide

# Terms of Service
SlideHeader "Terms of Service."
NextSlide

# Setting up pacman
SlideHeader "pacman."
echo -e "Setting up pacman, enabling multilib, setting multiple downloads to 10,"
echo -e "enabling colors, activating easter egg.\n"
cd ~/ohSystemmm-doties/System-Area.d/0_Global-Config
sudo cp -f pacman.conf /etc/pacman.conf
cd ~/ohSystemmm-doties/
echo -e "\n${BGreen}Done.${Normal}"
NextSlide

# Setting up yay
SlideHeader "yay."
echo -e "Downloading the AUR-Packagemanager 'yay'.\n"
git clone https://aur.archlinux.org/yay.git
cd yay
makepkg -si --noconfirm
cd ..
rm -rf yay/
echo -e "\n${BGreen}Done.${Normal}"
NextSlide

# Setting up paru
SlideHeader "paru."
echo -e "Installing Packagemanager 'paru'.\n"
yay -S --needed paru parui --noconfirm
echo -e "\n${BGreen}Done.${Normal}"
NextSlide

# Installing Required Packages
SlideHeader "Required Packages."
echo -e "Installing all Required Packages. This might take a while.\n"
gum spin --spinner meter --title "Reading Required Packages..." --show-output -- sleep 3
InstallRequired
NextSlide

# Installing Optional & ohSystemmm Packages
SlideHeader "Other Packages."
echo -e "Installing selected options. The optional packages provide you several"
echo -e "packages which might improve your user experience. They aren't needed by"
echo -e "the system itself but are still recommended to install. The ohSystemmm"
echo -e "packages are packages like development tools and other utilities. They"
echo -e "aren't needed, but they help to get a fully set up desktop.\n"
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
      gum spin --spinner meter --title "Reading Optional Packages..." --show-output -- sleep 1.5
      echo -e "\nDownloading & Installing Packages\n"
      sleep 2
      InstallOptional
      echo -e "\n${BGreen}Done.${Normal}"
      ;;
    "ohSystemmm")
      gum spin --spinner meter --title "Reading ohSystemmm Packages..." --show-output -- sleep 1.5
      echo -e "\nDownloading & Installing Packages\n"
      sleep 2
      InstallohSystemmm
      echo -e "\n${BGreen}Done.${Normal}"
      ;;
  esac
done
NextSlide

# Changing Shell
SlideHeader "Setting Shell."
echo -e "You can choose between bash, fish and zsh. Each shell has its advantages"
echo -e "and disadvantages. Bash, the default one is just basic, youre based if"
echo -e "choose it. However fish, very userfriendly because of its autocompletion"
echo -e "would be a great choice if you're new to Linux. Zsh, by most users seen"
echo -e "as the only good shell is recommended for the more advanced users. Despite"
echo -e "that, choose the one you prefer.\n"
choice=$(gum choose --cursor="> " --cursor-prefix="* " "bash" "fish" "zsh")
case $choice in
  "bash")
    echo -e "Setting default Shell to bash."
    chsh -s /usr/bin/bash
    echo -e "\n${BGreen}Done.${Normal}"
    ;;
  "fish")
    echo -e "Setting default Shell to fish."
    chsh -s /usr/bin/fish
    echo -e "\n${BGreen}Done.${Normal}"
    ;;
  "zsh")
    echo -e "Setting default Shell to zsh."
    chsh -s /usr/bin/zsh
    echo -e "\n${BGreen}Done.${Normal}"
    ;;      
esac    
NextSlide

# Installing & Enabeling SDDM
SlideHeader "Enabeling sddm."
echo -e "Installing sddm.\n"
sudo pacman -S --needed sddm --noconfirm
echo -e "\nEnabeling sddm."
sudo systemctl enable sddm.service
echo -e "\n${BGreen}Done.${Normal}"
NextSlide

# Installing & Enabeling tlp
SlideHeader "Enabeling tlp."
echo -e "You can choose between bash, fish and zsh. Each shell has its advantages"
echo -e "and disadvantages. Bash, the default one is just basic, youre based if"
echo -e "choose it. However fish, very userfriendly because of its autocompletion"
echo -e "would be a great choice if you're new to Linux. Zsh, by most users seen"
echo -e "as the only good shell is recommended for the more advanced users. Despite"
echo -e "that, choose the one you prefer.\n"

tlp=$(gum choose --cursor="> " --cursor-prefix="* " "Skip" "Laptop")
case $tlp in
  "Skip")
    break    
    echo -e "Skipped."
    ;;
  "Laptop")
    echo -e "Installing tlp.\n"
    sudo pacman -S --needed tlp --noconfirm
    cd ~/ohSystemmm-doties/System-Area.d/0_Global-Config
    echo -e "Setting Max Battery capacity to 80%."
    sudo cp -f tlp.conf /etc/tlp.conf
    cd ~/ohSystemmm-doties/
    echo -e "\n${BGreen}Done.${Normal}"
    ;;
esac    
NextSlide

# Customizing Bootloader
# SlideHeader "Customizing Bootloader."
# gum spin --spinner meter --title "Checking Bootloader..." --show-output -- sleep 2

# if [ -f /boot/grub/grub.cfg ]; then
#   echo "GRUB configuration file found: /boot/grub/grub.cfg"
#   echo "It appears that GRUB is being used as the bootloader."
#   bootloader="grub"
# elif pacman -Q grub &>/dev/null; then
#   echo "GRUB package is installed."
#   echo "It appears that GRUB is being used as the bootloader."
#   bootloader="grub"
# elif command -v bootctl &>/dev/null; then
#   if bootctl status | grep -q "grub"; then
#     echo "GRUB boot loader is found in bootctl status."
#     echo "It appears that GRUB is being used as the bootloader."
#     bootloader="grub"
#   else
#     echo "GRUB does not appear to be the bootloader on this system."
#     bootloader="not_grub"
#   fi
# else
#   echo "GRUB does not appear to be the bootloader on this system."
#   bootloader="not_grub"
# fi
# if [ "$bootloader" = "grub" ]; then
#   echo "\nPerforming GRUB-specific tasks..."
# else
#   echo "Skipping GRUB-specific tasks."
# fi
# NextSlide

# Setting Default Apps
SlideHeader "Setting Default Apps."
NextSlide

# Setting up Hyprland DE
SlideHeader "Setting up Hyprland."
NextSlide

# Linking customized Packages
SlideHeader "Linking Apps."
NextSlide

# Credits
SlideHeader "Credits."
cat User-Area.d/0_Info/1_Credits.txt
NextSlide

# Cleaning cache, garbage collecting
SlideHeader "Clean Up."
echo -e "Clearing cache."
sudo pacman -Scc --noconfirm
yay -Scc --noconfirm
paru -Scc --noconfirm
echo -e "${BGreen}Done.${Normal}"
NextSlide

# Rebooting
SlideHeader "Done!"
echo -e "Installation process done! You may reboot your system.\n"
if gum confirm "Reboot" --affirmative "Confirm" --negative "Exit"; then
  echo -e "Rebooting System!"
  reboot
else
  echo -e "${BGreen}Installation finished.${Normal}\n"
  exit 1
fi
