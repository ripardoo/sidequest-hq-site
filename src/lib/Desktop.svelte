<script>
	import { onMount } from 'svelte';
	import Draggable from '$lib/Draggable.svelte'; // adjust import path as needed
	import Countdown from '$lib/Countdown.svelte';
	import Folder from '$lib/Folder.svelte'; // new import
	import { files, computeStackedPositions } from '$lib/fileUtils.js'; // Importing from the new file
	import Schedule from './Schedule.svelte';

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

{#if innerWidth < 768}
	<div class="mobile-warning">
		Sorry the Sidequest HQ currently needs a bigger screen :( We'll try to do a mobile version
		later.
	</div>
{:else}
	<!-- The main desktop container, with mouse events for accessibility -->
	<div class="desktop" role="application" aria-label="Draggable desktop">
		<!-- 1) Background layer -->
		<div class="background-layer"></div>

		<!-- 2) Noise layer with animated background -->
		<div class="noise-layer"></div>

		<!-- 3) Darkening overlay -->
		<div class="dark-layer"></div>

		<!-- Some schedule text in the corner -->
		<Schedule />

		<Countdown targetDate={new Date('2025-03-09T16:00:00')} />

		<!-- Draggable files, each with a custom icon -->
		{#each files as file, i}
			{#if file.type === 'folder'}
				{#if file.centered}
					<!-- Centered folder, no stacking -->
					<Folder {file} {openFile} x={35} y={innerHeight * 0.6 - 120} />
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
{/if}

<svelte:window bind:innerWidth bind:innerHeight />

<style>
	/* Global styling */
	:global(html, body) {
		margin: 0;
		padding: 0;
		font-family: 'Press Start 2P', 'Monaco', 'Courier New', monospace;
		overflow: hidden;
		background: #000; /* fallback if BG.png not found */
		line-height: 1.3;
	}
	:global(a) {
		color: #aaaaaa;
		text-decoration: none;
	}
	:global(a:hover) {
		text-decoration: underline;
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
		width: 100px;
		height: 100px;
		cursor: pointer;
		user-select: none;
		text-shadow: 0 0 2px rgba(0, 0, 0, 0.7);
		border: 2px dashed transparent; /* reserve space for highlight border */
		padding: 6px; /* add space around content */
		border-radius: 4px;
		box-sizing: border-box; /* so border & padding fit in one box */
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
		border-color: red; /* re-use the same dash style, just color it */
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

	.mobile-warning {
		color: #fff;
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		text-align: center;
		font-size: 0.85rem;
		line-height: 1.5;
	}
</style>
