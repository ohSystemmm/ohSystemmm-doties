-- This file can be loaded by calling `lua require('plugins')` from your init.vim

-- Only required if you have packer configured as `opt`
vim.cmd [[packadd packer.nvim]]
-- run :PackerCompile
vim.cmd([[
  augroup packer_user_config
    autocmd!
    autocmd BufWritePost plugins.lua source <afile> | PackerCompile
  augroup end
]])

return require('packer').startup(function(use)
  use 'wbthomason/packer.nvim'

  use 'williamboman/mason-lspconfig.nvim'
  use 'williamboman/mason.nvim'

  -- Theme
  use { 'catppuccin/nvim', as = 'catppuccin' }
  use "EdenEast/nightfox.nvim"
  use "tjdevries/colorbuddy.nvim"

  -- Preview colors
  use 'norcalli/nvim-colorizer.lua'

  --Treesitter
  use { 'nvim-treesitter/nvim-treesitter', run = ':TSUpdate' }

  --Markdown preview
  use 'ellisonleao/glow.nvim'
  use 'simrat39/symbols-outline.nvim'
  -- install without yarn or npm
  use({
    "iamcco/markdown-preview.nvim",
    run = function() vim.fn["mkdp#util#install"]() end,
  })
  --Language packs
  use 'sheerun/vim-polyglot'

  --Nvim motions
  use {
    'phaazon/hop.nvim',
    branch = 'v2',
    requires = { 'nvim-lua/plenary.nvim' },
    config = function()
      require 'hop'.setup { keys = 'etovxpqdgfblzhckisuran' }
    end
  }

  -- Notes
  use {
    'phaazon/mind.nvim',
    branch = 'v2.2',
    requires = { 'nvim-lua/plenary.nvim' },
    config = function()
      require 'mind'.setup()
    end
  }

  --LSP autocomplete
  use 'hrsh7th/nvim-cmp'
  use 'hrsh7th/cmp-nvim-lsp'
  use 'hrsh7th/cmp-buffer'
  use 'hrsh7th/cmp-path'
  use 'L3MON4D3/LuaSnip'
  use 'saadparwaiz1/cmp_luasnip'
  -- commands to run to start our LSPs

  use {
    'neovim/nvim-lspconfig',
    config = function()
      require("lspconfig").gopls.setup {}
    end
  }

  -- LSP Saga
  use({
    "glepnir/lspsaga.nvim",
    branch = "main",
    config = function()
      require('lspsaga').setup({})
    end,
  })

  --File browsing
  use 'nvim-telescope/telescope-file-browser.nvim'
  use 'nvim-neotest/nvim-nio'


  --Buffer navigation
  use 'nvim-lualine/lualine.nvim'

  --Haskell
  use 'neovimhaskell/haskell-vim'
  use 'alx741/vim-hindent'

  --debugging
  use 'mfussenegger/nvim-dap'
  use 'leoluz/nvim-dap-go'
  use 'rcarriga/nvim-dap-ui'
  use 'theHamsta/nvim-dap-virtual-text'
  use 'nvim-telescope/telescope-dap.nvim'

  --Grammar checking because I can't english
  use 'rhysd/vim-grammarous'

  --Telescope Requirements
  use 'nvim-lua/popup.nvim'
  use 'nvim-lua/plenary.nvim'
  use 'nvim-telescope/telescope.nvim'

  --Hex Editing
  use 'ArcaneSpecs/HexEditor.nvim'

  --Telescope
  use { 'nvim-telescope/telescope-fzf-native.nvim', run = 'make' }

  --git diff
  use 'sindrets/diffview.nvim'

  --magit
  use 'TimUntersberger/neogit'
  require('neogit').setup()

  --todo comments
  use 'folke/todo-comments.nvim'

  --devicons
  use 'kyazdani42/nvim-web-devicons'

  --dashboard
  use {
    'nvimdev/dashboard-nvim',
    event = 'VimEnter',
    config = function()
      require('dashboard').setup {
        theme = 'doom',
        config = {
          header = {
            '',
            '',
            '      ╔═╗   ╔═════╗         ╔═╗                              ╔═╗     ╔═╗            ',
            '      ║ ║   ║ ╔═╗ ║       ╔═╝ ╚═╗                            ║ ║   ╔═╝ ╚═╗          ',
            '╔═════╣ ╚═══╣ ╚═══╦═╗ ╔═╦═╩═╗ ╔═╬═══╦═╗ ╔═╦═╗ ╔═╦═╗ ╔═╗  ╔═══╝ ╠═══╩═╗ ╔═╬═╦═══╦═══╗',
            '║ ╔═╗ ║ ╔═╗ ╠═══╗ ║ ║ ║ ║ ══╣ ║ ║ ══╣ ╚═╝ ║ ╚═╝ ║ ╚═╝ ╠══╣ ╔═╗ ║ ╔═╗ ║ ║ ╠═╣ ══╣ ══╣',
            '║ ╚═╝ ║ ║ ║ ║ ╚═╝ ║ ╚═╝ ╠══ ║ ╚═╣ ══╣ ║ ║ ║ ║ ║ ║ ║ ║ ╠══╣ ╚═╝ ║ ╚═╝ ║ ╚═╣ ║ ══╬══ ║',
            '╚═════╩═╝ ╚═╩═════╩═╗ ╔═╩═══╩═══╩═══╩═╩═╩═╩═╩═╩═╩═╩═╩═╝  ╚═════╩═════╩═══╩═╩═══╩═══╝',
            '                  ╔═╝ ║                                                             ',
            '                  ╚═══╝                                     by ohSystemmm <3 - 2025 ',
            '',
            ''
          },
          center = {
            { icon = '[N] ', desc = 'New File',       action = 'enew',                 shortcut = 'SPC n', 'SPC N' },
            { icon = '[B] ', desc = 'Browse Files',   action = 'Telescope find_files', shortcut = 'SPC b', 'SPC B' },
            { icon = '[R] ', desc = 'Recent Files',   action = 'Telescope oldfiles',   shortcut = 'SPC r', 'SPC R' },
            { icon = '[U] ', desc = 'Update Plugins', action = 'PackerSync',           shortcut = 'SPC u', 'SPC U' },
            { icon = '[Q] ', desc = 'Quit',           action = 'qa',                   shortcut = 'SPC q', 'SPC Q' },
          },
          footer = {
            '',
            'How do I exit Neovim? ',
            'You don’t. <3'
          },
        },
      }
    end,
    requires = { 'nvim-tree/nvim-web-devicons' }
  }

  --fullstack dev
  use 'pangloss/vim-javascript'    --JS support
  use 'leafgarland/typescript-vim' --TS support
  use 'maxmellon/vim-jsx-pretty'   --JS and JSX syntax
  use 'jparise/vim-graphql'        --GraphQL syntax
  use 'mattn/emmet-vim'
end)
