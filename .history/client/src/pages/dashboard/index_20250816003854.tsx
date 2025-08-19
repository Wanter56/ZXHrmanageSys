import React, { useEffect, useState, useMemo } from "react";
import { getUsers } from "../../api/dataApi/usersApi";
import "./dashboard.less";
import { Card, Table } from "antd";
import type { TableProps } from "antd";

// 员工信息接口定义（保持不变）
interface BigNumberObject {
  low: number;
  high: number;
  unsigned: boolean;
}

interface User {
  _id: string;
  __v: number;
  accountName: string;
  bankNumber: BigNumberObject;
  department: string;
  education: number;
  gender: number;
  graduatedSchool: string;
  idNumber: BigNumberObject;
  identity: number;
  level: number;
  marriage: number;
  mobile: number;
  onboardingTime: string;
  password: string;
  salary: number;
  userName: string;
}
interface table {
  userName: string;
  salary: number;
  mobile: number;
}

const columns: TableProps<table>['columns'] = [
  {
    title: "姓名",
    dataIndex: "userName",
  },
  {
    title: "薪水",
    dataIndex: "salary",
    align: "right",
  },
  {
    title: "手机号",
    dataIndex: "mobile",
  },
];
const DashBoard: React.FC = () => {
  // 1. 明确 useState 类型，避免初始值为 [] 导致的类型问题
  const [usersList, setUsersList] = useState<User[]>([]);
  // 2. 添加加载状态，避免数据未加载时的无效计算
  const [loading, setLoading] = useState<boolean>(true);

  // 3. 优化数据请求：添加错误处理和加载状态管理
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true);
        const res = await getUsers();
        // 确保数据是数组（防止后端返回非数组格式）
        setUsersList(Array.isArray(res.data) ? res.data : []);
      } catch (error) {
        console.error("获取用户数据失败:", error);
        setUsersList([]); // 错误时重置为空数组
      } finally {
        setLoading(false); // 无论成功失败都结束加载
      }
    };

    fetchUsers();
  }, []); // 空依赖数组：只在组件挂载时执行一次

  // 4. 使用 useMemo 缓存计算结果，避免每次渲染重新计算
  const countWorkYears = useMemo(() => {
    // 封装计算逻辑为纯函数
    return (workerList: User[], targetYear: number, minYear: number = 0) => {
      return workerList.filter((worker) => {
        try {
          const onboardYear = new Date(worker.onboardingTime).getFullYear();
          const workYear = targetYear - onboardYear;
          return workYear > minYear;
        } catch (error) {
          console.warn("无效的入职时间格式:", worker.onboardingTime, error);
          return false;
        }
      }).length;
    };
  }, []);
  const numWorkersLongest = useMemo(() => {
    return (workerList: User[], workerNum: number) => {
      return workerList
        .sort((a, b) => {
          return new Date(a.onboardingTime).getTime() - new Date(b.onboardingTime).getTime();
        })
        .filter((worker, index) => {
          return index < workerNum;
        });
    };
  }, []);

  // 5. 缓存统计结果，避免每次渲染重复计算
  const stats = useMemo(() => {
    if (loading || usersList.length === 0) {
      return {
        total: 0,
        over10Years: 0,
        over3Years: 0,
        within1Year: 0,
        tenWorkersLongest: [],
      };
    }

    const total = usersList.length;
    const over10Years = countWorkYears(usersList, 2021, 10);
    const over3Years = countWorkYears(usersList, 2021, 3);
    const over1Year = countWorkYears(usersList, 2021, 1);
    const within1Year = total - over1Year;
    const tenWorkersLongest = numWorkersLongest(usersList, 10);

    return { total, over10Years, over3Years, within1Year , tenWorkersLongest };
  }, [usersList, loading, countWorkYears]); // 只有依赖变化时才重新计算

  if (loading) {
    return <div className="loading">加载中...</div>; // 加载状态提示
  }

  return (
    <div className="dashboard">
      <Card className="card">
        <div>公司共计：</div>
        <div>{stats.total}人</div>
      </Card>

      <Card className="year-card">
        <Card.Grid>入职十年以上:{stats.over10Years}人</Card.Grid>
        <Card.Grid>入职三年以上:{stats.over3Years}人</Card.Grid>
        <Card.Grid>入职一年以内:{stats.within1Year}人</Card.Grid>
      </Card>

      <Table<User>
        className="table"
        columns={columns}
        dataSource={tenWorkersLongest}
        bordered
        title={() => "工龄最长的十位员工"}
      />
    </div>
  );
};

export default DashBoard;
