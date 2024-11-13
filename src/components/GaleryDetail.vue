<template>
    <div class="flex flex-col items-center min-h-screen py-4 px-4 border rounded-lg m-4 font-semibold">
        <div class="w-full border-b mb-6 pb-2 font-redhat">
            Photos for Lot #82745763
        </div>

        <div class="w-full md:w-[50%] flex flex-col items-center space-y-4">
            <!-- Carousel Section -->
            <div class="grid grid-cols-1 gap-4 w-full">
                <div v-for="(image, index) in images" :key="index" class="flex flex-col justify-center items-center">
                    <img :src="image" alt="Product image" class="w-full h-auto rounded-lg shadow-lg" />
                    <div class="flex flex-row justify-center items-center pt-1">
                        <div @click="scrollToTop"
                            class="cursor-pointer w-6 h-6 bg-black rounded-full flex items-center justify-center">
                            <svg width="14" height="8" viewBox="0 0 14 8" fill="none"
                                xmlns="http://www.w3.org/2000/svg">
                                <path d="M12.6569 7L7 1.34315L1.34315 7" stroke="white" stroke-width="2"
                                    stroke-linecap="round" stroke-linejoin="round" />
                            </svg>
                        </div>
                        <div @click="scrollToTop" class="text-[#366EFF] font-bold px-1 cursor-pointer">Back to Top</div>
                        |
                        <div @click="scrollToDetails" class="text-[#366EFF] font-bold px-1 cursor-pointer">Lot Details
                        </div>
                        <div @click="scrollToDetails"
                            class="cursor-pointer w-6 h-6 bg-black rounded-full flex items-center justify-center">
                            <svg width="14" height="8" viewBox="0 0 14 8" fill="none"
                                xmlns="http://www.w3.org/2000/svg">
                                <path d="M1.34315 1L7 6.65685L12.6569 1" stroke="white" stroke-width="2"
                                    stroke-linecap="round" stroke-linejoin="round" />
                            </svg>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <!-- Details Section -->
    <div id="details" class="lg:flex md:flex sm:flex md:flex-row lg:flex-row sm:flex-col gap-4 m-4">
        <div class="md:w-1/2 lg:w-1/2 sm:w-full border rounded-lg p-4">
            <div class="border-b mb-2 pb-2 font-redhat w-full font-semibold">
                Vehicle Details
                <div class="w-[5%] border-b-2 border-black"></div>
            </div>

            <table class="w-full border-collapse">

                <tbody>
                    <tr>
                        <td class="py-2 border-b border-gray-300">Lot Number</td>
                        <td class="py-2 border-b border-gray-300">82745763</td>
                    </tr>
                    <tr>
                        <td class="py-2 border-b border-gray-300">VIN</td>
                        <td class="py-2 border-b border-gray-300">JTDKN3DU6E1******</td>
                    </tr>
                    <tr>
                        <td class="py-2 border-b border-gray-300">Title Code</td>
                        <td class="py-2 border-b border-gray-300">FL-</td>
                    </tr>
                    <tr>
                        <td class="py-2 border-b border-gray-300">Odometer</td>
                        <td class="py-2 border-b border-gray-300">N/A</td>
                    </tr>
                    <tr>
                        <td class="py-2 border-b border-gray-300">Primary Damage</td>
                        <td class="py-2 border-b border-gray-300">FRONT END</td>
                    </tr>
                    <tr>
                        <td class="py-2 border-b border-gray-300">Estimated Retail Value</td>
                        <td class="py-2 border-b border-gray-300">$10,938.00 USD</td>
                    </tr>
                    <tr>
                        <td class="py-2 border-b border-gray-300">Cylinders</td>
                        <td class="py-2 border-b border-gray-300">4</td>
                    </tr>
                    <tr>
                        <td class="py-2 border-b border-gray-300">Color</td>
                        <td class="py-2 border-b border-gray-300">WHITE</td>
                    </tr>
                    <tr>
                        <td class="py-2 border-b border-gray-300">Engine Type</td>
                        <td class="py-2 border-b border-gray-300">1.8L 4</td>
                    </tr>
                    <tr>
                        <td class="py-2 border-b border-gray-300">Transmission</td>
                        <td class="py-2 border-b border-gray-300">AUTOMATIC</td>
                    </tr>
                    <tr>
                        <td class="py-2 border-b border-gray-300">Drive</td>
                        <td class="py-2 border-b border-gray-300">Front-wheel Drive</td>
                    </tr>
                    <tr>
                        <td class="py-2 border-b border-gray-300">Vehicle Type</td>
                        <td class="py-2 border-b border-gray-300">AUTOMOBILE</td>
                    </tr>
                    <tr>
                        <td class="py-2 border-b border-gray-300">Fuel</td>
                        <td class="py-2 border-b border-gray-300">HYBRID ENGINE</td>
                    </tr>
                    <tr>
                        <td class="py-2 border-b border-gray-300">Keys</td>
                        <td class="py-2 border-b border-gray-300">YES</td>
                    </tr>
                    <tr>
                        <td class="py-2 border-b border-gray-300">Highlights</td>
                        <td class="py-2 border-b border-gray-300">Enhanced Vehicles</td>
                    </tr>
                    <tr>
                        <td class="py-2 border-b border-gray-300">Notes</td>
                        <td class="py-2 border-b border-gray-300">There are no notes for this lot</td>
                    </tr>
                </tbody>
            </table>


        </div>
        <div class="md:w-1/2 lg:w-1/2 sm:w-full border rounded-lg p-4">
            <div class="border-b mb-2 pb-2 font-redhat w-full font-semibold">
                Bid Information
                <div class="w-[5%] border-b-2 border-black"></div>
            </div>
            <div>
                Other Information
            </div>
        </div>

    </div>
</template>

<script setup>
import { useRoute } from "vue-router";

const route = useRoute();
const images = JSON.parse(route.query.images);

// Scroll to the top of the page
const scrollToTop = () => {
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
};

// Scroll to the details section
const scrollToDetails = () => {
    const detailsSection = document.getElementById("details");
    if (detailsSection) {
        detailsSection.scrollIntoView({
            behavior: "smooth"
        });
    }
};
</script>

<style scoped>
/* Add any additional styling here */
</style>