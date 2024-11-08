const { getSignInDuration } = require('../api/signInRecord');
const { getCurrentWeekRange,getLastWeekRange } = require('./time');

// 默认的用户ID列表
const defaultUserIds = ['2400310430', '2400320229', '2400360108','2400360132','2400310709'];
// 获取本周和上一周的日期范围
const currentWeek = getCurrentWeekRange();
const lastWeek = getLastWeekRange();
async function getUsersSignInDurations() {
    for (const userId of defaultUserIds) {
        try {
            const result = await getSignInDuration(userId,{ currentWeek, lastWeek });
            console.log(`用户 ${userId} ${result.userName} 本周签到总时长: ${result.currentWeekTotal} 小时`);
            console.log(`用户 ${userId} ${result.userName} 上一周签到总时长: ${result.lastWeekTotal} 小时`);
        } catch (error) {
            console.error(`获取用户 ${userId} 时长时发生错误:`, error);
        }
    }
}

module.exports = { getUsersSignInDurations };
