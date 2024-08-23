--                   _                        _             
-- __      _____ ___| |_ ___ _ __ _ __ ___   | |_   _  __ _ 
-- \ \ /\ / / _ \_  / __/ _ \ '__| '_ ` _ \  | | | | |/ _` |
--  \ V  V /  __// /| ||  __/ |  | | | | | |_| | |_| | (_| |
--   \_/\_/ \___/___|\__\___|_|  |_| |_| |_(_)_|\__,_|\__,_|
 
-- by ohSystemmm <3 - 2024
                                                         
local wezterm = require 'wezterm';
local config = {}

config.font = wezterm.font("Cascadia Code")
config.font_size = 15.0
-- config.color_scheme = "Batman"
config.enable_wayland = false
config.hide_tab_bar_if_only_one_tab = true
-- config.window_background_image = wezterm.home_dir .. "/.config/wezterm/Image.jpg"
config.window_background_opacity = 0.5
config.warn_about_missing_glyphs=false

return config

