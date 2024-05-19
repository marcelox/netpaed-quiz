<script>
  let currentPuzzleIndex = 0;
  let userAnswer = '';
  let showHint = false;
  let correctAnswersCount = 0;

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
</script>

<div class="mx-28 p-8 bg-gray-50 shadow-lg rounded-lg">
  <div class="mb-6">
    <h2 class="bebas-neue-regular text-7xl font-semibold text-gray-800">Escape Game</h2>
    <div class="text-right">
      <p class="text-xl">Schritte: {currentPuzzleIndex + 1} / {puzzles.length}</p>
      <p class="text-xl">Korrekte Antworten: {correctAnswersCount}</p>
    </div>
  </div>
  
  {#if currentPuzzleIndex < puzzles.length}
    <div class="mb-6">
      <h3 class="text-xl font-semibold text-gray-800">Rätsel Nr. {currentPuzzleIndex + 1}</h3>
      <div class="embed-responsive aspect-ratio-16/9 mb-4">
        <iframe class="embed-responsive-item w-full h-full" src={puzzles[currentPuzzleIndex].videoLink} frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
      </div>
    </div>
    <div class="mb-6">
      <h3 class="text-lg text-gray-800">{puzzles[currentPuzzleIndex].question}</h3>
    </div>
    <div class="mb-6">
      <input
        class="border border-gray-300 p-2 w-full rounded"
        type="text"
        bind:value={userAnswer}
        placeholder="Deine Antwort"
      />
    </div>
    <div class="flex justify-between items-center">
      <button
        class="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition-colors"
        on:click={handleSubmit}
      >
        Senden
      </button>
      <button
        class="bg-gray-600 text-white py-2 px-4 rounded hover:bg-gray-700 transition-colors"
        on:click={handleShowHint}
      >
        Tipp
      </button>
    </div>
    {#if showHint}
      <div class="mt-4 text-gray-600">
        <p>Hint: {puzzles[currentPuzzleIndex].hint}</p>
      </div>
    {/if}
  {:else}
    <div class="mb-6">
      <h2 class="text-2xl font-semibold text-gray-800">Congratulations! You've escaped!</h2>
      <p>You answered {correctAnswersCount} out of {puzzles.length} questions correctly.</p>
    </div>
  {/if}
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

