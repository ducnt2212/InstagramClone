import React from 'react';
import {SafeAreaView} from 'react-native';

import AddNewPost from '../components/newPost/AddNewPost';

function NewPostScreen({navigation}) {
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: 'black'}}>
      <AddNewPost navigation={navigation} />
    </SafeAreaView>
  );
}

export default NewPostScreen;
