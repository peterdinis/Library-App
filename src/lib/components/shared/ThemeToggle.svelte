<script lang="ts">
import { Moon, Sun } from "lucide-svelte";
import { toggleMode } from "mode-watcher";
</script>
  
  <button
	on:click={toggleMode}
	class="relative flex items-center justify-center w-10 h-10 bg-transparent border-0 rounded-full focus:outline-none"
  >
	<Sun
	  class="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0"
	/>
	<Moon
	  class="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100"
	/>
  </button>