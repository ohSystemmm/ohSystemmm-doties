InstallRequired() {
  Packages=(
    aylurs-gtk-shell-git               # Aylurs's Gtk Shell (AGS), An eww inspired gtk widget system.
    bibata-extra-cursor-theme          # Material Based Cursor Theme: More Bibata!
    blueman                            # GTK+ Bluetooth Manager
    bluez                              # Daemons for the bluetooth protocol stack
    bluez-utils                        # Development and debugging utilities for the bluetooth protocol stack
    brightnessctl                      # Lightweight brightness control tool
    btop                               # A monitor of system resources, bpytop ported to C++
    dart-sass                          # Sass makes CSS fun again
    fd                                 # Simple, fast and user-friendly alternative to find
    figlet                             # A program for making large letters out of ordinary text
    fastfetch                          # Like Neofetch, but much faster because written in C
    firefox-nightly-bin                # Fast, Private & Safe Web Browser from Mozilla — Nightly Build (en-US)
    git                                # the fast distributed version control system
    gnome-bluetooth-3.0                # GNOME Bluetooth Subsystem
    grim                               # Screenshot utility for Wayland
    grimblast-git                      # A helper for screenshots within Hyprland.
    gst-plugin-pipewire                # Multimedia graph framework - pipewire plugin
    gsound                             # Small library for playing system sounds
    gtk3                               # GObject-based multi-platform GUI toolkit
    gtk4                               # GObject-based multi-platform GUI toolkit
    gtksourceview3                     # Text widget with syntax highlighting for GNOME
    gum                                # A tool for glamorous shell scripts
    gvfs                               # Virtual filesystem implementation for GIO
    hyprland                           # a highly customizable dynamic tiling Wayland compositor
    hyprlock                           # hyprland’s GPU-accelerated screen locking utility
    hyprshade                          # Hyprland shade configuration tool
    hyprsunset-git                     # An application to enable a blue-light filter on Hyprland
    hyprpanel                          # A Bar/Panel for Hyprland with extensive customizability
    hyprpicker                         # A wlroots-compatible Wayland color picker that does not suck
    kitty                              # A modern, hackable, featureful, OpenGL-based terminal emulator
    libadwaita                         # Building blocks for modern adaptive GNOME applications
    libpulse                           # A featureful, general-purpose sound server (client library)
    libgtop                            # Library for collecting system monitoring data
    libsoup3                           # HTTP client/server library for GNOME
    matugen-bin                        # A material you color generation tool with templates
    network-manager-applet             # Applet for managing network connections
    networkmanager                     # Network connection manager and user applications
    nm-connection-editor               # NetworkManager GUI connection editor and widgets
    noto-fonts                         # Google Noto TTF fonts
    noto-fonts-emoji                   # Google Noto emoji fonts
    nwg-look                           # GTK3 settings editor adapted to work on wlroots-based compositors
    pacman-contrib                     # Contributed scripts and tools for pacman systems
    pavucontrol                        # PulseAudio Volume Control
    pipewire                           # Low-latency audio/video router and processor
    pipewire-alsa                      # Low-latency audio/video router and processor - ALSA configuration
    pipewire-jack                      # Low-latency audio/video router and processor - JACK replacement
    pipewire-pulse                     # Low-latency audio/video router and processor - PulseAudio replacement
    playerctl                          # mpris media player controller and lib for spotify, vlc and others.
    power-profiles-daemon              # Makes power profiles handling available over D-Bus
    python                             # Python high-level programming language
    python-click                       # Simple wrapper around optparse for powerful command line utilities
    python-gobject                     # Python bindings for GLib/GObject/GIO/GTK
    python-gpustat                     # A simple command-line utility for querying and monitoring GPU status
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
    upower                             # Abstraction for enumerating power devices, listening to device events and querying history and statistics
    wf-recorder-git                    # A video recorder for wlroots-based compositors like sway or wayfire
    wl-clipboard                       # Command-line copy/paste utilities for Wayland
    wlsunset                           # Day/night gamma adjustments for Wayland compositors
    wlogout                            # Logout menu for wayland
    wireplumber                        # Session / policy manager implementation for PipeWire
    xdg-desktop-portal                 # Desktop integration portals for sandboxed apps
    xdg-desktop-portal-gtk             # A backend implementation for xdg-desktop-portal using GTK
    xdg-desktop-portal-hyprland        # xdg-desktop-portal backend for hyprland
    xdg-desktop-portal-wlr             # xdg-desktop-portal backend for wlroots
    xdg-user-dirs                      # Manage user directories like ~/Desktop and ~/Music
    zip                                # Compressor/archiver for creating and modifying zipfiles
  )
  paru -S --overwrite '*' "${Packages[@]}"
  curl -fsSL https://bun.sh/install | bash && sudo ln -s $HOME/.bun/bin/bun /usr/local/bin/bun
}

InstallOptional() {
  Packages=(
    cava                               # Console-based Audio Visualizer for Alsa
    gparted                            # A Partition Magic clone, frontend to GNU Parted
    hyfetch                            # Neofetch with LGBTQ+ pride flags!
    imagemagick                        # An image viewing/manipulation program
    imgcat                             # Output images as RGB ANSI graphics on the termin
    masterpdf-free                     # A complete solution for creation and editing PDF files - Free version without watermark
    neovim-nightly                     # Fork of Vim aiming to improve user experience, plugins, and GUIs
    nvim-packer-git 		           # A use-package inspired plugin manager for Neovim.
    paru                               # Feature packed AUR helper
    parui                              # Simple TUI frontend for paru or yay
    smartmontools                      # Control and monitor S.M.A.R.T. enabled ATA and SCSI Hard Drives
    thunderbird                        # Standalone mail and news reader from mozilla.org
    timeshift                          # A system restore utility for Linux
    tree                               # A directory listing program displaying a depth indented list of files
    vlc                                # Multi-platform MPEG, VCD/DVD, and DivX player
    wget                               # Network utility to retrieve files from the Web
  )
  paru -S --overwrite '*' "${Packages[@]}"
}

InstallohSystemmm() {
  Packages=(
    android-tools                      # android-tools
    argouml-bin                        # UML 1.4 modeller
    ani-cli                            # A cli to browse and watch anime.
    anydesk-bin                        # The Fast Remote Desktop Application
    blender                            # A fully integrated 3D graphics creation suite
    bridge-utils                       # Utilities for configuring the Linux ethernet bridge
    # clion                              # Cross-platform IDE for C and C++ from JetBrains.
    # clion-jre                          # Cross-platform IDE for C and C++ from JetBrains.
    datagrip                           # Smart SQL Editor and Advanced Database Client Packed Together for Optimum Productivity
    datagrip-jre                       # JBR (JetBrains Runtime) for DataGrip - a patched JRE
    dnsmasq                            # Lightweight, easy to configure DNS forwarder and DHCP server
    fcitx5                             # Next generation of fcitx
    fcitx5-configtool                  # Configuration Tool for Fcitx5
    filezilla                          # Fast and reliable FTP, FTPS and SFTP client
    geogebra-6-bin                     # Dynamic mathematics software with interactive graphics, algebra and spreadsheet
    # gitui                              # Blazing fast terminal-ui for git written in Rust
    gnome-keyring                      # Stores passwords and encryption keys
    go                                 # Core compiler tools for the Go programming language
    # goland                             # Capable and Ergonomic Go IDE
    # goland-jre                         # JBR (JetBrains Runtime) for Goland - a patched JRE
    gwenview                           # A fast and easy to use image viewer
    ipscan                             # Angry IP Scanner (or simply ipscan) is an open-source and cross-platform network scanner.
    inkscape                           # Professional vector graphics editor
    intellij-idea-ultimate-edition     # An intelligent IDE for Java, Groovy and other programming languages with advanced refactoring features intensely focused on developer productivity.
    intellij-idea-ultimate-edition-jre # An intelligent IDE for Java, Groovy and other programming languages with advanced refactoring features intensely focused on developer productivity.
    javafx-scenebuilder                # Scene Builder is an open source tool that allows for drag and drop design of JavaFX user interfaces.
    jdk21-openjdk                      # OpenJDK Java 21 development kit
    krita                              # Edit and paint images
    libtiff5                           # Library for manipulation of TIFF images
    libvirt                            # API for controlling virtualization engines (openvz,kvm,qemu,virtualbox,xen,etc)
    libwebp                            # WebP library and conversion tools
    libfaketime                        # Report fake dates and times to programs without having to change the system-wide time.
    magic-wormhole                     # Securely transfer data between computers
    mangal-bin                         # The most advanced cli manga downloader in the entire universe!
    fcitx5-mozc                        # The Open Source edition of Google Japanese Input
    mpv                                # a free, open source, and cross-platform media player
    nasm                               # 80x86 assembler designed for portability and modularity
    ncdu                               # Disk usage analyzer with an ncurses interface
    nvflash                            # A tool to update the the firmware of Nvidia display adapters.
    obsidian                           # A powerful knowledge base that works on top of a local folder of plain text Markdown files
    obs-studio                         # Free, open source software for live streaming and recording
    openbsd-netcat                     # TCP/IP swiss army knife. OpenBSD variant.
    prismlauncher                      # Minecraft launcher with ability to manage multiple instances
    proton-vpn-gtk-app                 # ProtonVPN GTK app, Maintained by Community
    protonvpn-cli-community-git        # A Community Linux CLI for ProtonVPN
    # pycharm-professional               # Python IDE for Professional Developers. Professional Edition
    python-grip                        # Preview GitHub Markdown files like Readme locally before committing them
    p7zip                              # Command-line file archiver with high compression ratio
    qemu                               # A basic QEMU setup for headless environments
    rider                              # A cross-platform .NET IDE by JetBrains.
    # rog-control-center                 # App to control asusctl
    signal-desktop                     # Signal Private Messenger for Linux
    speedtest-cli                      # Command line interface for testing internet bandwidth using speedtest.net
    steam                              # Valve's digital software delivery system
    # spotube                            # Open source Spotify client that doesn't require Premium nor uses Electron!
    superfile-bin                      # Pretty fancy and modern file manager in terminal file manager
    syncplay                           # Synchronize watching movies on mplayer2, vlc, mpv, and mpc-hc across many computers
    teams-for-linux-bin                # Unofficial Microsoft Teams for Linux client (binary version)
    texlive-basic                      # TeX Live - Essential programs and files
    texlive-latexextra                 # TeX Live - LaTeX additional packages
    texstudio-dark-git                 # Integrated writing environment for creating LaTeX documents. Dark version.
    visual-studio-code-bin             # Visual Studio Code (vscode): Editor for building and debugging modern web and cloud applications (official binary version)
    vivaldi                            # An advanced browser made with the power user in mind.
    vivaldi-snapshot                   # An advanced browser made with the power user in mind. Snapshot
    vulkan-tools                       # Vulkan Utilities and Tools
    wezterm                            # A GPU-accelerated cross-platform terminal emulator and multiplexer
    whatsapp-for-linux                 # An unofficial WhatsApp desktop application for linux
    wine                               # A compatibility layer for running Windows programs
    winetricks                         # Script to install various redistributable runtime libraries in Wine.
    wtfutil-bin                        # Personal information dashboard for your terminal
    wps-office                         # Kingsoft Office (WPS Office) - an office productivity suite
    xampp                              # A stand-alone LAMPP distribution
    ytmdl                              # Download songs from YouTube with metadata from iTunes, Spotify, LastFM, etc
    youtube-dl-gui-bin                 # A cross-platform GUI for youtube-dl made in Electron and node.js (binary release)
  )
  paru -S --overwrite '*' "${Packages[@]}" 
}

Required() {}

ZSH() {
  oh-my-posh                              # A prompt theme engine for any shell.
  zsh                                     # A very advanced and programmable command interpreter (shell) for UNIX

  install "${Packages[@]}"
}

Fish() {
  fish                                    # Smart and user friendly shell intended mostly for interactive use
  
  install "${Packages[@]}"
}

Office() {
  zathura                                 # Minimalistic document viewer
  zathura-pdf-mupdf                       # PDF support for Zathura (MuPDF backend) (Supports PDF, ePub, and OpenXPS)
  
  install "${Packages[@]}"
}

Coding() {}

Games() {
  # an-anime-game-launcher-bin              # A Launcher for a specific anime game with auto-patching, discord rpc and time tracking
  # lutris                                # Open Gaming Platform
  osu-lazer-bin                           # The future of osu! and the beginning of an open era! Commonly known by the codename osu!lazer. Pew pew.
  prismlauncher                           # Minecraft launcher with ability to manage multiple instances
  steam                                   # Valve's digital software delivery system
  the-honkers-railway-launcher-bin        # A launcher for a specific anime game with auto-patching, discord rpc and time tracking
  
  install "${Packages[@]}"
}

Virtualization() {
  docker                                  # Pack, ship and run any application as a lightweight container
  docker-buildx                           # Docker CLI plugin for extended build capabilities with BuildKit
  docker-compose                          # Fast, isolated development environments using Docker
  vde2                                    # Virtual Distributed Ethernet for emulators like qemu
  virt-manager                            # Desktop user interface for managing virtual machines
  virt-viewer                             # A lightweight interface for interacting with the graphical display of virtualized guest OS.
  # waydroid                                # A container-based approach to boot a full Android system on a regular Linux system
  # waydroid-image-gapps                    # A container-based approach to boot a full Android system on a regular Linux system (Android image, GAPPS).

  install "${Packages[@]}"
}

Multimedia() {}

NetworkingAndRemoteAccess() {}

CustomizationAndTheming() {}

FileManagementAndSystemTools() {}

SecurityAndPrivacy() {}

CLIUtilsAndMisc() {}

install() {
  paru -S --overwrite '*' "$@"
}
