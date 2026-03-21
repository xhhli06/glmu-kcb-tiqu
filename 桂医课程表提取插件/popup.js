// 模拟教务助手工具函数（provider.js 依赖）
window.AISchedulePrompt = async (options) => {
  // 根据传入的 titleText 返回对应的用户输入值
  if (options.titleText === '学年') {
    return document.getElementById('yearInput').value;
  } else if (options.titleText === '学期') {
    return document.getElementById('termSelect').value;
  }
  return '';
};

window.AIScheduleAlert = async (msg) => {
  const statusDiv = document.getElementById('statusMsg');
  statusDiv.textContent = msg;
  statusDiv.className = 'status error';
  throw new Error(msg);
};

window.loadTool = async (toolName) => {
  // 模拟加载工具，直接返回
  return;
};

// 提取并导出课表
document.getElementById('extractBtn').addEventListener('click', async () => {
  const statusDiv = document.getElementById('statusMsg');
  statusDiv.textContent = '⏳ 正在获取课表，请稍候...';
  statusDiv.className = 'status';

  try {
    // 调用 provider.js 中的 scheduleHtmlProvider
    const rawJsonStr = await scheduleHtmlProvider();
    if (rawJsonStr === 'do not continue') {
      statusDiv.textContent = '❌ 提取失败，请确认已登录教务系统并刷新课表页面';
      statusDiv.className = 'status error';
      return;
    }

    // 解析原始 JSON 字符串（实际上是课表数组的字符串）
    const courseList = JSON.parse(rawJsonStr);

    // 使用 parser.js 将 courseList 转换为中间格式
    const middleCourses = scheduleHtmlParser(JSON.stringify(courseList));

    // 转换中间格式为目标格式（课程 + 时间表）
    const targetCourses = middleCourses.map(c => {
      const startSection = c.sections[0];
      const endSection = c.sections[c.sections.length - 1];
      return {
        name: c.name,
        teacher: c.teacher,
        position: c.position,
        day: c.day,
        startSection: startSection,
        endSection: endSection,
        weeks: c.weeks,
        isCustomTime: false
      };
    });

    // 获取时间表（从 timer.js 的 scheduleTimer 中提取）
    const timerConfig = await scheduleTimer();
    const timeSlots = timerConfig.sections.map((sec, idx) => ({
      number: sec.section,
      startTime: sec.startTime,
      endTime: sec.endTime
    }));

    const output = {
      courses: targetCourses,
      timeSlots: timeSlots
    };

    // 导出 JSON 文件
    const jsonStr = JSON.stringify(output, null, 2);
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `课程表_${document.getElementById('yearInput').value}_${document.getElementById('termSelect').value}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    statusDiv.textContent = '✅ 提取成功！文件已自动下载。';
    statusDiv.className = 'status success';
  } catch (err) {
    console.error(err);
    statusDiv.textContent = `❌ 出错：${err.message || '未知错误'}`;
    statusDiv.className = 'status error';
  }
});