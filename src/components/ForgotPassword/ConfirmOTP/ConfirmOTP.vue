<template>
  <div class="container-confirmOTP font-thai">
    <div class="content">
      <h2 class="name-project">Hydrangea Project</h2>
      <div class="button-group">
        <div class="OTP-group">
          <label for="OTP" class="label-OTP">ยืนยันรหัสOTP</label>
          <input id="OTP" class="inp-otp font-thai" type="text" v-model="otp" placeholder="กรอกOTPของคุณ" />
        </div>
        <button class="btn-otp font-thai" @click="goToChangePasswordPage">ยืนยัน OTP</button>
        <button class="btn-back font-thai" @click="goToLoginPage">กลับไปหน้าเข้าสู่ระบบ</button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import Swal from 'sweetalert2';

const otp = ref(''); // ใช้ v-model กับ input เพื่อผูกข้อมูล

const router = useRouter();

const goToChangePasswordPage = () => {
  // ตรวจสอบว่า OTP เป็นตัวเลขและมีความยาว 6 หลัก
  if (/^\d{6}$/.test(otp.value)) {
    Swal.fire({
      title: 'ยืนยันสำเร็จ!',
      text: 'คุณสามารถเปลี่ยนรหัสผ่านใหม่ได้แล้ว',
      icon: 'success',
      confirmButtonText: 'ตกลง'
    }).then(() => {
      router.push({ name: 'ChangeNewPassword' });
    });
  } else {
    // แจ้งเตือนเมื่อ OTP ไม่ถูกต้อง
    Swal.fire({
      title: 'ข้อผิดพลาด!',
      text: 'กรุณากรอกตัวเลข 6 หลักให้ครบ',
      icon: 'error',
      confirmButtonText: 'ตกลง'
    });
  }
};

const goToLoginPage = () => {
  router.push({ name: 'Login' });
};
</script>

<style>
/* คงโค้ด CSS เดิมไว้ */
</style>
