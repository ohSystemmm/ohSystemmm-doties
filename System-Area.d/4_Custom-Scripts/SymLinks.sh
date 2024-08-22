#  ____                  _     _       _              _     
# / ___| _   _ _ __ ___ | |   (_)_ __ | | _____   ___| |__  
# \___ \| | | | '_ ` _ \| |   | | '_ \| |/ / __| / __| '_ \ 
#  ___) | |_| | | | | | | |___| | | | |   <\__ \_\__ \ | | |
# |____/ \__, |_| |_| |_|_____|_|_| |_|_|\_\___(_)___/_| |_|
#        |___/                      
# 
# by ohSystemmm <3 - 2024

Source=~/ohSystemmm-doties/System-Area.d/3_Package-Config/
Destination=~/.config/

Link() {
    local SourcePath="$1"
    local DestinationPath="$2"

    if [ -e "$DestinationPath" ]; then
        echo "Removing existing file or symlink: $DestinationPath"
        rm -rf "$DestinationPath"
    fi

    if [ -d "$SourcePath" ]; then
        ln -s "$SourcePath" "$DestinationPath"
        echo "Created symlink: $DestinationPath -> $SourcePath"
    elif [ -f "$SourcePath" ]; then
        ln -s "$SourcePath" "$DestinationPath"
        echo "Created symlink: $DestinationPath -> $SourcePath"
    else
        echo "Source path $SourcePath does not exist. Skipping."
    fi
}

# .config
Link "$Source/0_App-Configs/ags" "$Destination/ags"
Link "$Source/0_App-Configs/btop" "$Destination/btop"
Link "$Source/0_App-Configs/cava" "$Destination/cava"
Link "$Source/0_App-Configs/fastfetch" "$Destination/fastfetch"
Link "$Source/0_App-Configs/gtk-3.0" "$Destination/gtk-3.0"
Link "$Source/0_App-Configs/picom" "$Destination/picom"
Link "$Source/0_App-Configs/rofi" "$Destination/rofi"
Link "$Source/0_App-Configs/superfile" "$Destination/superfile"
Link "$Source/0_App-Configs/wlogout" "$Destination/wlogout"
Link "$Source/1_Editor-Configs" "$Destination/nvim"
Link "$Source/2_Shell-Configs/fish" "$Destination/fish"
Link "$Source/3_Terminal-Configs/kitty" "$Destination/kitty"
Link "$Source/3_Terminal-Configs/wezterm" "$Destination/wezterm"

# zsh
Link "$Source/2_Shell-Configs/zsh/.zshrc" "$HOME/.zshrc"
