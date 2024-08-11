clear
MainMenu=$(gum choose --cursor=" " \
  "Change Wallpaper Type" \
  "Set Wallpaper" \
  "Set Diashow Folder" \
  "Exit")

case $MainMenu in 
  "Change Wallpaper Type")
    Type=$(gum choose --cursor=" " \
      "Static" \
      "Diashow")
    case $Type in
      "Static")
        echo "static" > ~/ohSystemmm-doties/System-Area.d/5_Temp-Files/Wallpaper-Type.sh
      ;;
      "Diashow")
        echo "diashow" > ~/ohSystemmm-doties/System-Area.d/5_Temp-Files/Wallpaper-Type.sh 
        source ~/ohSystemmm-doties/System-Area.d/4_Custom-Scripts/Wallpaper-Engine.sh &
      ;;
    esac
  ;;
  "Set Wallpaper")
    source ~/ohSystemmm-doties/System-Area.d/4_Custom-Scripts/Select/Select_Wallpaper.sh
    exit 1
  ;;  
  "Set Diashow Folder")
    source ~/ohSystemmm-doties/System-Area.d/4_Custom-Scripts/Select/Select_Diashow-Folder.sh
    exit 1
  ;; 
  "Exit")
    exit 1
  ;;
esac

