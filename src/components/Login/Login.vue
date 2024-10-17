<template>
  <div class="container-login font-thai">
    <div class="wrapper">
      <div class="title-text">
        <div v-if="isLogin" class="title login">Hydrangea Project</div>
        <div v-else class="title signup">สมัครสมาชิก</div>
      </div>
      <div class="form-container">
        <div class="form-inner">

          <!-- Login Form -->
          <form v-if="isLogin" @submit.prevent="handleLogin">
            <div class="field">
              <input type="text" v-model="loginForm.email" placeholder="อีเมล" />
            </div>
            <div class="field-inp-pass">
              <div class="box-inp-pass">
                <input id="login-password" class="inp-password-login font-thai" v-model="loginForm.password"
                  placeholder="รหัสผ่าน" :type="showPassword ? 'text' : 'password'" />
                <button type="button" class="toggle-btn-pass" @click="togglePasswordVisibility">
                  <transition name="fade">
                    <font-awesome-icon :icon="showPassword ? 'eye-slash' : 'eye'" key="password-icon" />
                  </transition>
                </button>
              </div>
            </div>

            <div class="pass-link">
              <a href="#" @click.prevent="handleForgotPassword">ลืมรหัสผ่าน?</a>
            </div>
            <div class="field">
              <input type="submit" value="เข้าสู่ระบบ" />
            </div>
            <div class="signup-link">
              <a href="#" @click.prevent="toggleForm">สร้างบัญชีใหม่</a>
            </div>
          </form>

          <!-- Signup Form -->
          <form v-else @submit.prevent="handleSignup">
            <div class="field">
              <input type="text" v-model="signupForm.username" placeholder="ชื่อผู้ใช้" required />
            </div>
            <div class="field">
              <input type="email" v-model="signupForm.email" placeholder="อีเมล" required />
            </div>
            <div class="field">
              <input type="text" v-model="signupForm.otp" placeholder="กรอก OTP 6 หลัก" required />
            </div>
            <div class="field">
              <input type="submit" :value="isOtpSent ? 'ส่ง OTP อีกครั้ง (' + countdown + ')': 'ส่ง OTP'" :disabled="isOtpSent" @click.prevent="sendOtp">
            </div>
            <div class="field">
              <input type="password" v-model="signupForm.password" @input="checkPassword" placeholder="กรอกรหัสผ่าน"
                required />
            </div>
            <div class="field">
              <input type="password" v-model="signupForm.confirmPassword" placeholder="ยืนยันรหัสผ่าน" required />
            </div>
            <div class="password-hint">
              <p :style="{ color: passwordLengthValid ? 'green' : 'red' }">มีความยาว 8-20 ตัว</p>
              <p :style="{ color: uppercaseValid ? 'green' : 'red' }">มีตัวอักษรพิมพ์ใหญ่อย่างน้อย 1 ตัว</p>
              <p :style="{ color: lowercaseValid ? 'green' : 'red' }">มีตัวอักษรพิมพ์เล็กอย่างน้อย 1 ตัว</p>
              <p :style="{ color: digitValid ? 'green' : 'red' }">มีตัวเลขอย่างน้อย 1 ตัว</p>
              <p :style="{ color: specialCharValid ? 'green' : 'red' }">มีเครื่องหมายพิเศษ (e.g., !@#$%^&*()_+=-)</p>
            </div>
            <div class="field">
              <input type="submit" value="สร้างบัญชี" />
            </div>
            <div class="signup-link">
              <a href="#" @click.prevent="toggleForm">กลับไปหน้าเข้าสู่ระบบ</a>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import Swal from 'sweetalert2'; // นำเข้า sweetalert2
import { useRouter } from 'vue-router';
import axios from 'axios';

export default defineComponent({
  name: 'LoginSignup',
  setup() {
    const router = useRouter(); // ใช้ router
    const isLogin = ref<boolean>(true);
    const countdown = ref<number>(30);
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

    const isOtpSent = ref(false);

    // สถานะการตรวจสอบรหัสผ่าน
    const passwordLengthValid = ref(false);
    const uppercaseValid = ref(false);
    const lowercaseValid = ref(false);
    const digitValid = ref(false);
    const specialCharValid = ref(false);

    const toggleForm = () => {
      isLogin.value = !isLogin.value;
    };

    const handleLogin = async () => {
      // Check if the email format is valid
      if (!emailPattern.test(loginForm.value.email)) {
        Swal.fire('Error', 'Invalid email format!', 'error');
        return;
      }

      // Check if the password format is valid
      if (!checkLoginPassword()) {
        return; // If password format is invalid, exit the function
      }

      try{
        const res = await axios.post('http://localhost:3000/auth/login', {
        email: loginForm.value.email,
        password: loginForm.value.password
      });
      if(res.data.status){
        localStorage.setItem('token', res.data.token)
        Swal.fire('ยินดีต้อนรับ', 'เข้าสู่ระบบสำเร็จ', 'success').then(() => {
        router.push({ name: 'MyVocab' });
      });
      }else{
        if(res.data.message == "Password expired."){
          Swal.fire('รหัสผ่านของคุณหมดอายุ', 'กรุณาเปลี่ยนรหัสผ่าน', 'error');
          router.push({ name: 'sentOTP' });
        }else{
          Swal.fire('ผิดพลาด', 'อีเมลหรือรหัสผ่านไม่ถูกต้อง', 'error');
        }
      }
      }catch(error){
        Swal.fire('ผิดพลาด', 'อีเมลหรือรหัสผ่านไม่ถูกต้อง', 'error');
      }
    };

    const checkLoginPassword = () => {
      const password = loginForm.value.password;

      // ตรวจสอบรหัสผ่านตามรูปแบบที่กำหนด
      if (!passwordPattern.test(password)) {
        Swal.fire('Error', 'Password must be between 8 to 20 characters, include letters, numbers, and special characters!', 'error');
        return false;
      }
      return true;
    };



    // ตรวจสอบรูปแบบ (Pattern) ของ Email
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    // ตรวจสอบรูปแบบ OTP (ตัวเลข 6 หลัก)
    const otpPattern = /^\d{6}$/;
    // ตรวจสอบรูปแบบของ Password (ระหว่าง 8-20 ตัวอักษร สามารถมีทั้งตัวเลข ตัวอักษร และอักขระพิเศษ)
    const passwordPattern = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d!@#$%^&*()_+=-]{8,20}$/;

    const checkPassword = () => {
      const password = signupForm.value.password;
      passwordLengthValid.value = password.length >= 8 && password.length <= 20;
      uppercaseValid.value = /[A-Z]/.test(password);
      lowercaseValid.value = /[a-z]/.test(password);
      digitValid.value = /\d/.test(password);
      specialCharValid.value = /[!@#$%^&*()_+=-]/.test(password);
      // Example validation checks, you can adjust these as needed
      if (!passwordPattern) {
        Swal.fire('Error', 'Password must be between 8 to 20 characters, include letters, numbers, and special characters!', 'error');
      }
    };

    const sendOtp = async () => {
      // Check if the email is provided
      if (!signupForm.value.email) {
        Swal.fire('Error', 'Please enter your email address!', 'error');
        return;
      }

      // Check if OTP has already been sent
      if (isOtpSent.value) {
        Swal.fire('Info', 'Please wait 30 seconds before resending the OTP.', 'info');
        return;
      }

      // Disable the OTP button
      isOtpSent.value = true;

      // Simulate sending the OTP (replace with your actual OTP sending logic)
      console.log('Sending OTP to:', signupForm.value.email);
      for (let i = 30; i > 0; i--) {
        setTimeout(() => {
          --countdown.value;
          if (countdown.value == 0) {
            isOtpSent.value = false;
            countdown.value = 30;
          }
        }, 1000 * (31 - i)); // Multiplies the delay based on the loop index
      }
    Swal.fire('Success', 'OTP sent to your email!', 'success');
    try {
    await axios.post('http://localhost:3000/auth/getOTP', {
      email: signupForm.value.email // ส่ง email ไปพร้อมกับคำขอในรูปแบบ JSON
    });
  } catch (error) {
    console.log(error)
  }
    };

    const handleSignup = async () => {
      const { email, otp, password, confirmPassword } = signupForm.value;

      // ตรวจสอบ email
      if (!emailPattern.test(email)) {
        Swal.fire('Error', 'Invalid email format!', 'error');
        return;
      }

      // ตรวจสอบ OTP
      if (!otpPattern.test(otp)) {
        Swal.fire('Error', 'OTP must be 6 digits!', 'error');
        return;
      }

      // ตรวจสอบ Password
      if (!passwordPattern.test(password)) {
        Swal.fire(
          'Error',
          'Password must be between 8 to 20 characters, include letters, numbers, and special characters!',
          'error'
        );
        return;
      }

      // ตรวจสอบ Password กับ Confirm Password
      if (password !== confirmPassword) {
        Swal.fire('Error', 'Passwords do not match!', 'error');
        return;
      }
      try{
        const res = await axios.post('http://localhost:3000/auth/create', {
          email: signupForm.value.email,
          otp_password: signupForm.value.otp,
          username: signupForm.value.username,
          password: signupForm.value.password,
          confirm_password: signupForm.value.confirmPassword
        });
        if(res.data.status){
          Swal.fire('ยินดีด้วย', 'สร้างบัญชีสำเร็จ', 'success');
          toggleForm();
        }
      }catch(error){
        Swal.fire('กรุณาลองอีกครั้ง', 'สร้างบัญชีล้มเหลว', 'error');
      }
    };

    const handleForgotPassword = async() => {
      router.push({ name: 'sentOTP' });
    };

    const showPassword = ref(false); // เพิ่มตัวแปรเพื่อจัดการการแสดงรหัสผ่าน

    const togglePasswordVisibility = () => {
      showPassword.value = !showPassword.value; // เปลี่ยนสถานะการแสดงรหัสผ่าน
    };

    return {
      isLogin,
      loginForm,
      signupForm,
      isOtpSent,
      toggleForm,
      checkPassword,
      passwordLengthValid,
      uppercaseValid,
      lowercaseValid,
      digitValid,
      specialCharValid,
      handleSignup,
      sendOtp,
      handleForgotPassword,
      handleLogin,
      showPassword,
      togglePasswordVisibility,
      countdown
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

.toggle-btn-pass {
  background: none;
  width: 40px;
  border: none;
  border-radius: 30px;
  color: #000000;
  cursor: pointer;
  background-color: #ffffff; 
}

.toggle-btn-pass:hover {
  color: #535355;
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

.inp-password-login {
  font-size: 16px;
  border: none;
  padding: 10px;
  outline: none;
  width: 100%;
  background-color: #ffffff; 
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

.box-inp-pass{
  display: flex;
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

.field-inp-pass{
  height: 50px;
  width: 100%;
  margin-top: 20px;
  border: 1px solid lightgrey;
  border-bottom-width: 2px;
  transition: all 0.4s ease;
  border-radius: 5px;
  align-items: center;
  justify-content: center;
  padding-top: 1px;
  
}


.field-inp-pass input{
  border-radius: 10px;
  padding-left: 15px;
  font-size: 17px;
  
}


.password-hint {
  display: flex;
  padding: 10px 10px 0 10px;
  flex-direction: column;
  justify-content: start;
  align-items: start;
}

p {
  margin: 3px;
}
</style>