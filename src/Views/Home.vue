<template>
  <div class="bg-gray-50 font-sans antialiased">
    <section class="relative h-[80vh] min-h-[600px] flex items-center justify-center text-white overflow-hidden">
      <div 
        class="absolute inset-0 bg-cover bg-center transition-transform duration-1000 ease-out transform hover:scale-105"
        :style="{ backgroundImage: `url('https://media.timeout.com/images/106013965/1920/1080/image.jpg')` }"
      ></div>
      <div class="absolute inset-0 bg-gradient-to-t from-violet-900 via-violet-900/10 to-transparent"></div>

      <div class="relative z-10 text-center p-4 max-w-4xl mx-auto">
        <h1 class="text-4xl md:text-6xl font-extrabold tracking-tight drop-shadow-lg animate-fade-in-down">
          <span v-if="user.isLoggedIn" class="text-white">Chào mừng {{ user.username }}</span>
          <span v-else class="text-white">Tri thức là vô hạn</span>
        </h1>
        <p class="mt-6 text-lg md:text-xl text-gray-300 leading-relaxed max-w-2xl mx-auto animate-fade-in-up delay-200">
          Đắm mình vào thế giới sách, từ những câu chuyện cổ điển đến tri thức hiện đại, mọi lúc mọi nơi.
        </p>
        
        <div class="mt-10 max-w-xl mx-auto animate-fade-in-up delay-200">
          <form @submit.prevent="handleSearch" class="flex items-center bg-white rounded-full shadow-2xl p-2 group">
            <input 
              v-model="searchQuery"
              type="text" 
              placeholder="Tìm kiếm sách, tác giả, thể loại..."
              class="w-full bg-transparent px-5 py-3 text-gray-800 placeholder-gray-500 focus:outline-none text-lg"
            />
            <button type="submit" class="bg-violet-900/90 text-white rounded-full p-4 hover:bg-violet-700 transition-all duration-300 transform group-hover:scale-105 active:scale-95 shadow-lg flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" class="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </button>
          </form>
        </div>
      </div>
    </section>

    <section 
      ref="featuredBooksSection" 
      class="max-w-7xl mx-auto px-6 sm:px-8 lg:px-10 py-20 bg-white shadow-lg rounded-xl -mt-16 relative z-20 
             transform transition-all duration-700 ease-out hover:-translate-y-2" 
      :class="{ 
        'opacity-0 translate-y-10': !isFeaturedBooksSectionVisible, 
        'opacity-100 translate-y-0': isFeaturedBooksSectionVisible 
      }"
    >
      <h2 class="text-4xl font-extrabold text-gray-900 mb-12 text-center relative after:absolute after:w-20 after:h-1 after:bg-gray-800 after:bottom-[-10px] after:left-1/2 after:-translate-x-1/2 after:rounded-full">
        Sách Nổi Bật <span class="text-gray-800">Trong Tuần</span>
      </h2>
      <div v-if="featuredBooks.length > 0" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
        <BookCard
          v-for="book in featuredBooks"
          :key="book._id"
          :book="book"
          class="transition-transform duration-300 hover:scale-105 hover:shadow-xl rounded-lg overflow-hidden"
        />
      </div>
      <div v-else class="text-center text-gray-500 text-xl py-10">
        <p>Đang tải những cuốn sách nổi bật nhất...</p>
      </div>
      <div class="mt-16 text-center">
        <router-link to="/books" class="inline-flex items-center bg-gray-800 text-white px-10 py-4 rounded-full font-semibold text-lg hover:bg-gray-700 transition-all duration-300 shadow-xl transform hover:-translate-y-1 animate-bounce-subtle">
          Xem Tất Cả Sách 
          <svg class="ml-3 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path></svg>
        </router-link>
      </div>
    </section>

    <section 
      ref="quoteSection" 
      class="bg-gray-800 text-white py-20 px-6 sm:px-8 lg:px-10 mt-16 shadow-inner relative overflow-hidden
             transform transition-all duration-700 ease-out"
      :class="{ 
        'opacity-0 translate-y-10': !isQuoteSectionVisible, 
        'opacity-100 translate-y-0': isQuoteSectionVisible 
      }"
    >
        <div 
            class="absolute inset-0 opacity-10 bg-cover bg-center"
            :style="{ backgroundImage: `url('https://images.pexels.com/photos/990432/pexels-photo-990432.jpeg')` }"
        ></div>
        <div class="relative z-10 max-w-4xl mx-auto text-center">
            <p class="text-3xl md:text-4xl font-serif italic leading-relaxed mb-8">
                "The more that you read, the more things you will know. The more that you learn, the more places you’ll go.”
            </p>
            <p class="text-xl font-semibold text-gray-300 delay-100">
                - Dr Seuss
            </p>
            <img 
                src="https://allthatsinteresting.com/wordpress/wp-content/uploads/2018/05/theodor-geisel-1957.jpg" 
                alt="Người đang đọc sách" 
                class="w-32 h-32 rounded-full mx-auto mt-10 object-cover shadow-xl border-4 border-gray-600 delay-200"
            >
        </div>
    </section>

    <section 
      ref="aboutSection1" 
      class="max-w-7xl mx-auto px-6 sm:px-8 lg:px-10 py-20 flex flex-col md:flex-row items-center gap-12 bg-white rounded-xl shadow-lg mt-16 
             transform transition-all duration-700 ease-out hover:-translate-y-2"
      :class="{ 
        'opacity-0 -translate-x-10': !isAboutSection1Visible, 
        'opacity-100 translate-x-0': isAboutSection1Visible 
      }"
    >
      <div class="md:w-1/2 flex justify-center">
        <img 
          src="https://images.pexels.com/photos/5913138/pexels-photo-5913138.jpeg" 
          alt="Thư viện hiện đại" 
          class="rounded-xl shadow-2xl w-full max-w-md h-auto object-cover transform transition-transform duration-500 hover:scale-105"
        >
      </div>
      <div class="md:w-1/2 text-center md:text-left">
        <h3 class="text-3xl font-extrabold text-gray-900 mb-6">Khám Phá Bộ Sưu Tập Khổng Lồ</h3>
        <p class="text-lg text-gray-700 leading-relaxed mb-8">
          Với hàng ngàn đầu sách từ mọi thể loại, chúng tôi mang đến cho bạn một thế giới tri thức vô tận ngay trong tầm tay. Dù bạn yêu thích tiểu thuyết, khoa học, lịch sử hay tự phát triển, thư viện của chúng tôi luôn có điều gì đó dành cho bạn.
        </p>
        <router-link to="/books" class="inline-flex items-center bg-gray-800 text-white px-8 py-3 rounded-full font-semibold hover:bg-gray-900 transition-all duration-300 shadow-md">
          Xem Thể Loại
          <svg class="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path></svg>
        </router-link>
      </div>
    </section>

    <section 
      ref="aboutSection2" 
      class="max-w-7xl mx-auto px-6 sm:px-8 lg:px-10 py-20 flex flex-col md:flex-row-reverse items-center gap-12 bg-white rounded-xl shadow-lg mt-16 
             transform transition-all duration-700 ease-out hover:-translate-y-2"
      :class="{ 
        'opacity-0 translate-x-10': !isAboutSection2Visible, 
        'opacity-100 translate-x-0': isAboutSection2Visible 
      }"
    >
      <div class="md:w-1/2 flex justify-center">
        <img 
          src="https://images.pexels.com/photos/2846814/pexels-photo-2846814.jpeg" 
          alt="Người đọc sách trên thiết bị di động" 
          class="rounded-xl shadow-2xl w-full max-w-md h-auto object-cover transform transition-transform duration-500 hover:scale-105"
        >
      </div>
      <div class="md:w-1/2 text-center md:text-left">
        <h3 class="text-3xl font-extrabold text-gray-900 mb-6">Đọc Sách Mọi Lúc, Mọi Nơi</h3>
        <p class="text-lg text-gray-700 leading-relaxed mb-8">
          Trải nghiệm đọc sách tiện lợi trên mọi thiết bị của bạn. Với giao diện thân thiện và tính năng đồng bộ, bạn có thể tiếp tục hành trình tri thức của mình dù ở nhà, trên đường, hay bất cứ đâu.
        </p>
        <router-link to="/auth/register" class="inline-flex items-center bg-gray-800 text-white px-8 py-3 rounded-full font-semibold hover:bg-gray-700 transition-all duration-300 shadow-md">
          Đăng Ký Miễn Phí
          <svg class="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM12 14c-1.478 0-2.923.473-4.204 1.334L4 18l1.397-2.794C6.205 14.887 7.55 14 9 14h6c1.45 0 2.795.887 3.603 2.206L20 18l-3.796-2.666C14.923 14.473 13.478 14 12 14z"></path></svg>
        </router-link>
      </div>
    </section>

  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import apiClient from '../services/apiService'
import { useRouter } from 'vue-router';
import BookCard from '../components/BookCard.vue';
import { useUserStore } from '../stores/userStore';

const featuredBooks = ref([]);
const user = useUserStore();
const searchQuery = ref('');
const router = useRouter();

// Refs cho các section để theo dõi Intersection
const featuredBooksSection = ref(null);
const quoteSection = ref(null);
const aboutSection1 = ref(null);
const aboutSection2 = ref(null);

// State để kiểm soát hiển thị animation
const isFeaturedBooksSectionVisible = ref(false);
const isQuoteSectionVisible = ref(false);
const isAboutSection1Visible = ref(false);
const isAboutSection2Visible = ref(false);

const fetchFeaturedBooks = async () => {
  try {
    const res = await apiClient.get('/books');
    featuredBooks.value = res.data.slice(0, 8); 
  } catch (err) {
    console.error('Lỗi khi tải sách nổi bật:', err);
  }
};

const handleSearch = () => {
  if (searchQuery.value.trim()) {
    router.push({ name: 'BookList', query: { q: searchQuery.value.trim() } });
  }
};

onMounted(() => {
  fetchFeaturedBooks();

  const observer = new IntersectionObserver(
    (entries, observerInstance) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          // Khi section hiện lên, đặt trạng thái hiển thị thành true
          if (entry.target === featuredBooksSection.value) {
            isFeaturedBooksSectionVisible.value = true;
          } else if (entry.target === quoteSection.value) {
            isQuoteSectionVisible.value = true;
          } else if (entry.target === aboutSection1.value) {
            isAboutSection1Visible.value = true;
          } else if (entry.target === aboutSection2.value) {
            isAboutSection2Visible.value = true;
          }
          // Ngừng theo dõi section này để animation chỉ chạy một lần
          observerInstance.unobserve(entry.target);
        }
      });
    },
    {
      root: null, // viewport là root
      rootMargin: '0px', // Không có margin thêm
      threshold: 0.2 // Kích hoạt khi 20% của phần tử xuất hiện trong viewport
    }
  );

  // Bắt đầu theo dõi các section
  if (featuredBooksSection.value) observer.observe(featuredBooksSection.value);
  if (quoteSection.value) observer.observe(quoteSection.value);
  if (aboutSection1.value) observer.observe(aboutSection1.value);
  if (aboutSection2.value) observer.observe(aboutSection2.value);

  // Lưu observer để có thể disconnect khi component unmount
  onUnmounted(() => {
    observer.disconnect();
  });
});
</script>

<style>

@keyframes fadeInDown {
  from { opacity: 0; transform: translateY(-20px); }
  to { opacity: 1; transform: translateY(0); }
}

@keyframes fadeInUp {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}

@keyframes bounceSubtle {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-5px); }
}

.animate-fade-in-down { animation: fadeInDown 0.8s ease-out forwards; }
.animate-fade-in-up { animation: fadeInUp 0.8s ease-out forwards; }
.animate-bounce-subtle { animation: bounceSubtle 1.5s infinite ease-in-out; }
</style>