///////////////////////////////////////////////////////////////////////////////
// 
// Author      : Ebow Halm
// Date        : 31 Jul 2012
// Description : Test comm b/n content script and background.
//
///////////////////////////////////////////////////////////////////////////////

(function(){

    document.getElementById('btnStart').onclick = function(){

        var send = [5, 4, 3, 2, 1], expect = [1, 2, 3, 4, 5], received  = [],
            ports = {}, port, msg, calledback = 0, passed = true;

        var cmt = document.getElementById('spMsg');
        cmt.innerHTML = 'sending msgs  : ';

        var one_port_experiment = false;
        var one_port = chrome.extension.connect({name:'async-0'})

        for (var i = 0, len = send.length; i < len; i++) {
            // Connect to a port
            msg = 'async-' + send[i];
            //// If running second and third times, use existing port
            port = one_port_experiment ? one_port : ports[msg] || chrome.extension.connect({name:msg});
            ports[msg] = port;
            // Send port a message that is the duration
            port.postMessage(send[i]);
            cmt.innerHTML += send[i];

            // Each port listens
            port.onMessage.addListener(function(ret){
                cmt.innerHTML += ret;
                received.push(ret);
                // On the last time, validate
                if (++calledback == send.length) {
                    for (var j = 0; j < calledback; j++) {
                        if (expect[j] != received[j]) {
                            passed = false;
                            //alert('j: expected ' + expect[j] + ' received ' +
                            //    received[j]);
                        }
                    }
                    cmt.innerHTML += '<p />' + (passed ? 'PASSED' : 'FAILED');
                    //alert(expect.join(',') + '\n' + received.join(','));
                }
            });
        }
        cmt.innerHTML += '<br />Receiving msgs: ';
    };
})();

