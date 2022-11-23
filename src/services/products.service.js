import apiClient from "../helper/apiClient";

class ProductsService {
    getScList = () => apiClient().get('smart-contract');
}

export default new ProductsService();