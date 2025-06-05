#            _
#    _______| |__  _ __ ___
#   |_  / __| '_ \| '__/ __|
#  _ / /\__ \ | | | | | (__
# (_)___|___/_| |_|_|  \___|
#
# by ohSystemmm <3 - 2024


fastfetch

# Aliases
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

# Load Pywal colors
(cat ~/.cache/wal/sequences&)

# bun completions
[ -s "$HOME/.bun/_bun" ] && source "$HOME/.bun/_bun"
export BUN_INSTALL="$HOME/.bun"
export PATH="$BUN_INSTALL/bin:$PATH"

# Zinit Setup
ZINIT_HOME="${XDG_DATA_HOME:-${HOME}/.local/share}/zinit/zinit.git"

if [ ! -d "$ZINIT_HOME" ]; then
   mkdir -p "$(dirname $ZINIT_HOME)"
   git clone https://github.com/zdharma-continuum/zinit.git "$ZINIT_HOME"
fi
source "${ZINIT_HOME}/zinit.zsh"

# Zsh Plugins
zinit light zsh-users/zsh-syntax-highlighting
zinit light zsh-users/zsh-completions
zinit light zsh-users/zsh-autosuggestions
zinit light Aloxaf/fzf-tab

# Oh My Zsh Snippets
zinit snippet OMZP::git
zinit snippet OMZP::sudo
zinit snippet OMZP::archlinux
zinit snippet OMZP::aws
zinit snippet OMZP::kubectl
zinit snippet OMZP::kubectx
zinit snippet OMZP::command-not-found

# History
HISTSIZE=1000000
HISTFILE=~/.zsh_history
SAVEHIST=$HISTSIZE
HISTDUP=erase
setopt appendhistory sharehistory hist_ignore_space hist_ignore_all_dups hist_save_no_dups hist_ignore_dups hist_find_no_dups

# Completion styling
zstyle ':completion:*' matcher-list 'm:{a-z}={A-Za-z}'
zstyle ':completion:*' list-colors "${(s.:.)LS_COLORS}"
zstyle ':completion:*' menu no
zstyle ':fzf-tab:complete:cd:*' fzf-preview 'ls --color $realpath'
zstyle ':fzf-tab:complete:__zoxide_z:*' fzf-preview 'ls --color $realpath'

# Aliases
alias ls='ls --color'
alias c='clear'

# Shell Integrations
eval "$(fzf --zsh)"
eval "$(zoxide init --cmd cd zsh)"

# POSH_THEME_FILE="M365Princess.omp.json"
# POSH_THEME_FILE="hunk.omp.json"
POSH_THEME_FILE="dracula.omp.json"
# POSH_THEME_FILE="easy-term.omp.json"
# POSH_THEME_FILE="velvet.omp.json"
# POSH_THEME_FILE="catppuccin.omp.json"

POSH_THEME_DIR="$HOME/.poshthemes"
POSH_THEME="$POSH_THEME_DIR/$POSH_THEME_FILE"

# Ensure the theme directory exists
mkdir -p "$POSH_THEME_DIR"

# Check if the theme file exists, if not, download it
if [ ! -f "$POSH_THEME" ]; then
    echo "Downloading Oh My Posh $POSH_THEME_FILE theme..."
    curl -o "$POSH_THEME" https://raw.githubusercontent.com/JanDeDobbeleer/oh-my-posh/main/themes/$POSH_THEME_FILE
fi 

# Apply the theme
eval "$(oh-my-posh init zsh --config "$POSH_THEME")"

export XDG_RUNTIME_DIR=/run/user/$UID
