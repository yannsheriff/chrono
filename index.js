import { AppRegistry } from 'react-native';
import React, { Component } from 'react'
import { Provider } from 'react-redux'
import Store from './src/store'
import Loading from './src/smart-components/SmartLoading'

class App extends Component {
    constructor() {
        super()
        console.disableYellowBox = true
    }

    render() {
            return  (
                <Provider store={Store}>
                    <Loading />
                </Provider>
            )
        
    }
}


AppRegistry.registerComponent('chrono', () => App);
