local wezterm = require 'wezterm';
local config = {}

config.font = wezterm.font("Cascadia Code")
config.font_size = 15.0
config.color_scheme = "Catppuccin Mocha"
config.enable_wayland = false
config.hide_tab_bar_if_only_one_tab = true
-- config.window_background_image = wezterm.home_dir .. "/.config/wezterm/GreyScale.jpg"
config.window_background_opacity = 0.2
config.warn_about_missing_glyphs=false

return config
