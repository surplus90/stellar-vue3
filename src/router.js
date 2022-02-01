import { createWebHistory, createRouter } from 'vue-router';

const routes = [
    {
        path: '/',
        name: 'HelloWorld',
        component: () => import('@/components/HelloWorld')
    },
    {
        path: '/reservations',
        name: 'Reservations',
        component: () => import('@/views/Reservations')
    },
    {
        path: '/set/cards',
        name: 'SetCards',
        component: () => import('@/views/SetCards')
    },
    {
        path: '/cards/:idx',
        name: 'Card',
        component: () => import('@/views/Card')
    }
]

export const router = createRouter({
    history: createWebHistory(),
    routes
})