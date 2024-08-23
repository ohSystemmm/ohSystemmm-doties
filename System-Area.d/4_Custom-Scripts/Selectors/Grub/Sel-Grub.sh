#  ____       _        ____            _          _     
# / ___|  ___| |      / ___|_ __ _   _| |__   ___| |__  
# \___ \ / _ \ |_____| |  _| '__| | | | '_ \ / __| '_ \ 
#  ___) |  __/ |_____| |_| | |  | |_| | |_) |\__ \ | | |
# |____/ \___|_|      \____|_|   \__,_|_.__(_)___/_| |_|
#  
# by ohSystemmm <3 - 2024

GrubDirectory=~/ohSystemmm-doties/User-Area.d/7_Grub/
Grubs=$(find "$GrubDirectory" -type f -iname "*.png" | sort)

if [ -z "$Grubs" ]; then
  notify-send "Warning!" "Empty Grub folder"
  exit 1
fi

SelectedGrub=$(echo "$Grubs" | rofi -dmenu -p "Select new Grub" -theme-str 'listview { lines: 10; }')

if [ -n "$SelectedGrub" ]; then
  sudo cp $SelectedGrub ~/ohSystemmm-doties/System-Area.d/7_Grub-Menu/Grub/Background.png
  sudo cp -r ~/ohSystemmm-doties/System-Area.d/7_Grub-Menu/Grub/ /boot/grub/themes/ 
  sudo cp -f ~/ohSystemmm-doties/System-Area.d/0_Global-Config/grub /etc/default/grub
  sudo grub-mkconfig -o /boot/grub/grub.cfg
else
  exit 1
fi  
