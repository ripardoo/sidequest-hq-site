<script>
	import Draggable from '$lib/Draggable.svelte';

	export let file;
	export let openFile;
	export let x = 100;
	export let y = 100;

	let isOpen = false;
	function toggleOpen() {
		isOpen = !isOpen;
		console.log(`Folder "${file?.name}" is now`, isOpen ? 'open' : 'closed');
	}

	if (file.type === 'folder' && !file.folderType) {
		console.error("Folder missing 'folderType':", file);
	}
</script>

<Draggable {x} {y} onActuallyClick={toggleOpen}>
	<div
		class="folder folder-center {file.highlight ? 'highlighted-folder' : ''} file"
		draggable="false"
	>
		<!-- Switch icon when folder is open -->
		<img
			class="folder-icon"
			src={isOpen ? '/openFolderIcon.svg' : file.icon}
			alt="Folder icon"
			draggable="false"
		/>
		<div class="folder-label">{file.name}</div>
	</div>
</Draggable>

{#if isOpen}
	<Draggable>
		<div class="folder-window">
			<div class="folder-header">
				<div>{file.name}</div>
				<button on:click={toggleOpen}>X</button>
			</div>
			{#if file.folderType === 'text'}
				<div class="folder-text">{file.textContent}</div>
			{:else if file.folderType === 'files'}
				<div class="folder-contents">
					{#each file.contents as sub}
						<button class="subfile" on:click={() => openFile(sub)} aria-label={`Open ${sub.name}`}>
							<img class="subfile-icon" src={sub.icon} alt="Subfile icon" />
							<div class="subfile-label">{sub.name}</div>
						</button>
					{/each}
				</div>
			{:else if file.folderType === 'both'}
				<div class="folder-text">{file.textContent}</div>
				<div class="folder-contents">
					{#each file.contents as sub}
						<button class="subfile" on:click={() => openFile(sub)} aria-label={`Open ${sub.name}`}>
							<img class="subfile-icon" src={sub.icon} alt="Subfile icon" />
							<div class="subfile-label">{sub.name}</div>
						</button>
					{/each}
				</div>
			{:else}
				<div class="folder-error">Unknown folder type.</div>
			{/if}
		</div>
	</Draggable>
{/if}

<style>
	.folder {
		display: flex;
		flex-direction: column;
		align-items: center;
		cursor: pointer;
		user-select: none;
		text-shadow: 0 0 2px rgba(0, 0, 0, 0.7);
		border: 2px dashed transparent;
		padding: 6px;
		border-radius: 4px;
		box-sizing: border-box;
		width: 100px;
		height: 100px;
	}
	.folder-icon {
		width: 52px;
		height: 52px;
	}
	.folder-label {
		margin-top: 4px;
		font-size: 0.5rem;
		background-color: rgba(0, 0, 0, 0.3);
		color: #fff;
		padding: 5px;
		text-align: center;
	}
	.highlighted-folder {
		border-color: red;
		background-color: rgba(255, 0, 0, 0.2);
		border-radius: 4px;
		padding: 6px;
	}
	.folder-window {
		position: absolute;
		top: 120px;
		left: 20px;
		width: 500px;
		height: 400px;
		background: #222;
		border: 2px solid #555;
		z-index: 9999;
		display: flex;
		flex-direction: column;
		overflow: hidden;
	}
	.folder-header {
		display: flex;
		justify-content: space-between;
		background: #444;
		padding: 6px;
		color: #fff;
		font-size: 0.7rem;
	}
	.folder-text {
		height: auto;
		width: 100%;
		padding: 10px;
		overflow: auto;
		white-space: pre-wrap;
		color: #fff;
	}
	.folder-contents {
		flex: 1;
		display: flex;
		flex-wrap: wrap;
		gap: 10px;
		padding: 10px;
		overflow: auto;
	}
	.subfile {
		display: flex;
		flex-direction: column;
		align-items: center;
		width: 60px;
		cursor: pointer;
		background: none;
		border: none;
	}
	.subfile-icon {
		width: 32px;
		height: 32px;
	}
	.subfile-label {
		margin-top: 4px;
		font-size: 0.6rem;
		color: #fff;
		text-align: center;
	}
	.folder-error {
		padding: 10px;
		color: red;
	}
</style>
