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
