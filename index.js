const readline = require('readline');
const signIn = require('./api/signIn');
const signOut = require('./api/signOut');
const { getCurrentTime } = require('./utils/time');
const { delay } = require('./utils/delay');
const { getSignInDuration } = require('./api/signInRecord'); // 获取签到时长
const { getUsersSignInDurations } = require('./utils/users'); // 获取多个用户时长
const { getCurrentWeekRange,getLastWeekRange } = require('./utils/time');

// 获取本周和上一周的日期范围
const currentWeek = getCurrentWeekRange();
const lastWeek = getLastWeekRange();

let totalSignInTime = 0; // 用于记录累计签到的时长

/**
 * 执行自动签到签退循环任务
 * @param {string} studentId - 学号
 */
async function startAutoSignInOut(studentId) {
    while (true) {
        // 签到
        const signedIn = await signIn(studentId);
        if (!signedIn) {
            console.log(`[${getCurrentTime()}] 签到失败，无法继续执行`);
            break;
        }
        console.log(`[${getCurrentTime()}] 签到成功`);

        // 等待15分钟后进行签退
        await delay(15 * 60 * 1000);

        // 签退
        const signedOut = await signOut(studentId);
        if (signedOut && signedOut.accumulatedTime) {
            // 将签退接口返回的累计时长转换为浮点数并累加
            totalSignInTime += parseFloat(signedOut.accumulatedTime);

            // 输出签退时间和累计签到时长
            console.log(`[${getCurrentTime()}] 签退成功`);
            console.log(`累计签到时长: ${totalSignInTime.toFixed(2)} 小时`);
        } else {
            console.log(`[${getCurrentTime()}] 签退失败，程序结束`);
            break;
        }

        console.log('等待再次签到...');
        // 稍微等待后重新开始签到
        await delay(2000); // 2秒后重新签到
    }
}

/**
 * 选择功能：启动签到签退、获取某个人的签到时长等
 */
async function startProgram() {
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });

    // 菜单系统
    console.log('请选择一个功能：');
    console.log('1. 自动签到签退');
    console.log('2. 获取某个人的签到时长');
    console.log('3. 获取默认用户的签到时长');
    console.log('4. 退出程序');

    rl.question('请输入对应的选项（数字1-4）: ', async (option) => {
        switch (option) {
            case '1':
                rl.question('请输入学号: ', async (studentId) => {
                    await startAutoSignInOut(studentId);
                    rl.close();
                });
                break;
            case '2':
                rl.question('请输入学号: ', async (studentId) => {
                    const result = await getSignInDuration(studentId,{ currentWeek, lastWeek });
                    console.log(`用户 ${userId} ${result.userName} 本周签到总时长: ${result.currentWeekTotal} 小时`);
                    console.log(`用户 ${userId} ${result.userName} 上一周签到总时长: ${result.lastWeekTotal} 小时`);
                    rl.close();
                });
                break;
            case '3':
                await getUsersSignInDurations(); // 获取默认用户的签到时长
                rl.close();
                break;
            case '4':
                console.log('退出程序');
                rl.close();
                break;
            default:
                console.log('无效的选项，请重新选择');
                rl.close();
                startProgram(); // 重新显示菜单
        }
    });
}

// 启动程序
startProgram();
