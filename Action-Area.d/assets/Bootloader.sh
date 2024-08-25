#  ____              _   _                 _               _     
# | __ )  ___   ___ | |_| | ___   __ _  __| | ___ _ __ ___| |__  
# |  _ \ / _ \ / _ \| __| |/ _ \ / _` |/ _` |/ _ \ '__/ __| '_ \ 
# | |_) | (_) | (_) | |_| | (_) | (_| | (_| |  __/ | _\__ \ | | |
# |____/ \___/ \___/ \__|_|\___/ \__,_|\__,_|\___|_|(_)___/_| |_|                                                  
# 
# by ohSystemmm <3 - 2024

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
  cp ../User-Area.d/5_Grub/Default.png ../System-Area.d/7_Grub-Menu/Grub/Background.png
  sudo cp -r ../System-Area.d/7_Grub-Menu/Grub/ /boot/grub/themes/ 
  sudo cp -f ../System-Area.d/0_Global-Config/grub /etc/default/grub
  sudo grub-mkconfig -o /boot/grub/grub.cfg
else
  echo -e "\nGrub not found - Skipping."
fi
