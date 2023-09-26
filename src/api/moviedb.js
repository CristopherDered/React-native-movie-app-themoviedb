import axios from "axios";
import { apiKey } from '../constants';

//endpoints
const apiBaseUrl = 'https://api.themoviedb.org/3'
const trendingMoviesEndpoint = `${apiBaseUrl}/trending/movie/day?api_key${apiKey}`
const upcomingMoviesEndpoint = `${apiBaseUrl}/movie/upcoming?api_key${apiKey}`
const topRatedMoviesEndpoint = `${apiBaseUrl}/movie/top_rated?api_key${apiKey}`

//Dynamic endpoints
const detailsMovieEndpoint = id => `${apiBaseUrl}/movie/${id}?api_key=${apiKey}`
const creditsMoviesEndpoint = id => `${apiBaseUrl}/movie/${id}/credits?api_key=${apiKey}`
const similarMoviesEndpoint = id => `${apiBaseUrl}/movie/${id}/similar?api_key=${apiKey}`
const detailsPersonEndpoint = id => `${apiBaseUrl}/person/${id}?api_key=${apiKey}`
const creditsMoviesPersonEndpoint = id => `${apiBaseUrl}/person/${id}/movie_credits?api_key=${apiKey}`
const searchMoviesEndpoint = id => `${apiBaseUrl}/search/movie?query=${id}&api_key=${apiKey}`




const apiCall = async (endpoint, params) => {
    const options = {
        method: 'GET',
        url: endpoint,
        headers: {
            accept: 'application/json',
            Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjZWNiMTQ4NWFjZjRiNWI0YzVmOTUyYzM2YTViMmJkYSIsInN1YiI6IjY0YzRhMDBhN2Q1ZjRiMDEwMTQ1YjY5OCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.gLMJ8D3tuebLP-qBbOF5c7r3D5l7Ql6Uutztwdhe9vE'
        },
        params: params ? params : {}
    }

    try {
        const response = await axios.request(options)
        return response.data
    } catch (error) {
        console.log(`error: ${error}`)
    }
}


export const image500 = path => path? `https://image.tmdb.org/t/p/w500${path}` : null
export const image342 = path => path? `https://image.tmdb.org/t/p/w342${path}` : null
export const image185 = path => path? `https://image.tmdb.org/t/p/w185${path}` : null

export const fetchTrendingMovies = () => {
    return apiCall(trendingMoviesEndpoint);
}

export const fetchUpcomingMovies = () => {
    return apiCall(upcomingMoviesEndpoint);
}

export const fetchTopRatedMovies = () => {
    return apiCall(topRatedMoviesEndpoint);
}

export const fetchDetailsMovie = (id) => {
    return apiCall(detailsMovieEndpoint(id));
}

export const fetchCreditsMovies = (id) => {
    return apiCall(creditsMoviesEndpoint(id));
}

export const fetchSimilarMovies = (id) => {
    return apiCall(similarMoviesEndpoint(id));
}

export const fetchDetailsPerson = (id) => {
    return apiCall(detailsPersonEndpoint(id));
}

export const fetchCreditsMoviesPerson = (id) => {
    return apiCall(creditsMoviesPersonEndpoint(id));
}

export const fetchSearchMovies = (id) => {
    return apiCall(searchMoviesEndpoint(id));
}

