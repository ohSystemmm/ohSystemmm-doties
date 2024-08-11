#  ___                   _         _
# |_ _|_ __  _ __  _   _| |_   ___| |__
#  | || '_ \| '_ \| | | | __| / __| '_ \
#  | || | | | |_) | |_| | |_ _\__ \ | | |
# |___|_| |_| .__/ \__,_|\__(_)___/_| |_|
#           |_|
#
# by ohSystemmm <3 - 2024

Header=$(figlet -w 100 Input.conf)
File=~/ohSystemmm-doties/System-Area.d/2_Hyprland-Config/hypr/0_Hypr-Configs/5_Input/Input.conf

if [ -e "$File" ]; then
  rm -f "$File"
  touch $File && chmod +x $File
fi

{
  echo "$Header" | while IFS= read -r line; do
    echo "# $line"
  done
  echo -e "\n# by ohSystemmm <3 - 2024\n"
} > "$File"

clear
figlet -w 100 Input.sh
echo -e ""
echo -e "by ohSystemmm <3 - 2024\n"

KBLayout=$(localectl list-x11-keymap-layouts | gum filter --height 15 --placeholder "Keyboard Layout")
KBVariant=$(localectl list-x11-keymap-variants | gum filter --height 15 --placeholder "Keyboard Variant")

if gum confirm "Natural Scrolling" --affirmative "Yes" --negative "No"; then
  NaturalScroll="true"
else
  NaturalScroll="false"
fi

{
  echo -e "input {"
  echo -e "  kb_layout = ${KBLayout}"
  echo -e "  kb_variant = ${KBVariant}"
  echo -e "  kb_model ="
  echo -e "  kb_options ="
  echo -e "  kb_rules ="
  echo -e ""
  echo -e "  follow_mouse = 1"
  echo -e ""
  echo -e "  sensitivity = 0 "
  echo -e ""
  echo -e "  touchpad {"
  echo -e "    natural_scroll = ${NaturalScroll}"
  echo -e "  }"
  echo -e "}"
} >> $File 

cat $File
echo -e
