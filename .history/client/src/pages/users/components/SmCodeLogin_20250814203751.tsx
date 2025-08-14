import React, { useState, useRef } from "react";

import IconMap from "../Icon/IconMap";
import { Button } from "antd";
import { LoginRule } from "../../../utils/rules";

function SmCodeLogin({ FormItem, Input }: { FormItem: any; Input: any }) {
  const [disabled, setDisabled] = useState(true);
  const [currentTime, setCurrentTime] = useState(60);
  const [status, setStatus] = useState(true);
  const timerRef = useRef(null);

  //检测手机号码是否输入成功
  const checkMobile = async (val: number) => {
    //获取手机号码验证结果
    try {
      const data = await form.validateFields(["mobile"]);
      setDisabled(false);
    } catch (error) {
      setDisabled(true);
    }
  };

  const _sendSmCode = () => {
    setStatus(false);
    setDisabled(true);
    // 每次调用前先清除旧定时器（关键修复）
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }
    runTime();
  };

  const runTime = () => {
    // 将新定时器ID存入 ref
    timerRef.current = setInterval(() => {
      setCurrentTime((prev) => {
        // 基于最新的 prev 判断是否到0
        if (prev === 0) {
          clearInterval(timerRef.current); // 清除当前定时器

          timerRef.current = null; // 重置 ref
          setStatus(true);
          setDisabled(false);
          return 60; // 重置倒计时初始值
        }
        return prev - 1; // 未到0则继续递减
      });
    }, 1000);
  };

  return (
    <>
      <FormItem name="mobile" rules={LoginRule.mobileRule} hasFeedback>
        <Input placeholder="请输入手机号" prefix={IconMap.mobile} onChange={checkMobile} />
      </FormItem>
      <FormItem name="code" rules={LoginRule.codeRule} hasFeedback>
        <Input
          placeholder="请输入验证码"
          prefix={IconMap.smCode}
          addonAfter={
            <Button disabled={disabled} onClick={_sendSmCode}>
              {status ? "发送验证码" : `${currentTime}s后重新发送`}
            </Button>
          }
        />
      </FormItem>
    </>
  );
}

export default SmCodeLogin;
