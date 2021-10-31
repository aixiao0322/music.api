import request from '@/utils/request';

// 热搜
export const hotSearch = () => request({
    url: '/search/hot',
})

// 搜索结果
export const searchResultList = params => request({
    url: '/cloudsearch',
    params
})