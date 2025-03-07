#            _
#    _______| |__  _ __ ___
#   |_  / __| '_ \| '__/ __|
#  _ / /\__ \ | | | | | (__
# (_)___|___/_| |_|_|  \___|
#
# by ohSystemmm <3 - 2024

sleep 0.1
fastfetch
alias shortcuts='nvim ~/.zshrc'
alias key='nvim ~/ohSystemmm-doties/System-Area.d/2_Hyprland-Config/hypr/0_Hypr-Configs/9_Keybindings/Keybindings.conf'
alias Arch='echo I use Arch BTW.'
alias shutdown='systemctl poweroff'
alias wifi='nmtui'
alias ff='fastfetch'
alias dffetch='fastfetch --logo'
alias grub_update='sudo grub-mkconfig -o /boot/grub/grub.cfg'
alias buildpkg='makepkg -si'
alias graphics-card='lspci | grep -E "(VGA|3D)"'
alias kernel='uname -r'
alias wimg='wezterm imgcat'
alias kimg='kitty +kitten icat'
alias pdf='zathura'
alias markdown='grim'
alias nya='clear && figlet "Meowww :3"'
alias 更新='paru'
alias アニメ='ani-cli'
alias volume='alsamixer -c 2'
alias hist='nvim .zsh_history'

alias Con-SAP-Up='sudo wg-quick up SAP'
alias Con-SAP-Down='sudo wg-quick down SAP'

# Proton VPN
alias Start_VPN='sudo protonvpn c -f'
alias Stop_VPN='sudo protonvpn d'

# Path to your Oh My Zsh installation.
export ZSH=~/.oh-my-zsh/

# plugins
plugins=(git zsh-autosuggestions zsh-syntax-highlighting)

source $ZSH/oh-my-zsh.sh

# Load Pywal-Colors
(cat ~/.cache/wal/sequences&)

# Custom prompt
PROMPT='🔰%F{green}%n%F{white}@%F{cyan}%m %F{white}🌐 %F{green}%1~ %F{white}➤ %f'
RPROMPT='⏳%F{blue}%*%f'

# bun completions
[ -s "/home/ohsystemmm/.bun/_bun" ] && source "/home/ohsystemmm/.bun/_bun"

# bun
export BUN_INSTALL="$HOME/.bun"
export PATH="$BUN_INSTALL/bin:$PATH"


export PATH=$PATH:/home/ohsystemmm/.spicetify
export SPOTIPY_CLIENT_ID='15668b97e709435bab856e6e248fc753'
export SPOTIPY_CLIENT_SECRET='84c8cbfd131e4cc5a79c7a705308cac5'
export SPOTIPY_REDIRECT_URI='http://localhost:8881/callback'
export XDG_RUNTIME_DIR=/run/user/$(id -u)
export DBUS_SESSION_BUS_ADDRESS=unix:path=$XDG_RUNTIME_DIR/bus
export PATH=/usr/bin/bash:$PATH
