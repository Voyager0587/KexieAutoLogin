// main.js
const { getCurrentWeekRange, getLastWeekRange } = require('./timeUtils');
const { getSignInDuration } = require('./signInRecord');

// 默认的用户ID列表，可以根据需要动态增加用户
const defaultUserIds = ['2200310517', '2200310518', '2200310519']; // 默认用户学号列表
const customUserIds = [];  // 自定义用户ID列表，可以通过此列表动态添加用户

// 合并默认用户和自定义用户
const allUserIds = [...defaultUserIds, ...customUserIds];

// 获取本周和上一周的日期范围
const currentWeek = getCurrentWeekRange();
const lastWeek = getLastWeekRange();

// 获取多个用户的签到时长
async function getUsersSignInDurations() {
    for (const userId of allUserIds) {
        try {
            const result = await getSignInDuration(userId, { currentWeek, lastWeek });
            console.log(`用户 ${userId} 本周签到总时长: ${result.currentWeekTotal} 小时`);
            console.log(`用户 ${userId} 上一周签到总时长: ${result.lastWeekTotal} 小时`);
        } catch (error) {
            console.error(`获取用户 ${userId} 时长时发生错误:`, error);
        }
    }
}

// 示例：添加一个自定义用户ID
customUserIds.push('2200310520');

// 获取所有用户的签到时长
getUsersSignInDurations();
