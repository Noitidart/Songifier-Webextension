chrome.runtime.onMessage.addListener(msglistener);

function msglistener(e) {
    console.log('incoming to BACKGROUND, e:', e, arguments);
    if (e == 'listen') {
        listen();
    }
}

function listen() {
    console.log('in listen BACKGROUND');
	window.navigator.mediaDevices.getUserMedia({
		audio: true
	}).then(function (stream) {
		// do something with the stream
        console.log('stream got');
		var recorder = new MediaRecorder(stream);
		recorder.mimeType = 'audio/ogg';

		recorder.addEventListener('dataavailable', function(e) {
			// console.log('data avail, e:')

			var fileReader = new FileReader();
			fileReader.onload = function() {
				var arrbuf = this.result;

                var blob = new Blob([new Uint8Array(arrbuf)], {type: 'audio/ogg'});
                var url = URL.createObjectURL(blob);

                var audioEl = document.createElement('audio');
                audioEl.setAttribute('autoplay', 'true');
                audioEl.addEventListener('ended', function() {
                    URL.revokeObjectURL(url);
                }, false);
                audioEl.src = url;
			};
			fileReader.readAsArrayBuffer(e.data);
		}, false);

        recorder.start();

        setTimeout(recorder.stop, 10000);
        console.log('started');

	}, function(aReason) {
		console.error('failed, aReason:', aReason);
	});
}
