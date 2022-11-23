import apiClient from "../helper/apiClient";

class UsersService {
    getWalletsList = () => apiClient().get('kms/wallet');
}

export default new UsersService();