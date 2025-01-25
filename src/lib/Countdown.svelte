<script>
	import { onMount } from 'svelte';

	// We'll let the parent supply this date.
	export let targetDate = new Date('2025-03-09T00:16:00');

	let fractionDays = '';
	let wholePart = '';
	let fracPart = '';

	function updateFractionDays() {
		const now = new Date();
		// Convert our current time to Helsinki time (assuming +2h offset; adjust if DST applies)
		const helsinkiOffsetMins = 120;
		const localOffsetMins = now.getTimezoneOffset();
		const nowHelsinki = new Date(now.getTime() + (helsinkiOffsetMins + localOffsetMins) * 60000);

		const diff = (targetDate - nowHelsinki) / (1000 * 60 * 60 * 24);
		let days = diff; // e.g. 185.289890
		wholePart = Math.floor(days);
		fracPart = (days - wholePart).toFixed(6).slice(1); // ".289890"
		fractionDays = diff.toFixed(6);
	}

	onMount(() => {
		updateFractionDays();
		// Update every second so it's obvious it’s ticking
		const interval = setInterval(updateFractionDays, 100);
		return () => clearInterval(interval);
	});
</script>

<div class="countdown">
	<span class="count-whole">{wholePart}</span><span class="count-frac">{fracPart}</span>
	<div class="days-label">days till demo day</div>
</div>

<style>
	.countdown {
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		color: #ffffff;
		text-align: center;
		z-index: 5;
		/* Increase this as needed to match your references */
		font-size: 3rem;
	}
	.countdown .count-whole {
		font-size: 6rem;
	}

	.countdown .count-frac {
		font-size: 1.2rem;
	}

	.countdown .days-label {
		font-size: 1rem;
		opacity: 0.8;
		margin-top: 16px;
	}
</style>
