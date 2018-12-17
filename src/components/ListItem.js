import React, { PureComponent } from 'react';
import { string, func, number } from 'prop-types';

const getVideoId = (url) => url.split('/')[3];
const createVideoUrl = (id) => `https://www.youtube.com/embed/${id}`;

const VIEW_MODE = 'VIEW_MODE';
const EDIT_MODE = 'EDIT_MODE'

export default class ListItem extends PureComponent {
  static propTypes = {
    id: number.isRequired,
    title: string.isRequired,
    url: string.isRequired,
    tags: string.isRequired,
    edit: func.isRequired,
  };

  state = {
    mode: VIEW_MODE,
    title: this.props.title,
    tags: this.props.tags,
  };

  switchMode = () => {
    const updatedMode = this.state.mode === VIEW_MODE ? EDIT_MODE : VIEW_MODE;
    this.setState({ mode: updatedMode });
  };

  onChangeTag = e => {
    this.setState({ tags: e.target.value });
  };

  onChangeTitle = e => {
    this.setState({ title: e.target.value });
  };

  saveEditing = () => {
    this.switchMode();
    this.props.edit(this.props.id, this.state.title, this.state.tags);
  };

  render() {

    const { url, removeItem, id } = this.props;
    const { mode, tags, title } = this.state;

    const videoId = getVideoId(url);
    const videoUrl = createVideoUrl(videoId);

    return (
      <li>
        {mode === VIEW_MODE ? (
          <div className="title">
            {title}
            <span onClick={this.switchMode}>&#9998;</span>
            <span onClick={() => removeItem(id)}>   &#10008;</span>
          </div>
        ) : (
            <div className="changeValue">
              <input
                type="text"
                name="edit"
                onChange={this.onChangeTitle}
                value={title}
              />
            </div>
          )}

        <iframe src={videoUrl} title={title} />

        <div className="tags">
          {mode === VIEW_MODE ? (
            <p>{tags.trim().split(",")}</p>
          ) : (
              <div className="changeValue">
                <input type="text" value={tags} onChange={this.onChangeTag} />
                <span onClick={this.saveEditing}>	&#10004;</span>
              </div>
            )}
        </div>
      </li>
    );
  }
}