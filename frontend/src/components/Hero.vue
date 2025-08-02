<template>
  <section
    class="relative flex items-center justify-center bg-cover bg-center py-24 sm:py-32 text-center text-white"
    :style="{
      backgroundImage: `linear-gradient(rgba(15,23,42,.75),rgba(15,23,42,.75)), url(${heroImg})`,
    }"
  >
    <div class="mx-auto max-w-3xl px-4">
      <h1
        class="text-4xl sm:text-5xl md:text-6xl font-extrabold leading-tight"
      >
        Teknologi Terbaru di Ujung Jari Anda
      </h1>
      <p class="mt-6 text-lg text-slate-200 max-w-xl mx-auto">
        Jelajahi koleksi smartphone terbaru dari merek-merek ternama dunia.
        Penawaran terbaik menanti Anda.
      </p>
      <a
        href="#products"
        class="mt-10 inline-block rounded-full bg-white px-8 py-3 text-sm font-semibold text-slate-900 shadow-lg hover:bg-slate-100 transition-transform transform hover:scale-105"
      >
        Belanja Sekarang
      </a>
    </div>
  </section>
</template>

<script setup>
defineProps({
  heroImg: {
    type: String,
    required: true,
  },
});
</script>
