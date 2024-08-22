<script>
  import { show_video } from "./store.js";
  let hide = 'block';
  let next = 'none';
  import Cover from "./assets/aisha.webp";
</script>
<div style="display: {hide}">
  <img class="ml-auto mr-auto max-w-[33rem]" src="{Cover}" alt="">
  <p class="mt-11 max-w-2xl mr-auto ml-auto">Aisha und Sam sind erstaunt über die vielen Fotos und Videos, die täglich auf TikTok zu sehen sind. Wie manche Leute leben, ist einfach beeindruckend.
    Wir schauen uns mal an, was es heißt, Influencer:in zu sein und wie das auf Jugendliche wirken kann.
  </p>
</div>
<div style="display: {hide}">
  <h2 class="mb-10 text-4xl text-primary">Aufgabe: Schaut euch das Video an und sammelt auf dem Plakat Vorteile und Nachteile von Influencer:innen!</h2>
  <iframe src="https://www.ardmediathek.de/embed/Y3JpZDovL2JyLmRlL3ZpZGVvL2ViMmM0OGJjLTgxYmQtNDA4NC1hYjdlLTU0ZGJjM2VjOTYyOA" width="100%" height="72%" allowfullscreen allow="clipboard-read; clipboard-write" frameBorder="0" scrolling="no"></iframe>
  <button class="btn mt-11 ml-auto mr-auto block" on:click={() => {hide = 'none', next = 'block'}}> Los geht's</button>
</div>

<div style="display: {next}" class="text-3xl">
  <h2 class="text-primary mb-6">Vorteile:</h2>
  <ul>
    <li>Unterhaltung: Influencer machen lustige und interessante Videos.</li>
    <li>Trends: Sie zeigen neue Trends und coole Produkte.</li>
    <li>Inspiration: Man kann Ideen und Motivation für eigene Projekte bekommen.</li>
    <li>Gemeinschaft: Man fühlt sich mit anderen Followern verbunden.</li>
  </ul>
  <h2 class="text-primary mt-[4rem] mb-6">Nachteile:</h2>
  <ul>
    <li>Unrealistische Darstellungen: Influencer zeigen oft ein perfektes, aber unechtes Leben.</li>
    <li>Druck: Man fühlt sich unter Druck gesetzt, genauso auszusehen oder zu leben.</li>
    <li>Übermäßiger Konsum: Man kauft Dinge, die man nicht wirklich braucht.</li>
    <li>Werbung: Man erkennt oft nicht, dass Inhalte bezahlte Werbung sind.</li>
  </ul>
  <button class="btn mt-11 ml-auto mr-auto block" on:click={() => {$show_video = 'flex'; hide = 'none', next = 'none'}}> Weiter geht's</button>
</div>

<style>
  div {
      padding: 10rem;
      min-height: 100vh;
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

  ul li {
      margin-bottom: 1.5rem;
  }
</style>