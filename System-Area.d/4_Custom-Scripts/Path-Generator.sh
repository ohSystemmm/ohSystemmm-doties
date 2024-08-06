#  ____       _   _            ____                           _                 _     
# |  _ \ __ _| |_| |__        / ___| ___ _ __   ___ _ __ __ _| |_ ___  _ __ ___| |__  
# | |_) / _` | __| '_ \ _____| |  _ / _ \ '_ \ / _ \ '__/ _` | __/ _ \| '__/ __| '_ \ 
# |  __/ (_| | |_| | | |_____| |_| |  __/ | | |  __/ | | (_| | || (_) | | _\__ \ | | |
# |_|   \__,_|\__|_| |_|      \____|\___|_| |_|\___|_|  \__,_|\__\___/|_|(_)___/_| |_|
#
# by ohSystemmm <3 - 2024

clear

# Colors
Normal="\033[0m"
Purple="\033[1;35m"
Green="\033[1;32m"
Red="\033[1;31m"

# Error Counter
ErrorCount=0

# Main-Paths
DotfileLocation=""
SystemArea=""
UserArea=""

# System-Paths
MasterPaths=""
DotfileSettings=""
HyprlandConfig=""
PackageConfig=""
CustomApps=""
CustomScripts=""
TempFiles=""

# User-Paths
Info=""
SetUp=""
Wallpapers=""
Diashows=""

# Header
echo -e "${Purple}"
figlet -w 100 Path-Generator.sh
echo -e "by ohSystemmm <3 - 2024${Normal}"
echo

# Confirmation
if gum confirm "Do you want to regenerate all paths?" --affirmative "Confirm" --negative "Cancel"; then
    echo -e "Starting Service...\n"
else
    echo -e "Aborted...\n"
    exit 1
fi

# Status
Done() {
    echo -e "[${Green}Done${Normal}]"
}
Failed() {
    echo -e "[${Red}Failed${Normal}]"
    ErrorCount=$((ErrorCount + 1))
    echo -e "\n${Red}Failed${Normal}, ${Red}${ErrorCount}${Normal} Errors Occurred.\n"
    exit 1
}

# Analyzing Filelocation
echo -n "Analyzing Filelocation..." 
{
    cd /
    DotfileLocation="/$(fd --type d ohSystemmm-doties | head -n 1)"
    [ -d "$DotfileLocation" ]
} || Failed 
Done    

# Retrieving Filedirectories
echo -n "Retrieving Filedirectory..."
{
    SystemArea="${DotfileLocation}System-Area.d/"
    UserArea="${DotfileLocation}User-Area.d/"

    GlobalConfig="${SystemArea}0_Global-Config/"
    DotfileSettings="${SystemArea}1_Dotfile-Settings/"
    HyprlandConfig="${SystemArea}2_Hyprland-Config/"
    PackageConfig="${SystemArea}3_Package-Config/"
    CustomApps="${SystemArea}4_Custom-Apps/"
    CustomScripts="${SystemArea}5_Custom-Scripts/"
    TempFiles="${SystemArea}6_Temp-Files/"

    Info="${UserArea}0_Info/"
    SetUp="${UserArea}1_Set-Up/"
    Wallpapers="${UserArea}2_Wallpapers/"
    Diashows="${UserArea}3_Diashows/"
} || Failed
Done

# Wiping Old Configurations
echo -n "Wiping Old Configurations..."
{
    cd "$GlobalConfig"
    chmod -x System-Paths.sh
    rm -rf System-Paths.sh
} || Failed
Done
    
# Generating New Configurations
echo -n "Generating New Configurations..."
{
    cd "$GlobalConfig"
    touch System-Paths.sh
    chmod +x System-Paths.sh
} || Failed
Done
    
# Applying New Content
echo -n "Applying New Content..."
{
    # Header
    figlet -w 100 System-Paths.sh | sed 's/^/# /'        > System-Paths.sh
    echo -e "# \n# by ohSystemmm <3 - 2024\n"           >> System-Paths.sh
    
    # Content
    echo -e "# Dotfile Location"                        >> System-Paths.sh
    echo -e "MainPath='${DotfileLocation}'"             >> System-Paths.sh
    echo -e ""                                          >> System-Paths.sh
    echo -e "# Main Locations"                          >> System-Paths.sh
    echo -e "SystemAreaPath='${SystemArea}'"            >> System-Paths.sh
    echo -e "UserAreaPath='${UserArea}'"                >> System-Paths.sh
    echo -e ""                                          >> System-Paths.sh
    echo -e "# Sub-System Locations"                    >> System-Paths.sh
    echo -e "GlobalConfigPath='${GlobalConfig}'"               >> System-Paths.sh
    echo -e "DotfileSettingsPath='${DotfileSettings}'"  >> System-Paths.sh
    echo -e "HyprlandConfigPath='${HyprlandConfig}'"    >> System-Paths.sh
    echo -e "PackageConfigPath='${PackageConfig}'"      >> System-Paths.sh
    echo -e "CustomAppsPath='${CustomApps}'"            >> System-Paths.sh
    echo -e "CustomScriptsPath='${CustomScripts}'"      >> System-Paths.sh
    echo -e "TempFilesPath='${TempFiles}'"              >> System-Paths.sh
    echo -e ""                                          >> System-Paths.sh
    echo -e "# Sub-User Locations"                      >> System-Paths.sh
    echo -e "InfoPath='${Info}'"                        >> System-Paths.sh
    echo -e "SetUpPath='${SetUp}'"                      >> System-Paths.sh
    echo -e "WallpapersPath='${Wallpapers}'"            >> System-Paths.sh
    echo -e "DiashowsPath='${Diashows}'"                >> System-Paths.sh
} || Failed
Done
    
# Verifying
echo -e "\n${Green}Done${Normal}, ${Green}${ErrorCount}${Normal} Errors Occurred.\n\n"

echo -e "${Purple}Written Content:${Normal}\n"
cat System-Paths.sh
echo -e ""
