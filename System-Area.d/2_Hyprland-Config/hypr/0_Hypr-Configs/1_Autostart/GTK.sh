#   ____ _____ _  __      _     
#  / ___|_   _| |/ /  ___| |__  
# | |  _  | | | ' /  / __| '_ \ 
# | |_| | | | | . \ _\__ \ | | |
#  \____| |_| |_|\_(_)___/_| |_|
#
# by ohSystemmm <3 - 2024

config="$HOME/.config/gtk-3.0/settings.ini"
if [ ! -f "$config" ]; then exit 1; fi

gnome_schema="org.gnome.desktop.interface"
gtk_theme="$(grep 'gtk-theme-name' "$config" | sed 's/.*\s*=\s*//')"
icon_theme="$(grep 'gtk-icon-theme-name' "$config" | sed 's/.*\s*=\s*//')"
cursor_theme="$(grep 'gtk-cursor-theme-name' "$config" | sed 's/.*\s*=\s*//')"
cursor_size="$(grep 'gtk-cursor-theme-size' "$config" | sed 's/.*\s*=\s*//')"
font_name="$(grep 'gtk-font-name' "$config" | sed 's/.*\s*=\s*//')"

echo $gtk_theme
echo $icon_theme
echo $cursor_theme
echo $cursor_size
echo $font_name

gsettings set "$gnome_schema" gtk-theme "$gtk_theme"
gsettings set "$gnome_schema" icon-theme "$icon_theme"
gsettings set "$gnome_schema" cursor-theme "$cursor_theme"
gsettings set "$gnome_schema" font-name "$font_name"
gsettings set "$gnome_schema" color-scheme "prefer-dark"

if [ -f ~/ohSystemmm-doties/Hyprland-config.d/hypr/Hypr-conf.d/2_Cursor/Cursor.conf ] ;then
    echo "exec-once = hyprctl setcursor $cursor_theme $cursor_size" > ~/ohSystemmm-doties/Hyprland-config.d/hypr/Hypr-conf.d/2_Cursor/Cursor.conf 
    hyprctl setcursor $cursor_theme $cursor_size
fi
