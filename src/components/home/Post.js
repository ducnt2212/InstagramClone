import React, {useEffect, useState} from 'react';
import {
  Animated,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {Divider} from '@rneui/themed';

import AntDesign from '../../../node_modules/react-native-vector-icons/AntDesign';

import {firebase, db} from '..//..//firebase';

function Post({post}) {
  function handleLike(post) {
    const currentLikeStatus = !post.likes_by_users.includes(
      firebase.auth().currentUser.email,
    );

    db.collection('users')
      .doc(post.owner_email)
      .collection('posts')
      .doc(post.id)
      .update({
        likes_by_users: currentLikeStatus
          ? firebase.firestore.FieldValue.arrayUnion(
              firebase.auth().currentUser.email,
            )
          : firebase.firestore.FieldValue.arrayRemove(
              firebase.auth().currentUser.email,
            ),
      })
      .then(() => {
        console.log('^^ Document successfully updated ^^');
      })
      .catch(error => {
        console.error('Error updating document: ', error);
      });
  }
  return (
    <View style={{marginBottom: 30}}>
      <Divider width={1} orientation="vertical" />
      <PostHeader post={post} />
      <PostImage post={post} />
      <View style={{marginHorizontal: 15, marginTop: 10}}>
        <PostFooter post={post} handleLike={handleLike} />
        <Likes post={post} />
        <Caption post={post} />
        <CommentsSection post={post} />
        <Comment post={post} />
      </View>
    </View>
  );
}

export default Post;

function PostHeader({post}) {
  return (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        margin: 5,
        alignItems: 'center',
      }}>
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <Image style={styles.story} source={{uri: post.profile_picture}} />
        <Text style={{color: 'white', marginLeft: 5, fontWeight: '700'}}>
          {post.user}
        </Text>
      </View>
      <Text style={{color: 'white', fontWeight: '900'}}>...</Text>
    </View>
  );
}

function PostImage({post}) {
  return (
    <View style={{width: '100%', height: 450}}>
      <Image
        style={{height: '100%', resizeMode: 'cover'}}
        source={{uri: post.imageUrl}}
      />
    </View>
  );
}

function PostFooter({handleLike, post}) {
  /** Bouncy Heart Like Animation */
  const AnimatedLikeIcon = Animated.createAnimatedComponent(AntDesign);
  const currentLikeStatus = post.likes_by_users.includes(
    firebase.auth().currentUser.email,
  );
  const [visible, setVisible] = useState(false);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const currentValue = new Animated.Value(1);

  useEffect(() => {
    if (currentLikeStatus) {
      Animated.spring(currentValue, {
        toValue: 2,
        friction: 2,
        useNativeDriver: true,
      }).start(() => {
        Animated.spring(currentValue, {
          toValue: 1,
          useNativeDriver: true,
        }).start(() => {
          setVisible(false);
        });
      });
    }
  }, [currentLikeStatus, currentValue]);

  return (
    <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
      {visible && (
        <AnimatedLikeIcon
          style={{
            position: 'absolute',
            top: -255,
            left: '45%',
            transform: [{scale: currentValue}],
          }}
          name="heart"
          size={50}
          color="red"
        />
      )}
      <View style={styles.leftFooterIconsContainer}>
        <TouchableOpacity
          onPress={() => {
            /** Make The Heart UnVisible When Unlike The Post */
            if (!currentLikeStatus) {
              setVisible(true);
            }
            handleLike(post);
          }}>
          <Image
            style={styles.footerIcon}
            source={{
              uri: post.likes_by_users.includes(
                firebase.auth().currentUser.email,
              )
                ? postFooterIcons[0].likedImageURL
                : postFooterIcons[0].imageURL,
            }}
          />
        </TouchableOpacity>
        <Icon
          imgStyle={styles.footerIcon}
          imgUrl={postFooterIcons[1].imageURL}
        />
        <Icon
          imgStyle={[styles.footerIcon, styles.shareIcon]}
          imgUrl={postFooterIcons[2].imageURL}
        />
      </View>
      <View>
        <Icon
          imgStyle={styles.footerIcon}
          imgUrl={postFooterIcons[3].imageURL}
        />
      </View>
    </View>
  );
}

function Icon({imgStyle, imgUrl}) {
  return (
    <TouchableOpacity>
      <Image style={imgStyle} source={{uri: imgUrl}} />
    </TouchableOpacity>
  );
}

function Likes({post}) {
  return (
    <View style={{flexDirection: 'row', marginTop: 4}}>
      <Text style={{color: 'white', fontWeight: '600'}}>
        {post.likes_by_users.length.toLocaleString('en')} likes
      </Text>
    </View>
  );
}

function Caption({post}) {
  return (
    <View style={{marginTop: 5}}>
      <Text style={{color: 'white'}}>
        <Text style={{fontWeight: '600'}}>{post.user}</Text>
        <Text> {post.caption}</Text>
      </Text>
    </View>
  );
}

function CommentsSection({post}) {
  return (
    <View style={{marginTop: 5}}>
      {!!post.comments.length && (
        <Text style={{color: 'gray'}}>
          View{post.comments.length > 1 ? ' all' : ''} {post.comments.length}{' '}
          {post.comments.length > 1 ? 'comments' : 'comment'}
        </Text>
      )}
    </View>
  );
}

function Comment({post}) {
  return (
    <>
      {post.comments.map((comment, index) => (
        <View key={index} style={{flexDirection: 'row', marginTop: 5}}>
          <Text style={{color: 'white'}}>
            <Text style={{fontWeight: '600'}}>{comment.user}</Text>{' '}
            {comment.comment}
          </Text>
        </View>
      ))}
    </>
  );
}

const styles = StyleSheet.create({
  story: {
    width: 35,
    height: 35,
    borderRadius: 17.5,
    marginLeft: 6,
    borderWidth: 1.5,
    borderColor: '#ff8501',
  },

  footerIcon: {
    width: 33,
    height: 33,
  },

  leftFooterIconsContainer: {
    flexDirection: 'row',
    width: '32%',
    justifyContent: 'space-between',
  },

  shareIcon: {
    transform: [{rotate: '320deg'}],
    marginTop: -3,
  },
});

const postFooterIcons = [
  {
    name: 'Like',
    imageURL:
      'https://img.icons8.com/fluency-systems-regular/60/ffffff/like--v1.png',
    likedImageURL:
      'https://img.icons8.com/ios-glyphs/90/fa314a/filled-like.png',
  },
  {
    name: 'Comment',
    imageURL:
      'https://img.icons8.com/material-outlined/60/ffffff/filled-topic.png',
  },
  {
    name: 'Share',
    imageURL:
      'https://img.icons8.com/fluency-systems-regular/48/ffffff/sent.png',
  },
  {
    name: 'Save',
    imageURL:
      'https://img.icons8.com/fluency-systems-regular/60/FFFFFF/bookmark-ribbon--v1.png',
  },
];
