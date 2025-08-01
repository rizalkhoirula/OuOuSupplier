<!-- components/CartSidebar.vue -->
<template>
  <Transition
    enter-active-class="transition duration-300 ease-out"
    leave-active-class="transition duration-300 ease-in"
    enter-from-class="translate-x-full"
    leave-to-class="translate-x-full"
  >
    <div
      v-if="show"
      class="fixed inset-y-0 right-0 z-50 w-full sm:w-96 bg-white dark:bg-slate-800 shadow-xl p-6 overflow-y-auto"
    >
      <div class="flex justify-between items-center mb-6">
        <h2 class="text-xl font-bold text-slate-800 dark:text-slate-100">
          Shopping Cart
        </h2>
        <button
          @click="$emit('close')"
          class="text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200"
          aria-label="Close cart"
        >
          <svg
            class="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      </div>
      <div v-if="cart.length" class="space-y-4">
        <div
          v-for="item in cart"
          :key="item.cartId"
          class="flex items-center space-x-4 border-b border-slate-200 dark:border-slate-700 pb-4"
        >
          <img
            :src="item.image"
            :alt="item.name"
            class="w-16 h-16 object-cover rounded-md"
            loading="lazy"
          />
          <div class="flex-1">
            <h3 class="text-sm font-medium text-slate-800 dark:text-slate-100">
              {{ item.name }}
            </h3>
            <p class="text-xs text-slate-500 dark:text-slate-400">
              {{ item.options.color }}, {{ item.options.ram }},
              {{ item.options.storage }}
            </p>
            <p class="text-sm font-bold text-indigo-600 dark:text-indigo-400">
              ${{ (item.price * item.quantity).toFixed(2) }}
            </p>
            <div class="flex items-center mt-2">
              <button
                @click="$emit('update-quantity', item.cartId, item.quantity - 1)"
                class="text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200"
                :aria-label="`Decrease quantity of ${item.name}`"
              >
                <svg
                  class="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M20 12H4"
                  />
                </svg>
              </button>
              <span class="mx-2 text-sm">{{ item.quantity }}</span>
              <button
                @click="$emit('update-quantity', item.cartId, item.quantity + 1)"
                class="text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200"
                :aria-label="`Increase quantity of ${item.name}`"
              >
                <svg
                  class="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M12 4v16m8-8H4"
                  />
                </svg>
              </button>
              <button
                @click="$emit('remove', item.cartId)"
                class="ml-4 text-red-500 hover:text-red-600"
                :aria-label="`Remove ${item.name} from cart`"
              >
                <svg
                  class="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5-4h4"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
        <div class="mt-6">
          <p class="text-lg font-bold text-slate-800 dark:text-slate-100">
            Total: ${{ cartTotal.toFixed(2) }}
          </p>
          <button
            class="mt-4 w-full rounded-md bg-indigo-600 text-white py-2 text-sm font-medium hover:bg-indigo-500 transition-colors"
          >
            Proceed to Checkout
          </button>
        </div>
      </div>
      <div v-else class="text-center py-16">
        <p class="text-slate-500 dark:text-slate-400">Your cart is empty</p>
        <button
          @click="$emit('close')"
          class="mt-4 text-sm font-medium text-indigo-500 hover:underline"
        >
          Continue Shopping
        </button>
      </div>
    </div>
  </Transition>
</template>

<script setup>
import { computed } from "vue";

defineProps({
  show: {
    type: Boolean,
    required: true,
  },
  cart: {
    type: Array,
    required: true,
  },
});

defineEmits(["close", "remove", "update-quantity"]);

const cartTotal = computed(() =>
  props.cart.reduce((sum, item) => sum + item.price * item.quantity, 0)
);
</script>