<template>
  <div class="container-sentOTP font-thai">
    <div class="content">
      <h2 class="name-project">Hydrangea Project</h2>
      <div class="button-group">
        <div class="email-group">
          <label for="email" class="label-email ">อีเมล</label>
          <input id="email" class="inpmail font-thai" type="email" placeholder="กรอกอีเมลของคุณ" />
        </div>
        <button class="btn-otp font-thai" @click="goToConfirmOTPPage">รับ OTP</button>
        <button class="btn-back font-thai" @click="goToLoginPage">กลับไปหน้าเข้าสู่ระบบ</button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';

const router = useRouter();

const goToConfirmOTPPage = () => {
  router.push({ name: 'ConfirmOTP' });
};

const goToLoginPage = () => {
  router.push({ name: 'Login' });
};
</script>

<style>
.container-sentOTP {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background: -webkit-linear-gradient(left, #fa4299, #06A6D0);
}

.content {
  background-color: white;
  border-radius: 5px;
  padding: 40px;
  box-shadow: 4px 4px 8px rgba(0, 0, 0, 0.1);
  text-align: center;
  color: #0C7294;
}

.email-group {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 100%;
}

.label-email {
  font-size: 1rem;
  margin-bottom: 5px;
  color: #0C7294;
}

.button-group {
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 10px;
  border-radius: 5px;
}

.inpmail {
  font-size: 16px;
  border: none;
  padding: 10px;
  outline: none;
  background-color: #F8F8FF;
  border: 2px solid #4d4d4d;
  border-radius: 5px;
  width: 100%;
}

.btn-otp,
.btn-back {
  font-size: 16px;
  cursor: pointer;
  border: none;
  border-radius: 5px;
  padding: 10px;
  transition: background-color 0.3s ease, transform 0.2s ease;
  width: 100%;
}

.btn-otp {
  background-color: #3131A3;
  color: white;
}

.btn-otp:hover {
  background-color: #21216a;
  transform: scale(1.03);
}

.btn-back {
  background-color: #06A6D0;
  color: white;
}

.btn-back:hover {
  background-color: #0a647a;
  transform: scale(1.03);
}

.name-project {
  padding: 0 20px 0 20px;
}
</style>
