export const GET_NEWS_FEED = 'GET_NEWS_FEED';
export const RESET_SEARCH_RESULTS = 'RESET_SEARCH_RESULTS';
export const SEARCH_NEWS = 'SEARCH_NEWS';
import { apiClient } from "..";
import { NewsCategory } from "../constants";

const apiKey = "pub_32394b9f07540a8570e862f22d32595656e4d"
//news?country=vi&category=top&apikey=pub_32394b9f07540a8570e862f22d32595656e4d
//res?.data?.results

export const getNewsFeed =
    (setIsLoading: Function, category: String = NewsCategory.business) => async (dispatch: Function) => {
        try {
            setIsLoading(true);
            const res = await apiClient.get(
                `news?country=vi&category=${category}&apikey=${apiKey}`,
            );
            setIsLoading(false);
            if (res.status === 200) {
                dispatch({
                    type: GET_NEWS_FEED,
                    payload: res?.data?.results,
                });
                //console.log(res.data.results)
            } else {
                console.warn('Something went wrong');
            }
        } catch (error) {
            console.error(error);
        }
    };

export const searchNews =
    (searchTerm: string = '', setIsLoading: Function = () => { }) =>
        async (dispatch: Function) => {
            try {
                setIsLoading(true);
                const res = await apiClient.get(`news?apikey=${apiKey}&q=${searchTerm}`);
                setIsLoading(false);
                if (res.status === 200) {
                    dispatch({
                        type: SEARCH_NEWS,
                        payload: res?.data?.results,
                    });
                } else {
                    console.warn('Something went wrong');
                }
            } catch (error) {
                console.error(error);
            }
        };

export const resetSearchResults = () => (dispatch: Function) => {
    dispatch({
        type: RESET_SEARCH_RESULTS,
    });
};