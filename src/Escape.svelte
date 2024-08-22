<script>
  import confetti from "canvas-confetti";
  import { onMount } from "svelte";
  import { Input, Label, Toggle, Radio } from "flowbite-svelte";
  import quizData from './quizData.json';
  import { show_video } from "./store.js";

  let currentPuzzleIndex = 0;
  let userAnswer = "";
  let correctAnswersCount = 0;
  let isDarkMode = false;
  let showCorrectAnswer = false;
  let isAnswerCorrect = false;
  let finalAnswer = "";
  let showFinalFeedback = false;
  let coins = 0;
  let puzzles = quizData.puzzles;

  const handleSubmit = () => {
    if (currentPuzzleIndex < puzzles.length - 1) {
      if (userAnswer === puzzles[currentPuzzleIndex].correctAnswer) {
        correctAnswersCount += 1;
        isAnswerCorrect = true;
        // Trigger confetti for correct answer
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 },
        });
      } else {
        isAnswerCorrect = false;
      }
      showCorrectAnswer = true;
    } else {
      if (finalAnswer === puzzles[currentPuzzleIndex].correctAnswer) {
        isAnswerCorrect = true;
        coins += 1;
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 },
        });
      } else {
        isAnswerCorrect = false;
      }
      showFinalFeedback = true;
    }
  };

  const handleNext = () => {
    if (currentPuzzleIndex < puzzles.length - 1) {
      currentPuzzleIndex += 1;
      userAnswer = "";
      showCorrectAnswer = false;
      isAnswerCorrect = false;
    } else {
      alert(`Gratulation! Du haust ${correctAnswersCount} richtige Antworten und hast ${coins} coin(s) verdient!`);
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

<div class="quiz-container" style="display: {$show_video}">
  <div class="quiz-header">
    <h2 class="mr-10">Station 4:<br> Influencer:innen und Werbung</h2>
    <ul class="font-bold text-s">
      <li>Fortschritt: {currentPuzzleIndex + 1} / {puzzles.length}</li>
      <li>Richtige Antworten: {correctAnswersCount}</li>
      <li>Coins: {coins}</li>
    </ul>
  </div>

  <div class="toggle-container">
    <Toggle checked={isDarkMode} on:change={toggleDarkMode}>
      <span>{isDarkMode ? 'Heller' : 'Dunkler'} Modus</span>
    </Toggle>
  </div>

  {#if currentPuzzleIndex < puzzles.length - 1}
    <div class="question">
      {puzzles[currentPuzzleIndex].question}
    </div>

    <div class="options-container">
      {#each puzzles[currentPuzzleIndex].options as option, index}
        <div class="mb-2">
          <input
            type="radio"
            id={`option-${index}`}
            value={option.charAt(0)}
            bind:group={userAnswer}
          />
          <label
            for={`option-${index}`}
            class:is-incorrect={!isAnswerCorrect && showCorrectAnswer && userAnswer === option.charAt(0)}
          >
            {option}
          </label>
        </div>
      {/each}
    </div>

    {#if showCorrectAnswer}
      <div class="feedback">
        {#if isAnswerCorrect}
          <p>Sehr gut! 🎉</p>
        {:else}
          <p class="mb-4">Leider falsch. Die richtige Antwort ist: <strong>{puzzles[currentPuzzleIndex].correctAnswer}</strong></p>
        {/if}
        <p class="mb-4">{puzzles[currentPuzzleIndex].explanation}</p>
        <button class="btn" on:click={handleNext}>Nächste Frage</button>
      </div>
    {:else}
      <div class="quiz-footer">
        <button class="btn" on:click={handleSubmit}>Abgeben</button>
      </div>
    {/if}
  {:else}
    <div class="question">
      {puzzles[currentPuzzleIndex].question}
    </div>
    <div class="options-container">
      <Input
        id="final-answer"
        class="border border-gray-300 dark:border-gray-600 p-2 w-full rounded bg-gray-50 dark:bg-gray-700 dark:text-gray-200"
        type="text"
        bind:value={finalAnswer}
        placeholder="Deine Antwort"
      />
    </div>

    {#if showFinalFeedback}
      <div class="feedback">
        {#if isAnswerCorrect}
          <p>Genau! Du hast ein coin verdient! 🎉</p>
        {:else}
          <p class="mb-5">Leider Falsch. Die richtige Antwort ist: <strong>{puzzles[currentPuzzleIndex].correctAnswer}</strong></p>
        {/if}
        <button class="btn" on:click={handleNext}>Beenden</button>
      </div>
    {:else}
      <div class="quiz-footer">
        <button class="btn" on:click={handleSubmit}>Abgeben</button>
      </div>
    {/if}
  {/if}
</div>


<style>
    body {
        font-family: 'Inter', sans-serif;
        background-color: #f5f5f5;
        margin: 0;
        padding: 0;
        display: flex;
        justify-content: center;
        align-items: center;
        color: #333;
    }

    .quiz-container {
        background: #ffffff;
        border-radius: 12px;
        box-shadow: 0 4px 16px rgba(0, 0, 0, 0.2);
        padding: 12rem;
        display: flex;
        flex-direction: column;
        justify-content: center;
    }

    .quiz-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 2rem;
    }

    .quiz-header h2 {
        font-size: 1.8rem;
        font-weight: 600;
        color: #1976d2;
    }

    .toggle-container {
        display: flex;
        justify-content: flex-end;
        margin-bottom: 2rem;
    }

    .toggle-container span {
        font-size: 1rem;
        margin-left: 0.5rem;
        color: #757575;
    }

    .question {
        font-size: 1.5rem;
        font-weight: 500;
        margin-bottom: 1.5rem;
        color: #333;
    }

    .options-container {
        margin-bottom: 2rem;
    }

    .options-container label {
        display: block;
        background: #f5f5f5;
        padding: 1rem;
        border-radius: 8px;
        margin-bottom: 1rem;
        transition: background 0.3s, transform 0.2s;
        cursor: pointer;
        font-size: 1rem;
        color: #333;
        border: 2px solid transparent;
    }

    .options-container label:hover {
        background: #e3f2fd;
        transform: scale(1.03);
    }

    .options-container input[type="radio"] {
        display: none;
    }

    .options-container input[type="radio"]:checked + label {
        background: #bbdefb;
        border: 2px solid #1976d2;
    }

    .quiz-footer {
        display: flex;
        justify-content: flex-end;
        align-items: center;
    }

    .btn {
        background: #1976d2;
        border: none;
        color: #fff;
        padding: 0.75rem 1.5rem;
        border-radius: 8px;
        cursor: pointer;
        font-size: 1rem;
        font-weight: 500;
        transition: background 0.3s, transform 0.2s;
    }

    .btn:hover {
        background: #1565c0;
        transform: scale(1.05);
    }

    .feedback {
        margin-top: 2rem;
        padding: 1rem;
        border-radius: 8px;
        background: #e3f2fd;
        color: #333;
        font-size: 1rem;
    }

    @media (max-width: 1024px) {
        .quiz-container {
            padding: 1.5rem;
        }

        .quiz-header h2 {
            font-size: 1.5rem;
        }

        .question {
            font-size: 1.25rem;
        }

        .quiz-footer .btn {
            padding: 0.5rem 1rem;
            font-size: 0.875rem;
        }
    }
</style>


