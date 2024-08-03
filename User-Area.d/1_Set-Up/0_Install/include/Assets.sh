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
  echo -e -n "\033[1;35m"
  figlet -w 200 "$Header"
  echo -e "\nohSystemmm-doties"
  echo -e "by ohSystemmm <3 - 2024\033[0m\n\n"
}

NextSlide() {
  sleep 0.5
  echo -e -n "\n"
  choice=$(gum choose --cursor="> " --cursor-prefix="* " "Continue Installation" "Abort Installation")
  case $choice in
    "Continue Installation")
      continue
      ;;
    "Abort Installation")
      echo -e "\033[1;31mInstallation aborted by user.\033[0m\n"
      exit 1
      ;;
  esac    
}
