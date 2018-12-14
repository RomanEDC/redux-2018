import React, {PureComponent} from 'react';
import { arrayOf, shape, string, number } from 'prop-types';

const getVideoId = (url) => url.split('/')[3];
const createVideoUrl = (id) => `https://www.youtube.com/embed/${id}`;

export default class List extends PureComponent {
    static propTypes = {
        items: arrayOf(shape({
            id: number,
            title: string,
            url: string,
            tags: string,
        })),
    };

    static defaultProps = {
        items: [],
    };
    
    render() {
        const { items } = this.props;

        const list = items.map(item => {
            const { url, id, title} = item;

            const videoId = getVideoId(url);

            return (
                <li key={id}>
                    <div className="title">{title}</div>
                    <iframe src={createVideoUrl(videoId)} />
                </li>
            )
        });

        return (
            <ul>
                {list}
            </ul>
        ); 
    }
};

