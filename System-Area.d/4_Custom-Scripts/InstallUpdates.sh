#  ___           _        _ _ _   _           _       _                  _     
# |_ _|_ __  ___| |_ __ _| | | | | |_ __   __| | __ _| |_ ___  ___   ___| |__  
#  | || '_ \/ __| __/ _` | | | | | | '_ \ / _` |/ _` | __/ _ \/ __| / __| '_ \ 
#  | || | | \__ \ || (_| | | | |_| | |_) | (_| | (_| | ||  __/\__ \_\__ \ | | |
# |___|_| |_|___/\__\__,_|_|_|\___/| .__/ \__,_|\__,_|\__\___||___(_)___/_| |_|
#                                  |_|       
#
# by ohSystemmm <3 - 2024

sleep 1
clear

echo "  ___           _        _ _    _   _           _       _             "
echo " |_ _|_ __  ___| |_ __ _| | |  | | | |_ __   __| | __ _| |_ ___  ___  "
echo "  | || '_ \/ __| __/ _' | | |  | | | | '_ \ / _' |/ _' | __/ _ \/ __| "
echo "  | || | | \__ \ || (_| | | |  | |_| | |_) | (_| | (_| | ||  __/\__ \ "
echo " |___|_| |_|___/\__\__,_|_|_|   \___/| .__/ \__,_|\__,_|\__\___||___/ "
echo "                                     |_|                              " 
echo ""

if gum confirm "Do you want to update your system?" ;then
    echo 
    echo ":: Updating."
    echo ""
elif [ $? -eq 130 ]; then
        exit 130
else
    echo
    echo ":: Update aborted."
    exit;
fi

paru -Syyu

notify-send "Update complete"
echo 
echo ":: Update complete"
sleep 1