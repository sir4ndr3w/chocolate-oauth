import React, {Component} from 'react';
import './App.css';
import { Provider } from 'react-redux';
import { store } from './global/store';
import Content from './Components/Content';

class App extends Component {
    render() {
        return (
            <Provider store={store}>
                <Content />
            </Provider>
        );
    }
}

export default App;
