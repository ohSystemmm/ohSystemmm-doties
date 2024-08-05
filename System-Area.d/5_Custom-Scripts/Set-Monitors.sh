#  ____       _        __  __             _ _                       _
# / ___|  ___| |_     |  \/  | ___  _ __ (_) |_ ___  _ __ ___   ___| |__
# \___ \ / _ \ __|____| |\/| |/ _ \| '_ \| | __/ _ \| '__/ __| / __| '_ \
#  ___) |  __/ ||_____| |  | | (_) | | | | | || (_) | |  \__ \_\__ \ | | |
# |____/ \___|\__|    |_|  |_|\___/|_| |_|_|\__\___/|_|  |___(_)___/_| |_|
#
# by ohSystemmm <3 - 2024
#!/bin/bash

# Generate header with figlet
Header=$(figlet -w 100 Monitors.conf)

# Define the file path
File=~/ohSystemmm-doties/System-Area.d/2_Hyprland-Config/hypr/0_Hypr-Configs/0_Monitors/Monitors.conf

# Ensure the directory exists
mkdir -p "$(dirname "$File")"

# Remove the file if it exists
if [ -e "$File" ]; then
  rm -f "$File"
fi

# Write the header to the file, each line as a comment
{
  echo "$Header" | while IFS= read -r line; do
    echo "# $line"
  done
  echo -e "# by ohSystemmm <3 - 2024\n"
} > "$File"

# Process monitor configuration and append it to the file
hyprctl monitors -j | jq -r '
  .[] | 
  "monitor=\(.name),\(.width)x\(.height)@\(.refreshRate),\(.x)x\(.y),\(.scale)"' >> "$File"
