export default [
  {
    path: "/dashboard",
    name: "dashboard",
    label: "员工分析",
    icon: "HomeOutlined",
    url: "/dashboard",
    requireAdmin: true //仅管理员可见
  },
  {
    path: "/attendance",
    name: "attendance",
    label: "出勤统计",
    icon: "ClockCircleOutlined",
    url: "/attendance",
    requireAdmin: false // 所有用户可见
  },

  {
    path: "/staff",
    name: "staff",
    label: "员工",
    icon: "TeamOutlined",
    url: "/staff",
    requireAdmin: false // 所有用户可见
  },
  {
    path: "/department",
    name: "department",
    label: "部门",
    icon: "PartitionOutlined",
    url: "/department",
    requireAdmin: false // 所有用户可见
  },
  {
    path: "/level",
    name: "level",
    label: "职级",
    icon: "AimOutlined",
    url: "/level",
    requireAdmin: false // 所有用户可见
  },
  {
    path: "/accessment",
    name: "accessment",
    label: "绩效考核",
    icon: "ContainerOutlined",
    url: "/accessment",
    requireAdmin: false // 所有用户可见
  },
  {
    path: "/salary",
    name: "salary",
    label: "调薪记录",
    icon: "MoneyCollectOutlined",
    url: "/salary",
    requireAdmin: false // 所有用户可见
  },
  {
    path: "/rewardRecord",
    name: "rewardRecord",
    label: "奖励记录",
    icon: "ProjectOutlined",
    url: "/rewardRecord",
    requireAdmin: false // 所有用户可见
  },
  {
    path: "/attendanceInfo",
    name: "attendanceInfo",
    label: "考勤信息",
    icon: "LineChartOutlined",
    url: "/attendanceInfo",
    requireAdmin: false // 所有用户可见
  },
];
