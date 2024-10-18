const axios = require('axios');

// 基础 URL
const BASE_URL = 'https://at.kexie.space'; // 将此替换为真实的服务器地址

/**
 * 用户签退请求
 * @param {string} studentId - 学号
 * @returns {Promise<Object>} 返回签退结果，包含累计时间
 */
async function signOut(studentId) {
    try {
        const response = await axios.post(`${BASE_URL}/api/user/signOut`, {
            userId: studentId
        });

        if (response.data.code === 0) {
            console.log('签退成功:', response.data.msg);
            return {
                success: true,
                accumulatedTime: response.data.data.accumulatedTime // 返回签退时的累计时长
            };
        } else if (response.data.code === -202) {
            console.error('签退失败: 没有签到过', response.data.msg);
            return { success: false };
        } else {
            console.error('签退失败:', response.data.msg);
            return { success: false };
        }
    } catch (error) {
        console.error('签退请求出错:', error);
        return { success: false };
    }
}

module.exports = signOut;