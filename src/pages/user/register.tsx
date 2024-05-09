import React from 'react'
import { Pressable, StyleSheet } from 'react-native'
import { View, TextInput, ActivityIndicator } from 'react-native'
import { Text } from '@rneui/themed'
import { Formik } from 'formik'
import * as Yup from 'yup'
import { useAppDispatch, useAppSelector } from '@/hooks/redux-hooks'
import { registerStart, registerSuccess, registerFail } from '@/features/user-slice'
import { registerUser, RegisterUserData } from '@/api/register-service'

const schema = Yup.object().shape({
  username: Yup.string().required('账号不能为空'),
  email: Yup.string().email('邮箱格式不合法').required('邮箱不能为空'),
  password: Yup.string().min(6, '密码应长于6个字符').required('密码不能为空'),
})

const Register = ({ navigation }) => {
  const dispatch = useAppDispatch()
  const { isLoading, error } = useAppSelector(state => state.user)

  const handleRegister = async (values: RegisterUserData) => {
    dispatch(registerStart())
    try {
      const response = await registerUser(values)
      response.status === 200
        ? dispatch(registerSuccess(values))
        : dispatch(registerFail(error as string))
    } catch (error) {
      dispatch(registerFail(error as string))
    } finally {
      dispatch(registerFail(error as string))
    }
  }

  if (isLoading) {
    return <ActivityIndicator size='large' />
  }

  return (
    <Formik
      initialValues={{
        username: '',
        email: '',
        password: '',
      }}
      validationSchema={schema} // 校验表单数据
      onSubmit={handleRegister} // 表单数据通过校验后执行
    >
      {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
        <View style={styles.container}>
          <Text style={styles.title}>探索之旅，从这里启程</Text>

          <TextInput
            style={styles.textInput}
            onChangeText={handleChange('email')}
            onBlur={handleBlur('email')}
            value={values.email}
            placeholder='Email'
            placeholderTextColor='rgb(124,145,146)'
            keyboardType='email-address'
          />
          {touched.email && errors.email && <Text>{errors.email}</Text>}

          <TextInput
            style={styles.textInput}
            onChangeText={handleChange('username')} // 当username输入框内容变化时候，handleChange函数调用  handleChange函数用于更新username值
            onBlur={handleBlur('username')} // 输入框失去焦点时 handleBlur调用(通常处理表单验证)
            value={values.username} // 输入框的值绑定到 Formik的username
            placeholder='Username'
            placeholderTextColor='rgb(124,145,146)'
          />
          {/* 如果username字段已被触摸过(失焦)并存在验证错误 就显示错误信息 */}
          {touched.username && errors.username && <Text>{errors.username}</Text>}

          <TextInput
            style={styles.textInput}
            onChangeText={handleChange('password')}
            onBlur={handleBlur('password')}
            value={values.password}
            placeholder='Password'
            placeholderTextColor='rgb(124,145,146)'
            secureTextEntry
          />
          {touched.password && errors.password && <Text>{errors.password}</Text>}

          <Pressable style={styles.button} onPress={() => handleSubmit()}>
            <Text style={styles.registerText}>立即注册</Text>
          </Pressable>
          <View style={styles.toLoginContainer}>
            <Text style={styles.toLoginText}>已有账号?</Text>
            <Pressable onPress={() => navigation.navigate('Login')}>
              <Text style={styles.toLoginButton}>去登陆</Text>
            </Pressable>
          </View>
        </View>
      )}
    </Formik>
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
    fontSize: 26,
    fontWeight: '600',
    color: '#fff',
    marginBottom: '15%',
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
    margin: 15,
    width: '80%',
    backgroundColor: 'rgb(124,145,146)',
    borderRadius: 8,
  },
  registerText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
    letterSpacing: 1,
  },
  toLoginContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  toLoginText: {
    color: 'rgb(124,145,146)',
    fontSize: 18,
  },
  toLoginButton: {
    color: '#fff',
    fontSize: 18,
    marginLeft: 8,
  },
})

export default Register
