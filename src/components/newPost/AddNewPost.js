import React from 'react';
import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';
import {useNavigation} from '@react-navigation/native';

import FormikPostUploader from './FormikPostUploader';

function AddNewPost() {
  return (
    <View style={styles.container}>
      <Header />
      <FormikPostUploader />
    </View>
  );
}

export default AddNewPost;

function Header() {
  const navigation = useNavigation();
  return (
    <View style={styles.headerContainer}>
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Image
          style={{width: 30, height: 30}}
          source={{uri: 'https://img.icons8.com/ios-glyphs/90/ffffff/back.png'}}
        />
      </TouchableOpacity>
      <Text style={styles.headerText}>NEW POST</Text>
      <Text>{/*to make the headerText centered*/}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 10,
  },

  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  headerText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 20,
    marginRight: 30,
  },
});
