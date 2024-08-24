#     _                 _             _
#    / \   ___ ___  ___| |_ ___   ___| |__
#   / _ \ / __/ __|/ _ \ __/ __| / __| '_ \
#  / ___ \\__ \__ \  __/ |_\__ \_\__ \ | | |
# /_/   \_\___/___/\___|\__|___(_)___/_| |_|
#
# by ohSystemmm <3 - 2024

SlideHeader() {
  Header=$1
  clear
  echo -e -n "\033[0;35m"
  figlet -w 200 "$Header"
  echo -e -n "\033[0m"
  
  echo -e "\033[0;36mohSystemmm-doties\033[0m"
  echo -e "\033[0;34mby ohSystemmm <3 - 2024\033[0m\n\n"
}

NextSlide() {
  echo -e -n "\nPress '\033[4;33mEnter\033[0m' to continue or '\033[4;33mQ\033[0m'/'\033[4;33mq\033[0m' to abort installation..."
  read -r -n1 UserInput
  
  if [[ "$UserInput" == "q" || "$UserInput" == "Q" ]]; then
    echo -e "\033[1;31m\n\nInstallation aborted by user.\033[0m\n"
    exit 1
  fi
}


