const axios = require('axios');

// 基础 URL，例如你的服务器地址
const BASE_URL = 'https://at.kexie.space'; // 将此替换为真实的服务器地址

/**
 * 用户签到请求
 * @param {string} studentId - 学号
 * @returns {Promise<boolean>} 返回签到是否成功
 */
async function signIn(studentId) {
    try {
        const response = await axios.post(`${BASE_URL}/api/user/signIn`, {
            userId: studentId
        });

        if (response.data.code === 0) {
            console.log('签到成功:', response.data.msg);
            return true;
        } else if (response.data.code === -201) {
            console.log('不许重复签到:', response.data.msg);
            return true;  // 如果重复签到，表示已经签到了，返回true
        } else {
            console.error('签到失败:', response.data.msg);
            return false;
        }
    } catch (error) {
        console.error('签到请求出错:', error);
        return false;
    }
}

module.exports = signIn;
