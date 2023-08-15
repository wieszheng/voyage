import {
    LockOutlined,
    UserOutlined,
} from '@ant-design/icons';
import {
    LoginForm,
    ProFormText,
    ProConfigProvider,
} from '@ant-design/pro-components';
import {history, useModel} from '@umijs/max';
import {message} from 'antd';
import React from 'react';
import {flushSync} from 'react-dom';

const Login: React.FC = () => {
    const {initialState, setInitialState} = useModel('@@initialState');
    const {loginSzr} = useModel('auth');
    const fetchUserInfo = async () => {
        const userInfo = await initialState?.fetchUserInfo?.();
        if (userInfo) {
            flushSync(() => {
                setInitialState((s) => ({
                    ...s,
                    currentUser: userInfo,
                }));
            });
        }
    };
    const handleSubmit = async (values: API.LoginParams) => {
        try {
            // 登录
            const resp = await loginSzr({username: values.username, password: values.password});
            if (resp.code === 0) {
                message.success('🎉 🎉 🎉 登录成功');
                await fetchUserInfo();
                const urlParams = new URL(window.location.href).searchParams;
                history.push(urlParams.get('redirect') || '/');
                return;
            }
            console.log(resp);
            // 如果失败去设置用户错误信息
            message.error(resp.msg);
        } catch (error) {
            console.log(error);
            message.error('登录失败，请重试！');
        }
    };

    return (

        <ProConfigProvider hashed={false}>
            <div style={{backgroundColor: 'white', padding: '150px 0'}}>
                <LoginForm
                    contentStyle={{
                        minWidth: 280,
                        maxWidth: '75vw',
                    }}
                    logo={<img alt="logo" src="/logo.svg"/>}
                    title="ApiTest"
                    subTitle="APITest一款全功能的接口自动化平台"
                    onFinish={async (values) => {
                        await handleSubmit(values as API.LoginParams);
                    }}
                >
                    <>
                        <ProFormText
                            name="username"
                            fieldProps={{
                                size: 'large',
                                prefix: <UserOutlined className={'prefixIcon'}/>,
                            }}
                            initialValue="admin"
                            placeholder='用户名: admin'
                            rules={[
                                {
                                    required: true,
                                    message: "请输入用户名!",
                                },
                            ]}
                        />
                        <ProFormText.Password
                            name="password"
                            fieldProps={{
                                size: 'large',
                                prefix: <LockOutlined/>,
                            }}
                            placeholder='密码: admin'
                            rules={[
                                {
                                    required: true,
                                    message: "请输入密码！",
                                },
                            ]}
                        />
                    </>
                </LoginForm>
            </div>
        </ProConfigProvider>

    );
};
export default Login;
