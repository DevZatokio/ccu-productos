import AsyncStorage from '@react-native-async-storage/async-storage';
/**
 * Storage App
 * @returns {Object}
 */
export default {
  /**
   * User
   */
  async getUser() {
    try {
      const jsonValue = await AsyncStorage.getItem('user');
      return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch (e) {
      console.log(e);
      // error reading value
    }
  },
  async setUser(value: object) {
    try {
      const jsonValue = JSON.stringify(value);
      await AsyncStorage.setItem('user', jsonValue);
    } catch (e) {
      console.log(e);
      // saving error
    }
  },
  async removeUser() {
    try {
      await AsyncStorage.removeItem('user');
    } catch (error) {
      // error
    }
  },
  /**
   * clear localStorage
   */
  async removeIssue() {
    try {
      await AsyncStorage.removeItem('root:issue');
    } catch (error) {
      // error
    }
  },
  async singOut() {
    try {
      this.clear();
    } catch (error) {
      //error
    }
  },
  async clear() {
    try {
      await AsyncStorage.clear();
    } catch (error) {
      // error
    }
  },
};


