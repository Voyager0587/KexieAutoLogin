const readline = require('readline');
const signIn = require('./api/signIn');
const signOut = require('./api/signOut');
const { getCurrentTime } = require('./utils/time');
const { delay } = require('./utils/delay');

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

// 创建命令行接口，让用户输入学号
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

// 主程序入口
rl.question('请输入学号: ', async (studentId) => {
    await startAutoSignInOut(studentId);
    rl.close();
});
