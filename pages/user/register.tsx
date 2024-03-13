import React, { useState } from 'react'
import { View, TextInput, ActivityIndicator, Alert } from 'react-native'
import { Text, Button } from '@rneui/themed'
import { Formik } from 'formik'
import * as Yup from 'yup'
import { registerUser } from '@/services/user-services'
import { styles } from '@/assets/styles/global'
import { userStyles } from '@/assets/styles/user-styles'

// 表单校验
const RegisterSchema = Yup.object().shape({
    username: Yup.string().required('账号为必填'),
    email: Yup.string().email('邮箱格式不合法').required('邮箱为必填'),
    password: Yup.string().min(6, '密码应长于6个字符').required('密码为必填'),
})

const RegisterComponent = () => {
    const [loading, setLoading] = useState(false)

    const handleRegistration = (values: any) => {
        setLoading(true)
        registerUser(values)
            .then(() => {
                Alert.alert("注册成功")
                setLoading(false)
            })
            .catch((error) => {
                Alert.alert("注册失败", error.message)
                setLoading(false)
            })
    }

    if (loading) {
        return <ActivityIndicator size="large" />
    }

    return (
        <Formik
            initialValues={{ username: '', email: '', password: '' }}
            validationSchema={RegisterSchema}  // 校验表单数据
            onSubmit={handleRegistration}  // 表单数据通过校验后执行 通常用于处理表单数据的提交(如发送api请求)
        >
            {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
                <View style={styles.container}>
                    <TextInput
                        style={userStyles.textInput}
                        onChangeText={handleChange('email')}
                        onBlur={handleBlur('email')}
                        value={values.email}
                        placeholder='Email'
                        keyboardType='email-address'
                    />
                    {touched.email && errors.email && <Text>{errors.email}</Text>}

                    <TextInput
                        style={userStyles.textInput}
                        onChangeText={handleChange('username')}  // 当username输入框内容变化时候，handleChange函数调用  handleChange函数用于更新username值
                        onBlur={handleBlur('username')}  // 输入框失去焦点时 handleBlur调用(通常处理表单验证)
                        value={values.username}  // 输入框的值绑定到 Formik的username
                        placeholder='Username'
                    />
                    {/* 如果username字段已被触摸过(失焦)并存在验证错误 就显示错误信息 */}
                    {touched.username && errors.username && <Text>{errors.username}</Text>}

                    <TextInput
                        style={userStyles.textInput}
                        onChangeText={handleChange('password')}
                        onBlur={handleBlur('password')}
                        value={values.password}
                        placeholder='Password'
                        secureTextEntry
                    />
                    {touched.password && errors.password && <Text>{errors.password}</Text>}

                    <Button
                        onPress={handleSubmit}
                        title="立即注册"
                    />
                </View>
            )}
        </Formik>
    )
}

export default RegisterComponent

