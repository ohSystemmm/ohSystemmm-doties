# __  ______   ____       _     
# \ \/ /  _ \ / ___|  ___| |__  
#  \  /| | | | |  _  / __| '_ \ 
#  /  \| |_| | |_| |_\__ \ | | |
# /_/\_\____/ \____(_)___/_| |_|
#
# by ohSystemmm <3 - 2024

sleep 1
killall xdg-desktop-portal             # Kill running xdg-desktop-portal   
killall xdg-desktop-portal-gtk         # Kill running xdg-desktop-portal-gtk 
killall xdg-desktop-portal-wlr         # Kill running xdg-desktop-portal-wlr 
killall xdg-desktop-portal-hyprland    # Kill running xdg-desktop-portal-hyprland 

sleep 1 && /usr/lib/xdg-desktop-portal-hyprland& # Start xdg-desktop-portal-hyprland
sleep 1 && /usr/lib/xdg-desktop-portal-wlr& # Start xdg-desktop-portal-hyprland
sleep 1 && /usr/lib/xdg-desktop-portal-gtk& # Start xdg-desktop-portal-hyprland
sleep 1 && /usr/lib/xdg-desktop-portal&          # Start xdg-desktop-portal
