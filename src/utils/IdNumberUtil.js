import moment from 'moment'
export default {
  /**
   *
   * 根据身份证号份编号 获取生日 默认格式 yyyy-MM-dd
   * @author hsc
   * @date 2018-11-12
   * @param {*} idNumber
   */
  getBirthByIdNumber (idNumber, format = 'YYYY-MM-DD') {
    return moment(idNumber.substring(6, 14)).format(format)
  },
  /**
   *
   * 根据身份证号获取 出生年份
   * @author hsc
   * @date 2018-11-12
   * @param {*} idNumber
   */
  getYearByIdNumber (idNumber) {
    return idNumber.substring(6, 10)
  },
  /**
   *
   * 根据身份证获取出生月份
   * @author hsc
   * @date 2018-11-12
   * @param {*} idNumber
   */
  getMonthByIdNumber (idNumber) {
    return idNumber.substring(10, 12)
  },

  /**
   *
   * 根据身份证编号获取 距离当前时间 的月数
   * @author hsc
   * @date 2018-11-12
   * @param {*} idNumber
   * @returns
   */
  getMonthsAgeByIdNumber (idNumber) {
    return moment().diff(this.getBirthByIdNumber(idNumber), 'months')
  },

  /**
   *
   *根据身份编号获取号 获取年龄
   * @author hsc
   * @date 2018-11-12
   * @param {*} idNumber
   */
  getAgeByIdNumber (idNumber) {
    return moment().diff(this.getBirthByIdNumber(idNumber), 'years')
  },
  /**
   *
   *根据身份编号获取生日天
   * @author hsc
   * @date 2018-11-12
   * @param {*} idNumber
   */
  getDayByIdNumber (idNumber) {
    return idNumber.substring(12, 14)
  },
  /**
   *
   * 根据身份证获取性别
   * @author hsc
   * @date 2018-11-12
   * @param {*} idNumber
   */
  getGenderByIdNumber (idNumber) {
    let sGender = '0' // 未知
    if (this.checkIdNumber(idNumber)) {
      const sCardNum = idNumber.substring(16, 17)
      if (parseInt(sCardNum) % 2 !== 0) {
        sGender = '1' // 男
      } else {
        sGender = '2' // 女
      }
    }
    return sGender
  },

  /**
   *
   * 检查是否是正确的身份证格式
   * @author hsc
   * @date 2018-11-12
   * @param {*} idNumber
   */
  checkIdNumber (idNumber) {
    var reg = /^[1-9]{1}[0-9]{14}$|^[1-9]{1}[0-9]{16}([0-9]|[xX])$/
    return reg.test(idNumber)
  }
}
