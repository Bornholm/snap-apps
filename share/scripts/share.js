Snap.ready(function(err, sandbox) {

    sandbox.system.getServerExternalURL(function(err, urls) {

      if(err) {
        // TODO handle error
      }

      var urlEl = document.getElementById('public-url');
      urlEl.innerHTML = urls[0];

      var qrcode = new QRCode("qrcode", {
          text: urls[0],
          width: 256,
          height: 256,
          colorDark : "#000000",
          colorLight : "#ffffff",
          correctLevel : QRCode.CorrectLevel.H
      });
      
    });

  });