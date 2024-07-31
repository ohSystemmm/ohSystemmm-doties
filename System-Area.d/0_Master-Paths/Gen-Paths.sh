#   ____                  ____       _   _               _     
#  / ___| ___ _ __       |  _ \ __ _| |_| |__  ___   ___| |__  
# | |  _ / _ \ '_ \ _____| |_) / _` | __| '_ \/ __| / __| '_ \ 
# | |_| |  __/ | | |_____|  __/ (_| | |_| | | \__ \_\__ \ | | |
#  \____|\___|_| |_|     |_|   \__,_|\__|_| |_|___(_)___/_| |_|
#
# by ohSystemmm <3 - 2024


# ----------------------------------------------------- 
# Clear Terminal
clear


# ----------------------------------------------------- 
# Variables
Normal="\033[0m"
Purple="\033[1;35m"
Green="\033[1;32m"
Red="\033[1;31m"

HOMEPATH=0
USERPATH=0
SYSTEMPATH=0

0_Info=0
1_SetUp=0
2_Wallpapers=0
3_Diashows=0

0_MasterPath=0
1_DotfileSettings=0
2_HyprlandConfig=0
3_PackageConfig=0
4_CustomApps=0
5_CustomScripts=0
6_TempFiles=0


# ----------------------------------------------------- 
# Header
echo -e "${Purple}"
figlet Gen-Paths.sh
echo -e "by ohSystemmm <3 - 2024${Normal}"
echo


# ----------------------------------------------------- 
# Confirm running Script
if gum confirm "Do you want to regenerate all paths?" --affirmative "Confirm" --negative "Cancel"; then
    echo "Starting Service..."
    echo
else
    echo "Aborted..."
    echo
    exit 1
fi


# ----------------------------------------------------- 
# Done Message
Done() {
    echo -e "[${Green}Done${Normal}]"
}


# ----------------------------------------------------- 
# Failed Message
Failed() {
    echo -e "[${Red}Failed${Normal}]"
    echo
    exit 1
}


# ----------------------------------------------------- 
# Getting Paths + Set Variables
echo -n "Getting Paths..."
{
    true # Success
} || Failed
Done


# ----------------------------------------------------- 
# Deleting old Path-Files
echo -n "Deleting old Path-Files..."
{
    # Insert your code to delete old path-files here
    # Simulate success with a placeholder command
    true # Replace with actual command
} || Failed
Done

# ----------------------------------------------------- 
# Generating new Path-Files
echo -n "Generating new Path Files..."
{
    # Insert your code to generate new path-files here
    # Simulate success with a placeholder command
    true # Replace with actual command
} || Failed
Done

# ----------------------------------------------------- 
# Setting new Paths
echo -n "Setting new Paths..."
{
    # Insert your code to set new paths here
    # Simulate success with a placeholder command
    false # Replace with actual command
} || Failed
Done


# ----------------------------------------------------- 
# Success Messages
notify-send "Generation Successful"
echo
echo "Generation Successful"
