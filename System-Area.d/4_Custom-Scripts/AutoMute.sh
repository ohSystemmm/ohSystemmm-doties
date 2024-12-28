#     _         _        __  __       _             _     
#    / \  _   _| |_ ___ |  \/  |_   _| |_ ___   ___| |__  
#   / _ \| | | | __/ _ \| |\/| | | | | __/ _ \ / __| '_ \ 
#  / ___ \ |_| | || (_) | |  | | |_| | ||  __/_\__ \ | | |
# /_/   \_\__,_|\__\___/|_|  |_|\__,_|\__\___(_)___/_| |_|
#                                                         
# by ohSystemmm <3 - 2024 

sleep 5

wpctl set-volume @DEFAULT_AUDIO_SINK@ 0
wpctl set-volume @DEFAULT_AUDIO_SOURCE@ 0

if command -v notify-send &> /dev/null; then
    notify-send "Volume setting" "Your device has been muted."
fi

