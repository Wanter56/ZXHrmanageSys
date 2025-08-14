import React from "react";
import IconMap from "Icon/IconMap";
import { LoginRule } from "utils/rules";

function AccountLogin({ Input, FormItem }: { Input: any; FormItem: any }) {
  return (
    <>
      <FormItem name="accountName" rules={LoginRule.userRule} hasFeedback>
        <Input placeholder="请输入用户名" prefix={IconMap.user} autoComplete="username" />
      </FormItem>
      <FormItem rules={LoginRule.passwordRule} name="password" type="password" hasFeedback>
        <Input.Password placeholder="请输入密码" prefix={IconMap.password} autoComplete="current-password" />
      </FormItem>
    </>
  );
}

export default AccountLogin;
