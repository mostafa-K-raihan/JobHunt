import { useEffect, useReducer } from 'react';
import axios from 'axios';

const BASE_URL = 'https://cors-anywhere.herokuapp.com/https://jobs.github.com/positions.json';

const ACTION_TYPE = {
	MAKE_REQUEST: 'make-request',
	GET_DATA: 'get-data',
	ERROR: 'error',
	UPDATE_HAS_NEXT_PAGE: 'update-has-next-page',
}

const reducer = (state, action) => {
	switch (action.type) {
		case ACTION_TYPE.MAKE_REQUEST:
			return { loading: true, jobs: [] };
		case ACTION_TYPE.GET_DATA:
			return { ...state, loading: false, jobs: action.payload.jobs };
		case ACTION_TYPE.ERROR:
			return { ...state, loading: false, errors: action.payload.errors };
		case ACTION_TYPE.UPDATE_HAS_NEXT_PAGE:
			return { ...state, loading: false, hasNextPage: action.payload.hasNextPage };
		default:
			return state;
	}
}
export default function useFetchJobs(params, page) {
	const [state, dispatch] = useReducer(reducer, { jobs: [], loading: true, hasNextPage: true });

	useEffect(() => {
		const cancelToken1 = axios.CancelToken.source();

		dispatch({ type: ACTION_TYPE.MAKE_REQUEST });
		
		axios.get(BASE_URL, {
			cancelToken: cancelToken1.token,
			params: { markdown: true, page, ...params }
		}).then(res => {
			dispatch({ type: ACTION_TYPE.GET_DATA, payload: { jobs: res.data } });
		}).catch(err => {
			if (axios.isCancel(err)) return;
			dispatch({ type: ACTION_TYPE.ERROR, payload: { errors: err } });
		});

		const cancelToken2 = axios.CancelToken.source();
		axios.get(BASE_URL, {
			cancelToken: cancelToken2.token,
			params: { markdown: true, page: page + 1, ...params }
		}).then(res => {
			dispatch({ type: ACTION_TYPE.UPDATE_HAS_NEXT_PAGE, payload: { hasNextPage: !!res.data.length } });
		}).catch(err => {
			if (axios.isCancel(err)) return;
			dispatch({ type: ACTION_TYPE.ERROR, payload: { errors: err } });
		});

		

		return () => {
			cancelToken1 && cancelToken1.cancel();
			cancelToken2 && cancelToken2.cancel();
		}
	
	}, [params, page]);
	
	return state;
}