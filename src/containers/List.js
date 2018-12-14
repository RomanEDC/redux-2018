import { connect } from 'react-redux';

import List from '../components/List';

const mapStateToProps = state => ({
    items: state.videos,
});

export default connect(mapStateToProps)(List);