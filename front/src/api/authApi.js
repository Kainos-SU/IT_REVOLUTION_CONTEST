import api from "./apiInstance";

export default {
  /**
   * Try to login user
   * @param {{email: string, password: string}} data
   * @returns {Promise<{status: number, data: {_id: string, token: string, admin: boolean}}>}
   */
  login(data) {
    return api.post("/api/auth/login", data);
  },

  /**
   * Try to register user
   * @param {{email: string, password: string, name: string}} data
   * @returns {Promise}
   */
  register(data) {
    return api.post("/api/auth/register", data);
  },

  /**
   * Logout user from service
   * @param {{ _id: string, token: string }} data
   * @return {Promise}
   */
  logout(data) {
    return api.post("/api/auth/logout", data);
  },
};
