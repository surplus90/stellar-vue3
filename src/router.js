import { createWebHistory, createRouter } from 'vue-router';

const routes = [
    {
        path: '/',
        name: 'HelloWorld',
        component: () => import('@/components/HelloWorld')
    },
    {
        path: '/cards/:cardsAmount/:selectedAmount',
        name: 'Card',
        component: () => import('@/views/Card')
    }
]

export const router = createRouter({
    history: createWebHistory(),
    routes
})