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
	<div class="folder-icon">
		<!-- Switch icon when folder is open -->
		<img class="folder-img" src={isOpen ? '/openFolderIcon.svg' : file.icon} alt="Folder icon" />
		<div class="folder-label">{file.name}</div>
	</div>
</Draggable>

{#if isOpen}
	<Draggable>
        <div class="folder-window">
            <div class="folder-header">
                <div>{file.name}</div>
                <button on:click={toggleOpen}>Close</button>
            </div>
            {#if file.folderType === 'text'}
                <div class="folder-text">{file.textContent}</div>
            {:else if file.folderType === 'files'}
                <div class="folder-contents">
                    {#each file.contents as sub}
                        <div class="subfile" on:click={() => openFile(sub)}>
                            <img class="subfile-icon" src={sub.icon} alt="Subfile icon" />
                            <div class="subfile-label">{sub.name}</div>
                        </div>
                    {/each}
                </div>
            {:else}
                <div class="folder-error">Unknown folder type.</div>
            {/if}
        </div>
    </Draggable>
{/if}

<style>
	.folder-icon {
		display: flex;
		flex-direction: column;
		align-items: center;
		cursor: pointer;
	}
	.folder-img {
		width: 52px;
		height: 52px;
	}
	.folder-label {
		margin-top: 4px;
		font-size: 0.6rem;
		background-color: rgba(0, 0, 0, 0.3);
		color: #fff;
		padding: 4px;
	}
	.folder-window {
		position: absolute;
		top: 120px;
		left: 20px;
		width: 300px;
		height: 200px;
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
		flex: 1;
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
