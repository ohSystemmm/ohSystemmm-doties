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
    sudo systemctl enable tlp.service
    sudo systemctl start tlp.service
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
# Monitors
# Input

NextSlide
SlideHeader "Linking Customized Packages."
source ~/ohSystemmm-doties/System-Area.d/4_Custom-Scripts/SymLinks.sh
NextSlide

# Credits
SlideHeader "Credits."
cat User-Area.d/0_Info/1_Credits.txt
NextSlide

# Cleaning Cache, Garbage Collecting
SlideHeader "Cleanup."
echo -e "Clearing package manager caches."
source ~/ohSystemmm-doties/System-Area.d/4_Custom-Scripts/CleanUp.sh
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
