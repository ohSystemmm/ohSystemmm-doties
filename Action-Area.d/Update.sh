#  _   _           _       _             _     
# | | | |_ __   __| | __ _| |_ ___   ___| |__  
# | | | | '_ \ / _` |/ _` | __/ _ \ / __| '_ \ 
# | |_| | |_) | (_| | (_| | ||  __/_\__ \ | | |
#  \___/| .__/ \__,_|\__,_|\__\___(_)___/_| |_|
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
    notify-send "ohSystemmm-doties" "Already Up-To-Date"
else
    git pull origin main
    stow -R */
    notify-send "ohSystemmm-doties" "Successfully updated and applied."
fi

