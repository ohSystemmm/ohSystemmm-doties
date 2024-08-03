#     _                 _             _
#    / \   ___ ___  ___| |_ ___   ___| |__
#   / _ \ / __/ __|/ _ \ __/ __| / __| '_ \
#  / ___ \\__ \__ \  __/ |_\__ \_\__ \ | | |
# /_/   \_\___/___/\___|\__|___(_)___/_| |_|
#
# by ohSystemmm <3 - 2024

SlideHeader() {
  Header=$1
  clear
  echo -e -n "\033[1;35m"
  figlet -w 200 "$Header"
  echo -e "\nohSystemmm-doties"
  echo -e "by ohSystemmm <3 - 2024\033[0m\n\n"
}

NextSlide() {
  sleep 0.5
  # echo -e "\n"
  # if gum confirm "Would you like to proceed?" --affirmative "Continue" --negative "Abort"; then
  #   continue
  # else
  #   echo "Installation canceled."
  #   exit 1
  # fi
  echo -e ""
  choice=$(gum choose --cursor="> " --cursor-prefix="* " "Continue Installation" "Abort Installation")
  case $choice in
    "Continue Installation")
      continue
      ;;
    "Abort Installation")
      echo -e "\033[1;31mInstallation aborted by user.\033[0m\n"
      exit 1
      ;;
  esac    
}

InstallRequired() {
  Packages=(
    blueman
    bluez
    bluez-utils
    brightnessctl
    btop
    cliphist
    dolphin
    mako
    fastfetch
    fish
    git
    noto-fonts
    pavucontrol
    sddm
    kitty
    papirus-icon-theme
    pipewire
    pipewire-alsa
    pipewire-jack
    pipewire-pulse
    python-click
    python-gobject
    python-pip
    python-psutil
    python-pywal
    python-rich
    rofi-wayland
    ttf-cascadia-code
    ttf-fira-code
    ttf-fira-sans
    ttf-firacode-nerd
    ttf-hanazono
    noto-fonts-emoji
    xdg-desktop-portal
    xdg-desktop-portal-gtk
    xdg-desktop-portal-wlr
    xdg-desktop-portal-hyprland
    xdg-user-dirs
    libpulse
    network-manager-applet
    networkmanager
    nm-connection-editor
    nwg-look
    breeze-icons
    gum
    gtk4
    gst-plugin-pipewire
    xarchiver
    wireplumber
    hyprland
    slurp
    tumbler
    grim
    libadwaita
    chromium
    fd
    hypridle
    hyprland
    hyprlock
    hyprpaper
    hyprshade
    waybar
    wlogout
    bibata-cursor-theme
    waypaper
    aylurs-gtk-shell
    figlet
    tlp
  )
  paru -S --needed "${Packages[@]}" --noconfirm
}

InstallOptional() {
  Packages=(
    alacritty
    helix
    man-pages
    neovim
    timeshift
    unzip
    zip
    vim
    vlc
    wget
    wezterm
    xterm
    qalculate-gtk 
    pacman-contrib 
    guvcview 
    imagemagick
    tree
    cava
    firefox-nightly-bin
    paru
    parui
    wayland-screenshot
    imgcat 
    pacseek
    emote
  )
  paru -S --needed "${Packages[@]}" --noconfirm
}

InstallohSystemmm() {
  Packages=(
    krita
    prismlauncher
    blender
    wine
    syncplay
    steam
    ani-cli
    mov-cli
    armcord-bin
    spotify
    spotify-adblock
    teams-for-linux
    whatsapp-for-linux
    signal-desktop
    wps-office
    fcitx5
    fcitx5-configtool
    mozc
  )
  paru -S --needed "${Packages[@]}" --noconfirm
}
