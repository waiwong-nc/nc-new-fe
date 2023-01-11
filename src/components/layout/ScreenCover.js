import './screenCover.scss';


// const [screenCoverOn, setScreenCoverOn] = useState(false);
// {
// screenCoverOn && (
//     <ScreenCover
//     declineFunc={null}
//     confirmFunc={clossScreen}
//     declineText="cancel"
//     confirmText="OK"
//     title="URL Copied !"
//     content="asdfsfsf asfasd asdf sadf asdfsdfas"
//     _class={null}
//     />
// );
// }



const ScreenCover = (props) => {

    function declineFunc(){
        props.declineFunc();
    }

    function confirmFunc() {
        props.confirmFunc();
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