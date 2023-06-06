import React, {useState, useEffect} from 'react';
import {View, Text, Image, TextInput, Button} from 'react-native';
import {Divider} from '@rneui/themed';
import {useNavigation} from '@react-navigation/native';
import * as Yup from 'yup';
import {Formik} from 'formik';

import {firebase, db} from '../../firebase';

const uploadPostSchema = Yup.object().shape({
  imageUrl: Yup.string().url().required('A URL is required.'),
  caption: Yup.string().max(2200, 'Caption has reached the character limit.'),
});

function FormikPostUploader() {
  const [thumbnailUrl, setThumbnailUrl] = useState(PLACEHOLDER_IMG);

  const [currentLoggedInUser, setCurrentLoggedInUser] = useState({});

  function getUsername() {
    const user = firebase.auth().currentUser;

    const unsubscribe = db
      .collection('users')
      .where('owner_uid', '==', user.uid)
      .limit(1)
      .onSnapshot(snapshot =>
        snapshot.docs.map(doc => {
          setCurrentLoggedInUser({
            username: doc.data().username,
            profilePicture: doc.data().profile_picture,
          });
        }),
      );
    return unsubscribe;
  }

  useEffect(() => getUsername(), []);

  function uploadPostToFirebase(imageUrl, caption) {
    const unsubscribe = db
      .collection('users')
      .doc(firebase.auth().currentUser.email)
      .collection('posts')
      .add({
        imageUrl: imageUrl,
        user: currentLoggedInUser.username,
        profile_picture: currentLoggedInUser.profilePicture,
        owner_uid: firebase.auth().currentUser.uid,
        owner_email: firebase.auth().currentUser.email,
        caption: caption,
        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
        likes_by_users: [],
        comments: [],
      })
      .then(() => navigation.goBack());
    return unsubscribe;
  }

  const navigation = useNavigation();

  return (
    <Formik
      initialValues={{caption: '', imageUrl: ''}}
      onSubmit={values => {
        uploadPostToFirebase(values.imageUrl, values.caption);
      }}
      validationSchema={uploadPostSchema}
      validateOnMount={true}>
      {({handleBlur, handleChange, handleSubmit, values, errors, isValid}) => (
        <>
          <View
            style={{
              margin: 20,
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}>
            <Image
              style={{width: 100, height: 100}}
              source={{
                uri: thumbnailUrl ? thumbnailUrl : PLACEHOLDER_IMG,
              }}
            />
            <View style={{flex: 1, marginLeft: 12}}>
              <TextInput
                style={{color: 'white', fontSize: 20}}
                placeholder="Write a caption ..."
                placeholderTextColor="gray"
                multiline={true}
                onChangeText={handleChange('caption')}
                onBlur={handleBlur('caption')}
                value={values.caption}
              />
            </View>
          </View>
          <Divider width={0.2} orientation="vertical" />
          <TextInput
            onChange={e => setThumbnailUrl(e.nativeEvent.text)}
            style={{color: 'white', fontSize: 18}}
            placeholder="Enter Image Url"
            placeholderTextColor="gray"
            onChangeText={handleChange('imageUrl')}
            onBlur={handleBlur('imageUrl')}
            value={values.imageUrl}
          />
          {errors.imageUrl && (
            <Text style={{color: 'red', fontSize: 10}}>{errors.imageUrl}</Text>
          )}
          <Button title="Share" onPress={handleSubmit} disabled={!isValid} />
        </>
      )}
    </Formik>
  );
}

export default FormikPostUploader;

const PLACEHOLDER_IMG =
  'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRbeQlsruJMdFTjMK9OkGZY527BXOvbGDWWHg&usqp=CAU';
