import api from "./apiInstance";

export default {
  /**
   * Get base information about trees in current view
   * @param {{topRightLat: number, topRightLng: number, bottomLeftLat: number, bottomLeftLng: number}} data
   * @return {Promise<{status: number, data: Array<{coordinatesX: number, coordinatesY: number, crownRadius: number, _id: string}>}>}
   */
  getTreesFromView({ topRightLat, topRightLng, bottomLeftLat, bottomLeftLng }) {
    return api.get("/api/tree/location", {
      params: {
        ltx: topRightLat,
        lty: bottomLeftLng,
        rbx: bottomLeftLat,
        rby: topRightLng,
      },
    });
  },

  /**
   * Get detailed info about tree
   * @param {string} id
   */
  getTreeInfo(id) {
    return api.get(`/api/tree/${id}`);
  },

  /**
   * Create new tree
   * coordinates field is both coordinates separated by coma
   * @param {{treeType: string, imgSrc: binary, coordinates: string, age: string, crownRadius: string, leafShape: string, state: string, addres: string}} data
   */
  addTree(data) {
    return api.post("/api/tree/", data);
  },

  /**
   * Change tree data
   * coordinates field is both coordinates separated by coma
   * @param {{id: string, form: {treeType: string, imgSrc: binary, coordinates: string, age: string, crownRadius: string, leafShape: string, state: string, addres: string}}} data
   */
  updateTree(data) {
    return api.patch(`/api/tree/${data.id}`, data.form);
  },

  /**
   * Delete tree from database if admin
   * @param {string} id 
   */
  deleteTree(id) {
    return api.delete(`/api/tree/${id}`);
  }
};
