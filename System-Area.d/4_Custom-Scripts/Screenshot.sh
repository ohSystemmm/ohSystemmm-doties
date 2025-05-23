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

filename="$SAVE_DIR/Screenshot_$n.png"
grim -g "$(slurp)" "$filename"

cat "$filename" | wl-copy -t image/png

notify-send "Screenshot Saved and Copied!" "Saved in $filename"
