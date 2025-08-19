export default userFunc: () => {

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




}