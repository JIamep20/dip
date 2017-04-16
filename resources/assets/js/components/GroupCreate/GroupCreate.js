import React from 'react';
import { connect } from 'react-redux';
import Container from '../ContentContainer';
import '../../styles/GroupCreateStyles.scss';

import { createGroup } from '../../actions/groupsActions';

class GroupCreate extends React.Component {
    constructor(props) {
        super(props);

        this.onCreateGroupClick = this.onCreateGroupClick.bind(this);
    }

    onCreateGroupClick() {
        if(this.groupNameInput.value.trim().length > 0) {
            this.props.createGroup(this.groupNameInput.value.trim());
            this.groupNameInput.value = '';
        }
    }

    render() {
        return(
            <Container left={true} right={false}>
                <div className="group-create-wrapper">
                    <input type="text" ref={(el) => this.groupNameInput = el} />
                    <button onClick={this.onCreateGroupClick}>Create</button>
                </div>
            </Container>
        );
    }
}

export default connect(
    null,
    (dispatch) => ({
        createGroup: (name) => dispatch(createGroup(name))
    })
)(GroupCreate);