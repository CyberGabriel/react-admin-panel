import React from 'react';
import PostItem from './PostItem';
import './MyStyle.css';

class PostList extends React.Component {
    constructor() {
        super();
        this.state = {
            posts: []
        };
    }
    componentDidMount() {
        fetch('https://jsonplaceholder.typicode.com/posts')
          .then(response => response.json())
          .then(data => {
            let newData = [];
            let result;
            for (let i=1; i < 4; i++ ) {
                result = data.filter(post => post.userId === i).slice(0,2); //first two posts for the first 3 users
                result.map(obj => {
                    return (
                        obj.title = obj.title[0].toUpperCase() + obj.title.substring(1),
                    obj.body = obj.body[0].toUpperCase() + obj.body.substring(1)
                    )
                });
                newData = newData.concat(result);
            } 
            this.setState({posts: newData});
          })
    }

    render () {
        return (
            <div>
            <h2 class="listTitle">Post List:</h2>
                <div className="userList">
                    { this.state.posts.map((post, index) => {
                        return <PostItem
                            userId = { post.userId }
                            title = { post.title }
                            body = { post.body}
                            key={ index }
                        />
                    })}
                </div>
        </div>
        )
    }
}

export default PostList;