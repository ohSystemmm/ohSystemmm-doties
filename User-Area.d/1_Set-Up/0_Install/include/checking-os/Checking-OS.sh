#   ____ _               _    _                    ___  ____       _
#  / ___| |__   ___  ___| | _(_)_ __   __ _       / _ \/ ___|  ___| |__
# | |   | '_ \ / _ \/ __| |/ / | '_ \ / _` |_____| | | \___ \ / __| '_ \
# | |___| | | |  __/ (__|   <| | | | | (_| |_____| |_| |___) |\__ \ | | |
#  \____|_| |_|\___|\___|_|\_\_|_| |_|\__, |      \___/|____(_)___/_| |_|
#                                     |___/
#
# by ohSystemmm <3 - 2024

Kernel=$(uname -s)

if [ "$Kernel" != "Linux" ]; then
    echo "Unsupported OS. This Script only runs on Arch Linux."
    exit 1
fi

if [ -f /etc/os-release ]; then
    . /etc/os-release
    if [ "$ID" != "arch" ]; then
        echo "This Script ONLY Supports Arch Linux."
        exit 1
    fi
else
    echo "Could Not Determine OS Version."
    exit 1
fi

echo "OS is Arch Linux."
