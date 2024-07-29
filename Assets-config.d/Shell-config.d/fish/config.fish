#                   __ _          __ _     _     
#   ___ ___  _ __  / _(_) __ _   / _(_)___| |__  
#  / __/ _ \| '_ \| |_| |/ _` | | |_| / __| '_ \ 
# | (_| (_) | | | |  _| | (_| |_|  _| \__ \ | | |
#  \___\___/|_| |_|_| |_|\__, (_)_| |_|___/_| |_|
#                        |___/                   

# owofetch
# pfetch
# uwufetch
sleep 0.1
fastfetch

set fish_greeting

export EDITOR=helix
export RUN=bash

alias shortcuts='$EDITOR ~/.config/fish/config.fish'
alias key='$EDITOR ~/dotfiles/hypr/conf/keybindings/default.conf'
alias Arch='echo I use Arch BTW.'
alias shutdown='systemctl poweroff'
alias wifi='nmtui'

alias nf='neofetch'
alias ff='fastfetch'
alias pf='pfetch'
alias owo='owofetch'
alias uwu='uwufetch'
alias nif='nitch'
alias stfu='shutthefetchup'
alias dnfetch='neofetch --ascii_distro'
alias dffetch='fastfetch --logo'

alias notes='$EDITOR ~/notes.md'
alias grub_update='sudo grub-mkconfig -o /boot/grub/grub.cfg'
alias ascii='~/dotfiles/scripts/figlet.sh'
alias hx='helix'
alias nv='nvim'
alias root='cd /'
alias home='cd'
alias nvidia-stats='nvidia-smi'
alias nvidia='prime-run'
alias remove='rm -rf'
alias buildpkg='makepkg -si'
alias graphics-card='lspci | grep -E "(VGA|3D)"'
alias clock='tty-clock -s -c'
alias train='sl'
alias kernel='uname -r'
alias matrix='cmatrix'
alias pipes='pipes.sh'
alias img='wezterm imgcat'
# alias suicide='sudo rm -rf /*'

# Dotnet (C#)
# alias 'dotnet new console'='dotnet new console --use-program-main'
# alias 'dotnet new console force'='dotnet new console --use-program-main --force'
