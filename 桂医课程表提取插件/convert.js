// 引入文件读写模块
const fs = require('fs');

// 1. 读取你的原始数据（假设文件名是 my_data.json）
const rawData = fs.readFileSync('one.json', 'utf8');

// 2. 用 parser.js 解析成中间格式
const scheduleHtmlParser = require('./parser.js');
const middleCourses = scheduleHtmlParser(rawData);

// 3. 把中间格式转成 123.txt 里的那种格式
const targetCourses = middleCourses.map(c => {
    // 从 sections 数组里取第一个和最后一个作为 startSection 和 endSection
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
        isCustomTime: false   // 固定为 false
    };
});

// 4. 加上固定的时间表（与 123.txt 里的一模一样）
const timeSlots = [
    { "number": 1, "startTime": "08:30", "endTime": "09:10" },
    { "number": 2, "startTime": "09:20", "endTime": "10:00" },
    { "number": 3, "startTime": "10:10", "endTime": "10:50" },
    { "number": 4, "startTime": "11:00", "endTime": "11:40" },
    { "number": 5, "startTime": "11:50", "endTime": "12:30" },
    { "number": 6, "startTime": "14:30", "endTime": "15:10" },
    { "number": 7, "startTime": "15:20", "endTime": "16:00" },
    { "number": 8, "startTime": "16:10", "endTime": "16:50" },
    { "number": 9, "startTime": "17:00", "endTime": "17:40" },
    { "number": 10, "startTime": "19:00", "endTime": "19:40" },
    { "number": 11, "startTime": "19:50", "endTime": "20:30" },
    { "number": 12, "startTime": "20:40", "endTime": "21:20" }
];

// 5. 拼成最终对象
const output = {
    courses: targetCourses,
    timeSlots: timeSlots
};

// 6. 写入文件 output.json
fs.writeFileSync('output.json', JSON.stringify(output, null, 2), 'utf8');

console.log('转换完成！结果保存在 output.json');