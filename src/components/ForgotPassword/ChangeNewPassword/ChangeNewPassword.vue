<template>
  <div class="container-newpass font-thai">
    <div class="content">
      <h2 class="name-project">Hydrangea Project</h2>
      <div class="button-group">
        <div class="password-group">
          <label for="new-password" class="label-password">รหัสผ่านใหม่</label>
          <div class="password-toggle">

            <div class="box-inp">
              <input id="new-password" class="inp-password font-thai" :type="showPassword ? 'text' : 'password'"
                placeholder="กรอกรหัสผ่านของคุณ" />
              <button type="button" class="toggle-btn font-thai" @click="togglePasswordVisibility">
                <transition name="fade">
                  <font-awesome-icon :icon="showPassword ? 'eye-slash' : 'eye'" key="password-icon" />
                </transition>
              </button>
            </div>

          </div>
          <label for="confirm-password" class="label-password">ยืนยันรหัสผ่าน</label>
          <div class="password-toggle">
            <div class="box-inp">
              <input id="confirm-password" class="inp-password font-thai" :type="showConfirmPassword ? 'text' : 'password'"
                placeholder="ยืนยันรหัสผ่านของคุณ" />
              <button type="button" class="toggle-btn" @click="toggleConfirmPasswordVisibility">
                <transition name="fade">
                  <font-awesome-icon :icon="showConfirmPassword ? 'eye-slash' : 'eye'" key="confirm-password-icon" />
                </transition>
              </button>
            </div>
          </div>
        </div>
        <button class="btn-password font-thai" @click="goToLoginPage">เปลี่ยนรหัสผ่าน</button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import Swal from 'sweetalert2';

const router = useRouter();
const showPassword = ref(false);
const showConfirmPassword = ref(false);

const togglePasswordVisibility = () => {
  showPassword.value = !showPassword.value;
};

const toggleConfirmPasswordVisibility = () => {
  showConfirmPassword.value = !showConfirmPassword.value;
};

const goToMyVocabPage = () => {
  router.push({ name: 'MyVocab' });
};

const goToLoginPage = () => {
  Swal.fire({
        title: 'เปลี่ยนรหัสผ่านสำเร็จ',
        icon: 'success',
        confirmButtonText: 'ตกลง'
      }).then(() => {
        // หลังจากผู้ใช้กดปุ่ม OK จะเปลี่ยนไปหน้า login
        router.push({ name: 'Login' });
      });
    };


</script>

<style>

.container-newpass {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background: -webkit-linear-gradient(left, #fa4299, #06A6D0);
}

.content {
  background-color: white;
  padding: 50px;
  box-shadow: 4px 4px 8px rgba(0, 0, 0, 0.1);
  text-align: center;
  color: #0C7294;
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
  color: #0C7294;
}

.button-group {
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 10px;
  border-radius: 5px;
}

.box-inp{
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
  background-color: #F8F8FF; 
}

.toggle-btn {
  background: none;
  width: 40px;
  border: none;
  color: #0C7294;
  cursor: pointer;
  background-color: #F8F8FF; 
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
  background-color: #3131A3;
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

</style>
