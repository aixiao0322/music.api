// 首页  搜索  
import { recommendMusic, newMusic, } from './Home'



// 搜索
import { hotSearch, searchResultList } from './Search'

// 播放音乐
import { getSongById, getLyricById } from './Play'


// 导出
export const recommendMusicAPI = recommendMusic
export const newMusicAPI = newMusic
    // 
    // export const hotMusicAPI = hotMusic
export const hotSearchAPI = hotSearch //搜索关键词
export const searchResultListAPI = searchResultList // 搜索结果


export const getSongByIdAPI = getSongById
export const getLyricByIdAPI = getLyricById