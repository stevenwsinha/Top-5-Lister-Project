/*
    This is our http api, which we use to send requests to
    our back-end API. Note we`re using the Axios library
    for doing this, which is an easy to use AJAX-based
    library. We could (and maybe should) use Fetch, which
    is a native (to browsers) standard, but Axios is easier
    to use when sending JSON back and forth and it`s a Promise-
    based API which helps a lot with asynchronous communication.
    
    @author McKilla Gorilla
*/

import axios from 'axios'
axios.defaults.withCredentials = true;
const api = axios.create({
    baseURL: 'http://localhost:4000/api',
})

// THESE ARE ALL THE REQUESTS WE`LL BE MAKING, ALL REQUESTS HAVE A
// REQUEST METHOD (like get) AND PATH (like /top5list). SOME ALSO
// REQUIRE AN id SO THAT THE SERVER KNOWS ON WHICH LIST TO DO ITS
// WORK, AND SOME REQUIRE DATA, WHICH WE CALL THE payload, FOR WHEN
// WE NEED TO PUT THINGS INTO THE DATABASE OR IF WE HAVE SOME
// CUSTOM FILTERS FOR QUERIES

//  SINGLE LIST CRUD OPERATIONS
export const createTop5List = (payload) => api.post(`/home/top5list/`, payload)
export const updateTop5ListById = (id, payload) => api.put(`/home/top5list/${id}`, payload)
export const deleteTop5ListById = (id) => api.delete(`/home/top5list/${id}`)
export const getTop5ListById = (id) => api.get(`/home/top5list/${id}`)

// COMMUNITY LIST SINGLE OPERATIONS
export const CreateCommunityList = (payload) => api.post(`/home/community/`, payload)
export const UpdateCommunityItems = (payload) => api.put(`/home/community/`, payload)
export const RemoveCommunityItems = (payload) => api.put(`/home/community/delete`, payload)
export const UpdateCommunity = (id, payload) => api.put(`/home/community/${id}`, payload)
export const GetCommunityList = (payload) => api.get(`/home/community/${payload}`)

//  MULTI LIST CRUD OPERATIONS
export const getLoggedInTop5Lists = () => api.get(`/home/top5lists`)
export const getTop5ListByUsername = (username) => api.get(`/home/${username}`)
export const getAllTop5Lists = () => api.get(`/home/all`)

// MULTI LIST COMMUNITY OPERATIONS
export const getAllCommunityLists = () => api.get(`/home/community/all`)

//  USER CRUD OPERATIONS
export const getLoggedIn = () => api.get(`/loggedIn/`);
export const registerUser = (payload) => api.post(`/register/`, payload)
export const loginUser = (payload) => api.post(`/login/`, payload)
export const logoutUser = () => api.get(`/logout/`)

const apis = {
    createTop5List,
    updateTop5ListById,
    deleteTop5ListById,
    getTop5ListById,

    CreateCommunityList,
    UpdateCommunityItems,
    RemoveCommunityItems,
    UpdateCommunity,
    GetCommunityList,

    getLoggedInTop5Lists,
    getTop5ListByUsername,
    getAllTop5Lists,

    getAllCommunityLists,

    getLoggedIn,
    registerUser,
    loginUser,
    logoutUser
}

export default apis
