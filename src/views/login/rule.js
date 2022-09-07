export const mobileRules = [
  { required: true, message: '请填写手机号' },
  {
    pattern: /^(?:(?:\+|00)86)?1\d{10}$/,
    message: '手机号格式错误'
  }
]

export const codeRules = [
  { required: true, message: '请输入验证码' },
  { pattern: /[0-9]{6}/, message: '验证码格式错误' }
]
