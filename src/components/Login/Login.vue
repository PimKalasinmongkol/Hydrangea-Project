<template>
  <div class="container-login">
    <div class="wrapper">
      <div class="title-text">
        <div v-if="isLogin" class="title login">Login Form</div>
        <div v-else class="title signup">Signup Form</div>
      </div>
      <div class="form-container">
        <div class="form-inner">

          <!-- Login Form -->
          <form v-if="isLogin" @submit.prevent="handleLogin">
            <div class="field">
              <input type="text" v-model="loginForm.email" placeholder="Email Address" required />
            </div>
            <div class="field">
              <input type="password" v-model="loginForm.password" placeholder="Password" required />
            </div>
            <div class="pass-link">
              <a href="#" @click.prevent="handleForgotPassword">Forgot Password?</a> 
            </div>
            <div class="field">
              <input type="submit" value="Login" />
            </div>
            <div class="signup-link">
              Not a member? <a href="#" @click.prevent="toggleForm">Create Account</a>
            </div>
          </form>

          <!-- Signup Form -->
          <form v-else @submit.prevent="handleSignup">
            <div class="field">
              <input type="text" v-model="signupForm.username" placeholder="Username" />
            </div>
            <div class="field">
              <input type="text" v-model="signupForm.email" placeholder="Email Address"  />
            </div>
            <div class="field">
              <input type="text" v-model="signupForm.otp" placeholder="Enter OTP"  />
            </div>
            <div class="field">
              <input type="buttonSendOTP" @click="sendOtp" value="Send OTP" /> <!-- Change to button to call sendOtp -->
            </div>
            <div class="field password-field">
              <input :type="showPassword ? 'text' : 'password'" v-model="signupForm.password" placeholder="Password" />
              <span class="eye" @click="showPassword = !showPassword">
                <i :class="showPassword ? 'fas fa-eye' : 'fas fa-eye-slash'"></i>
              </span>
            </div>
            
            <div class="field password-field">
              <input :type="showConfirmPassword ? 'text' : 'password'" v-model="signupForm.confirmPassword" placeholder="Confirm Password" />
              <span class="eye" @click="showConfirmPassword = !showConfirmPassword">
                <i :class="showConfirmPassword ? 'fas fa-eye' : 'fas fa-eye-slash'"></i>
              </span>
            </div>
             <!-- Message showing password requirements -->
             <div class="password-requirements" :class="{ valid: isPasswordValid }">
              <ul>
                <p>มีความยาวอย่างน้อย 8 ตัว</p>
                <p>มีตัวอักษรพิมพ์เล็กอย่างน้อย 1 ตัว</p>
                <p>มีตัวอักษรพิมพ์ใหญ่อย่างน้อย 1 ตัว</p>
                <p>มีตัวเลขอย่างน้อย 1 ตัว</p>
                <p>มีเครื่องหมายพิเศษ เช่น @#?!%$ อย่างน้อย 1 ตัว</p>
              </ul>
            </div>
            
            <div class="field">
              <input type="submit" value="Sign Up" />
            </div>
            <div class="signup-link">
              Already a member? <a href="#" @click.prevent="toggleForm">Login</a>
            </div>
          </form>

        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from 'vue';
import { useRouter } from 'vue-router';
import Swal from 'sweetalert2';

export default defineComponent({
  name: 'LoginSignup',
  setup() {
    const router = useRouter();
    const isLogin = ref(true);

    const loginForm = ref({
      email: '',
      password: ''
    });

    const signupForm = ref({
      username: '',
      email: '',
      otp: '',
      password: '',
      confirmPassword: ''
    });

    const toggleForm = () => {
      isLogin.value = !isLogin.value;
    };

    const handleLogin = () => {
      console.log('Logging in with:', loginForm.value);
      router.push({ name: 'MyVocab' });
    };

const handleSignup = () => {
  console.log('Signing up with:', signupForm.value);

  // ตรวจสอบว่ามีการกรอกข้อมูลครบทุกช่อง
  if (!signupForm.value.username || !signupForm.value.email || !signupForm.value.otp || 
      !signupForm.value.password || !signupForm.value.confirmPassword) {
    Swal.fire({
      title: 'ข้อผิดพลาด!',
      text: 'กรุณากรอกข้อมูลให้ครบทุกช่อง',
      icon: 'error',
      confirmButtonText: 'ตกลง'
    });
    return;
  }

  // ตรวจสอบรหัสผ่านว่าตรงกันหรือไม่
  if (signupForm.value.password !== signupForm.value.confirmPassword) {
    Swal.fire({
      title: 'ข้อผิดพลาด!',
      text: 'รหัสผ่านไม่ตรงกัน',
      icon: 'error',
      confirmButtonText: 'ตกลง'
    });
    return;
  }
// ตรวจสอบความต้องการรหัสผ่าน
const passwordRequirements = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@#?!%$]).{8,}$/;

  if (!passwordRequirements.test(signupForm.value.password)) {
    Swal.fire({
      title: 'ข้อผิดพลาด!',
      text: 'รหัสผ่านต้องมีความยาวอย่างน้อย 8 ตัวอักษร และต้องมีตัวพิมพ์เล็ก ตัวพิมพ์ใหญ่ ตัวเลข และเครื่องหมายพิเศษอย่างน้อย 1 ตัว',
      icon: 'error',
      confirmButtonText: 'ตกลง'
    });
    return;
  }

  // ถ้าทุกอย่างถูกต้อง
  Swal.fire({
    title: 'สำเร็จ!',
    text: 'สมัครสมาชิกสำเร็จ',
    icon: 'success',
    confirmButtonText: 'ตกลง'
  }).then(() => {
    // เมื่อกดปุ่ม OK จะเปลี่ยนไปหน้า Login
    router.push({ name: 'Login' }); // นำทางไปยังหน้า Login
  });

};

// ส่ง OTP ไปยังผู้ใช้
const sendOtp = () => {
  if (signupForm.value.username && signupForm.value.email) {
    console.log('Sending OTP to:', signupForm.value.email);
    // Implement OTP sending logic here, e.g., API call
    Swal.fire({
      title: 'สำเร็จ!',
      text: 'OTP ถูกส่งไปยังอีเมลของคุณ',
      icon: 'success',
      confirmButtonText: 'ตกลง'
    });
    } else {
      Swal.fire({
        title: 'ข้อผิดพลาด!',
        text: 'กรุณากรอก Username และ Email ก่อนส่ง OTP',
        icon: 'error',
        confirmButtonText: 'ตกลง'
      });
    }
};

    const handleForgotPassword = () => {
      router.push({ name: 'sentOTP' });
    };


    return {
      isLogin,
      loginForm,
      signupForm,
      toggleForm,
      handleLogin,
      handleSignup,
      sendOtp,
      handleForgotPassword
    };
  }
});
</script>




<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600&display=swap');

.container-login {
  display: flex;
  width: 100%;
  height: 100vh;
  justify-content: center;
  align-items: center;
  background: -webkit-linear-gradient(left, #3131A3, #fa4299);
}

.wrapper {
  width: 400px;
  background: #fff;
  padding: 30px;
  border-radius: 5px;
  box-shadow: 0px 15px 20px rgba(0, 0, 0, 0.1);
}

.wrapper .title-text {
  display: flex;
  width: 200%;
}

.wrapper .title-text .title {
  width: 50%;
  font-size: 35px;
  font-weight: 600;
  text-align: center;
}

.wrapper .form-container {
  width: 100%;
}

.form-inner form .field {
  height: 50px;
  width: 100%;
  margin-top: 20px;
}

.form-inner form .field input {
  height: 100%;
  width: 100%;
  outline: none;
  padding-left: 15px;
  font-size: 17px;
  border-radius: 5px;
  border: 1px solid lightgrey;
  border-bottom-width: 2px;
  transition: all 0.4s ease;
}

.form-inner form .field input:focus {
  border-color: #fc83bb;
}

.form-inner form .pass-link {
  margin-top: 5px;
  margin-left: 2px;
  text-align: left;
}


.form-inner form .pass-link a,
.form-inner form .signup-link a {
  color: #3131A3;
  text-decoration: none;
}

.form-inner form .signup-link {
  text-align: center;
  margin-top: 30px;
}

.form-inner form .pass-link a:hover,
.form-inner form .signup-link a:hover {
  text-decoration: underline;
}

form .field input[type="submit"] {
  color: #fff;
  font-size: 20px;
  font-weight: 500;
  padding-left: 0px;
  border: none;
  cursor: pointer;
  background: -webkit-linear-gradient(left, #3131A3, #fa4299);
}

form .field input[type="buttonSendOTP"] {
  color: #fff;
  font-size: 20px;
  font-weight: 500;
  padding: 0; /* เปลี่ยนจาก padding-left เป็น padding: 0; */
  border: none;
  cursor: pointer;
  background: -webkit-linear-gradient(left, #3131A3, #fa4299);
  width: 100%; /* ให้ปุ่มกว้างเต็มที่ */
  text-align: center; /* ทำให้ข้อความอยู่กลางปุ่ม */
  height: 100%; /* ให้ปุ่มมีความสูงเต็มฟิลด์ */
}
.password-requirements {
  margin-top: 10px;
  font-size: 14px;
  color: red; /* สีเริ่มต้น */
}

.password-requirements ul {
  list-style-type: disc; /* สไตล์รายการ */
  padding-left: 20px; /* ระยะห่างด้านซ้าย */
}

.password-requirements p {
  margin-bottom: 5px; /* ระยะห่างระหว่างรายการ */
}

</style>