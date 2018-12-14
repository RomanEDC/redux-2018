import React, {PureComponent} from 'react';
import {string} from 'prop-types';

const getVideoId = (url) => url.split('/')[3];
const createVideoUrl = (id) => `https://www.youtube.com/embed/${id}`;

const VIEW_MODE = 'VIEW_MODE';
const EDIT_MODE = 'EDIT_MODE'

export default class ListItem extends PureComponent {
    static propTypes = {
        id: string.isRequired,
        title: string.isRequired,
        url: string.isRequired,
        tags: string.isRequired,
    };

    state = { mode: VIEW_MODE };
    switchMode = () => {
        const updatedMode = this.state.mode === VIEW_MODE ? EDIT_MODE : VIEW_MODE;
        this.setState({ mode: updatedMode });
    };

     render() {
        const { url, title, tags, removeItem, id} = this.props;
        const videoId = getVideoId(url);
        const videoUrl = createVideoUrl(videoId);

         return (
            <li>
                 mode: {this.state.mode}
                <div className="title">{title}</div>
                <iframe src={videoUrl} title={title} />
                <span onClick={this.switchMode}>&#9998;</span>
                <span onClick={() => removeItem(id)}>   &#10008;</span>
                <p>{tags.trim().split(",")}</p>
            </li>
        );
    }
}