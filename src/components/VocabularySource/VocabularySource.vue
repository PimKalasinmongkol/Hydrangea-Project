<template>
  <head>
    <link href="https://fonts.googleapis.com/css2?family=Chakra+Petch:wght@400;700&display=swap" rel="stylesheet">
  </head>
  <div class="containers">
    <div class="boxMyVocabPage">
      <button class="MyVocabPage font-thai" @click="goToMyVocabPage">
        คลังของฉัน
      </button>
      
    </div>
    <div class="boxMyVocabPage">
      <input class="inp-username" type="text" value="NAMIDA KISUNE"/>
    </div>

    <!-- Search Section -->
    <div class="widthboxsearch">
      <div class="d-flex justify-center">
        <p class="search-label titlesearch">ค้นหาในคลังคำศัพท์รวม</p>
      </div>
      <div class="d-flex justify-center">
        <div class="d-flex justify-center widthsearch">
          <input class="justify-center inpsearch" type="text" v-model="searchQuery"
            placeholder="กรุณากรอกคำศัพท์ที่คุณต้องการหา" />
          <button class="btn-search" @click="searchVocabulary">
            <font-awesome-icon icon="search" class="d-flex justify-center search-icon" />
          </button>
        </div>
      </div>
    </div>

    <!-- Table Section -->
    <div class="d-flex justify-center pd-boxtable">
      <div class="table-container">
        <table class="vocabulary-table font-thai">
          <thead>
            <tr>
              <th class="correct">คำถูก</th>
              <th class="incorrect">คำผิด</th>
              <th class="correct">ผู้เผยแพร่</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(entry, index) in filteredEntries" :key="index">
              <td>{{ entry.correctWord }}</td>
              <td>{{ entry.wrongWords.join(', ') }}</td>
              <td>{{ entry.publisher }}</td>
            </tr>
            <tr v-if="filteredEntries.length === 0">
              <td colspan="3" class="no-results">ไม่พบผลลัพธ์ที่ตรงกัน</td>
            </tr>
          </tbody>
        </table>
        <!-- Button Logout -->
      <div class="d-flex justify-content-end mt-3" style="position: absolute; bottom: 20px; right: 20px;">
        <button class="btn-logout" @click="goTologinPage">ออกจากระบบ</button>
      </div>
      </div>
    </div>

  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const searchQuery = ref('');
const vocabularyEntries = ref([
  { correctWord: 'สวัสดี', wrongWords: ['สวัดดี', 'สวัสดี๊'], publisher: 'ผู้ใช้ A' },
  { correctWord: 'ขอบคุณ', wrongWords: ['ขอบคุน', 'ขอบคุณมาก'], publisher: 'ผู้ใช้ B' },
  { correctWord: 'เรียน', wrongWords: ['รียน', 'เรียนรู้'], publisher: 'ผู้ใช้ C' },
  { correctWord: 'สวัสดี', wrongWords: ['สวัดดี', 'สวัสดี๊'], publisher: 'ผู้ใช้ D' },
  { correctWord: 'เรียน', wrongWords: ['รียน', 'เรียนรู้'], publisher: 'ผู้ใช้ C' },
  { correctWord: 'สวัสดี', wrongWords: ['สวัดดี', 'สวัสดี๊'], publisher: 'ผู้ใช้ D' },
  { correctWord: 'เรียน', wrongWords: ['รียน', 'เรียนรู้'], publisher: 'ผู้ใช้ C' },
  { correctWord: 'สวัสดี', wrongWords: ['สวัดดี', 'สวัสดี๊'], publisher: 'ผู้ใช้ D' },
  { correctWord: 'เรียน', wrongWords: ['รียน', 'เรียนรู้'], publisher: 'ผู้ใช้ C' },
  { correctWord: 'สวัสดี', wrongWords: ['สวัดดี', 'สวัสดี๊'], publisher: 'ผู้ใช้ D' },
]);

const filteredEntries = ref([...vocabularyEntries.value]); // เริ่มต้นด้วยข้อมูลทั้งหมด

const goToMyVocabPage = () => {
  router.push({ name: 'MyVocab' });
};

const goTologinPage = () => {
  router.push({ name: 'Login' });
};

const searchVocabulary = () => {
  // ค้นหาคำศัพท์เมื่อกดปุ่มค้นหา
  console.log(`Searching for: ${searchQuery.value}`);

  if (!searchQuery.value) {
    filteredEntries.value = [...vocabularyEntries.value]; // แสดงทั้งหมดถ้าไม่มีคำค้นหา
  } else {
    filteredEntries.value = vocabularyEntries.value.filter(entry =>
      entry.correctWord.includes(searchQuery.value) ||
      entry.wrongWords.some(wrongWord => wrongWord.includes(searchQuery.value))
    );
  }
};
</script>

<style scoped>
.containers {
  display: flex;
  flex-direction: column;
  background-image: url(https://img5.pic.in.th/file/secure-sv1/Hydrangea.jpg);
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  padding-top: 20px;
  height: 100vh;
}

.boxMyVocabPage {
  display: flex;
  justify-content: flex-end;
}

.pd-boxtable{
  padding: 3% 10% 0 10%;
}

.table-container {
  width: 100%;
  max-height: 400px;
  overflow-x: auto;
  overflow-y: auto;
}



.vocabulary-table {
  width: 100%;
  border-collapse: collapse;
  font-size: 1.2rem;
}

.vocabulary-table th,
.vocabulary-table td {
  border: 1px solid #000;
  padding: 12px;

}

.vocabulary-table th {
  font-weight: bold;
  color: #F8F8FF;
}

.vocabulary-table td {
  background-color: #D2D2D2;
  text-align: left;
}

.d-flex {
  display: flex;
}

.correct {
  background-color: #487251;
}

.incorrect {
  background-color: #7D2A2B;
}

.justify-center {
  justify-content: center;
}

.widthsearch {
  width: 70%;
  height: 3.5rem;
  padding: 0.5rem;
  border-radius: 0.5rem;
  background-color: #F8F8FF;
  border: 2px solid #ccc;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
}



.btn-search {
  border: none;
  background-color: #F8F8FF;
  color: rgb(0, 0, 0);
  padding: 0.5rem 1rem;
  margin-left: 0.5rem;
  border-radius: 0.5rem;
  cursor: pointer;
  transition: background-color 0.3s ease, transform 0.2s ease;
}

.btn-search:hover {
  background-color: #d4d4d4;
  transform: scale(1.1);
}

.inp-username {
  padding: 10px 20px;
  margin: 0 20px 0 20px;
  border: none;
  outline: none;
  border-radius: 5px;
  font-size: 1.2rem;
  margin-top: 10px;
  text-align: right; 
  font-family: 'Chakra Petch', sans-serif;
}


.MyVocabPage {
  justify-content: end;
  margin: 0 20px 0 20px;
  background-color: #3131A3;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  font-size: 1.2rem;
  cursor: pointer;
  transition: background-color 0.3s ease, transform 0.2s ease;
}

.MyVocabPage:hover {
  background-color: #1c1c5b;
  transform: scale(1.05);
}

.MyVocabPage:active {
  transform: scale(0.95);
}


.widthboxsearch {
  width: 100%;
  padding: 1%;
}


.search-label {
  text-align: left;
  margin-bottom: 0.5rem;
  font-size: 1rem;
  color: rgb(0, 0, 0);
}

.vocabulary-table thead th {
  position: sticky;
  top: 0; 
  z-index: 1;
}


.inpsearch {
  width: 100%;
  font-size: 1.2rem;
  font-family: 'Chakra Petch', sans-serif;
  border: none;
  padding: 0.5rem;
  outline: none;
  background-color: #F8F8FF;
}

.titlesearch {
  width: 70%;
  font-size: 1.2rem;
  font-weight: bold;
  font-family: 'Chakra Petch', sans-serif;
  color: #F8F8FF;
}

.search-icon {
  font-size: 1.2rem;
  align-items: center;
}

.no-results {
  text-align: center;
  color: red;
  font-weight: bold;
}

.btn-logout {
  margin: 0 20px 0 20px;
  background-color: #A33133;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  font-size: 1.2rem;
  cursor: pointer;
  transition: background-color 0.3s ease, transform 0.2s ease;
}

.btn-logout:hover {
  background-color: #661f20;
  transform: scale(1.05);
}

.btn-logout:active {
  transform: scale(0.95);
}

</style>
