const GOOGLE_ORIGIN = 'https://www.google.com'

// Allows users to open the side panel by clicking on the action toolbar icon
chrome.sidePanel
	.setPanelBehavior({ openPanelOnActionClick: true })
	.catch(error => console.error(error))

chrome.commands.onCommand.addListener((command, tab) => {
	if (command === 'toggle-sidebar') {
		// Check if side panel is open
		chrome.sidePanel.open({ windowId: tab.windowId })
	}
})
chrome.runtime.onInstalled.addListener(() => {
	chrome.contextMenus.create({
		id: 'openSidePanel',
		title: 'Open side panel',
		contexts: ['all']
	})
})

chrome.contextMenus.onClicked.addListener((info, tab) => {
	if (info.menuItemId === 'openSidePanel') {
		// This will open the panel in all the pages on the current window.
		chrome.sidePanel.open({ windowId: tab.windowId })
	}
})
