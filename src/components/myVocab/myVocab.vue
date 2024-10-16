<!-- src/views/Home.vue -->
<template>
  <div class="main-container font-thai"> <!-- Container สำหรับจัดกลาง -->
    <div class="container p-4">
      <div class="row">
        <div class="col-md-6">
          <div class="form-group text-white">
            <label for="textInput1">คำที่ถูกต้อง</label>
            <input type="text" class="form-control" id="textInput1" v-model="inputText1" placeholder="พิมพ์ที่นี่..." />
          </div>
        </div>
        <div class="col-md-6">
          <div class="form-group text-white">
            <label for="textInput2">คำที่ชอบเขียนผิด</label>
            <input type="text" class="form-control" id="textInput2" v-model="inputText2" placeholder="พิมพ์ที่นี่..." />
          </div>
        </div>
        <button class="btn btn-primary mt-4" @click="submitText">บันทึกข้อความ</button>
        <button class="btn btn-warning mt-3 text-white" @click="exportToExcel">ส่งออกเป็น Excel</button>
      </div>

      <!-- Search Input -->
      <div class="form-group mt-4 text-white">
        <label for="searchInput">ค้นหาในคลังคำศัพท์ของฉัน</label>
        <input type="text" class="form-control" id="searchInput" v-model="searchTerm" placeholder="ค้นหาข้อความ..." />
      </div>

      <!-- Messages Table -->
      <div class="table-container"> <!-- Container สำหรับตาราง -->
        <table class="table table-striped ">
          <thead>
            <tr>
              <th class="correct-header"><b>คำที่ถูกต้อง</b></th>
              <th class="incorrect-header"><b>คำที่ชอบเขียนผิด</b></th>
              <th class="manage-header"><b>การจัดการ</b></th>
            </tr>
          </thead>

          <tbody>
            <tr v-for="(msg, index) in filteredMessages" :key="index">
              <td>{{ msg.correct }}</td>
              <td>{{ msg.incorrect }}</td>
              <td class="d-flex justify-content-center ">
                <button class="btn btn-secondary btn-sm mr-2" @click="editMessage(index)">แก้ไข</button>
                <button class="btn btn-danger btn-sm mx-2" @click="deleteMessage(index)">ลบ</button>
              </td>
            </tr>
            <tr v-if="filteredMessages.length === 0">
              <td colspan="3" class="text-center">ไม่พบข้อมูล</td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Button Back to Main -->
      <div class="d-flex justify-content-end mt-3" style="position: absolute; top: 20px; right: 20px;">
        <button class="btn-vocabsoure" @click="goToVocabularySourcePage">คำศัพท์ทั้งหมด</button>
      </div>

      <div class="d-flex justify-content-end mt-3" style="position: absolute; top: 80px; right: 20px;">
        <input class="inp-username" type="text" value="NAMIDA KISUNE"/>
      </div>

      <!-- Button Logout -->
      <div class="d-flex justify-content-end mt-3" style="position: absolute; bottom: 20px; right: 20px;">
        <button class="btn-logout" @click="goTologinPage">ออกจากระบบ</button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue';
import * as XLSX from 'xlsx';
import { useRouter } from 'vue-router';

const router = useRouter();

const goToVocabularySourcePage = () => {
  router.push({ name: 'VocabularySource' });
};

const goTologinPage = () => {
  router.push({ name: 'Login' });
};

const inputText1 = ref('');
const inputText2 = ref('');
const searchTerm = ref('');
const editIndex = ref<number | null>(null);

// ข้อมูลตัวอย่างเริ่มต้น
const messages = ref([
  { correct: 'รับประทาน', incorrect: 'รับประทาน' },
  { correct: 'โทรศัพท์', incorrect: 'โทรศัพย์' },
  { correct: 'มหาวิทยาลัย', incorrect: 'มหาวิทยาลัย' },
  { correct: 'ขอโทษ', incorrect: 'ขอโทษ' },
  { correct: 'บริการ', incorrect: 'บริการ' },
  { correct: 'ประเทศ', incorrect: 'ประเทษ' },
  { correct: 'สวัสดี', incorrect: 'สวัสดี' },
  { correct: 'เพื่อน', incorrect: 'เพื่อน' },
  { correct: 'วิศวกรรม', incorrect: 'วิศวกรรม' },
  { correct: 'วรรณกรรม', incorrect: 'วรรณกรรมน' },
]);

const filteredMessages = computed(() =>
  messages.value.filter((msg) =>
    msg.correct.toLowerCase().includes(searchTerm.value.toLowerCase()) ||
    msg.incorrect.toLowerCase().includes(searchTerm.value.toLowerCase())
  )
);

watch(inputText1, () => {
  updateIncorrectText(); // อัปเดต inputText2 เมื่อ inputText1 เปลี่ยนแปลง
});

watch(inputText2, () => {
  updateCorrectText(); // อัปเดต inputText1 เมื่อ inputText2 เปลี่ยนแปลง
});

const submitText = () => {
  if (inputText1.value && inputText2.value) {
    if (editIndex.value !== null) {
      const message = messages.value[editIndex.value];
      if (message.correct !== inputText1.value) {
        message.correct = inputText1.value;
      }
      if (message.incorrect !== inputText2.value) {
        message.incorrect = inputText2.value;
      }
      messages.value[editIndex.value] = { ...message };
      editIndex.value = null; // รีเซ็ตตัวแปร index หลังแก้ไข
      alert("บันทึกการแก้ไขแล้ว!");
    } else {
      const existingIndex = messages.value.findIndex(msg =>
        msg.correct === inputText1.value || msg.incorrect === inputText2.value
      );

      if (existingIndex !== -1) {
        const message = messages.value[existingIndex];
        if (message.correct !== inputText1.value) {
          message.correct = inputText1.value;
        }
        if (message.incorrect !== inputText2.value) {
          message.incorrect = inputText2.value;
        }
        messages.value[existingIndex] = { ...message };
        alert("บันทึกการแก้ไขแล้ว!");
      } else {
        messages.value.push({
          correct: inputText1.value,
          incorrect: inputText2.value
        });
        alert("บันทึกคำใหม่แล้ว!");
      }
    }
    inputText1.value = '';
    inputText2.value = '';
  } else {
    alert("กรุณากรอกข้อมูลทั้งสองช่อง");
  }
};

const exportToExcel = () => {
  const header = [
    { header: 'คำที่ถูกต้อง', key: 'correct' },
    { header: 'คำที่ชอบเขียนผิด', key: 'incorrect' },
  ];

  const worksheet = XLSX.utils.json_to_sheet(messages.value);
  const newHeader = header.map(h => h.header);
  XLSX.utils.sheet_add_aoa(worksheet, [newHeader], { origin: 'A1' });

  const columnWidths = [{ wch: 20 }, { wch: 20 }];
  worksheet['!cols'] = columnWidths;

  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, 'Messages');

  XLSX.writeFile(workbook, 'vocabulary.xlsx');
};

const deleteMessage = (index: number) => {
  messages.value.splice(index, 1); // ลบข้อความตาม index
};

const editMessage = (index: number) => {
  const msg = messages.value[index];
  inputText1.value = msg.correct;
  inputText2.value = msg.incorrect;
  editIndex.value = index;
};

const updateIncorrectText = () => {
  const match = messages.value.find(msg => msg.correct === inputText1.value);
  if (match) {
    inputText2.value = match.incorrect; // แสดงคำที่ชอบเขียนผิดที่ตรงกัน
  }
};

const updateCorrectText = () => {
  const match = messages.value.find(msg => msg.incorrect === inputText2.value);
  if (match) {
    inputText1.value = match.correct; // แสดงคำที่ถูกต้องที่ตรงกัน
  }
};
</script>


<style scoped>
.main-container {
  display: flex;
  /* ใช้ Flexbox */
  justify-content: center;
  /* จัดกลางแนวนอน */
  align-items: center;
  /* จัดกลางแนวตั้ง */
  height: 100vh;
  /* ความสูงของ container ครอบคลุมทั้งหน้าจอ */
  background-image: url(https://img5.pic.in.th/file/secure-sv1/Hydrangea.jpg);
  /* เพิ่มภาพพื้นหลัง */
  background-size: cover;
  /* ปรับขนาดให้ครอบคลุมเต็มหน้าจอ */
  background-position: center;
  /* จัดตำแหน่งให้ภาพอยู่ตรงกลาง */
  background-repeat: no-repeat;
  /* ไม่ให้ภาพซ้ำ */
}

.container {
  margin: auto;
  /* ใช้ margin auto เพื่อให้อยู่กลาง */
  padding: 20px;
  margin-top: 40px;
  background-color: rgba(30, 24, 24, 0.5);
  /* เพิ่มพื้นหลังโปร่งแสงเพื่อให้มองเห็นภาพพื้นหลัง */
  max-width: 100vh;
  /* เพิ่มความกว้างเป็น 1000px */
  height: 90vh;
  width: 100%;
  /* ให้กว้างเต็มพื้นที่ */
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

.table-container {
  max-height: 350px;
  /* กำหนดความสูงสูงสุดให้กับตาราง */
  overflow-y: auto;
  /* ทำให้สามารถเลื่อนแนวตั้งได้ */
  margin-top: 20px;
  /* เพิ่มระยะห่างให้กับตาราง */

}

label {
  display: flex;
  justify-content: start;
}

thead th {
  position: sticky;
  top: 0;
  color: white;
  /* เปลี่ยนสีตัวอักษรของหัวตาราง */
  z-index: 1;
}

.correct-header {
  background-color: #4CAF50;
  /* สีเขียวสำหรับคำที่ถูกต้อง */
  color: white;
}

.incorrect-header {
  background-color: #f44336;
  /* สีแดงสำหรับคำที่ชอบเขียนผิด */
  color: white;
}

.manage-header {
  background-color: #566667;
  /* สีสำหรับการจัดการ */
  color: white;
}

.table {
  width: 100%;
  /* ให้ตารางกว้างเต็มที่ */

}

tbody tr:hover {
  background-color: #f1f1f1;
  /* เปลี่ยนสีเมื่อเมาส์อยู่เหนือแถว */
}

.btn-vocabsoure {
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

.btn-vocabsoure:hover {
  background-color: #1c1c5b;
  transform: scale(1.05);
}

.btn-vocabsoure:active {
  transform: scale(0.95);
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