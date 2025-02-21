// IMPORTANT: This file should always begin with a commented line.
// https://support.mozilla.org/en-US/kb/customizing-firefox-using-autoconfig

pref("browser.aboutConfig.showWarning", false);

// Website appearance: Light
pref("layout.css.prefers-color-scheme.content-override", 1);
// Open previous windows and tabs
pref("browser.startup.page", 3);
// Text rendering (on Windows)
pref("gfx.font_rendering.cleartype_params.rendering_mode", 5);
pref("gfx.font_rendering.cleartype_params.enhanced_contrast", 66);
// Cloud sync
pref("identity.fxaccounts.enabled", false);
pref("extensions.pocket.enabled", false);
// UI
pref("browser.uiCustomization.state", `{"placements":{"widget-overflow-fixed-list":[],"unified-extensions-area":[],"nav-bar":["back-button","forward-button","stop-reload-button","vertical-spacer","urlbar-container","downloads-button","unified-extensions-button"],"toolbar-menubar":["menubar-items"],"TabsToolbar":["tabbrowser-tabs","new-tab-button"],"vertical-tabs":[],"PersonalToolbar":["personal-bookmarks"]},"seen":["save-to-pocket-button","developer-button"],"dirtyAreaCache":["nav-bar","vertical-tabs","TabsToolbar","toolbar-menubar","PersonalToolbar"],"currentVersion":21,"newElementCount":4}`);
pref("browser.newtabpage.activity-stream.feeds.topsites", false);
pref("findbar.highlightAll", true);
pref("nglayout.enable_drag_images", false);
pref("toolkit.legacyUserProfileCustomizations.stylesheets", true);
// Urlbar
pref("browser.urlbar.suggest.topsites", false);
pref("browser.urlbar.suggest.trending", false);
pref("browser.urlbar.shortcuts.history", false);
pref("browser.urlbar.shortcuts.bookmarks", false);
pref("browser.urlbar.shortcuts.tabs", false);
Services.search.getEngines().then((engines) => {
	for (const engine of engines) {
		engine.hideOneOffButton = true;
	}
});
// Devtools
pref("devtools.theme", "light");
pref("devtools.inspector.three-pane-enabled", false);
pref("devtools.toolbox.selectedTool", "webconsole");
// etc.
pref("browser.shell.checkDefaultBrowser", false);
pref("doh-rollout.disable-heuristics", true);

function applyScriptToChrome(window) {
	const { console, document } = window;

	const key_undoCloseWindow = document.getElementById("key_undoCloseWindow");
	key_undoCloseWindow?.remove();
	const key_privatebrowsing = document.getElementById("key_privatebrowsing");
	key_privatebrowsing?.setAttribute("key", "N");
}

async function applyTheme() {
	Cu.import("resource://gre/modules/AddonManager.jsm");
	let addon = await AddonManager.getAddonByID("{22b0eca1-8c02-4c0d-a5d7-6604ddd9836e}");
	if (!addon) {
		Services.console.logStringMessage("Installing theme...");
		const install = await AddonManager.getInstallForURL("https://addons.mozilla.org/firefox/downloads/file/4226329/nicothin_space-1.1.2.xpi");
		addon = await install.install();
	}
	addon.enable();
}

if (!Services.appinfo.inSafeMode) {
	Services.obs.addObserver((window) => {
		window.addEventListener("DOMContentLoaded", () => {
			if (window.location.href === "chrome://browser/content/browser.xhtml") {
				applyScriptToChrome(window);
			}
		}, { once: true });
	}, "chrome-document-global-created", false);

	Services.obs.addObserver(applyTheme, "final-ui-startup", false);
}
