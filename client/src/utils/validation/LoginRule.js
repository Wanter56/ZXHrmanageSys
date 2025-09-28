export const LoginRule = {
  userRule: [
    {
      required: true,
      message: '账户名不能为空',
    },
    {
      max: 16,
      message: '账户名长度不能超过16位',
    },
    {
      min: 4,
      message: '账户名长度不能小于4位',
    },
  ],
  passwordRule: [
    {
      required: true,
      message: '密码不能为空',
    },
    {
      max: 16,
      message: '密码长度不能超过16位',
    },
    {
      min: 4,
      message: '密码长度不能小于4位',
    },
  ],
  mobileRule: [
    {
      validator: (rule, val, callback) => {
        const mobileReg = /^1[3-9]\d{9}$/;
        switch (true) {
          case !Boolean(val): {
            return Promise.reject('手机号不能为空');
          }
          case !mobileReg.test(val): {
            return Promise.reject('手机号格式不正确');
          }
          default: {
            return Promise.resolve();
          }
        }
      },
    },
  ],
  codeRule: [
    {
      required: true,
      message: '验证码不能为空',
    },
    {
      max: 6,
      message: '验证码长度不正确',
    },
    {
      min: 6,
      message: '验证码长度不正确',
    },
  ],
};
