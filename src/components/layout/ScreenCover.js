import './screenCover.scss';

//  To Re-use This Component :
//  
//  Step 1 : Set useState hooks in parent component:
//   eg:
//
//   const [screenCoverOn, setScreenCoverOn] = useState(false);
//   const [screenCoverDeclineFunc, setScreenCoverDeclineFunc] = useState(null);
//   const [screenCoverConfirmFunc, setScreenCoverConfirmFunc] = useState(null);
//   const [screenCoverDeclineText, setScreenCoverDeclineText] = useState(null);
//   const [screenCoverConfirmText, setScreenCoverConfirmText] = useState(null);
//   const [screenCoverTitle, setScreenCoverTitle] = useState(null);
//   const [screenCoverContent, setScreenCoverContent] = useState(null);

//  
//  Step 2 : Set function inparent componenet to dynamically set the content:
//  eg: 
//
//  function screenCoverSetting(
//    title = null,
//    content = null,
//    decline_txt = null,
//    decline_fn = null,
//    confirm_txt = null,
//    confirm_fn = null
//  ) {
//    setScreenCoverDeclineFunc(() => decline_fn);
//    setScreenCoverConfirmFunc(() => confirm_fn);
//    setScreenCoverDeclineText(decline_txt);
//    setScreenCoverConfirmText(confirm_txt);
//    setScreenCoverTitle(title);
//    setScreenCoverContent(content);
//  }

//  
//  Step 3 : set Props in JSX:
//
//  return ( 
//  {
//    screenCoverOn && (
//      <ScreenCover
//        declineFunc={screenCoverDeclineFunc}
//        confirmFunc={screenCoverConfirmFunc}
//        declineText={screenCoverDeclineText}
//        confirmText={screenCoverConfirmText}
//        title={screenCoverTitle}
//        content={screenCoverContent}
//        _class={null}
//      />
//    );
//  };
//

//  Step 4 : Call function and pass the value in parent component:
//  eg: 
//   screenCoverSetting(       <--- first set content of the screen cover
//     "URL Copied !",
//     null,
//     null,
//     null,
//     "OK",
//     setScreenCoverOn
//   );
//   setScreenCoverOn(true);    <--- then turn the cover on
// });



const ScreenCover = (props) => {

    function declineFunc(){
        props.declineFunc();
    }

    function confirmFunc() {
        props.confirmFunc(false);
    }

    return (
      <div className={`screen_cover ${props._class}`}>
        <div className="screen_cover_card">
          <h1>{props.title}</h1>
          <p>{props.content}</p>
          <div className="button_group">
            {props.declineText && (
              <button className="declineBtn" onClick={declineFunc}>
                {props.declineText}
              </button>
            )}
            {props.confirmText && (
              <button className="confirmBtn" onClick={confirmFunc}>
                {props.confirmText}
              </button>
            )}
          </div>
        </div>
      </div>
    );
}

export default ScreenCover;