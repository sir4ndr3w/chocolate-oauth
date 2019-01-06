import React, {Component} from 'react';
import { connect } from 'react-redux';
import { updateProfile } from '../global/actions';
import { dispatch } from 'react-redux';

class Content extends Component {
    componentDidMount(){
        dispatch(updateProfile('6FO3XPjQLQe5upuHfGSrmiNdWY53', 'erster', 20));
    }

    render() {
        return (<div>
                { this.props.todo.counter }
                <button onClick={() => {}}>
                    Increment
                </button>
                <button onClick={() => {}}>
                    Decrement
                </button>
        </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        todo: state
    }
};

const mapDispatchToProps = dispatch => {
    return {};
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Content);