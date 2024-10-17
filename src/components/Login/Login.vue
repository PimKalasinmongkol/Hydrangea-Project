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
              <input type="email" v-model="loginForm.email" placeholder="Email Address" required />
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
              <input type="text" v-model="signupForm.username" placeholder="Username" required />
            </div>
            <div class="field">
              <input type="email" v-model="signupForm.email" placeholder="Email Address" required />
            </div>
            <div class="field">
              <input type="text" v-model="signupForm.otp" placeholder="Enter OTP" required />
            </div>
            <div class="field">
              <input type="submit" value="Sent OTP" />
            </div>
            <div class="field">
              <input type="password" v-model="signupForm.password" placeholder="Password" required />
            </div>
            <div class="field">
              <input type="password" v-model="signupForm.confirmPassword" placeholder="Confirm Password" required />
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
import { defineComponent, ref } from 'vue';
import Swal from 'sweetalert2'; // นำเข้า sweetalert2
import { useRouter } from 'vue-router';


export default defineComponent({
  name: 'LoginSignup',
  setup() {
    const router = useRouter(); // ใช้ router
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


    // ตรวจสอบรูปแบบ (Pattern) ของ Email
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    // ตรวจสอบรูปแบบ OTP (ตัวเลข 6 หลัก)
    const otpPattern = /^\d{6}$/;
    // ตรวจสอบรูปแบบของ Password (ระหว่าง 8-20 ตัวอักษร สามารถมีทั้งตัวเลข ตัวอักษร และอักขระพิเศษ)
    const passwordPattern = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d!@#$%^&*()_+=-]{8,20}$/;



    const handleSignup = () => {
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
        Swal.fire('Error', 'Password must be between 8 to 20 characters and include letters, numbers, and special characters!', 'error');
        return;
      }

      // ตรวจสอบ Password กับ Confirm Password
      if (password !== confirmPassword) {
        Swal.fire('Error', 'Passwords do not match!', 'error');
        return;
      }

      Swal.fire('Success', 'Signup completed successfully!', 'success');
      router.push({ name: 'Login' });
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
</style>