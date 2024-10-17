<template>
  <div class="container-confirmOTP font-thai">
    <div class="content">
      <h2 class="name-project">Hydrangea Project</h2>
      <div class="button-group">
        <div class="OTP-group">
          <label for="OTP" class="label-OTP">ยืนยันรหัสOTP</label>
          <input
            id="OTP"
            class="inp-otp font-thai"
            type="text"
            v-model="otp"
            placeholder="กรอกOTPของคุณ"
          />
        </div>
        <button class="btn-otp font-thai" @click="goToChangePasswordPage">
          ยืนยัน OTP
        </button>
        <button class="btn-back font-thai" @click="goToLoginPage">
          กลับไปหน้าเข้าสู่ระบบ
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";
import Swal from "sweetalert2";
import axios from "axios";

const otp = ref(""); // ใช้ v-model กับ input เพื่อผูกข้อมูล

const router = useRouter();

const goToChangePasswordPage = async () => {
  // ตรวจสอบว่า OTP เป็นตัวเลขและมีความยาว 6 หลัก
  if (/^\d{6}$/.test(otp.value)) {
    const res = await axios.post(
      "http://localhost:3000/auth/resetpassword-otp",
      {
        otp: otp.value,
      }
    );
    if (res.data.status) {
      const token: any = res.data.token
      localStorage.setItem('otp', token)
      Swal.fire({
        title: "ยืนยันสำเร็จ!",
        text: "คุณสามารถเปลี่ยนรหัสผ่านใหม่ได้แล้ว",
        icon: "success",
        confirmButtonText: "ตกลง",
      }).then(() => {
        router.push({ name: "ChangeNewPassword" });
      });
    } else {
      Swal.fire({
        title: "OTP ไม่ถูกต้อง!",
        icon: "error",
        confirmButtonText: "ตกลง",
      }).then(() => {
        router.push({ name: "sentOTP" });
      });
    }
  } else {
    // แจ้งเตือนเมื่อ OTP ไม่ถูกต้อง
    Swal.fire({
      title: "ข้อผิดพลาด!",
      text: "กรุณากรอกตัวเลข 6 หลักให้ครบ",
      icon: "error",
      confirmButtonText: "ตกลง",
    });
  }
};

const goToLoginPage = () => {
  router.push({ name: "Login" });
};
</script>

<style>
.container-confirmOTP {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background: -webkit-linear-gradient(left, #fa4299, #06a6d0);
}

.content {
  background-color: white;
  padding: 40px;
  box-shadow: 4px 4px 8px rgba(0, 0, 0, 0.1);
  text-align: center;
  border-radius: 5px;
  color: #0c7294;
}

.OTP-group {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 100%;
}

.label-OTP {
  font-size: 1rem;
  margin-bottom: 5px;
  color: #0c7294;
}

.button-group {
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 10px;
  border-radius: 5px;
}

.inp-otp {
  font-size: 16px;
  border: none;
  padding: 10px;
  outline: none;
  background-color: #f8f8ff;
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
  background-color: #3131a3;
  color: white;
}

.btn-otp:hover {
  background-color: #21216a;
  transform: scale(1.03);
}

.btn-back {
  background-color: #06a6d0;
  color: white;
}

.btn-back:hover {
  background-color: #0a647a;
  transform: scale(1.03);
}

.name-project {
  padding: 0 20px 0 20px; /* เพิ่ม padding ที่ด้านล่าง */
}
</style>
