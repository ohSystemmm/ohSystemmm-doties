#   ____ _                        _   _            _     
#  / ___| | ___  __ _ _ __       | | | |_ __   ___| |__  
# | |   | |/ _ \/ _` | '_ \ _____| | | | '_ \ / __| '_ \ 
# | |___| |  __/ (_| | | | |_____| |_| | |_) |\__ \ | | |
#  \____|_|\___|\__,_|_| |_|      \___/| .__(_)___/_| |_|
#                                     |_|           
# by ohSystemmm <3 - 2024

sudo pacman -Rns $(pacman -Qdtq) --noconfirm  
sudo pacman -Scc --noconfirm
yay -Scc --noconfirm
paru -Scc --noconfirm
rm -rf ~/.cache/yay 
rm -rf ~/.cache/paru
