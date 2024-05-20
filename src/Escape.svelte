<script>
  import confetti from 'canvas-confetti';
  import { onMount } from 'svelte';

  let currentPuzzleIndex = 0;
  let userAnswer = '';
  let showHint = false;
  let correctAnswersCount = 0;
  let isDarkMode = false;

  const puzzles = [
    {
      question: 'What color was the ball in the video?',
      hint: 'Think about the most striking color.',
      correctAnswer: 'red',
      videoLink: 'https://www.youtube.com/embed/3RBlqxAKbuE',
    },
    {
      question: 'What was the main theme of the video?',
      hint: 'It’s related to nature.',
      correctAnswer: 'forest',
      videoLink: 'https://www.youtube.com/embed/mC6u_9ZzDvo',
    },
    {
      question: 'Who was the main character in the video?',
      hint: 'Think about the person who appeared the most.',
      correctAnswer: 'john',
      videoLink: 'https://www.youtube.com/embed/NpEaa2P7qZI',
    },
  ];

  const handleSubmit = () => {
    if (userAnswer.toLowerCase() === puzzles[currentPuzzleIndex].correctAnswer) {
      correctAnswersCount += 1;
      // Trigger confetti
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
      });
    }
    if (currentPuzzleIndex < puzzles.length - 1) {
      currentPuzzleIndex += 1;
      userAnswer = '';
      showHint = false;
    } else {
      alert(`Congratulations! You've completed the escape game with ${correctAnswersCount} correct answers.`);
    }
  };

  const handleShowHint = () => {
    showHint = true;
  };

  // Toggle Dark Mode
  const toggleDarkMode = () => {
    isDarkMode = !isDarkMode;
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  onMount(() => {
    // Initialize dark mode based on user preference
    if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
      isDarkMode = true;
      document.documentElement.classList.add('dark');
    }
  });
</script>

<div class="flex items-center">
  <div class="mx-auto max-w-xl w-full min-w-l p-6 dark:bg-gray-800 dark:text-gray-200 shadow-lg rounded-lg">
    <div class="mb-6 flex justify-between items-center">
      <h2 class="text-xl font-semibold text-gray-800 dark:text-gray-200">Escape Room Game</h2>
      <div class="text-right">
        <p>Fortschritt: {currentPuzzleIndex + 1} / {puzzles.length}</p>
        <p>Correct Answers: {correctAnswersCount}</p>
      </div>
    </div>

    <div class="mb-6 flex justify-end">
      <label class="relative inline-flex items-center cursor-pointer">
        <input type="checkbox" value="" class="sr-only peer" bind:checked={isDarkMode} on:change={toggleDarkMode}>
        <div class="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
        <span class="ml-3 text-sm font-medium text-gray-900 dark:text-gray-300">Dark Mode</span>
      </label>
    </div>
    
    {#if currentPuzzleIndex < puzzles.length}
      <div class="mb-6">
        <h3 class="text-xl font-semibold text-gray-800 dark:text-gray-200">Puzzle {currentPuzzleIndex + 1}</h3>
        <div class="embed-responsive aspect-ratio-16/9 mb-4">
          <iframe class="embed-responsive-item w-full h-full" src={puzzles[currentPuzzleIndex].videoLink} frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
        </div>
      </div>
      <div class="mb-6">
        <h3 class="text-lg text-gray-800 dark:text-gray-200">{puzzles[currentPuzzleIndex].question}</h3>
      </div>
      <div class="mb-6">
        <input
          class="border border-gray-300 dark:border-gray-600 p-2 w-full rounded bg-gray-50 dark:bg-gray-700 dark:text-gray-200"
          type="text"
          bind:value={userAnswer}
          placeholder="Your answer"
        />
      </div>
      <div class="flex justify-between items-center">
        <button
          class="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition-colors"
          on:click={handleSubmit}
        >
          Submit
        </button>
        <button
          class="bg-gray-600 text-white py-2 px-4 rounded hover:bg-gray-700 transition-colors"
          on:click={handleShowHint}
        >
          Hint
        </button>
      </div>
      {#if showHint}
        <div class="mt-4 text-gray-600 dark:text-gray-400">
          <p>Hint: {puzzles[currentPuzzleIndex].hint}</p>
        </div>
      {/if}
    {:else}
      <div class="mb-6">
        <h2 class="text-2xl font-semibold text-gray-800 dark:text-gray-200">Congratulations! You've escaped!</h2>
        <p>You answered {correctAnswersCount} out of {puzzles.length} questions correctly.</p>
      </div>
    {/if}
  </div>
</div>
<style>
  .embed-responsive {
    position: relative;
    display: block;
    width: 100%;
    padding: 0;
    overflow: hidden;
  }
  .embed-responsive::before {
    content: "";
    display: block;
    padding-top: 56.25%; /* 16:9 aspect ratio */
  }
  .embed-responsive-item {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 100%;
    border: 0;
  }
</style>

