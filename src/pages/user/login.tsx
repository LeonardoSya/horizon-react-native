import React, { useState } from 'react'
import { View, TextInput, ActivityIndicator, Pressable, StyleSheet } from 'react-native'
import { Text } from '@rneui/themed'
import { useAppDispatch, useAppSelector } from '@/hooks/redux-hooks'
import { loginFeature, selectAuth } from '@/features/auth-slice'
import { useAuthInterceptor } from '@/api/login-service'
import { RFValue } from 'react-native-responsive-fontsize'

const Login = ({ navigation }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const dispatch = useAppDispatch()
  const { isLoading } = useAppSelector(selectAuth)
  useAuthInterceptor()

  const handleLogin = async () => {
    const actionResult = await dispatch(loginFeature({ username, password }))
    if (loginFeature.fulfilled.match(actionResult)) {
      if (actionResult.payload) {
        console.log('Access Token:', actionResult.payload.access) // 登录成功后获取 accessToken
        navigation.navigate('我的')
      } else {
        alert('登录失败')
      }
    } else {
      alert('登录失败，请稍后重试')
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

        <Pressable onPress={() => navigation.navigate('用户注册')}>
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
    padding: '6%',
    maxHeight: '100%',
  },
  title: {
    fontSize: RFValue(24),
    fontWeight: '600',
    color: '#fff',
    marginBottom: '15%',
    marginTop: '-5%',
  },
  textInput: {
    width: '80%',
    height: RFValue(50),
    borderBottomWidth: RFValue(1),
    borderColor: 'rgb(124,145,146)',
    margin: RFValue(10),
    padding: RFValue(5),
    borderRadius: RFValue(5),
    color: '#fff',
    fontSize: RFValue(20),
  },
  button: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: RFValue(18),
    margin: RFValue(20),
    width: '80%',
    backgroundColor: 'rgb(124,145,146)',
    borderRadius: RFValue(8),
  },
  loginText: {
    color: '#fff',
    fontSize: RFValue(18),
    fontWeight: '600',
    letterSpacing: RFValue(1),
  },
  toRegisterContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  toRegisterText: {
    color: 'rgb(124,145,146)',
    fontSize: RFValue(18),
  },
  toRegisterButton: {
    color: '#fff',
    fontSize: RFValue(18),
    marginLeft: RFValue(8),
  },
})

export default Login
