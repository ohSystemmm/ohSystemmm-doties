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
    ttf-hanazono                       # A free Japanese kanji font, which contains about 78,685 characters.
    tumbler                            # Thumbnail service implementing the thumbnail management D-Bus specification
    waybar                             # Highly customizable Wayland bar for Sway and Wlroots based compositors
    waypaper                           # GUI wallpaper setter for Wayland and Xorg window managers.
    wlogout                            # Logout menu for wayland
    wireplumber                        # Session / policy manager implementation for PipeWire
    xdg-desktop-portal                 # Desktop integration portals for sandboxed apps
    xdg-desktop-portal-gtk             # A backend implementation for xdg-desktop-portal using GTK
    xdg-desktop-portal-hyprland        # xdg-desktop-portal backend for hyprland
    xdg-desktop-portal-wlr             # xdg-desktop-portal backend for wlroots
    xdg-user-dirs                      # Manage user directories like ~/Desktop and ~/Music
    xarchiver                          # GTK+ frontend to various command line archivers
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
    ani-cli                            # A cli to browse and watch anime.
    armcord-bin                        # Discord client for lower end and ARM devices.
    blender                            # A fully integrated 3D graphics creation suite
  # bridge-utils                       # Utilities for configuring the Linux ethernet bridge
    discord                            # All-in-one voice and text chat for gamers
  # dnsmasq                            # Lightweight, easy to configure DNS forwarder and DHCP server
  # ebtables                           # Linux kernel packet control tool (using nft interface)
    fcitx5                             # Next generation of fcitx
    fcitx5-configtool                  # Configuration Tool for Fcitx5
    ipscan                             # Angry IP Scanner (or simply ipscan) is an open-source and cross-platform network scanner.
  # iptables                           # Linux kernel packet control tool (using legacy interface)
    krita                              # Edit and paint images
  # libvirt                            # API for controlling virtualization engines (openvz,kvm,qemu,virtualbox,xen,etc)
    mangal-bin                         # The most advanced cli manga downloader in the entire universe!
    mozc                               # The Open Source edition of Google Japanese Input
    mov-cli                            # Watch everything from your terminal.
    mpv                                # a free, open source, and cross-platform media player
    obs-studio                         # Free, open source software for live streaming and recording
  # openbsd-netcat                     # TCP/IP swiss army knife. OpenBSD variant.
    prismlauncher                      # Minecraft launcher with ability to manage multiple instances.
  # qemu                               # A basic QEMU setup for headless environments
    signal-desktop                     # Signal Private Messenger for Linux
    spotify                            # A proprietary music streaming service
    steam                              # Valve's digital software delivery system
    superfile-bin                      # Pretty fancy and modern file manager in terminal file manager
    syncplay                           # Synchronize watching movies on mplayer2, vlc, mpv, and mpc-hc across many computers
    tlp                                # Linux Advanced Power Management
  # vde2                               # Virtual Distributed Ethernet for emulators like qemu
  # virt-manager                       # Desktop user interface for managing virtual machines
  # virt-viewer                        # A lightweight interface for interacting with the graphical display of virtualized guest OS.
    wezterm                            # A GPU-accelerated cross-platform terminal emulator and multiplexer
    whatsapp-for-linux                 # An unofficial WhatsApp desktop application for linux
    wine                               # A compatibility layer for running Windows programs
    wps-office                         # Kingsoft Office (WPS Office) - an office productivity suite
    zathura                            # Minimalistic document viewer
    zathura-pdf-mupdf                  # PDF support for Zathura (MuPDF backend) (Supports PDF, ePub, and OpenXPS)
  )
  paru -S --needed "${Packages[@]}" --noconfirm
}

InstallGit() {
  Packages=(
    oh-my-zsh                          # A community-driven framework for managing your zsh configuration. 
    zsh-autosuggestions                # Fish-like autosuggestions for zsh  
    zsh-syntax-highlighting            # Fish shell like syntax highlighting for Zsh
  )
}
