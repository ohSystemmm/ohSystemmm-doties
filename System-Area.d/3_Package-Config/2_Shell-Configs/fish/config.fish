#                   __ _          __ _     _
#   ___ ___  _ __  / _(_) __ _   / _(_)___| |__
#  / __/ _ \| '_ \| |_| |/ _` | | |_| / __| '_ \
# | (_| (_) | | | |  _| | (_| |_|  _| \__ \ | | |
#  \___\___/|_| |_|_| |_|\__, (_)_| |_|___/_| |_|
#                        |___/
#
# by ohSystemmm <3 - 2024

clear
sleep 0.5
fastfetch

function fish_prompt
    set_color purple
    echo -n (whoami)
    echo -n '@'
    set_color normal
    echo -n $hostname
    set_color purple
    echo -n '' (prompt_pwd)
    set_color normal
    echo -n '> '
end

set fish_greeting

export -x EDITOR (cat ~/ohSystemmm-doties/Settings.d/Editor.sh)

# Shortcuts
alias shortcuts='$EDITOR ~/.config/fish/config.fish'
alias keybindings='$EDITOR ~/ohSystemmm-doties/Hyprland-config.d/hypr/Hypr-conf.d/9_Keybindings/Keybindings.conf'

# Aliases
alias hx='helix'
alias ff='fastfetch'
alias kernel='uname -r'
alias img='wezterm imgcat'
alias shutdown='systemctl poweroff --now'
alias grub_update='sudo grub-mkconfig -o /boot/grub/grub.cfg'

# Fun
alias Arch='echo I use Arch BTW.'
