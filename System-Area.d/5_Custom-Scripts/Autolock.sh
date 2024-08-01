#     _         _        _            _          _
#    / \  _   _| |_ ___ | | ___   ___| | __  ___| |__
#   / _ \| | | | __/ _ \| |/ _ \ / __| |/ / / __| '_ \
#  / ___ \ |_| | || (_) | | (_) | (__|   < _\__ \ | | |
# /_/   \_\__,_|\__\___/|_|\___/ \___|_|\_(_)___/_| |_|
#                                           
# by ohSystemmm <3 - 2024

pkill xautolock

xautolock -time 10 -locker "swaylock -i ~/.cache/current_wallpaper.jpg" -notify 30 -notifier "notify-send 'Screen will be locked soon.' 'Locking screen in 30 seconds'"
