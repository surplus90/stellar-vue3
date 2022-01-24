import { createWebHistory, createRouter } from 'vue-router';

const routes = [
    {
        path: '/',
        name: 'HelloWorld',
        component: () => import('@/components/HelloWorld')
    },
    {
        path: '/cards',
        name: 'Card',
        component: () => import('@/components/Card')
    }
]

export const router = createRouter({
    history: createWebHistory(),
    routes
})