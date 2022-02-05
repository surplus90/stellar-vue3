import { createWebHistory, createRouter } from 'vue-router';

const routes = [
    {
        path: '/',
        name: 'Home',
        component: () => import('@/views/Home')
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