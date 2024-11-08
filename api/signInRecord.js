// signInRecord.js
const axios = require('axios');
const BASE_URL = 'https://at.kexie.space';  // 设置基本URL

/**
 * 获取某个人本周和上一周的签到总时长
 * @param {string} userId - 用户学号
 * @param {Object} weekRanges - 本周和上一周的日期范围
 * @returns {Promise<Object>} 返回本周和上一周的签到时长总和
 */
async function getSignInDuration(userId, weekRanges) {
    try {
        // 请求接口获取签到记录
        const response = await axios.get(`${BASE_URL}/api/record/${userId}`);
        const records = response.data.data;

        let currentWeekTotal = 0; // 本周签到总时长
        let lastWeekTotal = 0;    // 上一周签到总时长
        let userName=''; // 用户名

        // 遍历所有记录
        records.forEach(record => {
            // 只统计状态为“已签退”的记录
            if (record.status === '已签退') {
                const signOutDate = record.end.split(' ')[0]; // 获取签到签退的日期（yyyy-mm-dd）
                const accumulatedTime = parseFloat(record.accumulatedTime);
                
                // 判断该记录是否在本周范围内
                if (signOutDate >= weekRanges.currentWeek.start && signOutDate <= weekRanges.currentWeek.end) {
                    currentWeekTotal += accumulatedTime;
                }
                // 判断该记录是否在上一周范围内
                else if (signOutDate >= weekRanges.lastWeek.start && signOutDate <= weekRanges.lastWeek.end) {
                    lastWeekTotal += accumulatedTime;
                }
            }
            userName=record.userName;
        });
        // 保留两位小数
        currentWeekTotal=currentWeekTotal.toFixed(2)
        lastWeekTotal=lastWeekTotal.toFixed(2)
        return {
            currentWeekTotal,
            lastWeekTotal,
            userName
        };
    } catch (error) {
        console.error('获取签到记录失败:', error);
        return { currentWeekTotal: 0, lastWeekTotal: 0 };
    }
}

module.exports = {
    getSignInDuration
};
