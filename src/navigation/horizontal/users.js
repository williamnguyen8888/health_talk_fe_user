// ** Icons Import
import {
    Box,
    Mail,
    User,
    Circle,
    Shield,
    Calendar,
    FileText,
    CheckSquare,
    ShoppingCart,
    MessageSquare
} from 'react-feather'

export default [
    {
        id: 'users',
        title: 'Users',
        icon: <User />,
        children: [
            {
                id: 'roles-permissions',
                title: 'Roles & Permissions',
                icon: <Shield size={20} />,
                children: [
                    {
                        id: 'roles',
                        title: 'Roles',
                        icon: <Circle size={12} />,
                        navLink: '/apps/roles'
                    },
                    {
                        id: 'permissions',
                        title: 'Permissions',
                        icon: <Circle size={12} />,
                        navLink: '/apps/permissions'
                    }
                ]
            },
            {
                id: 'users',
                title: 'User',
                icon: <User />,
                children: [
                    {
                        id: 'list',
                        title: 'List',
                        icon: <Circle />,
                        navLink: '/apps/user/list'
                    },
                    {
                        id: 'view',
                        title: 'View',
                        icon: <Circle />,
                        navLink: '/apps/user/view'
                    }
                ]
            }
        ]
    }
]
