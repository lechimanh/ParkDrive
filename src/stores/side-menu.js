import { defineStore } from 'pinia'

export const useSideMenuStore = defineStore('sideMenu', {
    state: () => ({
        menu: [
            {
                icon: 'HomeIcon',
                pageName: 'category',
                title: 'Danh mục tin tức',
                subMenu: [
                    {
                        icon: '',
                        pageName: 'category-news-list',
                        title: 'Danh mục'
                    },
                    {
                        icon: '',
                        pageName: 'category-news-create',
                        title: 'Tạo danh mục'
                    }
                ]
            },
            {
                icon: 'HomeIcon',
                pageName: 'news',
                title: 'Tin tức',
                subMenu: [
                    {
                        icon: '',
                        pageName: 'news-list',
                        title: 'Tin tức'
                    },
                    {
                        icon: '',
                        pageName: 'news-create',
                        title: 'Tạo'
                    }
                ]
            },
            {
                icon: 'HomeIcon',
                pageName: 'lake',
                title: 'Danh sách sông hồ',
                subMenu: [
                    {
                        icon: '',
                        pageName: 'lake-list',
                        title: 'Tin tức'
                    },
                    {
                        icon: '',
                        pageName: 'lake-create',
                        title: 'Tạo'
                    }
                ]
            }
        ]
    })
})
