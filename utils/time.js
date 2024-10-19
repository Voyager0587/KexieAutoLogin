/**
 * 获取上海时区 (UTC+8) 当前时间，格式为 YYYY-MM-DD HH:mm
 * @returns {string} 格式化后的时间（上海时区）
 */
function getCurrentTime() {
    const now = new Date();
    
    // 使用 Intl.DateTimeFormat 设置时区为上海 (Asia/Shanghai)
    const options = {
        timeZone: 'Asia/Shanghai',
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        hour12: false,  // 24小时制
    };
    
    // 格式化时间为 YYYY-MM-DD HH:mm
    const formatter = new Intl.DateTimeFormat('zh-CN', options);
    const parts = formatter.formatToParts(now);

    const year = parts.find(part => part.type === 'year').value;
    const month = parts.find(part => part.type === 'month').value;
    const day = parts.find(part => part.type === 'day').value;
    const hour = parts.find(part => part.type === 'hour').value;
    const minute = parts.find(part => part.type === 'minute').value;
    
    return `${year}-${month}-${day} ${hour}:${minute}`;
}

module.exports = {
    getCurrentTime
};
