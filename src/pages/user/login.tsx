import React, { useState } from 'react'
import { Alert, Button, Pressable, StyleSheet } from 'react-native'
import { View, TextInput, ActivityIndicator } from 'react-native'
import { Text } from '@rneui/themed'
import { Formik } from 'formik'
import * as Yup from 'yup'
import { useAppDispatch, useAppSelector } from '@/hooks/redux-hooks'
import { UserData, loginStart, loginSuccess, loginFail } from '@/features/user-slice'
import { loginUser } from '@/api/login-service'

const schema = Yup.object().shape({
  username: Yup.string().required('账号不能为空'),
})

const Login = ({ navigation }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleLogin = async () => {
    if (username && password) {
      try {
        const res = await loginUser(username, password)
        switch (res.code) {
          case 200:
            console.log('handleLogin() has got `200` and will navigate to `Register`')
            navigation.navigate('Register')
            break
          case 404:
            Alert.alert('用户名或密码错误', res.msg)
            alert('用户名或密码错误')
            break
          default:
            Alert.alert(`Login error: ${res.code}`, res.msg)
            alert(`Login error: ${res.code}`)
            break
        }
      } catch (error) {
        console.error('Login error:', error)
        Alert.alert('Login error', 'An unexpected error occurred.')
      }
    } else {
      Alert.alert('用户名或密码不能为空')
    }
  }

  return (
    <View style={styles.container}>
      <TextInput style={styles.input} value={username} onChangeText={setUsername} />
      <TextInput style={styles.input} value={password} onChangeText={setPassword} />
      <Button title='Sign in' onPress={handleLogin} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    borderBottomWidth: 1,
    borderColor: '#fff',
    margin: 20,
    color: '#fff',
    width: 200,
  },
})

export default Login
