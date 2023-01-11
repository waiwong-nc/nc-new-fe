import {useState} from 'react';
import ScreenCover from "../../layout/ScreenCover";
import RandomImage from "../../layout/RandomImage";

const ArticleFrame = (props) => {

    const {
        // article_id,
        author,
        body,
        comment_count,
        created_at,
        title,
        topic,
        votes,
    } = props;  

    const [screenCoverOn, setScreenCoverOn] = useState(false);


    function copyToClipboard() {
    navigator.clipboard.writeText(window.location.href).then(() => {
        setScreenCoverOn(true);
    });
    }

    function clossScreen() {
        setScreenCoverOn(false);
    }

    return (
    <>
        {screenCoverOn && (
            <ScreenCover
            declineFunc={null}
            confirmFunc={clossScreen}
            declineText={null}
            confirmText="OK"
            title="URL Copied !"
            content={null}
            _class={null}
            />
        )}

        <div className="article_frame">
            <p className="article_topic">{topic}</p>
            <h1 className="article_title">{title}</h1>

            <p className="article_author">
                <span className="material-symbols-outlined">person</span>
                {author}
            </p>
            <p className="article_create_date">{created_at}</p>

            <div className="button_group">
                <p className="article_comment">
                    <span className="material-symbols-outlined">comment</span>
                    comments({comment_count})
                </p>

                <p className="article_votes">
                    <span className="material-symbols-outlined">thumb_up</span>
                    votes({votes})
                </p>
                <p className="article_share" onClick={copyToClipboard}>
                    <span className="material-symbols-outlined">link</span>
                    share
                </p>
            </div> 
            
            <RandomImage _class="article_img" />

            <p className="article_img_description">
                (Image is randomly picked From BBC News website)
            </p>

            <p className="article_body">{body}</p>

        </div>
      </>
    );
};

export default ArticleFrame;