<script lang="ts">
  import svelteLogo from "./assets/svelte.svg";
  import viteLogo from "/vite.svg";
  import Counter from "./lib/Counter.svelte";
  import Escape from "./Escape.svelte";
  import ArdVideo from "./ArdVideo.svelte";
  import NetLogo from "./assets/netpaed_jena_logoTrans.png";
  import FakeImage from "./FakeImage.svelte";
</script>


<body>

<main class="grid grid-rows-[50px_1fr_100px] h-full">
  <img alt="" class="mx-auto aspect-auto max-w-[5rem]" src={NetLogo} />
  <ArdVideo />
  <Escape />
</main>
</body>