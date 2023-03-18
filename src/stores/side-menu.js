import { defineStore } from 'pinia'

export const useSideMenuStore = defineStore('sideMenu', {
    state: () => ({
        menu: [
            {
                icon: 'GiftIcon',
                pageName: 'parking-management',
                title: 'Quản lý bãi đỗ xe',
                subMenu: [
                    {
                        icon: 'LayersIcon',
                        pageName: 'list-parking',

                        title: 'Danh sách bãi đỗ xe'
                    },
                    {
                        icon: 'FileTextIcon',
                        pageName: 'create-parking',
                        title: 'Tạo bãi đỗ xe'
                    }
                ]
            },
            {
                icon: 'GiftIcon',
                pageName: 'parking-slot',
                title: 'Quản lý chổ để xe',
                subMenu: [
                    {
                        icon: 'LayersIcon',
                        pageName: 'list-parkingslot',

                        title: 'Danh sách chổ để xe'
                    },
                    {
                        icon: 'FileTextIcon',
                        pageName: 'create-parkingslot',
                        title: 'Tạo chổ để xe'
                    }
                ]
            }
        ]
    })
})
