-- Check out https://github.com/nvim-lua/kickstart.nvim !

-- Aesthetic
-- pcall catches errors if the plugin doesn't load
local ok, catppuccin = pcall(require, "catppuccin")
if not ok then return end
catppuccin.setup({
  flavour = "frappe",
  transparent_background = true,
})
-- vim.cmd [[colorscheme catppuccin]]
vim.cmd [[colorscheme catppuccin]]

vim.cmd([[
augroup user_colors
  autocmd!
  autocmd ColorScheme * highlight Normal ctermbg=NONE guibg=NONE
augroup END
]])

require('me.options')
require('me.globals')
require('me.lualine')
require('me.keymap')
require('me.lsp')
require('me.telescope')
require 'colorizer'.setup()

require 'HexEditor'.setup()
