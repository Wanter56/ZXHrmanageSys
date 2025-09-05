const express = require("express");
const router = express.Router();
const Student = require("../models/Student");
const { getNextStudentId } = require("../utils/studentIdUtil");

// 工具函数：将参数ID转为number
const parseId = (idStr) => {
  const id = Number(idStr);
  return isNaN(id) ? null : id;
};

// 1. 获取所有学生
router.get("/students", async (req, res) => {
  try {
    const doc = await Student.findOne();
    const students = doc?.students ?? [];
    
    res.json({ 
      success: true, 
      count: students.length, 
      data: students 
    });
  } catch (err) {
    console.error("获取学生列表失败:", err.message);
    res.status(500).json({ 
      success: false, 
      message: "查询失败：" + err.message 
    });
  }
});

// 2. 根据ID获取单个学生
router.get("/students/:id", async (req, res) => {
  try {
    const targetId = parseId(req.params.id);
    
    if (targetId === null) {
      return res.status(400).json({ 
        success: false, 
        message: "ID必须为数字" 
      });
    }

    const doc = await Student.findOne();
    const students = doc?.students ?? [];
    const student = students.find(item => Number(item.id) === targetId);

    if (!student) {
      return res.status(404).json({ 
        success: false, 
        message: `未找到ID为${targetId}的学生` 
      });
    }

    res.json({ 
      success: true, 
      data: student 
    });
  } catch (err) {
    console.error("获取单个学生失败:", err.message);
    res.status(500).json({ 
      success: false, 
      message: "查询失败：" + err.message 
    });
  }
});

// 3. 新增学生
router.post("/students", async (req, res) => {
  try {
    const studentId = await getNextStudentId();
    if (typeof studentId !== "number" || isNaN(studentId)) {
      return res.status(500).json({
        success: false,
        message: "生成ID失败",
      });
    }

    const newStudent = {
      ...req.body,
      id: studentId,
      age: Number(req.body.age) || 0,
      createTime: new Date().toISOString(),
      updateTime: new Date().toISOString()
    };

    const updatedDoc = await Student.findOneAndUpdate(
      {},
      { $push: { students: { $each: [newStudent], $position: 0 } } },
      { new: true, upsert: true, runValidators: true }
    );

    const isAdded = updatedDoc?.students?.some(item => item.id === studentId);
    if (!isAdded) {
      throw new Error("学生数据未写入数据库");
    }

    return res.status(201).json({
      success: true,
      message: "学生新增成功",
      data: newStudent,
    });
  } catch (e) {
    console.error("新增学生失败:", e.message);
    return res.status(500).json({
      success: false,
      message: "新增失败：" + e.message,
    });
  }
});

// 4. 更新学生
router.put("/students/:id", async (req, res) => {
  try {
    const targetId = parseId(req.params.id);
    
    if (targetId === null) {
      return res.status(400).json({ 
        success: false, 
        message: "ID必须为数字" 
      });
    }

    const updatedDoc = await Student.findOneAndUpdate(
      { "students.id": targetId },
      { 
        $set: { 
          "students.$.name": req.body.name,
          "students.$.age": Number(req.body.age) || 0,
          "students.$.phone": req.body.phone,
          "students.$.email": req.body.email,
          "students.$.education": req.body.education,
          "students.$.graduationschool": req.body.graduationschool,
          "students.$.profession": req.body.profession,
          "students.$.profile": req.body.profile,
          "students.$.updateTime": new Date().toISOString()
        } 
      },
      { new: true, runValidators: true }
    );

    if (!updatedDoc) {
      return res.status(404).json({ 
        success: false, 
        message: `未找到ID为${targetId}的学生` 
      });
    }

    const updatedStudent = updatedDoc.students.find(item => item.id === targetId);
    res.json({ 
      success: true, 
      data: updatedStudent 
    });
  } catch (err) {
    console.error("更新学生失败:", err.message);
    res.status(500).json({ 
      success: false, 
      message: "更新失败：" + err.message 
    });
  }
});

// 5. 删除学生
router.delete("/students/:id", async (req, res) => {
  try {
    const targetId = parseId(req.params.id);
    
    if (targetId === null) {
      return res.status(400).json({ 
        success: false, 
        message: "ID必须为数字" 
      });
    }

    const originalDoc = await Student.findOne();
    const originalLength = originalDoc?.students?.length || 0;
    if (originalLength === 0) {
      return res.status(404).json({ 
        success: false, 
        message: "学生数据不存在" 
      });
    }

    const updatedDoc = await Student.findOneAndUpdate(
      {},
      { $pull: { students: { id: targetId } } },
      { new: true, runValidators: true }
    );

    const newLength = updatedDoc?.students?.length || 0;
    if (originalLength === newLength) {
      return res.status(404).json({ 
        success: false, 
        message: `未找到ID为${targetId}的学生` 
      });
    }

    res.json({ 
      success: true, 
      message: `ID为${targetId}的学生已成功删除`, 
      data: null 
    });
  } catch (err) {
    console.error("删除学生失败:", err.message);
    res.status(500).json({ 
      success: false, 
      message: "删除失败：" + err.message 
    });
  }
});

module.exports = router;
