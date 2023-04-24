import {AccountBox, Chat, Feed, Workspaces} from "@mui/icons-material"

export const userMenu = [[
    {
        title: 'Профиль',
        route: '/',
        Icon: AccountBox,
    },
    {
        title: 'Окружение',
        route: 'workspace',
        Icon: Workspaces,
    },
], [
    {
        title: 'Поддержка',
        route: 'support',
        Icon: Chat,
    },
    {
        title: 'Новости',
        route: 'updates',
        Icon: Feed,
    }
]]