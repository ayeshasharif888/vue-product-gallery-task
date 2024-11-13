// router/index.js
import { createRouter, createWebHistory } from 'vue-router';
import Gallery from '../components/Gallery.vue';
import GalleryDetail from '../components/GaleryDetail.vue';

const routes = [
  { path: '/', component: Gallery },
  { 
    path: '/gallery-detail', 
    component: GalleryDetail, 
    name: 'gallery-detail', 
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
