// SPDX-License-Identifier: MIT

async function scheduleTimer({
} = {}) {
  return {
    totalWeek: 20,
    startSemester: '',
    startWithSunday: false,
    showWeekend: false,
    forenoon: 5,
    afternoon: 4,
    night: 3,
    sections: [
      {
        section: 1,
        startTime: '08:30',
        endTime: '09:10',
      },
      {
        section: 2,
        startTime: '09:20',
        endTime: '10:00',
      },
      {
        section: 3,
        startTime: '10:10',
        endTime: '10:50',
      },
      {
        section: 4,
        startTime: '11:00',
        endTime: '11:40',
      },
      {
        section: 5,
        startTime: '11:50',
        endTime: '12:30',
      },
      {
        section: 6,
        startTime: '14:30',
        endTime: '15:10',
      },
      {
        section: 7,
        startTime: '15:20',
        endTime: '16:00',
      },
      {
        section: 8,
        startTime: '16:10',
        endTime: '16:50',
      },
      {
        section: 9,
        startTime: '17:00',
        endTime: '17:40',
      },
      {
        section: 10,
        startTime: '19:00',
        endTime: '19:40',
      },
      {
        section: 11,
        startTime: '19:50',
        endTime: '20:30',
      },
      {
        section: 12,
        startTime: '20:40',
        endTime: '21:20',
      },
    ],
  }

}