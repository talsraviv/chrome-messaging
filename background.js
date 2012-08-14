///////////////////////////////////////////////////////////////////////////////
// 
// Author      : Ebow Halm
// Date        : 31 Jul 2012
// Description : Test comm b/n content script and background.
//
///////////////////////////////////////////////////////////////////////////////
//
// Use XHR with local server. Argument is time to wait to return. Node.js
// could use setTimeout to wait to return data. This way it mimics even more
// closely what we'd be going. The only change would be for sync the XHR will
// be synchronous. That is a good fit and we'd get the answers. We'll also see
// if using a worker and XHR works in current chrome versions.
//
chrome.extension.onConnect.addListener(function(port) {
    console.log(port.name + ' connection created')
    console.assert(port.name.match(/^async\-\d+/));
    port.onMessage.addListener(function(duration){
        console.log(port.name + ' received a message: ' + duration)
        var start = new Date();
        // This code runs asynchronously, and thus, instantly
        // Would be interesting to have some kind of synchronous sleep
        // to test the single threadedness of the background -TR
        setTimeout(function(){
            console.log(port.name + ' replying to message: ' + duration)
            port.postMessage(duration);
            var end = new Date();
        }, duration * 1000);


        /*

         if(window.XMLHttpRequest) {
         xmlHttpReq = new XMLHttpRequest();
         }
         tempurl = "http://localhost/sleeputil.jsp?sleepms="+ms;
         xmlHttpReq.open("GET", tempurl, false); // synchron mode
         xmlHttpReq.send(null);



         */
    });
});

///////////////////////////////////////////////////////////////////////////////

