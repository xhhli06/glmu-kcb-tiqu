// SPDX-License-Identifier: MIT

async function scheduleHtmlProvider() {
  await loadTool('AIScheduleTools')
  try {
    const year = await AISchedulePrompt({
      titleText: '学年',
      tipText: '请输入本学年开始的年份',
      defaultText: '2024',
      validator: value => {
        try {
          const v = parseInt(value)
          if (v < 2000 || v > 2100) return '请输入正确的学年'
          return false
        } catch (error) {
          return '请输入正确的学年'
        }
      }
    })

    const term = await AISchedulePrompt({
      titleText: '学期',
      tipText: '请输入本学期的学期(1,2,3 分别表示上、下、短学期)',
      defaultText: '1',
      validator: value => {
        if (value === '1' || value === '2' || value === '3') return false
        return '请输入正确的学期'
      }
    })

    const termCode = term === '1' ? '01' : term === '2' ? '02' : '03'
    const xnxqdm = `${year}${termCode}`

    // 分页参数（可调整每页数量，建议 50 或 100）
    let page = 1
    const rowsPerPage = 100   // 每页100条，共2页即可
    let allRows = []
    let total = 0

    while (true) {
      const res = await fetch("https://ejwc.glmu.edu.cn/xsgrkbcx!getDataList.action", {
        "headers": {
          "accept": "application/json, text/javascript, */*; q=0.01",
          "content-type": "application/x-www-form-urlencoded; charset=UTF-8",
          "x-requested-with": "XMLHttpRequest"
        },
        "body": `xnxqdm=${xnxqdm}&page=${page}&rows=${rowsPerPage}`,
        "method": "POST",
        "mode": "cors",
        "credentials": "include"
      })

      const ret = await res.json()
      if (!ret.rows || !Array.isArray(ret.rows)) {
        throw new Error('返回数据格式不正确')
      }

      total = ret.total
      allRows = allRows.concat(ret.rows)

      // 如果已获取数量 >= 总条数，停止循环
      if (allRows.length >= total) break

      // 否则请求下一页
      page++
      // 防止无限循环（最多请求10页）
      if (page > 10) break
    }

    return JSON.stringify(allRows)
  } catch (error) {
    await AIScheduleAlert('请确定你已经登陆了教务系统，并刷新课表页面')
    return 'do not continue'
  }
}