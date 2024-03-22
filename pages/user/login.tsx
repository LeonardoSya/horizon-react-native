import { ActivityIndicator, View, TextInput, } from 'react-native'
import { Text, Button } from '@rneui/themed'
import * as Yup from 'yup'
import { useAppDispatch, useAppSelector } from '@/hooks/hooks'
import { UserData, login } from '@/features/user-slice'
import { Formik } from 'formik'
import { styles } from '@/assets/styles/global'
import { userStyles } from '@/assets/styles/user-styles'

// 表单校验
const LoginSchema = Yup.object().shape({
    username: Yup.string().required('账号不能为空'),
    password: Yup.string().required('密码不能为空'),
})

const Login = ({ navigation }) => {
    const dispatch = useAppDispatch()
    const { isLoading, error } = useAppSelector((state) => state.user)

    const handleLogin = (values: UserData) => {
        dispatch(login(values))
    }

    if (isLoading) {
        return <ActivityIndicator size="large" />
    }

    return (
        <Formik
            initialValues={{ username: '', password: '' }}
            validationSchema={LoginSchema}  // 校验表单数据
            onSubmit={handleLogin}
        >
            {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
                <View style={styles.container}>
                    <TextInput
                        style={userStyles.textInput}
                        onChangeText={handleChange('username')}
                        onBlur={handleBlur('username')}
                        value={values.username}
                        placeholder='Username'
                    />
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
                        onPress={() => handleSubmit()}
                        title="立即登录"
                    />
                    <Button
                        onPress={() => { navigation.navigate('Register') }}
                        title="没有账号 去注册"
                    />
                </View>
            )}
        </Formik>
    )
}

export default Login