import React from 'react';
import {
  View,
  TextInput,
  StyleSheet,
  Platform,
  Pressable,
  Text,
  TouchableOpacity,
  Alert,
} from 'react-native';
import {Formik} from 'formik';
import * as Yup from 'yup';
import {firebase, db} from '../../firebase';

function SignupForm({navigation}) {
  const SignupFormSchema = Yup.object().shape({
    email: Yup.string()
      .email()
      .required('An email is required')
      .matches(
        /^[^.~`#$%^&*()":;'?/<>,]([0-9A-Za-z\_\-]?)+(\.?(([0-9A-Za-z\_\-]+)([0-9A-Za-z]+)))+@[a-zA-Z]{2,}\.[a-zA-Z]{2,}(\.?[a-zA-Z]{2,})*$/,
        'The email is invalid',
      ),
    username: Yup.string().required().min(2, 'A username is required'),
    password: Yup.string()
      .required()
      .min(6, 'Your password has to have at least 6 characters'),
  });

  const getRandomProfilePicture = async () => {
    const response = await fetch('https://randomuser.me/api');
    const data = await response.json();
    return data.results[0].picture.large;
  };

  async function onSignup(email, password, username) {
    try {
      const authUser = await firebase
        .auth()
        .createUserWithEmailAndPassword(email, password);
      console.log('^^ Firebase User Created Successfully ^^', email, password);

      db.collection('users')
        .doc(authUser.user.email)
        .set({
          owner_uid: authUser.user.uid,
          username: username,
          email: authUser.user.email,
          profile_picture: await getRandomProfilePicture(),
        });
    } catch (error) {
      Alert.alert('My lord...', error.message);
    }
  }

  return (
    <View style={styles.wrapper}>
      <Formik
        initialValues={{email: '', username: '', password: ''}}
        onSubmit={values => {
          onSignup(values.email, values.password, values.username);
        }}
        validationSchema={SignupFormSchema}
        validateOnMount={true}>
        {({
          handleChange,
          handleBlur,
          handleSubmit,
          values,
          errors,
          isValid,
        }) => (
          <>
            <View
              style={[
                styles.inputField,
                {
                  borderColor:
                    values.email.length < 1 || !errors.email ? '#ccc' : 'red',
                },
              ]}>
              <TextInput
                placeholderTextColor="#444"
                placeholder="Email"
                autoCapitalize="none"
                keyboardType="email-address"
                textContentType="emailAddress" /**IOS */
                autoFocus={true}
                onChangeText={handleChange('email')}
                onBlur={handleBlur('email')}
                value={values.email}
              />
            </View>
            <View
              style={[
                styles.inputField,
                {
                  borderColor:
                    values.username.length < 1 || values.username.length >= 2
                      ? '#ccc'
                      : 'red',
                },
              ]}>
              <TextInput
                placeholderTextColor="#444"
                placeholder="Username"
                autoCapitalize="none"
                textContentType="username" /** IOS */
                onChangeText={handleChange('username')}
                onBlur={handleBlur('username')}
                value={values.username}
              />
            </View>
            <View
              style={[
                styles.inputField,
                {
                  borderColor:
                    values.password.length < 1 || values.password.length >= 6
                      ? '#ccc'
                      : 'red',
                },
              ]}>
              <TextInput
                placeholderTextColor="#444"
                placeholder="Password"
                autoCapitalize="none"
                autoCorrect={false}
                secureTextEntry={true}
                textContentType="password"
                onChangeText={handleChange('password')}
                onBlur={handleBlur('password')}
                value={values.password}
              />
            </View>
            <Pressable style={styles.button(isValid)} onPress={handleSubmit}>
              <Text style={styles.buttonText}>Sign Up</Text>
            </Pressable>
            <View style={styles.loginContainer}>
              <Text>Already have an account? </Text>
              <TouchableOpacity onPress={() => navigation.goBack()}>
                <Text style={{color: '#6bb0f5'}}>Log In</Text>
              </TouchableOpacity>
            </View>
          </>
        )}
      </Formik>
    </View>
  );
}

export default SignupForm;

const styles = StyleSheet.create({
  wrapper: {
    marginTop: 80,
  },

  inputField: {
    borderWidth: 1,
    padding: Platform.OS === 'ios' ? 12 : 0,
    backgroundColor: '#fafafa',
    marginBottom: 10,
    borderRadius: 4,
  },

  button: isValid => ({
    backgroundColor: isValid ? '#0096f6' : '#9acaf7',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 42,
    borderRadius: 4,
    marginTop: 50,
  }),

  buttonText: {
    fontWeight: '600',
    color: '#fff',
    fontSize: 20,
  },

  loginContainer: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'center',
    marginTop: 50,
  },
});
