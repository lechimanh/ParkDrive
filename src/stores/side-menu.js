import { defineStore } from 'pinia'

export const useSideMenuStore = defineStore('sideMenu', {
    state: () => ({
        menu: [
            {
                icon: 'GiftIcon',
                pageName: 'side-menu-dashboard',
                title: 'Khen thưởng',
                id: 1,
                subMenu: [
                    {
                        icon: 'LayersIcon',
                        title: 'Danh sách được đề cử',
                        id: 2,
                        subMenu: [
                            {
                                icon: 'UserCheckIcon',
                                pageName: 'side-menu-remunerative',
                                title: 'Khen thưởng cá nhân',
                                id: 3
                            },
                            {
                                icon: 'GlobeIcon',
                                pageName: 'remunerative-list-organization',
                                title: 'Khen thưởng bộ phận',
                                id: 4
                            }
                        ]
                    },
                    {
                        icon: 'FileTextIcon',
                        pageName: 'remunerative-history',
                        title: 'Lịch sử khen thưởng',
                        id: 5
                    },
                    {
                        icon: 'FilePlusIcon',
                        pageName: 'remunerative-create',
                        title: 'Tạo khen thưởng',
                        id: 6
                    },
                    {
                        icon: 'UsersIcon',
                        pageName: 'remunerative-group-review',
                        title: 'Nhóm xét duyệt',
                        id: 7
                    },
                    {
                        icon: 'BookOpenIcon',
                        pageName: 'remunerative-list-nominated',
                        title: 'Danh sách tiến cử',
                        id: 8
                    }
                ]
            },
            {
                icon: 'UsersIcon',
                pageName: 'side-menu-dashboard',
                title: 'Quản lý user',
                id: 0,
                subMenu: [
                    {
                        icon: 'LayersIcon',
                        title: 'Phân quyền',
                        id: 0,
                        subMenu: [
                            {
                                icon: 'UsersIcon',
                                pageName: 'list-decentralization',
                                title: 'Danh sách phân quyền',
                                id: 0
                            },
                            {
                                icon: 'FilePlusIcon',
                                pageName: 'create-decentralization',
                                title: 'Tạo phân quyền',
                                id: 0
                            }
                        ]
                    },
                    {
                        icon: 'UsersIcon',
                        pageName: 'list-user',
                        title: 'Danh sách user',
                        id: 0
                    },
                    {
                        icon: 'FilePlusIcon',
                        pageName: 'create-user',
                        title: 'Tạo user',
                        id: 0
                    }
                ]
            },
            {
                icon: 'TwitchIcon',
                pageName: 'side-menu-dashboard',
                title: 'Thông tin điểm danh',
                id: 0,
                subMenu: [
                    {
                        icon: 'CheckCircleIcon',
                        pageName: 'list-checkin-employee',
                        title: 'Danh sách điểm danh',
                        id: 0
                    },
                    {
                        icon: 'EditIcon',
                        pageName: 'checkin-user',
                        title: 'Danh sách checkin',
                        id: 0
                    },
                    {
                        icon: 'UserPlusIcon',
                        pageName: 'create-employee',
                        title: 'Tạo nhân viên',
                        id: 0
                    }
                ]
            },
            {
                icon: 'FolderIcon',
                pageName: 'side-menu-dashboard',
                title: 'Quản lý file',
                id: 0,
                subMenu: [
                    {
                        icon: 'LayersIcon',
                        pageName: 'list-folder',
                        title: 'Danh mục',
                        id: 0,
                        subMenu: [
                            {
                                icon: 'FolderIcon',
                                pageName: 'list-folder',
                                title: 'Danh sách danh mục',
                                id: 0
                            },
                            {
                                icon: 'FolderPlusIcon',
                                pageName: 'create-folder',
                                title: 'Tạo danh mục',
                                id: 0
                            }
                        ]
                    },
                    {
                        icon: 'FileTextIcon',
                        pageName: 'list-file',
                        title: 'Danh sách file',
                        id: 0
                    },
                    {
                        icon: 'FilePlusIcon',
                        pageName: 'create-file',
                        title: 'Tạo file',
                        id: 0
                    }
                ]
            }
        ]
    })
})
