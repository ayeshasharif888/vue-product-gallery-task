<template>
  <div class="mx-auto py-4 px-4">
    <!-- Product Image Section -->
    <div class="flex flex-col md:flex-row justify-center items-start w-full">
      <!-- Carousel Section -->
      <div class="w-full md:w-2/5 flex flex-col items-center space-y-4">
        <!-- Main Carousel Image -->
        <div ref="zoomContainer" class="relative w-full" @mousemove="zoomEnabled && moveLens($event)"
          @mouseleave="resetLens" @click="toggleZoom" :class="{ 'zoom-in': !zoomEnabled, 'zoom-out': zoomEnabled }">
          <button @click="prevImage"
            class="absolute left-2 top-1/2 transform -translate-y-1/2 text-white text-3xl p-2 bg-gray-50 bg-opacity-20 rounded-full">
            <!-- Left Arrow SVG -->
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect width="24" height="24" />
              <path d="M17 2L7 12L17 22" stroke="white" stroke-width="4" />
            </svg>
          </button>

          <img ref="mainImage" :src="getImageSrc()" alt="Product image" class="w-full h-auto rounded-lg" id="zoomImage"
            @load="onImageLoad" />

          <div class="absolute flex justify-center gap-4 left-2 bottom-2">

            <router-link :to="{ name: 'gallery-detail', query: { images: JSON.stringify(images) } }">
              <button class="text-white text-sm py-2 px-4 bg-[#2F3942] bg-opacity-50 rounded font-bold">
                VIEW ALL
              </button>
            </router-link>

            <!-- HD Button -->
            <button @click="toggleHD" class="text-white text-sm py-2 px-4 bg-[#2F3942] bg-opacity-50 rounded">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect width="24" height="24" />
                <path
                  d="M6.616 14.692H7.5V12.692H10.116V14.692H11V9.308H10.115V11.808H7.5V9.308H6.615L6.616 14.692ZM13 14.692H16.308C16.604 14.692 16.8573 14.5867 17.068 14.376C17.2787 14.1653 17.384 13.912 17.384 13.616V10.385C17.384 10.089 17.2787 9.83533 17.068 9.624C16.8573 9.41333 16.604 9.308 16.308 9.308H13V14.692ZM13.885 13.808V10.192H16.192C16.2693 10.192 16.34 10.2243 16.404 10.289C16.468 10.353 16.5 10.4233 16.5 10.5V13.5C16.5 13.5773 16.468 13.648 16.404 13.712C16.34 13.776 16.2693 13.808 16.192 13.808H13.885ZM4.615 19C4.155 19 3.771 18.846 3.463 18.538C3.155 18.23 3.00067 17.8453 3 17.384V6.616C3 6.15533 3.15433 5.771 3.463 5.463C3.77167 5.155 4.15567 5.00067 4.615 5H19.385C19.845 5 20.229 5.15433 20.537 5.463C20.845 5.77167 20.9993 6.156 21 6.616V17.385C21 17.845 20.8457 18.2293 20.537 18.538C20.2283 18.8467 19.8443 19.0007 19.385 19H4.615ZM4.615 18H19.385C19.5383 18 19.6793 17.936 19.808 17.808C19.9367 17.68 20.0007 17.5387 20 17.384V6.616C20 6.462 19.936 6.32067 19.808 6.192C19.68 6.06333 19.539 5.99933 19.385 6H4.615C4.46167 6 4.32067 6.064 4.192 6.192C4.06333 6.32 3.99933 6.46133 4 6.616V17.385C4 17.5383 4.064 17.6793 4.192 17.808C4.32 17.9367 4.461 18.0007 4.615 18Z"
                  fill="white" />
              </svg>



            </button>
            <!-- Button to download the image -->
            <button @click="downloadImage" class="text-white text-sm py-2 px-4 bg-[#2F3942] bg-opacity-50 rounded">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect width="24" height="24" />
                <path
                  d="M19.35 10.04C19.0141 8.33772 18.0976 6.80486 16.7571 5.70325C15.4165 4.60163 13.7351 3.99961 12 4C9.11 4 6.6 5.64 5.35 8.04C3.88023 8.19883 2.52101 8.89521 1.53349 9.99532C0.545971 11.0954 -0.000171702 12.5217 4.04928e-08 14C4.04928e-08 17.31 2.69 20 6 20H19C21.76 20 24 17.76 24 15C24 12.36 21.95 10.22 19.35 10.04ZM17 13L12 18L7 13H10V9H14V13H17Z"
                  fill="white" />
              </svg>

            </button>

          </div>


          <div v-if="!zoomEnabled"
            class="flex items-center absolute top-2 left-2 text-white bg-[#2F3942] px-1 py-1 gap-1 text-xs opacity-80 rounded-sm font-sans font-bold"
            title="Click Image To Zoom">
            <!-- Zoom Tooltip -->
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect width="16" height="16" fill="#1E1E1E" />
              <path
                d="M11.323 9.6535C11.8206 8.8371 12.0842 7.89961 12.085 6.9435C12.085 4.0465 9.739 1.7005 6.844 1.6995C3.949 1.6995 1.602 4.046 1.602 6.942C1.602 9.837 3.9485 12.182 6.844 12.182C7.8375 12.182 8.764 11.901 9.555 11.421L13.119 14.9845L14.8865 13.216L11.323 9.6535ZM6.844 10.1845C5.98453 10.183 5.16068 9.84094 4.55299 9.23316C3.9453 8.62537 3.60332 7.80147 3.602 6.942C3.60306 6.0824 3.94493 5.2583 4.55267 4.65038C5.1604 4.04245 5.9844 3.70032 6.844 3.699C7.70355 3.70019 8.52755 4.04221 9.1353 4.65005C9.74305 5.2579 10.0849 6.08195 10.086 6.9415C10.0844 7.80085 9.74234 8.62454 9.13469 9.23219C8.52704 9.83984 7.70334 10.1819 6.844 10.1835V10.1845ZM7.844 4.5245H5.844V5.9415H4.4265V7.9415H5.843V9.3585H7.843V7.9415H9.259V5.9415H7.842V4.526L7.844 4.5245Z"
                fill="white" />
            </svg>
            Click Image To Zoom
          </div>

          <button @click="nextImage"
            class="absolute right-2 top-1/2 transform -translate-y-1/2 text-white text-3xl p-2 bg-gray-50 bg-opacity-20 rounded-full">
            <!-- Right Arrow SVG -->
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect width="24" height="24" />
              <path d="M7 2L17 12L7 22" stroke="white" stroke-width="4" />
            </svg>
          </button>
        </div>

        <!-- Thumbnail Grid Section -->
        <div class="overflow-hidden mt-4">
          <div class="grid grid-cols-5 gap-4">
            <div v-for="(image, index) in images" :key="index"
              :class="['relative cursor-pointer overflow-hidden rounded-md', { 'border-2 p-1 border-black': index === currentImageIndex }]"
              @click="showInCarousel(index)">
              <img :src="image" alt="Product image"
                class="object-cover w-full h-full transition-transform duration-300 hover:scale-105" loading="lazy" />
            </div>
          </div>
        </div>
      </div>

      <!-- Additional Content Section -->
      <div class="w-full md:w-2/3 mt-8 md:mt-0">
        <!-- Additional content can go here -->
      </div>

      <!-- Zoom Result Area -->
      <div ref="zoomResult" class="img-zoom-result" v-show="zoomEnabled"></div>
    </div>
  </div>
</template>


<script setup>
import { ref, onMounted, onBeforeUnmount, watch } from "vue";
import { useRouter } from 'vue-router';

const images = ref([
  "../images/img1.jpg",
  "../images/img2.jpg",
  "../images/img3.jpg",
  "../images/img4.jpg",
  "../images/img5.jpg",
  "../images/img6.jpg",
  "../images/img7.jpg",
  "../images/img8.jpg",
  "../images/img9.jpg",
  "../images/img10.jpg",
  "../images/img11.jpg",
]);

const currentImageIndex = ref(0);
const zoomContainer = ref(null);
const mainImage = ref(null);
const zoomResult = ref(null);
const zoomEnabled = ref(false);
let lens = null;

const showInCarousel = (index) => {
  if (currentImageIndex.value !== index) {
    zoomEnabled.value = false;
  }
  currentImageIndex.value = index;
  updateZoomResult();
};

const prevImage = () => {
  currentImageIndex.value =
    (currentImageIndex.value - 1 + images.value.length) % images.value.length;
  updateZoomResult();
};

const nextImage = () => {
  currentImageIndex.value = (currentImageIndex.value + 1) % images.value.length;
  updateZoomResult();
};

const toggleZoom = () => {
  zoomEnabled.value = !zoomEnabled.value;
  if (zoomEnabled.value) createLens();
  else resetLens();
};

const createLens = () => {
  if (!lens) {
    lens = document.createElement("div");
    lens.classList.add("zoom-lens");
    lens.style.width = "100px"; // Explicit width for the lens
    lens.style.height = "100px"; // Explicit height for the lens
    lens.style.position = "absolute"; // Position absolute over the image
    zoomContainer.value.appendChild(lens);
  }
  updateZoomResult();
};

const moveLens = (e) => {
  if (!lens) return; // Ensure lens is created

  const img = mainImage.value;
  const result = zoomResult.value;
  const rect = img.getBoundingClientRect();
  const pos = getCursorPos(e);

  // Calculate lens position
  let x = pos.x - lens.offsetWidth / 2;
  let y = pos.y - lens.offsetHeight / 2;

  // Prevent lens from going outside the image bounds
  x = Math.max(0, Math.min(x, rect.width - lens.offsetWidth));
  y = Math.max(0, Math.min(y, rect.height - lens.offsetHeight));

  // Set lens position
  lens.style.left = `${x}px`;
  lens.style.top = `${y}px`;

  // Update zoom result to show the portion of the image under the cursor
  const zoomFactor = 2; // Adjust zoom factor as needed
  const bgPosX = -((x / rect.width) * (img.width * zoomFactor - rect.width));
  const bgPosY = -((y / rect.height) * (img.height * zoomFactor - rect.height));
  result.style.backgroundPosition = `${bgPosX}px ${bgPosY}px`;

  // Set zoom level of result
  result.style.backgroundSize = `${rect.width * zoomFactor}px ${rect.height * zoomFactor
    }px`;
};

const onImageLoad = () => {
  updateZoomResult(); // Ensure zoom result is updated after the image is fully loaded
};

const getCursorPos = (e) => {
  const a = mainImage.value.getBoundingClientRect();
  const scrollLeft = window.scrollX || document.documentElement.scrollLeft;
  const scrollTop = window.scrollY || document.documentElement.scrollTop;

  return {
    x: e.clientX - a.left + scrollLeft, // Corrected for horizontal position
    y: e.clientY - a.top + scrollTop, // Corrected for vertical position
  };
};

const resetLens = () => {
  if (lens) {
    lens.remove();
    lens = null;
  }
};

const updateZoomResult = () => {
  const img = mainImage.value;
  const result = zoomResult.value;
  result.style.backgroundImage = `url(${img.src})`;
  result.style.backgroundSize = `${img.width * 2}px ${img.height * 2}px`;
};

onMounted(() => {
  updateZoomResult();
});

onBeforeUnmount(() => {
  if (lens) {
    lens.remove();
  }
});

watch(currentImageIndex, updateZoomResult);


const downloadImage = () => {
  const imageUrl = images.value[currentImageIndex.value];
  const link = document.createElement("a");
  link.href = imageUrl;
  link.download = imageUrl.split("/").pop(); // Default filename is the image's name
  link.click();
};



const hdEnabled = ref(false); // Add this to manage HD image toggle

const toggleHD = () => {
  hdEnabled.value = !hdEnabled.value;
};

const getImageSrc = () => {
  // If HD is enabled, return the HD image URL; otherwise, return the standard image URL
  const currentImage = images.value[currentImageIndex.value];
  if (hdEnabled.value) {
    // Replace this logic with the actual URL of the HD version of the image
    return currentImage.replace("/thumbs/", "/hd/");
  }
  return currentImage;
};

</script>

<style scoped>
.img-zoom-result {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  border: 1px solid #d4d4d4;
  width: 300px;
  height: 300px;
  background-repeat: no-repeat;
  background-size: 200% 200%;
  z-index: 1000;
}

.zoom-lens {
  position: absolute;
  border: 1px solid #000;
  width: 100px;
  height: 100px;
  opacity: 0.4;
  background-color: #ffffff;
  pointer-events: none;
  z-index: 10;
}

/* Add cursor styles */
.zoom-in {
  cursor: zoom-in;
}

.zoom-out {
  cursor: zoom-out;
}
</style>
