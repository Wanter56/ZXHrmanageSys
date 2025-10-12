import React, { useState, useEffect } from "react";
import { Button, Input, Select } from "antd";
import { useDebounce } from "@hooks/useDebounce";
const { Search } = Input;

interface FilterProps {
  onAdd: () => void;
  loading: boolean;
  // 可以添加筛选条件变更的回调
  onSearch?: (value: string) => void;
  onEducationChange?: (value: string) => void;
  onAgeRangeChange?: (value: string) => void;
  onReset?: () => void;
}

const Filter: React.FC<FilterProps> = ({ onAdd, onReset, loading, onSearch, onEducationChange, onAgeRangeChange }) => {
  const [inputValue, setInputValue] = useState("");
  // 对输入值做防抖处理，延迟300ms
  const debouncedValue = useDebounce(inputValue, 3000);
  // 防抖触发的搜索（仅输入变化时）
  useEffect(() => {
    // 避免初始值为空时触发，且排除点击按钮/回车的情况
    if (inputValue && debouncedValue === inputValue) {
      handleSearch(debouncedValue);
    }
  }, [debouncedValue]);

  // 统一的搜索逻辑
  const handleSearch = (value:any) => {
    if (onSearch) {
      onSearch(value);
    }
  };

  return (
    <div className="control-container">
      <div className="flex justify-between mb-4">
        <Button type="primary" className="mr-4 " onClick={onAdd} disabled={loading}>
          添加
        </Button>
        <Button type="primary" className="ml-4" onClick={onReset} disabled={loading}>
          重置
        </Button>
      </div>

      <Search
        placeholder="搜索学生"
        enterButton
        style={{ marginBottom: 20 }}
        onChange={(e) => setInputValue(e.target.value)}
        // 点击按钮/回车时，立即执行搜索并同步输入值
        onSearch={(value) => {
          setInputValue(value); // 确保输入框值与搜索值一致
          handleSearch(value);
        }}
      />

      <Select
        style={{ width: "100%", marginBottom: 20 }}
        placeholder="请选择学历"
        options={[
          { value: "本科", label: "本科" },
          { value: "硕士", label: "硕士" },
          { value: "博士", label: "博士" },
        ]}
        onChange={onEducationChange}
      />

      <Select
        style={{ width: "100%" }}
        placeholder="请选择年龄范围"
        options={[
          { value: "25以下", label: "25以下" },
          { value: "25-35", label: "25-35" },
          { value: "35-50", label: "35-50" },
          { value: "50以上", label: "50以上" },
        ]}
        onChange={onAgeRangeChange}
      />

      <div className="filter-container"></div>
    </div>
  );
};

export default Filter;
