#  _   _                  _     _ _            _
# | | | |_   _ _ __  _ __(_) __| | | ___   ___| |__
# | |_| | | | | '_ \| '__| |/ _` | |/ _ \ / __| '_ \
# |  _  | |_| | |_) | |  | | (_| | |  __/_\__ \ | | |
# |_| |_|\__, | .__/|_|  |_|\__,_|_|\___(_)___/_| |_|
#        |___/|_| 
#
# by ohSystemmm <3 - 2024

SERVICE="hypridle"
if [[ "$1" == "status" ]]; then
    sleep 1
    if pgrep -x "$SERVICE" >/dev/null ;then
        echo '{"text": "RUNNING", "class": "active", "tooltip": "Screen locking active"}'
    else
        echo '{"text": "NOT RUNNING", "class": "notactive", "tooltip": "Screen locking deactivated"}'
    fi
fi
if [[ "$1" == "toggle" ]]; then
    if pgrep -x "$SERVICE" >/dev/null ;then
        killall hypridle
    else
        hypridle
    fi
fi
