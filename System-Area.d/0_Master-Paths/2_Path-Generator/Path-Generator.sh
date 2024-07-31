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
DotfileLocation=0
SystemArea=0
UserArea=0

# System-Paths
MasterPaths=0
DotfileSettings=0
HyprlandConfig=0
PackageConfig=0
CustomApps=0
CustomScripts=0
TempFiles=0

# User-Paths
Info=0
SetUp=0
Wallpapers=0
Diashows=0

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
    DotfileLocation="/$(fd --type d ohSystemmm-doties)"
    true  
} || Failed 
Done    

# Retrieving Filedirectories
echo -n "Retrieving Filedirectory..."
{
    SystemArea="$(DotfileLocation)System-Area.d/"
    UserArea="$(DotfileLocation)User-Area.d/"

    MasterPaths="$(SystemArea)0_Master-Paths/"
    DotfileSettings="$(SystemArea)1_Dotfile-Settings/"
    HyprlandConfig="$(SystemArea)2_Hyprland-Config/"
    PackageConfig="$(SystemArea)3_Package-Config/"
    CustomApps="$(SystemArea)4_Custom-Apps/"
    CustomScripts="$(SystemArea)5_Custom-Scripts/"
    TempFiles="$(SystemArea)6_Temp-Files/"

    Info="$(UserArea)0_Info/"
    SetUp="$(UserArea)1_Set-Up/"
    Wallpapers="$(UserArea)2_Wallpapers/"
    Diashows="$(UserArea)3_Diashows/"
    true
} || Failed
Done

# Wiping Old Configurations
echo -n "Wiping Old Configurations..."
{
    true
} || Failed
Done
    
# Generating New Configurations
echo -n "Generating New Configurations..."
{
    true
} || Failed
Done
    
# Applying New Content
echo -n "Applying New Content..."
{
    true
} || Failed
Done
    
# Verifying
if [ "$ErrorCount" -eq 0 ]; then
    echo -e "\n${Green}Done${Normal}, ${Green}${ErrorCount}${Normal} Errors Occurred."
else
    echo -e "\n${Red}Failed${Normal}, ${Red}${ErrorCount}${Normal} Errors Occurred."
fi
