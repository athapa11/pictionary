import React, { useEffect, useState } from 'react'

interface Props {}

const View = (props: Props) => {

  const [isScriptLoaded, setIsScriptLoaded] = useState<boolean>(false);
  const iframeRef = React.useRef<HTMLIFrameElement | null>(null);
  const uid = '66b93b7970a44d1ebe5ec9f6d9a29149'; // need to be dynamic eventually


  useEffect(() => {
    // load sketchfab viewer api script
    const script = document.createElement('script');
    script.src= 'https://static.sketchfab.com/api/sketchfab-viewer-1.12.1.js'
    script.async = true;
    script.onload = () => {
      console.log('successfully loaded the script');
      setIsScriptLoaded(true);
    };
    script.onerror = (error) => {
      console.error('Failed to load Sketchfab script:', error);
    };
    document.body.appendChild(script);
    
    // Cleanup script if component unmounts
    return () => { document.body.removeChild(script); }
  }, []);

  const loadModel = () => {
    document.addEventListener('load', () => console.log( 'viewerready' ));

    if(isScriptLoaded && iframeRef.current){
      const iframe = iframeRef.current;
      const client = new window.Sketchfab( iframe );

      // By default, the latest version of the viewer API will be used.
      // Alternatively, you can request a specific version.
      // var client = new Sketchfab( '1.12.0', iframe );

      client.init(uid, {
          success: function onSuccess(api: any) 
          {
            console.log('Viewer initialised');
            api.load();
            api.start();

            api.addEventListener( 'viewerready', () => 
            {
              // once the viewer is ready, show the iframe
              console.log('Viewer is ready');
              iframe.classList.remove('invisible');
              iframe.style.height = '500px';
              iframe.style.width = '100%';
            } );
          },
          error: function onError(error: any) {
              console.error('Failed to initialise viewer', error);
          }
      });
    } else {
      console.error('Sketchfab or iframe not available');
    }
  }


  return (
    <div>
      <h1>Sketchfab Viewer API example</h1>
      {/* Insert an empty iframe with attrubutes, hidden by default */}
      <iframe className="invisible h-0 w-0" 
        ref={iframeRef}
        src='https://sketchfab.com/models/66b93b7970a44d1ebe5ec9f6d9a29149/embed'
        id="api-frame" 
        allow="autoplay; fullscreen; xr-spatial-tracking" 
        xr-spatial-tracking="true" 
        execution-while-out-of-viewport="true"
        execution-while-not-rendered="true"
        web-share="true"
        //mozallowfullscreen="true" 
        //webkitallowfullscreen="true" 
      >
      </iframe>

      <button className="mt-4 p-2 bg-blue-500 text-white rounded hover:bg-blue-700"
        onClick={loadModel}
      >
        Click me to load model and show iframe.
      </button>
    </div>
  );
};

export default View;