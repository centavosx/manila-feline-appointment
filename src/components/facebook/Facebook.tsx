import Script from 'next/script'
import { useId } from 'react'

export const FaceBookComponent = () => {
  const id2 = useId()
  return (
    <>
      <div id="fb-root"></div>
      <div id="fb-customer-chat" className="fb-customerchat"></div>

      <Script id={id2} crossOrigin="anonymous" strategy="lazyOnload">
        {`
        var chatbox = document.getElementById('fb-customer-chat');
        chatbox.setAttribute("page_id", "108511637693025");
        chatbox.setAttribute("attribution", "biz_inbox");

      window.fbAsyncInit = function() {
        FB.init({
          xfbml            : true,
          version          : 'v15.0'
        });
      };
      
      (function(d, s, id) {
        var js, fjs = d.getElementsByTagName(s)[0];
        if (d.getElementById(id)) return;
        js = d.createElement(s); js.id = id;
        js.crossOrigin='anonymous';
        js.src = 'https://connect.facebook.net/en_US/sdk/xfbml.customerchat.js';
        fjs.parentNode.insertBefore(js, fjs);
      }(document, 'script', 'facebook-jssdk'));
      `}
      </Script>
    </>
  )
}
