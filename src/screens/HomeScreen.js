import React, {useEffect, useState} from 'react';
import {SafeAreaView, StyleSheet, ScrollView} from 'react-native';

import Header from '../components/home/Header';
import Stories from '../components/home/Stories';
import Post from '../components/home/Post';
import BottomTabs, {bottomTabIcons} from '../components/home/BottomTabs';

import {POSTS} from '../data/posts';
import {db} from '../firebase';

function HomeScreen({navigation}) {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    db.collectionGroup('posts')
      .orderBy('createdAt', 'desc')
      .onSnapshot(snapshot => {
        setPosts(
          snapshot.docs.map(post => ({
            id: post.id,
            ...post.data(),
          })),
        );
      });
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <Header navigation={navigation} />
      <Stories />
      <ScrollView>
        {posts.map((post, index) => (
          <Post post={post} key={index} />
        ))}
      </ScrollView>
      <BottomTabs icons={bottomTabIcons} />
    </SafeAreaView>
  );
}

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'black',
    flex: 1,
  },
});
