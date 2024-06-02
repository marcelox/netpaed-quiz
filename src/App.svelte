<script lang="ts">
  import svelteLogo from "./assets/svelte.svg";
  import viteLogo from "/vite.svg";
  import Counter from "./lib/Counter.svelte";
  import Escape from "./Escape.svelte";
  import NetLogo from "./assets/netpaed_jena_logoTrans.png";
</script>

<main class="grid grid-rows-[100px_1fr_100px] h-full">
  <img alt="" class="mx-auto aspect-auto max-w-28" src={NetLogo} />
  <Escape />
</main>

<style></style>
