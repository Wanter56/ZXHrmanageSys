const Student = require("../models/Student");
const Counter = require("../models/Counter"); // 确保 Counter 模型已正确定义

async function getNextStudentId() {
  try {
    // 1. 查询当前所有存在的学生ID（排除已删除的）
    const doc = await Student.findOne({}, "students.id").lean();
    const students = doc?.students ?? [];

    // 2. 提取有效ID并排序（正整数，去重）
    const existingIds = students
      .map(student => Number(student.id))
      .filter(id => Number.isInteger(id) && id > 0)
      .sort((a, b) => a - b); // 排序后：[1,2,4]（假设删了3）
    console.log("当前存在的ID（排序后）:", existingIds);

    // 3. 找到最小的空缺ID（核心逻辑）
    let nextId = 1; // 初始从1开始
    if (existingIds.length > 0) {
      // 遍历排序后的ID，找第一个不连续的位置
      for (let i = 0; i < existingIds.length; i++) {
        if (existingIds[i] !== nextId) {
          // 找到空缺：比如i=2时，existingIds[2]=4，nextId=3 → 空缺是3
          break;
        }
        // 无空缺则继续+1：比如existingIds=[1,2,3] → nextId=4
        nextId++;
      }
    }
    console.log("找到的最小空缺ID:", nextId);

    // 4. 同步计数器（可选，用于记录当前最大ID，避免后续重复计算）
    await Counter.findOneAndUpdate(
      { collectionName: "students" },
      { $set: { currentMaxId: Math.max(nextId, ...existingIds, 0) } },
      { new: true, upsert: true }
    );

    return nextId;

  } catch (err) {
    console.error("查找空缺ID失败，使用保底方案:", err.message);
    // 保底：基于最大ID+1（避免极端情况导致功能不可用）
    const doc = await Student.findOne({}, "students.id").lean();
    const maxId = (doc?.students ?? []).reduce((max, s) => {
      const id = Number(s.id);
      return (Number.isInteger(id) && id > max) ? id : max;
    }, 0);
    return maxId + 1;
  }
}

module.exports = { getNextStudentId };
