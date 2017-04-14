import React, { Component } from 'react';
import { View, Text } from 'react-native';
import FetchMock from 'react-native-fetch-mock';

const fetch = new FetchMock(require('../__mocks__')).fetch;
class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: [],
    };

    this.getData = this.getData.bind(this);
  }

  componentDidMount() {
    this.getData();
  }

  async getData() {
    const { data } = await fetch('/api/users');
    this.setState({
      data,
    });
  }

  render() {
    return (
      <View style={ {marginTop: 100} }>
      {
        this.state.data.map((item, index) => {
          return <Text key={ index }>{ item.name }</Text>
        })
      }
      </View>
    );
  }
}

export default App;
