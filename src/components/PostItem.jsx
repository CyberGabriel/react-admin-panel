import React from 'react';

function PostItem(props) {
    const {userId, title, body} = props;
    return (
        <div className="postItem">
            <h3>Title: { title }</h3>
            <h4>User ID: { userId }</h4>
            <p>{ body }</p>
        </div>
    );
}

export default PostItem;