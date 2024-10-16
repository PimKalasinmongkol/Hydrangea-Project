<!-- src/views/Home.vue -->
<template>
    <div class="d-flex justify-content-between font-thai">
        <div class="bg-info bg-half">

        </div>
        <div class="bg-info-subtle bg-half">
            <h1>Register</h1>
            <div class="input-group">
                <label for="email" class="label-email ">อีเมล</label>
                <input id="email" class="inp-mail font-thai" type="email" placeholder="กรอกอีเมลของคุณ" />
            </div>
            <button @click="goToLoginPage">Login</button>
        </div>

    </div>
</template>


<script setup lang="ts">
import { useRouter } from 'vue-router';

const router = useRouter();

const goToLoginPage = () => {
    router.push({ name: 'Login' });
};

</script>

<style scoped>
.bg-half {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100vh;
}

.input-group {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    width: 60%;
}

.label-email {
    font-size: 1rem;
    margin-bottom: 5px;
    color: #0C7294;
}

</style>