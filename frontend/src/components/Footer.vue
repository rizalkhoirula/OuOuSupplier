<template>
  <footer class="bg-slate-900 text-slate-300">
    <div class="mx-auto max-w-screen-2xl px-4 py-12 sm:px-6 lg:px-8">
      <div class="grid grid-cols-2 md:grid-cols-4 gap-8">
        <div class="col-span-2 md:col-span-1">
          <a href="#" class="flex items-center space-x-2">
            <svg
              class="h-7 w-7 text-indigo-400"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path
                d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-.01L12 2z"
              />
            </svg>
            <span class="text-xl font-bold text-white">VueMobile</span>
          </a>
          <p class="mt-4 text-sm leading-relaxed">
            Toko smartphone terpercaya. Garansi resmi & harga terbaik.
          </p>
        </div>

        <div>
          <h3 class="font-semibold text-white">Tautan Cepat</h3>
          <ul class="mt-4 space-y-2 text-sm">
            <li><a href="#" class="hover:text-white">Tentang Kami</a></li>
            <li><a href="#" class="hover:text-white">Hubungi Kami</a></li>
            <li>
              <a href="#" class="hover:text-white">Kebijakan Privasi</a>
            </li>
          </ul>
        </div>

        <div>
          <h3 class="font-semibold text-white">Ikuti Kami</h3>
          <div class="mt-4 flex space-x-4">
            <a href="#" class="hover:text-white">Facebook</a>
            <a href="#" class="hover:text-white">Twitter</a>
            <a href="#" class="hover:text-white">Instagram</a>
          </div>
        </div>

        <div>
          <h3 class="font-semibold text-white">Newsletter</h3>
          <p class="mt-2 text-sm">Dapatkan promo & produk terbaru.</p>
          <form class="mt-3">
            <input
              type="email"
              placeholder="Email Anda"
              class="w-full rounded-md bg-slate-800 border border-slate-700 px-3 py-2 text-sm focus:outline-none focus:border-indigo-500"
            />
          </form>
        </div>
      </div>

      <div class="mt-12 border-t border-slate-700 pt-6 text-center text-sm">
        &copy; {{ new Date().getFullYear() }} VueMobile. All rights reserved.
      </div>
    </div>
  </footer>
</template>

<script setup>
// No script needed for this simple component
</script>
