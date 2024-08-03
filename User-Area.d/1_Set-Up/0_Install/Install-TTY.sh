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
gum spin --spinner meter --title "Checking OS..." --show-output -- sleep 2
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
gum spin --spinner meter --title "Locating Folder..." --show-output -- sleep 1
DotiesPath="/$(fd --type d ohSystemmm-doties)"
echo -e "Dotfiles found."
Destination="$HOME"
if [ -n "$DotiesPath" ]; then
  base_name=$(basename "$DotiesPath")
  destination_path="$HOME/$base_name"
  if [ "$DotiesPath" != "$destination_path" ] && [ ! -e "$destination_path" ]; then
    mv "$DotiesPath" "$HOME/"
    echo -e "Moved $DotiesPath to $HOME/"
    cd ~/ohSystemmm-doties/
  else
    echo -e "Nothing to do."
    cd ~/ohSystemmm-doties/
  fi
else
  echo -e "\n${BRed}Error Dotfile-Folder Not Found.$Normal"
  exit 1
fi
NextSlide

# Licence
SlideHeader "License."
cat User-Area.d/0_Info/0_License.txt
echo -e "$BYellow\nBy continuing, you automatically accept the license agreement.$Normal"
NextSlide

# Terms of Service
# SlideHeader "Terms of Service."
# NextSlide

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
# git clone https://aur.archlinux.org/yay.git
# cd yay
# makepkg -si --noconfirm
# cd ..
# rm -rf yay/
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
