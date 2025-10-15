InstallAll() {
  Packages=(
    7zip acpi acpid ags-hyprpanel-git agsv1 agsv1-debug amd-ucode android-sdk-build-tools android-studio android-tools ani-cli anydesk-bin argouml-bin aspnet-runtime
    base base-devel bibata-extra-cursor-theme blender blueman bluez bluez-utils bridge-utils btop bun cava chrome-remote-desktop chromium clion clion-jre crush-bin dart-sass
    datagrip datagrip-jre dhclient dmidecode dnsmasq docker docker-buildx docker-compose dosfstools dotnet-sdk efibootmgr exfatprogs fcitx5 fcitx5-configtool fcitx5-mozc fd
    figlet filezilla firefox-nightly-bin fish fluffychat-bin geogebra-6-bin git git-filter-repo gitui gnome-bluetooth-3.0 gnome-keyring go goland goland-jre googlekeep gparted
    grim grimblast-git grub gsound gtk3 gtk4 gtksourceview3 gum gvfs gvfs-mtp gvfs-smb gwenview hyfetch hyprland hyprlock hyprpanel hyprpicker hyprshade hyprsunset-git imagemagick
    imgcat inkscape intellij-idea-ultimate-edition intellij-idea-ultimate-edition-jre ipscan ipscan-bin iw java javafx-scenebuilder jdk21-openjdk jq just kdeconnect kitty kio-extras
    kolourpaint krita legcord-bin less libadwaita libfaketime libgtop libpulse libtiff5 libvirt libwebp linux linux-firmware linux-firmware-nvidia linux-headers linux-lts
    linux-lts-headers linux-zen linux-zen-headers lunar-client lzip magic-wormhole mangal-bin man-db masterpdf-free mtools mtpfs nautilus nasm ncdu net-tools network-manager-applet
    networkmanager nm-connection-editor nodejs-lts-iron nordvpn-bin nordvpn-gui noto-fonts noto-fonts-emoji nuget nvflash nvim-packer-git obs-studio obsidian oh-my-posh
    openbsd-netcat osu-lazer-bin os-prober packettracer paru parui pavucontrol penpot-desktop-bin pipewire pipewire-alsa pipewire-jack pipewire-pulse playerctl plocate polkit-gnome
    postman-bin power-profiles-daemon prismlauncher proton-ge-custom-bin proton-vpn-gtk-app protonvpn-cli-community-git pycharm-professional python python-click python-gobject
    python-gpustat python-grip python-pip python-psutil python-pyclip python-pywal python-rich qalculate-qt qemu qemu-full qt5-graphicaleffects qt5-quickcontrols2 qt5-svg qt5-tools
    qt6-tools qutebrowser rider rofi rofi-wayland rpi-imager rustrover rustrover-jre rustup sddm signal-desktop slurp smartmontools speedtest-cli spotify steam superfile-bin
    swww syncplay teams-for-linux-bin texlive-basic texlive-latexextra texstudio-dark-git thunar thunderbird timeshift traceroute tree ttf-cascadia-code ttf-fira-code ttf-fira-sans
    ttf-firacode-nerd ttf-hanazono tumbler unzip upower vde2 vhs virt-manager virt-viewer visual-studio-code-bin vivaldi vivaldi-snapshot vlc vulkan-tools waydroid waydroid-image-gapps
    wayland-screenshot-git wezterm wf-recorder-git wget wgetpaste whatsapp-for-linux wine winetricks wireplumber wl-clipboard wlogout wlsunset wps-office wtfutil-bin wtype xampp
    xdg-desktop-portal xdg-desktop-portal-gtk xdg-desktop-portal-hyprland xdg-desktop-portal-wlr xdg-user-dirs xf86-video-amdgpu yay yay-debug youtube-dl-gui-bin ytmdl zathura
    zathura-pdf-mupdf zip zoxide zram-generator zsh
  )

  paru -S --overwrite '*' "${Packages[@]}"
  curl -fsSL https://bun.sh/install | bash && sudo ln -s $HOME/.bun/bin/bun /usr/local/bin/bun
}

InstallRequired() {

}

InstallOptional() {

}

InstallohSystemmm() {

}
