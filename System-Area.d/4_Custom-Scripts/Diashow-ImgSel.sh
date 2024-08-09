#  ____  _           _                       ___                 ____       _       _
# |  _ \(_) __ _ ___| |__   _____      __   |_ _|_ __ ___   __ _/ ___|  ___| |  ___| |__
# | | | | |/ _` / __| '_ \ / _ \ \ /\ / /____| || '_ ` _ \ / _` \___ \ / _ \ | / __| '_ \
# | |_| | | (_| \__ \ | | | (_) \ V  V /_____| || | | | | | (_| |___) |  __/ |_\__ \ | | |
# |____/|_|\__,_|___/_| |_|\___/ \_/\_/     |___|_| |_| |_|\__, |____/ \___|_(_)___/_| |_|
#                                                          |___/
# 
# by ohSystemmm <3 -2024

DiashowFolder=~/Downloads/

# Find all image files in the directory (e.g., jpg, png)
Images=("$DiashowFolder"*.{jpg,png,jpeg})

# Check if the array is not empty
if [ ${#Images[@]} -eq 0 ]; then
  echo "No images found in the directory."
  exit 1
fi

# Pick a random image
RandomImage=${Images[RANDOM % ${#Images[@]}]}

# Output the path of the random image
echo "Random Image: $RandomImage"

# Optionally, you can open the image or use it in other commands
# Example: open the image (macOS)
# open "$RANDOM_IMAGE"

# Example: display the image (Linux)
# display "$RANDOM_IMAGE"

