const readline = require('readline');
const signIn = require('./api/signIn');
const signOut = require('./api/signOut');
const startScheduler = require('./utils/scheduler');

// 创建命令行接口，让用户输入学号
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

// 主程序
rl.question('请输入学号: ', async (studentId) => {
    const signedIn = await signIn(studentId);

    if (signedIn) {
        console.log('开始定时签退任务...');
        startScheduler(async () => {
            return await signOut(studentId);
        });
    } else {
        console.log('签到失败，无法启动签退任务');
    }

    rl.close();
});
