import React from 'react';

import {connect} from 'react-redux';
import '../../styles/FeedStyles.scss';
import Container from './../ContentContainer';
import map from 'lodash/map';

class FeedsContainer extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        let { feeds } = this.props;
        return (
            <Container left={true} right={false}>
                <div className="feed-wrapper">
                    <ul>
                        {
                            map(feeds, (item, index) => (<li key={index}>{item.text}</li>))
                        }
                    </ul>
                </div>
            </Container>
        );
    }
}

export default connect(
    (store, r) => ({
        feeds: store['feedsReducer']['feeds']
    })
)(FeedsContainer);
