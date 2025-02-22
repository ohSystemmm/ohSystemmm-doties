#  __  __           _      ____  _                           _     
# |  \/  |_   _ ___(_) ___|  _ \| | __ _ _   _  ___ _ __ ___| |__  
# | |\/| | | | / __| |/ __| |_) | |/ _` | | | |/ _ \ '__/ __| '_ \ 
# | |  | | |_| \__ \ | (__|  __/| | (_| | |_| |  __/ | _\__ \ | | |
# |_|  |_|\__,_|___/_|\___|_|   |_|\__,_|\__, |\___|_|(_)___/_| |_|
#                                       |___/
# 
# by ohSystemmm <3 - 2024

Song=$(playerctl metadata --format '{{title}}' 2>/dev/null)
Artist=$(playerctl metadata --format '{{artist}}' 2>/dev/null)

if [[ -n "$Song" && -n "$Artist" ]]; then
    echo " Currently playing '$Song' by '$Artist' "
fi

