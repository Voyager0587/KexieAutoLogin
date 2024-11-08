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



/**
 * 获取当前周的开始日期和结束日期
 * @returns {Object} 包含本周开始日期和结束日期的对象
 */
function getCurrentWeekRange() {
    const today = new Date();
    const firstDayOfWeek = today.getDate() - today.getDay() + 1; // 周一
    const lastDayOfWeek = firstDayOfWeek + 6; // 周日

    const startOfWeek = new Date(today);
    startOfWeek.setDate(firstDayOfWeek);
    const endOfWeek = new Date(today);
    endOfWeek.setDate(lastDayOfWeek);

    return {
        start: formatDate(startOfWeek),
        end: formatDate(endOfWeek)
    };
}

/**
 * 获取上一周的开始日期和结束日期
 * @returns {Object} 包含上一周开始日期和结束日期的对象
 */
function getLastWeekRange() {
    const today = new Date();
    const firstDayOfLastWeek = today.getDate() - today.getDay() - 6; // 上一周周一
    const lastDayOfLastWeek = firstDayOfLastWeek + 6; // 上一周周日

    const startOfLastWeek = new Date(today);
    startOfLastWeek.setDate(firstDayOfLastWeek);
    const endOfLastWeek = new Date(today);
    endOfLastWeek.setDate(lastDayOfLastWeek);

    return {
        start: formatDate(startOfLastWeek),
        end: formatDate(endOfLastWeek)
    };
}


/**
 * 格式化日期为 YYYY-MM-DD 格式
 * @param {Date} date - 日期对象
 * @returns {string} 格式化后的日期字符串
 */
function formatDate(date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
}

module.exports = {
    getCurrentWeekRange,
    getLastWeekRange,
    getCurrentTime
};
