#                   __ _          __ _     _
#   ___ ___  _ __  / _(_) __ _   / _(_)___| |__
#  / __/ _ \| '_ \| |_| |/ _` | | |_| / __| '_ \
# | (_| (_) | | | |  _| | (_| |_|  _| \__ \ | | |
#  \___\___/|_| |_|_| |_|\__, (_)_| |_|___/_| |_|
#                        |___/
#
# by ohSystemmm <3 - 2024

clear
fastfetch
cat ~/.cache/wal/sequences&

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

# Aliases
alias ff='fastfetch'
alias kernel='uname -r'
alias grub_update='sudo grub-mkconfig -o /boot/grub/grub.cfg'

# Fun
alias Arch='echo I use Arch BTW.'
