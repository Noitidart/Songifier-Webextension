chrome.runtime.onMessage.addListener(msglistener);

function msglistener(e) {
    console.log('incoming to BACKGROUND, e:', e, arguments);
}
