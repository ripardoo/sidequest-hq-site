<script>
	import { onMount } from 'svelte';
	import Draggable from '$lib/Draggable.svelte'; // adjust import path as needed
	import Countdown from '$lib/Countdown.svelte';
	import Folder from '$lib/Folder.svelte'; // new import
	import { files, computeStackedPositions } from '$lib/fileUtils.js'; // Importing from the new file

	// We'll store the computed positions in an array `stackedPositions`.
	let stackedPositions = [];
	$: innerWidth = 0;
	$: innerHeight = 0;

	// 3) On mount, compute the positions once
	onMount(() => {
		stackedPositions = computeStackedPositions(innerHeight, innerWidth, files);
	});

	// Called when the user truly "clicks" the file (i.e. didn't drag far)
	function openFile(file) {
		if (!file?.link) {
			console.error('Missing link:', file);
			return;
		}
		window.open(file.link, '_blank');
		console.log('Opened file:', file.name);
	}
</script>

<!-- The main desktop container, with mouse events for accessibility -->
<div class="desktop" role="application" aria-label="Draggable desktop">
	<!-- 1) Background layer -->
	<div class="background-layer"></div>

	<!-- 2) Noise layer with animated background -->
	<div class="noise-layer"></div>

	<!-- 3) Darkening overlay -->
	<div class="dark-layer"></div>

	<!-- Some schedule text in the corner -->
	<div class="schedule">
		<div>first week schedule</div>
		<div>
			june 18 – lecture #1 – ideas <a href="https://example.com/rsvp" target="_blank">rsvp</a>
		</div>
		<div>
			june 20 – lab #1 – decide on your ideas <a href="https://example.com/rsvp" target="_blank"
				>rsvp</a
			>
		</div>
		<div>
			<a href="https://example.com/master_calendar" target="_blank">view master calendar here</a>
		</div>
	</div>

	<Countdown targetDate={new Date('2025-03-03T00:00:00')} />

	<!-- Draggable files, each with a custom icon -->
	{#each files as file, i}
		{#if file.type === 'folder'}
			{#if file.centered}
				<!-- Centered folder, no stacking -->
				<Folder {file} {openFile} />
			{:else if stackedPositions[i]}
				<!-- Normal stacked folder -->
				<Folder {file} {openFile} x={stackedPositions[i].x} y={stackedPositions[i].y} />
			{/if}
		{:else}
			<!-- Original file logic -->
			{#if file.centered}
				<!-- Place at the center (under countdown). 
           We also apply highlight if needed. -->

				<!-- 30 = half file width (approx) -->
				<!-- 35 = half file height (approx) -->
				<Draggable
					x={innerWidth / 2}
					y={innerHeight * 0.7 - 35}
					onActuallyClick={() => openFile(file)}
				>
					<div
						class="file file-center {file.highlight ? 'highlighted-file' : ''}"
						draggable="false"
					>
						<img class="file-icon" src={file.icon} alt="File icon" draggable="false" />
						<div class="file-label">{file.name}</div>
					</div>
				</Draggable>
			{:else if stackedPositions[i]}
				<Draggable
					x={stackedPositions[i].x}
					y={stackedPositions[i].y}
					onActuallyClick={() => openFile(file)}
				>
					<div class="file {file.highlight ? 'highlighted-file' : ''}" draggable="false">
						<img class="file-icon" src={file.icon} alt="File icon" draggable="false" />
						<div class="file-label">{file.name}</div>
					</div>
				</Draggable>
			{/if}
		{/if}
	{/each}
</div>

<svelte:window bind:innerWidth bind:innerHeight />

<style>
	/* Global styling */
	:global(html, body) {
		margin: 0;
		padding: 0;
		font-family: 'Press Start 2P', 'Monaco', 'Courier New', monospace;
		overflow: hidden;
		background: #000; /* fallback if BG.png not found */
	}

	.desktop {
		position: relative;
		width: 100vw;
		height: 100vh;
	}

	/* 1) Background layer behind everything */
	.background-layer {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		z-index: 0;
		background: url('/BG.png') center center / cover no-repeat;
	}

	/* 2) Noise layer (moving TV static) */
	.noise-layer {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		z-index: 1;
		background: url('/noise.png') repeat;
		animation: noiseShift 1s steps(7) infinite;
		opacity: 0.15;
		pointer-events: none;
		color: rgba(121, 33, 27, 0.9);
	}

	@keyframes noiseShift {
		0% {
			background-position: 0 0;
		}
		100% {
			background-position: 100% 100%;
		}
	}

	/* 3) Dark overlay layer */
	.dark-layer {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		z-index: 2;
		background: rgba(15, 4, 3, 0.8);
		pointer-events: none;
	}

	/* Draggable files styling (inside <Draggable>) */
	.file {
		display: flex;
		flex-direction: column;
		align-items: center;
		min-width: 80px;
		min-height: 80px;
		cursor: pointer;
		user-select: none;
		text-shadow: 0 0 2px rgba(0, 0, 0, 0.7);
	}
	.file-icon {
		width: 52px;
		height: 52px;
	}
	.file-label {
		margin-top: 4px;
		color: #fff;
		font-size: 0.5rem; /* you said bigger overall */
		text-align: center;
		background-color: rgba(0, 0, 0, 0.3); /* highlight color */
		padding: 5px; /* add padding to make highlight bigger than text */
	}

	/* If highlight = true => we add a red border. One approach: a separate class. */
	.highlighted-file {
		border: 2px dashed red;
		background-color: rgba(255, 0, 0, 0.2);
		border-radius: 4px;
		padding: 6px;
	}

	/* If the file is “centered,” we can place it under the countdown. 
     We'll do that by giving it absolute coords (like 50%, 60%).
     Or we can handle it in Draggable. 
  */
	.file-center {
		position: absolute;
		left: 50%;
		top: 60%;
		transform: translate(-50%, -50%);
	}

	/* The schedule info in the corner */
	.schedule {
		position: absolute;
		top: 20px;
		left: 20px;
		color: #ffffff;
		z-index: 5;
		line-height: 1.5;
		font-size: 0.85rem;
	}
	.schedule a {
		color: #aaaaaa;
		text-decoration: none;
	}
	.schedule a:hover {
		text-decoration: underline;
	}
</style>
