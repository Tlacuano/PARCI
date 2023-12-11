<template>
    <div>
        <Navbar />
        <b-container fluid>
            <Transition name="fade" mode="out-in">
                <router-view />
            </Transition>
        </b-container>
    </div>
</template>

<script lang="ts">
    import Vue from 'vue';
    import Navbar from "../../../../components/Navbar.vue";

    
    export default Vue.extend({
        name: 'SinHome',
        components: {
            Navbar,
        },
        data() {
            return {
                
            }
        },
        methods: {
            
        },
        mounted() {
            
        },
    
    });
</script>

<style>

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
