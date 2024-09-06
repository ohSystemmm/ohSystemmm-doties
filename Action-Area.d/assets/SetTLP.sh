#  ____       _  _____ _     ____      _     
# / ___|  ___| ||_   _| |   |  _ \ ___| |__  
# \___ \ / _ \ __|| | | |   | |_) / __| '_ \ 
#  ___) |  __/ |_ | | | |___|  __/\__ \ | | |
# |____/ \___|\__||_| |_____|_| (_)___/_| |_|
#        
# by ohSystemmm <3 - 2024

TLP=$(gum choose --cursor="> " --cursor-prefix="* " "Skip" "Laptop")
case $TLP in
  "Skip")
    echo -e "Skipped."
    break
  ;;
  "Laptop")
    echo -e "Installing TLP for power management.\n"
    sudo pacman -S --needed tlp --noconfirm
    echo -e "\nConfiguring maximum battery capacity to 80%."
    sudo cp -f ~/ohSystemmm-doties/System-Area.d/0_Global-Config/tlp.conf /etc/tlp.conf
    sudo systemctl enable tlp.service
    sudo systemctl start tlp.service
    echo -e "\n${BGreen}TLP Installed and Configured.${Normal}"
  ;;
esac 
