<script>
  import { onMount } from "svelte";
  import { Toggle, Radio } from 'flowbite-svelte';
  import Britney from "./assets/britney@2x.webp";
  import Pope from "./assets/pope@2x.webp";
  import Mark from "./assets/mark@2x.webp";
  import Kim from "./assets/kim@2x.webp";

  let currentQuizIndex = 0;
  let selectedAnswer = "";
  let correctAnswersCount = 0;
  let isDarkMode = false;

  const quizzes = [
    {
      question: "Welches Bild ist echt?",
      correctAnswer: "forest",
      options: [
        { src: Britney, message: 'Einige der 24 Millionen Follower von Paris Hilton auf Instagram waren skeptisch über die Echtheit dieses Bildes, das den Reality-Star mit Britney Spears zeigt, aber ist es echt oder AI?', fake: false },
        { src: Pope, message: 'Ist dieses Foto von Papst Franziskus echt oder wurde es von einer künstlichen Intelligenz gemacht?', fake: true },
        { src: Mark, message: 'Dieses Foto von Meta-CEO Mark Zuckerberg wurde auf Twitter 1,1 Millionen Mal angesehen, aber ist es echt oder wurde es von einer künstlichen Intelligenz gemacht?', fake: false },
        { src: Kim, message: 'Einige der 24 Millionen Follower von Paris Hilton auf Instagram waren skeptisch über die Echtheit dieses Bildes, das den Reality-Star mit Britney Spears zeigt, aber ist es echt oder AI?', fake: true },
      ],
    },
    // Add more quizzes as needed
  ];

  const handleSubmit = () => {
    if (selectedAnswer === quizzes[currentQuizIndex].correctAnswer) {
      correctAnswersCount += 1;
    }
    if (currentQuizIndex < quizzes.length - 1) {
      currentQuizIndex += 1;
      selectedAnswer = "";
    } else {
      alert(`Congratulations! You have completed the quiz with ${correctAnswersCount} correct answers.`);
    }
  };

  // Toggle Dark Mode
  const toggleDarkMode = () => {
    isDarkMode = !isDarkMode;
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  };

  onMount(() => {
    // Initialize dark mode based on user preference
    if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
      isDarkMode = true;
      document.documentElement.classList.add("dark");
    }
  });
</script>

<div class="flex items-center">
  <div class="mx-auto max-w-[50%] w-full min-w-l p-6 dark:bg-gray-800 dark:text-gray-200 shadow-2xl rounded-lg">
    <div class="mb-6 flex justify-between items-center">
      <h2 class="text-xl text-[#0055B8] font-semibold dark:text-gray-200">
        Dein Smartphone und du
      </h2>
      <div class="flex items-center">
        <Toggle checked={isDarkMode} on:change={toggleDarkMode}>
          <span class="ml-3 text-sm font-medium text-gray-900 dark:text-gray-300">{isDarkMode ? 'Heller' : 'Dunkler'} Modus</span>
        </Toggle>
      </div>
    </div>

    <div class="mb-6 text-center">
      <h3 class="text-[3rem] text-gray-800 dark:text-gray-200">
        {quizzes[currentQuizIndex].question}
      </h3>
    </div>

    <div class="grid grid-cols-2 gap-4">
      {#each quizzes[currentQuizIndex].options as option}
        <div>
          <img src={option.src} alt="Quiz option" class="border-x-8 border-y-8 rounded-lg w-full aspect-1 mx-auto object-cover" />
          <div class="max-w-[18rem] mx-auto ">
            <Toggle class="mt-4 checked:bg-blue-600" checked={option.fake}>Fake</Toggle>
            <p class="text-xs mt-5 mb-6">{option.message}</p>
          </div>
        </div>
      {/each}
    </div>

    <div class="mt-6 flex justify-end">
      <button
        class="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition-colors"
        on:click={handleSubmit}
      >
        Senden
      </button>
    </div>
  </div>
</div>
