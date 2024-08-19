InstallRequired() {
  Packages=(
    aylurs-gtk-shell                   # Aylurs's Gtk Shell (AGS), An eww inspired gtk widget system.
    autojump                           # A faster way to navigate your filesystem from the command line
    bibata-cursor-theme                # Material Based Cursor Theme
    blueman                            # GTK+ Bluetooth Manager
    bluez                              # Daemons for the bluetooth protocol stack
    bluez-utils                        # Development and debugging utilities for the bluetooth protocol stack
    brightnessctl                      # Lightweight brightness control tool
    breeze-icon                        # Breeze icon theme
    btop                               # A monitor of system resources, bpytop ported to C++
    chromium                           # A web browser built for speed, simplicity, and security
    cliphist                           # wayland clipboard manager
    fd                                 # Simple, fast and user-friendly alternative to find
    figlet                             # A program for making large letters out of ordinary text
    fastfetch                          # Like Neofetch, but much faster because written in C
    firefox-nightly-bin                # Fast, Private & Safe Web Browser from Mozilla — Nightly Build (en-US)
    fish                               # Smart and user friendly shell intended mostly for interactive use
    git                                # the fast distributed version control system
    grim                               # Screenshot utility for Wayland
    gst-plugin-pipewire                # Multimedia graph framework - pipewire plugin
    gtk3                               # GObject-based multi-platform GUI toolkit
    gtk4                               # GObject-based multi-platform GUI toolkit
    gum                                # A tool for glamorous shell scripts
    hypridle                           # hyprland’s idle daemon
    hyprland                           # a highly customizable dynamic tiling Wayland compositor
    hyprlock                           # hyprland’s GPU-accelerated screen locking utility
    hyprshade                          # Hyprland shade configuration tool
    kitty                              # A modern, hackable, featureful, OpenGL-based terminal emulator
    libadwaita                         # Building blocks for modern adaptive GNOME applications
    libpulse                           # A featureful, general-purpose sound server (client library)
    mako                               # Lightweight notification daemon for Wayland
    network-manager-applet             # Applet for managing network connections
    networkmanager                     # Network connection manager and user applications
    nm-connection-editor               # NetworkManager GUI connection editor and widgets
    noto-fonts                         # Google Noto TTF fonts
    noto-fonts-emoji                   # Google Noto emoji fonts
    nwg-look                           # GTK3 settings editor adapted to work on wlroots-based compositors
   #oh-my-zsh                          # 
    papirus-icon-theme                 # Papirus icon theme
    pavucontrol                        # PulseAudio Volume Control
    pipewire                           # Low-latency audio/video router and processor
    pipewire-alsa                      # Low-latency audio/video router and processor - ALSA configuration
    pipewire-jack                      # Low-latency audio/video router and processor - JACK replacement
    pipewire-pulse                     # Low-latency audio/video router and processor - PulseAudio replacement
    python-click                       # Simple wrapper around optparse for powerful command line utilities
    python-gobject                     # Python bindings for GLib/GObject/GIO/GTK
    python-pip                         # The PyPA recommended tool for installing Python packages
    python-psutil                      # A cross-platform process and system utilities module for Python
    python-pywal                       # Generate and change colorschemes on the fly
    python-rich                        # Render rich text, tables, progress bars, syntax highlighting, markdown and more to the terminal
    rofi-wayland                       # A window switcher, run dialog and dmenu replacement - fork with wayland support
    sddm                               # QML based X11 and Wayland display manager
    slurp                              # Select a region in a Wayland compositor
    swww                               # A Solution to your Wayland Wallpaper Woes
    thunar                             # Modern, fast and easy-to-use file manager for Xfce
    ttf-cascadia-code                  # A monospaced font by Microsoft that includes programming ligatures
    ttf-fira-code                      # Monospaced font with programming ligatures
    ttf-fira-sans                      # Mozilla's sans-serif typeface designed for Firefox OS
    ttf-firacode-nerd                  # Patched font Fira (Fura) Code from nerd fonts library
    ttf-hanazono                       # A free Japanese kanji font, which contains about 78,685 characters (and 2 SPACEs) defined in ISO/IEC 10646 standard / the Unicode standard.
    tumbler                            # Thumbnail service implementing the thumbnail management D-Bus specification
    waybar                             # Highly customizable Wayland bar for Sway and Wlroots based compositors
    waypaper                           # GUI wallpaper setter for Wayland and Xorg window managers. It works as a frontend for popular wallpaper backends like swaybg, swww, wallutils, hyprpaper and feh.
    wlogout                            # Logout menu for wayland
    wireplumber                        # Session / policy manager implementation for PipeWire
    xdg-desktop-portal                 # Desktop integration portals for sandboxed apps
    xdg-desktop-portal-gtk             # A backend implementation for xdg-desktop-portal using GTK
    xdg-desktop-portal-hyprland        # xdg-desktop-portal backend for hyprland
    xdg-desktop-portal-wlr             # xdg-desktop-portal backend for wlroots
    xdg-user-dirs                      # Manage user directories like ~/Desktop and ~/Music
    xarchiver                          # GTK+ frontend to various command line archivers
   #zsh-autosuggestions                #
   #zsh-syntax-highlighting            #
  )
  paru -S --needed "${Packages[@]}" --noconfirm
}

InstallOptional() {
  Packages=(
    cava                               # Console-based Audio Visualizer for Alsa
    gparted                            # A Partition Magic clone, frontend to GNU Parted
    imagemagick                        # An image viewing/manipulation program
    imgcat                             # Output images as RGB ANSI graphics on the terminal
    man-pages                          # Linux man pages
    neovim                             # Fork of Vim aiming to improve user experience, plugins, and GUIs
    paru                               # Feature packed AUR helper
    parui                              # Simple TUI frontend for paru or yay
    timeshift                          # A system restore utility for Linux
    tree                               # A directory listing program displaying a depth indented list of files
    unzip                              # For extracting and viewing files in .zip archives
    vlc                                # Multi-platform MPEG, VCD/DVD, and DivX player
    wayland-screenshot                 # A wayland screenshotting tool
    wget                               # Network utility to retrieve files from the Web
    zip                                # Compressor/archiver for creating and modifying zipfiles
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
    mpv                                #
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
