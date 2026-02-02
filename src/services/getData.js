import api from "./api";


export async function getMovies() {
    const {
        data: { results }
    } = await api.get('/movie/popular')

    return results
}

export async function getTopMovies() {
    const {
        data: { results }
    } = await api.get('/movie/top_rated')


    return results
}

export async function getTopSeries() {
    const {
        data: { results }
    } = await api.get('/tv/top_rated')


    return results
}

export async function getPopularSeries() {
    const {
        data: { results }
    } = await api.get('/tv/popular')


    return results
}

export async function getPersonPopular() {
    const {
        data: { results }
    } = await api.get('/person/popular')


    return results
}
export async function getMovieVideos(movieId) {
    const {
        data: { results }
    } = await api.get(`/movie/${movieId}/videos`)

    return results
}

export async function getMovieCredits(movieId) {
    const { data } = await api.get(`/movie/${movieId}/credits`)

    return data
}

export async function getMovieSimilar(movieId) {
    const {
        data: { results }
    } = await api.get(`/movie/${movieId}/similar`)

    return results
}

export async function getMovieById(movieId) {
    const { data } = await api.get(`/movie/${movieId}`)

    return data
}

export async function getDiscoverMovies() {
    const {
        data: { results }
    } = await api.get('/discover/movie');

    return results;
}


export async function getMovieGenres() {
    const {
        data: { genres }
    } = await api.get('/genre/movie/list', {
        params: {
            language: 'pt-BR'
        }
    });

    return genres;
}

// Filmes por gênero
export async function getMoviesByGenre(genreId) {
    const {
        data: { results }
    } = await api.get('/discover/movie', {
        params: {
            with_genres: genreId,
            sort_by: 'popularity.desc',
            language: 'pt-BR'
        }
    });

    return results;
}




export async function getTvVideos(tvId) {
    try {
        const { data: { results } } = await api.get(`/tv/${tvId}/videos`, {
            params: {
                language: 'pt-BR'
            }
        });

        return results || [];
    } catch (error) {
        console.warn("Sem vídeos para a série:", tvId);
        return [];
    }
}


export async function getTvGenres() {
    const {
        data: { genres }
    } = await api.get('/genre/tv/list', {
        params: {
            language: 'pt-BR'
        }
    });

    return genres;
}


export async function getTvByGenre(genreId) {
    const {
        data: { results }
    } = await api.get('/discover/tv', {
        params: {
            with_genres: genreId,
            sort_by: 'popularity.desc',
            language: 'pt-BR'
        }
    });

    return results;
}

export async function getTvById(tvId) {
    const { data } = await api.get(`/tv/${tvId}`, {
        params: { language: "pt-BR" }
    })
    return data
}


export async function getTvCredits(tvId) {
    const { data } = await api.get(`/tv/${tvId}/credits`, {
        params: { language: "pt-BR" }
    })
    return data
}


export async function getTvSimilar(tvId) {
    const { data: { results } } = await api.get(`/tv/${tvId}/similar`, {
        params: { language: "pt-BR" }
    })
    return results || []
}




