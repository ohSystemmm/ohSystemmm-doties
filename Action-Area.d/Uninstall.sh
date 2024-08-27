#  _   _       _           _        _ _       _     
# | | | |_ __ (_)_ __  ___| |_ __ _| | |  ___| |__  
# | | | | '_ \| | '_ \/ __| __/ _` | | | / __| '_ \ 
# | |_| | | | | | | | \__ \ || (_| | | |_\__ \ | | |
#  \___/|_| |_|_|_| |_|___/\__\__,_|_|_(_)___/_| |_|
#                          
# by ohSystemmm <3 - 2024

source assets/Assets.sh

SlideHeader "Uninstall"

if gum confirm "Are you sure to Uninstall?" --affirmative "Confirm" --negative "Exit"; then
  echo -e "Starting ..."
  echo -e "\nRemoving Bootassets."
  sudo cp -f ../System-Area.d/6_Defaults/grub /etc/default/grub
  sudo rm -rf /boot/grub/themes/Grub/ 
  sudo grub-mkconfig -o /boot/grub/grub.cfg
  echo -e "\nRemoving Sddmassets."
  sudo rm -rf /etc/sddm.conf
  sudo rm -rf /usr/share/sddm/themes/Sddm-Theme/
  echo -e "\nRemoving Dotfiles."
  sudo rm -rf ~/ohSystemmm-doties/
  cd ~/.config/
  sudo rm -rf ags btop cava fastfetch gtk-3.0 hypr kitty nvim picom rofi superfile wezterm wlogout
  cd ~/.cache/ 
  sudo rm -rf ags fastfetch hyprland nvim swww wal
  echo "Done."
  reboot
else
  echo -e "Canceled.\n"
  exit 1
fi
