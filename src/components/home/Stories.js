import React from 'react';
import {Image, ScrollView, StyleSheet, Text, View} from 'react-native';

import {USERS} from '../../data/users';

function Stories() {
  return (
    <View style={{marginBottom: 13}}>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {USERS.map((story, index) => (
          <View key={index} style={{alignItems: 'center'}}>
            <Image style={styles.story} source={{uri: story.image}} />
            <Text style={{color: 'white'}}>
              {story.user.length > 11
                ? story.user.slice(0, 6).toLowerCase() + '...'
                : story.user.toLowerCase()}
            </Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

export default Stories;

const styles = StyleSheet.create({
  story: {
    width: 70,
    height: 70,
    borderRadius: 35,
    marginLeft: 18,
    borderWidth: 3,
    borderColor: '#ff8501',
  },
});
