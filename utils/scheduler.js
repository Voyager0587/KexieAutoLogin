/**
 * 定时器，用于每隔一定时间执行签退操作
 * @param {function} callback - 需要执行的签退函数
 * @param {number} interval - 间隔时间（毫秒），默认15分钟
 */
function startScheduler(callback, interval = 15 * 60 * 1000) {
    console.log(`定时签退任务启动，每${interval / 1000 / 60}分钟执行一次`);

    const intervalId = setInterval(async () => {
        const result = await callback();
        if (!result) {
            clearInterval(intervalId);
            console.log('签退失败，终止定时任务');
        }
    }, interval);
}

module.exports = startScheduler;
