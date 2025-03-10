#  ____                               _           _         _
# / ___|  ___ _ __ ___  ___ _ __  ___| |__   ___ | |_   ___| |__
# \___ \ / __| '__/ _ \/ _ \ '_ \/ __| '_ \ / _ \| __| / __| '_ \
#  ___) | (__| | |  __/  __/ | | \__ \ | | | (_) | |_ _\__ \ | | |
# |____/ \___|_|  \___|\___|_| |_|___/_| |_|\___/ \__(_)___/_| |_|
#  
# by ohSystemmm <3 - 2025

SAVE_DIR="$HOME/Screenshots"
mkdir -p "$SAVE_DIR"

n=1
while [[ -f "$SAVE_DIR/Screenshot_$n.png" ]]; do
    ((n++))
done

grim -g "$(slurp)" "$SAVE_DIR/Screenshot_$n.png"

notify-send "Screenshot Saved" "Saved as Screenshot_$n.png in $SAVE_DIR"
