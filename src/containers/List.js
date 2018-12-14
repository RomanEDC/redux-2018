import { connect } from 'react-redux';

import List from '../components/List';
import { filteredVideos } from '../selectors';

import { removeVideo } from '../reducers/videos';

const mapStateToProps = state => ({
    items: filteredVideos(state),
    videos: state.videos.length
});

const mapDispatchToProps = dispatch => ({
    removeItem: id => dispatch(removeVideo(id)),
})

export default connect(mapStateToProps, mapDispatchToProps)(List);


