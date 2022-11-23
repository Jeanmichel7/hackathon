import ProductsService from '../../services/products.service'

let initialStates = {
	isLoading: false,
	products: null,
	errorMessage: null,
}

let actionTypes = {
	PRODUCTS_LOAD_START: 'PRODUCTS_LOAD_START',
	PRODUCTS_LOAD_SUCESS: 'PRODUCTS_LOAD_SUCESS',
	PRODUCTS_LOAD_ERROR: 'PRODUCTS_LOAD_ERROR'
}

const productsLoadStart = () => ({
	type: actionTypes.PRODUCTS_LOAD_START
});

const productsLoadSuccess = (products) => ({
	type: actionTypes.PRODUCTS_LOAD_SUCESS,
	payload: products
});

const productsLoadError = (errorMessage) => ({
	type: actionTypes.PRODUCTS_LOAD_ERROR,
	payload: errorMessage
});

export const productsReducer = (state = initialStates, { type, payload }) => {
	switch (type) {
		case actionTypes.PRODUCTS_LOAD_START:
			return {
				...state,
				isLoading: true,
				products: null,
				errorMessage: null,
			};

		case actionTypes.PRODUCTS_LOAD_SUCESS:
			return {
				...state,
				isLoading: false,
				products: payload,
			};

		case actionTypes.PRODUCTS_LOAD_ERROR:
			return {
				...state,
				isLoading: true,
				errorMessage: payload,
			};

		default:
			return state
	}
};

export const loadProductsAsync = () => async (dispatch) => {
	dispatch(productsLoadStart());

	const response = await ProductsService.getScList()
	.catch((error) => { dispatch(productsLoadError(error.meesage)) });
	dispatch(productsLoadSuccess(response.data));
}

export default {
	loadProductsAsync,
	productsReducer,
};