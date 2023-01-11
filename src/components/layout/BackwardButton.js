import { useNavigate } from "react-router-dom";

const BackwardButton = (props) => {

    const style = {
        width:'fit-content',
        backgroundColor: 'white'
    }

    const navigate = useNavigate();
    function goBackward() {
        navigate(props.url);
    }

    return (
      <button
        onClick={goBackward}
        style={style}
        className={props._class}
      >
        <span className="material-symbols-outlined">undo</span>
      </button>
    );
};

export default BackwardButton;
