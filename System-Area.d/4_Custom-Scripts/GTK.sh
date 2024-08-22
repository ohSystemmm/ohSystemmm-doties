#   ____ _____ _  __      _     
#  / ___|_   _| |/ /  ___| |__  
# | |  _  | | | ' /  / __| '_ \ 
# | |_| | | | | . \ _\__ \ | | |
#  \____| |_| |_|\_(_)___/_| |_|
# 
# by ohSystemmm <3 - 2024

Settings=~/ohSystemmm-doties/System-Area.d/3_Package-Config/0_App-Configs/gtk-3.0/settings.ini

if [ ! -f "$Settings" ]; then 
  exit 1 
fi

GnomeSchema="org.gnome.desktop.interface"
GTKTheme="$(grep 'gtk-theme-name' "$Settings" | sed 's/.*\s*=\s*//')"
IconTheme="$(grep 'gtk-icon-theme-name' "$Settings" | sed 's/.*\s*=\s*//')"
CursorTheme="$(grep 'gtk-cursor-theme-name' "$Settings" | sed 's/.*\s*=\s*//')"
CursorSize="$(grep 'gtk-cursor-theme-size' "$Settings" | sed 's/.*\s*=\s*//')"
FontName="$(grep 'gtk-font-name' "$Settings" | sed 's/.*\s*=\s*//')"

echo $GTKTheme
echo $IconTheme
echo $CursorTheme
echo $CursorSize
echo $FontName

gsettings set "$GnomeSchema" gtk-theme "$GTKTheme"
gsettings set "$GnomeSchema" icon-theme "$IconTheme"
gsettings set "$GnomeSchema" cursor-theme "$CursorTheme"
gsettings set "$GnomeSchema" font-name "$FontName"
gsettings set "$GnomeSchema" color-scheme "prefer-dark"

hyprctl setcursor $CursorTheme $CursorSize
