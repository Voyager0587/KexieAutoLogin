const axios = require('axios');

// 基础 URL，例如你的服务器地址
const BASE_URL = 'https://at.kexie.space'; // 将此替换为真实的服务器地址

/**
 * 用户签退请求
 * @param {string} studentId - 学号
 * @returns {Promise<boolean>} 返回是否签退成功
 */
async function signOut(studentId) {
    try {
        const response = await axios.post(`${BASE_URL}/api/user/signOut`, {
            userId: studentId
        });

        if (response.data.code === 0) {
            console.log('签退成功:', response.data.msg);
            return true;
        } else if (response.data.code === -202) {
            console.error('签退失败: 没有签到过', response.data.msg);
            return false; // 未签到，签退失败
        } else {
            console.error('签退失败:', response.data.msg);
            return false;
        }
    } catch (error) {
        console.error('签退请求出错:', error);
        return false;
    }
}

module.exports = signOut;
