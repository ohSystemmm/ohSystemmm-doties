#  _   _           _       _       ____        _    __ _ _                 _     
# | | | |_ __   __| | __ _| |_ ___|  _ \  ___ | |_ / _(_) | ___  ___   ___| |__  
# | | | | '_ \ / _` |/ _` | __/ _ \ | | |/ _ \| __| |_| | |/ _ \/ __| / __| '_ \ 
# | |_| | |_) | (_| | (_| | ||  __/ |_| | (_) | |_|  _| | |  __/\__ \_\__ \ | | |
#  \___/| .__/ \__,_|\__,_|\__\___|____/ \___/ \__|_| |_|_|\___||___(_)___/_| |_|
#       |_|                                          
#
# by ohSystemmm <3 - 2024

ohSystemmmDoties=~/ohSystemmm-doties/
GitHubURL="https://github.com/ohSystemmm/ohSystemmm-doties.git"

cd "$ohSystemmmDoties" || exit

git fetch origin

LOCAL=$(git rev-parse @)
REMOTE=$(git rev-parse @{u})

if [ "$LOCAL" = "$REMOTE" ]; then
    echo "Dotfiles are up to date."
    notify-send "ohSystemmm-doties" "Already Up-To-Date"
else
    echo "Updating dotfiles..."
    git pull origin main

    stow -R */

    pkill -SIGUSR1 hyprland

    notify-send "ohSystemmm-doties" "Successfully updated and applied."
fi
