<template>
  <div style="display: flex; flex-wrap: wrap; gap: 16px; margin-inline: auto;">
    <div v-for="(image, index) in images" :key="index">
      <ImageComponent :image="image" @click="() => showModal(image.alt)"/>
    </div>
  </div>
  <div :style="(ismodal? 'display: flex;' : 'display: none;') + ' background: #111b; position: fixed; top: 0; left: 0; right: 0; bottom: 0; justify-content: center; align-items: center; backdrop-filter: blur(10px);'" @click="hideModal">
    <img :src="modal" style="max-height: 90%;"/>
  </div>
</template>

<script setup>
import ImageComponent from './components/image-component.vue';
import axios from 'axios';

const images = ref([]);
const modal = ref("");
const ismodal = ref(false)

async function fetchImageList () {
    const res = await axios.get('/api/images');
    
    const list = res.data.map((d) => ({
        src: '/api/images/' + d.pathname + "?preview",
        alt: d.pathname
    }))
    
    images.value = list;
}

function showModal (pathname) {
  console.log("pathname", pathname)
  modal.value = '/api/images/' + pathname
  ismodal.value = true;
}
function hideModal () {
  ismodal.value = false;
}

fetchImageList();
</script>