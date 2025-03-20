<template>
    <div>
        <img :src="image.src" :alt="image.alt" style="height: auto; width: 300px; cursor: pointer"/>
    </div>
</template>

<script setup>
import { defineProps } from 'vue';
    const props = defineProps({
        image: {
            src: String,
            alt: String,
            required: true
        }
    })
</script>