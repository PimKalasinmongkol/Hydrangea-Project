<template>
  <div class="container-newpass font-thai">
    <div class="content">
      <h2 class="name-project">Hydrangea Project</h2>
      <div class="button-group">
        <div class="password-group">
          <label for="new-password" class="label-password">รหัสผ่านใหม่</label>
          <div class="password-toggle">
            <div class="box-inp">
              <input
                id="new-password"
                class="inp-password font-thai"
                :type="showPassword ? 'text' : 'password'"
                placeholder="กรอกรหัสผ่านของคุณ"
                v-model="newPassword"
                @input="checkPassword"
              />
              <button
                type="button"
                class="toggle-btn font-thai"
                @click="togglePasswordVisibility"
              >
                <transition name="fade">
                  <font-awesome-icon
                    :icon="showPassword ? 'eye-slash' : 'eye'"
                    key="password-icon"
                  />
                </transition>
              </button>
            </div>
          </div>

          <label for="confirm-password" class="label-password"
            >ยืนยันรหัสผ่าน</label
          >
          <div class="password-toggle">
            <div class="box-inp">
              <input
                id="confirm-password"
                class="inp-password font-thai"
                :type="showConfirmPassword ? 'text' : 'password'"
                placeholder="ยืนยันรหัสผ่านของคุณ"
                v-model="confirmPassword"
              />
              <button
                type="button"
                class="toggle-btn"
                @click="toggleConfirmPasswordVisibility"
              >
                <transition name="fade">
                  <font-awesome-icon
                    :icon="showConfirmPassword ? 'eye-slash' : 'eye'"
                    key="confirm-password-icon"
                  />
                </transition>
              </button>
            </div>
          </div>

          <div class="new-password-hint">
            <p :style="{ color: passwordLengthValid ? 'green' : 'red' }">
              มีความยาว 8-20 ตัว
            </p>
            <p :style="{ color: uppercaseValid ? 'green' : 'red' }">
              มีตัวอักษรพิมพ์ใหญ่อย่างน้อย 1 ตัว
            </p>
            <p :style="{ color: lowercaseValid ? 'green' : 'red' }">
              มีตัวอักษรพิมพ์เล็กอย่างน้อย 1 ตัว
            </p>
            <p :style="{ color: digitValid ? 'green' : 'red' }">
              มีตัวเลขอย่างน้อย 1 ตัว
            </p>
            <p :style="{ color: specialCharValid ? 'green' : 'red' }">
              มีเครื่องหมายพิเศษ (e.g., !@#$%^&*()_+=-)
            </p>
          </div>
        </div>
        <button class="btn-password font-thai" @click="goToLoginPage">
          เปลี่ยนรหัสผ่าน
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import { useRouter } from "vue-router";
import Swal from "sweetalert2";
import axios from "axios";

const router = useRouter();
const showPassword = ref(false);
const showConfirmPassword = ref(false);
const newPassword = ref("");
const confirmPassword = ref("");

// สถานะการตรวจสอบรหัสผ่าน
const passwordLengthValid = ref(false);
const uppercaseValid = ref(false);
const lowercaseValid = ref(false);
const digitValid = ref(false);
const specialCharValid = ref(false);

const checkToken = async () => {
  const otp = localStorage.getItem("otp");
  try {
    const res = await axios.post(
      "http://localhost:3000/auth/resetpassword-otp-check",
      {
        otp: otp,
      }
    );
    console.log(res.data);
    if (!res.data.status) {
      router.push({ name: "sentOTP" });
    }
  } catch (error) {
    router.push({ name: "sentOTP" });
  }
};
onMounted(() => {
  checkToken();
});
// ฟังก์ชันตรวจสอบรหัสผ่าน
const checkPassword = () => {
  const password = newPassword.value;
  passwordLengthValid.value = password.length >= 8 && password.length <= 20;
  uppercaseValid.value = /[A-Z]/.test(password);
  lowercaseValid.value = /[a-z]/.test(password);
  digitValid.value = /\d/.test(password);
  specialCharValid.value = /[!@#$%^&*()_+=-]/.test(password);
};

const togglePasswordVisibility = () => {
  showPassword.value = !showPassword.value;
};

const toggleConfirmPasswordVisibility = () => {
  showConfirmPassword.value = !showConfirmPassword.value;
};

const goToMyVocabPage = () => {
  router.push({ name: "MyVocab" });
};

const goToLoginPage = async () => {
  // ตรวจสอบว่ารหัสผ่านทั้งสองตรงกันและเป็นไปตามรูปแบบที่กำหนด
  if (newPassword.value !== confirmPassword.value) {
    Swal.fire({
      title: "รหัสผ่านไม่ตรงกัน!",
      text: "กรุณาตรวจสอบรหัสผ่านใหม่ของคุณอีกครั้ง",
      icon: "error",
      confirmButtonText: "ตกลง",
    });
    return;
  }

  // ตรวจสอบว่า password pattern ทั้งหมดเป็นจริง
  if (
    !passwordLengthValid.value ||
    !uppercaseValid.value ||
    !lowercaseValid.value ||
    !digitValid.value ||
    !specialCharValid.value
  ) {
    Swal.fire({
      title: "รหัสผ่านไม่ถูกต้อง!",
      text: "กรุณาตรวจสอบให้แน่ใจว่ารหัสผ่านของคุณตรงตามข้อกำหนด",
      icon: "error",
      confirmButtonText: "ตกลง",
    });
    return;
  }
  const otp = localStorage.getItem("otp");
  const res = await axios.post("http://localhost:3000/auth/resetpassword", {
    otp: otp,
    newPassword: newPassword.value,
    confirmPassword: confirmPassword.value,
  });
  if (res.data.status) {
    // ถ้าทั้งหมดถูกต้อง แจ้งเตือนความสำเร็จและไปยังหน้า login
    Swal.fire({
      title: "เปลี่ยนรหัสผ่านสำเร็จ",
      icon: "success",
      confirmButtonText: "ตกลง",
    }).then(() => {
      router.push({ name: "Login" });
    });
  } else {
    // ถ้าทั้งหมดถูกต้อง แจ้งเตือนความสำเร็จและไปยังหน้า login
    Swal.fire({
      title: "เปลี่ยนรหัสผ่านล้มเหลว",
      icon: "error",
      confirmButtonText: "ตกลง",
    }).then(() => {
      router.push({ name: "Login" });
    });
  }
};
</script>

<style>
.container-newpass {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background: -webkit-linear-gradient(left, #fa4299, #06a6d0);
}

.content {
  background-color: white;
  padding: 50px;
  box-shadow: 4px 4px 8px rgba(0, 0, 0, 0.1);
  text-align: center;
  color: #0c7294;
}

.password-group {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 100%;
}

.password-toggle {
  display: flex;
  align-items: center;
  gap: 10px;
  width: 100%;
}

.label-password {
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

.box-inp {
  border: 2px solid #4d4d4d;
  justify-content: center;
  border-radius: 5px;
  display: flex;
  margin-bottom: 10px;
  width: 100%;
}

.inp-password {
  font-size: 16px;
  border: none;
  padding: 10px;
  outline: none;
  width: 100%;
  background-color: #f8f8ff;
}

.toggle-btn {
  background: none;
  width: 40px;
  border: none;
  color: #0c7294;
  cursor: pointer;
  background-color: #f8f8ff;
}

.toggle-btn:hover {
  color: #21216a;
}

.btn-password {
  font-size: 16px;
  cursor: pointer;
  border: none;
  border-radius: 5px;
  padding: 10px;
  transition: background-color 0.3s ease, transform 0.2s ease;
  width: 100%;
  background-color: #3131a3;
  color: white;
}

.btn-password:hover {
  background-color: #21216a;
  transform: scale(1.03);
}

.name-project {
  padding: 0 50px 0 50px;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}

.new-password-hint p {
  display: flex;
  margin: 4px;
  flex-direction: column;
  justify-content: start;
  align-items: start;
}
</style>
