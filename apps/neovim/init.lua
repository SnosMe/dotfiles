-- Show line numbers
vim.opt.number = true

-- Case-insensitive search UNLESS it includes any capital letter
vim.opt.ignorecase = true
vim.opt.smartcase = true

-- Cursor surrounding lines
vim.opt.scrolloff = 3

-- Leading Tab render width
vim.opt.shiftwidth = 2

-- Enable selection mode in Insert
vim.api.nvim_create_autocmd('ModeChanged', {
	pattern = '*:i', -- enter Insert
	callback = function(ev)
		vim.opt.selection = 'exclusive'
		vim.opt.keymodel = {'startsel', 'stopsel'}
		vim.opt.selectmode = {'key', 'mouse'}
	end
})
vim.api.nvim_create_autocmd('ModeChanged', {
	pattern = 'i:*', -- exit Insert
	callback = function(ev)
		if ev.match ~= 'i:s' then
			vim.opt.selection = 'inclusive'
			vim.opt.keymodel = {}
			vim.opt.selectmode = {}
		end
	end
})

-- Stop highlighting on <Esc> in normal mode
vim.keymap.set('n', '<Esc>', '<Cmd>nohlsearch<CR>')

-- Muscle memory
vim.keymap.set('n', '<C-Z>', 'u')
vim.keymap.set('n', '<C-Y>', '<C-R>')

-- Plugin manager
local lazypath = vim.fn.stdpath('data') .. '/lazy/lazy.nvim'
if not vim.uv.fs_stat(lazypath) then
	vim.fn.system({
		'git', 'clone', '--filter=blob:none', '--branch=stable',
		'https://github.com/folke/lazy.nvim.git', lazypath
	})
end
vim.opt.runtimepath:prepend(lazypath)

-- Plugins
require("lazy").setup({
	spec = {
		{
			'natecraddock/sessions.nvim',
			opts = {
				session_filepath = vim.fn.stdpath('data') .. '/sessions',
				absolute = true,
			}
		},
		{
			'neovim/nvim-lspconfig',
			config = function()
				-- npm install -g @vtsls/language-server
				require('lspconfig').vtsls.setup({})
			end
		}
	}
})
