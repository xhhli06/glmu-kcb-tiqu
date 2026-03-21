// SPDX-License-Identifier: MIT

function scheduleHtmlParser(json_str) {
  courses_json = JSON.parse(json_str)
  const courseInfos = []

  for (course of courses_json) {
    const name = course.kcmc
    const position = course.jxcdmc
    const teacher = course.teaxms
    const weeksTemp = course.zc.replace('周', '').split(',')
    const weeks = []
    weeksTemp.forEach(w => {
      w = w.split('-')
      if (w.length === 1) {
        weeks.push(parseInt(w))
      } else {
        for (let i = parseInt(w[0]); i <= parseInt(w[1]); i += 1) {
          weeks.push(i)
        }
      }
    })
    const day = parseInt(course.xq)
    let sections = []
    const jcdmStr = String(course.jcdm)
    
    if (jcdmStr.includes('-')) {
      const [start, end] = jcdmStr.split('-').map(Number)
      for (let i = start; i <= end; i++) {
         sections.push(i)
      }
    } else if (/^\d+$/.test(jcdmStr)) {
      for (let i = 0; i < jcdmStr.length; i += 2) {
         const sec = parseInt(jcdmStr.substring(i, i + 2), 10)
         if (!isNaN(sec)) sections.push(sec)
      }
    } else {
      sections = [parseInt(jcorStr)]
    }

    courseInfos.push({
      name,
      teacher,
      position,
      weeks,
      day,
      sections,
    })
  }

  return courseInfos
}

module.exports = scheduleHtmlParser;