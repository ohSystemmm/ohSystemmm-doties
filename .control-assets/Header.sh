#  _   _                _               _     
# | | | | ___  __ _  __| | ___ _ __ ___| |__  
# | |_| |/ _ \/ _` |/ _` |/ _ \ '__/ __| '_ \ 
# |  _  |  __/ (_| | (_| |  __/ | _\__ \ | | |
# |_| |_|\___|\__,_|\__,_|\___|_|(_)___/_| |_|
#
# by ohSystemmm <3 - 2024

Header() {
  clear
  local Message=$1
  echo -e -n "${BCyan}"
  figlet -w 200 "$Message"
  echo -e "\nby ohSystemmm <3 - 2024"
  echo -e -n "${Normal}\n"
}

