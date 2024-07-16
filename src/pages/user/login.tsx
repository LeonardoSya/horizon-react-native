import React, { useState } from 'react'
import { View, TextInput, ActivityIndicator, Platform, Pressable, StyleSheet } from 'react-native'
import { Text } from '@rneui/themed'
import { Link } from '@react-navigation/native'
import { useAppDispatch, useAppSelector } from '@/hooks/redux-hooks'
import { loginFeature, selectAuth } from '@/features/auth-slice'
import { useAuthInterceptor } from '@/api/login-service'

const Login = ({ navigation }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const dispatch = useAppDispatch()
  const { isLoading, isAuthenticated } = useAppSelector(selectAuth)
  useAuthInterceptor()

  const isWeb = Platform.OS === 'web'

  const handleLogin = async () => {
    const actionResult = await dispatch(loginFeature({ username, password }))
    if (loginFeature.fulfilled.match(actionResult) && isAuthenticated) {
      if (isWeb) {
        window.location.href = '/identify'
      } else {
        navigation.navigate('智能识别')
      }
    } else {
      // ! 此函数仍存在问题，仍会跳到else语句
      navigation.navigate('我的')
    }
  }

  return isLoading ? (
    <ActivityIndicator size='large' />
  ) : (
    <View style={styles.container}>
      <Text style={styles.title}>探寻，比憧憬更有意义</Text>
      <TextInput
        style={styles.textInput}
        value={username}
        onChangeText={setUsername}
        placeholder='Username'
        placeholderTextColor='rgb(124,145,146)'
      />
      <TextInput
        style={styles.textInput}
        value={password}
        onChangeText={setPassword}
        placeholder='Password'
        placeholderTextColor='rgb(124,145,146)'
        secureTextEntry
      />
      <Pressable style={styles.button} onPress={handleLogin}>
        <Text style={styles.loginText}>立即登录</Text>
      </Pressable>
      <View style={styles.toRegisterContainer}>
        <Text style={styles.toRegisterText}>没有账号?</Text>

        <Pressable
          onPress={() =>
            isWeb ? (window.location.href = '/user/register') : navigation.navigate('用户注册')
          }
        >
          <Text style={styles.toRegisterButton}>去注册</Text>
        </Pressable>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 6,
    maxHeight: '100%',
  },
  title: {
    fontSize: 24,
    fontWeight: '600',
    color: '#fff',
    marginBottom: '15%',
    marginTop: '-5%',
  },
  textInput: {
    width: '80%',
    height: 50,
    borderBottomWidth: 1,
    borderColor: 'rgb(124,145,146)',
    margin: 10,
    padding: 5,
    borderRadius: 5,
    color: '#fff',
    fontSize: 20,
  },
  button: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 17,
    margin: 20,
    width: '80%',
    backgroundColor: 'rgb(124,145,146)',
    borderRadius: 8,
  },
  loginText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
    letterSpacing: 1,
  },
  toRegisterContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  toRegisterText: {
    color: 'rgb(124,145,146)',
    fontSize: 18,
  },
  toRegisterButton: {
    color: '#fff',
    fontSize: 18,
    marginLeft: 8,
  },
})

export default Login
