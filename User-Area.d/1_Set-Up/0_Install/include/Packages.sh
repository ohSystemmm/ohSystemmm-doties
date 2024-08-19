InstallRequired() {
  Packages=(
    aylurs-gtk-shell                   #
    autojump                           #
    bibata-cursor-theme                #
    blueman                            #
    bluez                              #
    bluez-utils                        #
    brightnessctl                      #
    breeze-icons                       #
    btop                               #
    chromium                           #
    cliphist                           #
    fd                                 #
    figlet                             #
    fastfetch                          #
    firefox-nightly-bin                #
    fish                               #
    git                                #
    grim                               #
    gst-plugin-pipewire                #
    gtk3                               #
    gtk4                               #
    gum                                #
    hypridle                           #
    hyprland                           #
    hyprlock                           #
    hyprshade                          #
    kitty                              #
    libadwaita                         #
    libpulse                           #
    mako                               #
    network-manager-applet             #
    networkmanager                     #
    nm-connection-editor               #
    noto-fonts                         #
    noto-fonts-emoji                   #
    nwg-look                           #
   #oh-my-zsh                          #
    papirus-icon-theme                 #
    pavucontrol                        #
    pipewire                           #
    pipewire-alsa                      #
    pipewire-jack                      #
    pipewire-pulse                     #
    python-click                       #
    python-gobject                     #
    python-pip                         #
    python-psutil                      #
    python-pywal                       #
    python-rich                        #
    rofi-wayland                       #
    sddm                               #
    slurp                              #
    swww                               #
    thunar                             #
    ttf-cascadia-code                  #
    ttf-fira-code                      #
    ttf-fira-sans                      #
    ttf-firacode-nerd                  #
    ttf-hanazono                       #
    tumbler                            #
    waybar                             #
    waypaper                           #
    wlogout                            #
    wireplumber                        #
    xdg-desktop-portal                 #
    xdg-desktop-portal-gtk             #
    xdg-desktop-portal-hyprland        #
    xdg-desktop-portal-wlr             #
    xdg-user-dirs                      #
    xarchiver                          #
   #zsh-autosuggestions                #
   #zsh-syntax-highlighting            #
  )
  paru -S --needed "${Packages[@]}" --noconfirm
}

InstallOptional() {
  Packages=(
    cava                               #
    gparted                            #
    imagemagick                        #
    imgcat                             #
    man-pages                          #
    neovim                             #
    paru                               #
    parui                              #
    timeshift                          #
    tree                               #
    unzip                              #
    vlc                                #
    wayland-screenshot                 #
    wget                               #
    zip                                #
  )
  paru -S --needed "${Packages[@]}" --noconfirm
}

InstallohSystemmm() {
  Packages=(
    ani-cli                            #
    armcord-bin                        #
    blender                            # 
    bridge-utils                       # VM Stuff
    discord                            #
    dnsmasq                            # VM Stuff
    ebtables                           # VM Stuff
    fcitx5                             #
    fcitx5-configtool                  #
    iptables                           # VM Stuff
    krita                              #
    libvirt                            # VM Stuff
    mangal-bin                         #
    mozc                               #
    mov-cli                            #
    obs-studio                         #
    openbsd-netcat                     # VM Stuff
    prismlauncher                      #
    qemu                               # VM Stuff
    signal-desktop                     #
    spotify                            #
    steam                              #
    superfile-bin                      #
    syncplay                           #
    tlp                                #
    vde2                               # VM Stuff
    virt-manager                       # VM Stuff
    virt-viewer                        # VM Stuff
    wezterm                            #
    whatsapp-for-linux                 #
    wine                               #
    wps-office                         #
    zathura                            #
    zathura-pdf-mupdf                  #
  )
  paru -S --needed "${Packages[@]}" --noconfirm
}
