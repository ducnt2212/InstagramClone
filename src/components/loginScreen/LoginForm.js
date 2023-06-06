import React from 'react';
import {
  View,
  TextInput,
  StyleSheet,
  Platform,
  Text,
  Pressable,
  TouchableOpacity,
  Alert,
} from 'react-native';
import {Formik} from 'formik';
import * as Yup from 'yup';
import {firebase} from '../../firebase';

function LoginForm({navigation}) {
  const LoginFormSchema = Yup.object().shape({
    email: Yup.string()
      .email()
      .required('An email is required')
      .matches(
        /^[^.~`#$%^&*()":;'?/<>,]([0-9A-Za-z\_\-]?)+(\.?(([0-9A-Za-z\_\-]+)([0-9A-Za-z]+)))+@[a-zA-Z]{2,}\.[a-zA-Z]{2,}(\.?[a-zA-Z]{2,})*$/,
        'The email is invalid',
      ),
    password: Yup.string()
      .required()
      .min(6, 'Your password must be at least 6 characters'),
  });

  const onLogin = async (email, password) => {
    try {
      await firebase.auth().signInWithEmailAndPassword(email, password);
      console.log('^^ Firebase Login Successfull ^^', email, password);
    } catch (error) {
      Alert.alert('My lord...', error.message);
    }
  };
  return (
    <View style={styles.wrapper}>
      <Formik
        initialValues={{email: '', password: ''}}
        onSubmit={values => {
          onLogin(values.email, values.password);
        }}
        validationSchema={LoginFormSchema}
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
                    values.email.length < 1 || !errors.email ? '#ccc' : 'red', //** Should also check for the user name and phone number */
                },
              ]}>
              <TextInput
                placeholderTextColor="#444"
                placeholder="Phone number, username or email"
                autoCapitalize="none"
                keyboardType="email-address"
                textContentType="emailAddress" /** IOS */
                autoFocus={
                  true
                } /** to open the keyboard when the LoginScreen is focused */
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
            <View style={{alignItems: 'flex-end', marginBottom: 30}}>
              <Text style={{color: '#6bb0f5'}}>Forgot password?</Text>
            </View>
            <Pressable style={styles.button(isValid)} onPress={handleSubmit}>
              <Text style={styles.buttonText}>Log In</Text>
            </Pressable>
            <View style={styles.signupContainer}>
              <Text>Don't have an account? </Text>
              <TouchableOpacity onPress={() => navigation.push('SignupScreen')}>
                <Text style={{color: '#6bb0f5'}}>Sign Up</Text>
              </TouchableOpacity>
            </View>
          </>
        )}
      </Formik>
    </View>
  );
}

export default LoginForm;

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
  }),

  buttonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 20,
  },

  signupContainer: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'center',
    marginTop: 50,
  },
});
