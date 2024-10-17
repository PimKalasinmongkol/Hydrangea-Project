// src/router/index.ts
import { createRouter, createWebHistory } from 'vue-router';
import MyVocab from '../components/myVocab/myVocab.vue';
import VocabularySource from '../components/VocabularySource/VocabularySource.vue';
import ChangeNewPassword from '@/components/ForgotPassword/ChangeNewPassword/ChangeNewPassword.vue';
import ConfirmOTP from '@/components/ForgotPassword/ConfirmOTP/ConfirmOTP.vue';
import sentOTP from '@/components/ForgotPassword/sentOTP/sentOTP.vue';
import Login from '@/components/Login/Login.vue';

const routes = [
  {
    path: '/',
    name: 'Login',
    component: Login,
  },
  {
    path: '/My-Vocab',
    name: 'MyVocab',
    component: MyVocab
  },
  {
    path: '/vocabulary-source',
    name: 'VocabularySource',
    component: VocabularySource
  },
  {
    path: '/Change-New-Password',
    name: 'ChangeNewPassword',
    component: ChangeNewPassword
  },
  {
    path: '/Confirm-OTP',
    name: 'ConfirmOTP',
    component: ConfirmOTP
  },
  {
    path: '/sent-OTP',
    name: 'sentOTP',
    component: sentOTP
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
