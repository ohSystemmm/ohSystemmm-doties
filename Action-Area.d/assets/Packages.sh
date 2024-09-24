InstallRequired() {
  Packages=(
    aylurs-gtk-shell                   # Aylurs's Gtk Shell (AGS), An eww inspired gtk widget system.
    bibata-extra-cursor-theme          # Material Based Cursor Theme: More Bibata!
    blueman                            # GTK+ Bluetooth Manager
    bluez                              # Daemons for the bluetooth protocol stack
    bluez-utils                        # Development and debugging utilities for the bluetooth protocol stack
    brightnessctl                      # Lightweight brightness control tool
    btop                               # A monitor of system resources, bpytop ported to C++
    chromium                           # A web browser built for speed, simplicity, and security
    dart-sass                          # Sass makes CSS fun again
    fd                                 # Simple, fast and user-friendly alternative to find
    figlet                             # A program for making large letters out of ordinary text
    fastfetch                          # Like Neofetch, but much faster because written in C
    firefox-nightly-bin                # Fast, Private & Safe Web Browser from Mozilla — Nightly Build (en-US)
    fish                               # Smart and user friendly shell intended mostly for interactive use
    git                                # the fast distributed version control system
    gnome-bluetooth-3.0                # GNOME Bluetooth Subsystem
    grim                               # Screenshot utility for Wayland
    gst-plugin-pipewire                # Multimedia graph framework - pipewire plugin
    gsound                             # Small library for playing system sounds
    gtk3                               # GObject-based multi-platform GUI toolkit
    gtk4                               # GObject-based multi-platform GUI toolkit
    gum                                # A tool for glamorous shell scripts
    hyprland                           # a highly customizable dynamic tiling Wayland compositor
    hyprlock                           # hyprland’s GPU-accelerated screen locking utility
    hyprshade                          # Hyprland shade configuration tool
    kitty                              # A modern, hackable, featureful, OpenGL-based terminal emulator
    libadwaita                         # Building blocks for modern adaptive GNOME applications
    libpulse                           # A featureful, general-purpose sound server (client library)
    libgtop                            # Library for collecting system monitoring data
    network-manager-applet             # Applet for managing network connections
    networkmanager                     # Network connection manager and user applications
    nm-connection-editor               # NetworkManager GUI connection editor and widgets
    noto-fonts                         # Google Noto TTF fonts
    noto-fonts-emoji                   # Google Noto emoji fonts
    nwg-look                           # GTK3 settings editor adapted to work on wlroots-based compositors
    pavucontrol                        # PulseAudio Volume Control
    pipewire                           # Low-latency audio/video router and processor
    pipewire-alsa                      # Low-latency audio/video router and processor - ALSA configuration
    pipewire-jack                      # Low-latency audio/video router and processor - JACK replacement
    pipewire-pulse                     # Low-latency audio/video router and processor - PulseAudio replacement
    playerctl                          # mpris media player controller and lib for spotify, vlc and others.
    python                             # Python high-level programming language
    python-click                       # Simple wrapper around optparse for powerful command line utilities
    python-gobject                     # Python bindings for GLib/GObject/GIO/GTK
    python-pip                         # The PyPA recommended tool for installing Python packages
    python-psutil                      # A cross-platform process and system utilities module for Python
    python-pywal                       # Generate and change colorschemes on the fly
    python-rich                        # Render rich text, tables, progress bars, syntax highlighting, markdown and more to the terminal
    qt5-graphicaleffects               # Graphical effects for use with Qt Quick 2
    qt5-quickcontrols2                 # Next generation user interface controls based on Qt Quick
    qt5-svg                            # Classes for displaying the contents of SVG files
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
    unzip                              # For extracting and viewing files in .zip archives
    wl-clipboard                       # Command-line copy/paste utilities for Wayland
    wlogout                            # Logout menu for wayland
    wireplumber                        # Session / policy manager implementation for PipeWire
    xdg-desktop-portal                 # Desktop integration portals for sandboxed apps
    xdg-desktop-portal-gtk             # A backend implementation for xdg-desktop-portal using GTK
    xdg-desktop-portal-hyprland        # xdg-desktop-portal backend for hyprland
    xdg-desktop-portal-wlr             # xdg-desktop-portal backend for wlroots
    xdg-user-dirs                      # Manage user directories like ~/Desktop and ~/Music
    zip                                # Compressor/archiver for creating and modifying zipfiles
  )
  paru -S --needed "${Packages[@]}" --noconfirm
  curl -fsSL https://bun.sh/install | bash && sudo ln -s $HOME/.bun/bin/bun /usr/local/bin/bun
}

InstallOptional() {
  Packages=(
    cava                               # Console-based Audio Visualizer for Alsa
    gparted                            # A Partition Magic clone, frontend to GNU Parted
    imagemagick                        # An image viewing/manipulation program
    imgcat                             # Output images as RGB ANSI graphics on the terminal
    neovim                             # Fork of Vim aiming to improve user experience, plugins, and GUIs
    paru                               # Feature packed AUR helper
    parui                              # Simple TUI frontend for paru or yay
    timeshift                          # A system restore utility for Linux
    tree                               # A directory listing program displaying a depth indented list of files
    vlc                                # Multi-platform MPEG, VCD/DVD, and DivX player
    wayland-screenshot                 # A wayland screenshotting tool
    wget                               # Network utility to retrieve files from the Web
  )
  paru -S --needed "${Packages[@]}" --noconfirm
}

InstallohSystemmm() {
  Packages=(
    ani-cli                            # A cli to browse and watch anime.
    armcord-bin                        # Discord client for lower end and ARM devices.
  # bridge-utils                       # Utilities for configuring the Linux ethernet bridge
    clion                              # Cross-platform IDE for C and C++ from JetBrains.
    clion-jre                          # Cross-platform IDE for C and C++ from JetBrains.
  # dnsmasq                            # Lightweight, easy to configure DNS forwarder and DHCP server
  # ebtables                           # Linux kernel packet control tool (using nft interface)
  # fcitx5                             # Next generation of fcitx
  # fcitx5-configtool                  # Configuration Tool for Fcitx5
    gitui                              # Blazing fast terminal-ui for git written in Rust
    goland                             # Capable and Ergonomic Go IDE
    goland-jre                         # JBR (JetBrains Runtime) for Goland - a patched JRE
    gwenview                           # A fast and easy to use image viewer
    ipscan                             # Angry IP Scanner (or simply ipscan) is an open-source and cross-platform network scanner.
    intellij-idea-ultimate-edition     # An intelligent IDE for Java, Groovy and other programming languages with advanced refactoring features intensely focused on developer productivity.
    intellij-idea-ultimate-edition-jre # An intelligent IDE for Java, Groovy and other programming languages with advanced refactoring features intensely focused on developer productivity.
    javafx-scenebuilder                # Scene Builder is an open source tool that allows for drag and drop design of JavaFX user interfaces.
  # iptables                           # Linux kernel packet control tool (using legacy interface)
    krita                              # Edit and paint images
  # libvirt                            # API for controlling virtualization engines (openvz,kvm,qemu,virtualbox,xen,etc)
    lutris                             # Open Gaming Platform
    magic-wormhole                     # Securely transfer data between computers
    mangal-bin                         # The most advanced cli manga downloader in the entire universe!
  # mozc                               # The Open Source edition of Google Japanese Input
    mpv                                # a free, open source, and cross-platform media player
    nasm                               # 80x86 assembler designed for portability and modularity
    ncdu                               # Disk usage analyzer with an ncurses interface
    obs-studio                         # Free, open source software for live streaming and recording
  # openbsd-netcat                     # TCP/IP swiss army knife. OpenBSD variant.
    protonvpn-cli-community            # A Community Linux CLI for ProtonVPN
    pycharm-professional               # Python IDE for Professional Developers. Professional Edition
    python-grip                        # Preview GitHub Markdown files like Readme locally before committing them
  # qemu                               # A basic QEMU setup for headless environments
    rider                              # A cross-platform .NET IDE by JetBrains.
    signal-desktop                     # Signal Private Messenger for Linux
    speedtest-cli                      # Command line interface for testing internet bandwidth using speedtest.net
    spotify                            # A proprietary music streaming service
    superfile-bin                      # Pretty fancy and modern file manager in terminal file manager
    syncplay                           # Synchronize watching movies on mplayer2, vlc, mpv, and mpc-hc across many computers
    teams-for-linux-bin                # Unofficial Microsoft Teams for Linux client (binary version)
    tlp                                # Linux Advanced Power Management
  # vde2                               # Virtual Distributed Ethernet for emulators like qemu
  # virt-manager                       # Desktop user interface for managing virtual machines
  # virt-viewer                        # A lightweight interface for interacting with the graphical display of virtualized guest OS.
    vscodium-bin                       # Binary releases of VS Code without MS branding/telemetry/licensing.
    wezterm                            # A GPU-accelerated cross-platform terminal emulator and multiplexer
    whatsapp-for-linux                 # An unofficial WhatsApp desktop application for linux
    wine                               # A compatibility layer for running Windows programs
    wps-office                         # Kingsoft Office (WPS Office) - an office productivity suite
    zathura                            # Minimalistic document viewer
    zathura-pdf-mupdf                  # PDF support for Zathura (MuPDF backend) (Supports PDF, ePub, and OpenXPS)
  )
  paru -S --needed "${Packages[@]}" --noconfirm
}

InstallZsh() {
  Packages=(
    "https://github.com/ohmyzsh/ohmyzsh"                          # A community-driven framework for managing your zsh configuration. 
    "https://github.com/zsh-users/zsh-autosuggestions"            # Fish-like autosuggestions for zsh  
    "https://github.com/zsh-users/zsh-syntax-highlighting"        # Fish shell like syntax highlighting for Zsh
  )

  ZSH_CUSTOM="${ZSH_CUSTOM:-$HOME/.oh-my-zsh/custom}"
  cd ~
  git clone ${Packages[0]} ~/.oh-my-zsh                 # Clone oh-my-zsh
  git clone ${Packages[1]} $ZSH_CUSTOM/plugins/zsh-autosuggestions  # Clone zsh-autosuggestions
  git clone ${Packages[2]} $ZSH_CUSTOM/plugins/zsh-syntax-highlighting  # Clone zsh-syntax-highlighting
  echo "source $ZSH_CUSTOM/plugins/zsh-autosuggestions/zsh-autosuggestions.zsh" >> ~/.zshrc
  echo "source $ZSH_CUSTOM/plugins/zsh-syntax-highlighting/zsh-syntax-highlighting.zsh" >> ~/.zshrc
  source ~/.zshrc
}
