Below is a **Product Requirements Document (PRD)** detailing how to implement the new _Folder_ feature on your Svelte-based “desktop” web application. This PRD is structured to provide a **comprehensive overview** of the feature, **detailed technical requirements**, **step-by-step instructions**, **edge-case handling**, **logging and error checks**, and **sample code**. 

---

## 1. Overview

### 1.1 Purpose
The goal is to extend your existing web-based “desktop” with **two types of folders**:

1. **Folder with Text**: Displays textual content in a window when opened.  
2. **Folder with Files**: Displays an icon grid or list of sub-files inside the folder window.

Users should be able to:
- **Drag** these folders around the desktop, similar to existing draggable files.
- **Open** each folder to reveal its contents (text or sub-files).
- **Click** sub-files (within a “files folder”) to open them in a new browser tab (as you do now).

### 1.2 In-Scope
- Updating the data model to support a `type` field that can distinguish **files** and **folders**.
- Introducing a new **`Folder.svelte`** component to handle folder-specific logic.
- Extending **`Desktop.svelte`** to render folders differently from files.
- Ensuring **robust error handling**, including checks for missing or invalid folder fields (like `folderType`, `textContent`, or `contents`).
- Adding **logging** (e.g., `console.log`) and code-level **comments** to clarify logic at each step.

### 1.3 Out-of-Scope
- Recursively nested folders beyond 1 level (though the design will allow easy extension to nested folders in the future).
- Detailed theming or styling of the folder window beyond the basic design (the provided examples can be a starting point).

---

## 2. Functional Requirements

1. **Drag & Drop**:  
   - Must be able to drag any folder icon on the desktop without interfering with the existing drag logic used by files.  
   - The folder icon’s position must persist in memory (or at least remain consistent until page refresh) so that the user sees the folder where they placed it.

2. **Open/Close Folder Window**:  
   - Clicking (or double-clicking) the folder icon toggles an open “folder window.”  
   - The folder window must display one of the two possible contents:
     1. **Text** (`folderType = 'text'`)
     2. **Sub-Files** (`folderType = 'files'`).

3. **Sub-Files**:  
   - If a folder is of type `files`, it must display a list (or grid) of sub-file icons with clickable names that open new tabs (like your existing file open behavior).

4. **Centering vs. Stacking**:  
   - Follow the same logic for placing folder icons as you do with files (`centered` property vs. `stackedPositions`).  

5. **Error Handling & Logging**:  
   - If a folder is missing critical fields (`folderType`, `icon`, `name`, etc.), the system must log a warning or error (e.g., `console.error`) and **gracefully** fail or skip rendering.  
   - Each major user action (dragging, opening folder, clicking sub-file) should have a minimal `console.log` for debugging or an equivalent logging solution.

6. **Responsive Behavior**:  
   - Folders and their contents must remain draggable and viewable on various screen sizes. The default position logic must not break or cause items to disappear off-screen if possible.

---

## 3. Data Model

### 3.1 Existing File Object

Your existing `files` array has items like:
```js
{
  name: 'welcome',
  link: 'https://example.com/welcome',
  icon: '/fileIcon.svg',
  highlight: false,
  centered: false
}
```

### 3.2 Folder Object

We add fields to represent **folder** items:
```js
{
  name: 'docs_folder',
  type: 'folder',       // "folder" vs. "file"
  folderType: 'text',   // either "text" or "files"
  icon: '/folderIcon.svg',
  centered: false,      // same usage as for files
  highlight: false,
  textContent: `Here is your text...`, // only if folderType = 'text'
  contents: [                     // only if folderType = 'files'
    {
      name: 'picture1',
      link: 'https://example.com/pic1.png',
      icon: '/imageIcon.svg'
    }
  ]
}
```

### 3.3 Example Combined `files` Array

```js
// fileUtils.js
export const files = [
  {
    name: 'welcome',
    type: 'file', 
    link: 'https://example.com/welcome',
    icon: '/fileIcon.svg',
    highlight: false,
    centered: false
  },
  {
    name: 'docs_folder',
    type: 'folder',
    folderType: 'text',
    icon: '/folderIcon.svg',
    highlight: false,
    centered: false,
    textContent: `Multi-line textual content goes here...`
  },
  {
    name: 'assets_folder',
    type: 'folder',
    folderType: 'files',
    icon: '/folderIcon.svg',
    highlight: false,
    centered: false,
    contents: [
      {
        name: 'picture1',
        link: 'https://example.com/pic1.png',
        icon: '/imageIcon.svg'
      },
      {
        name: 'report',
        link: 'https://example.com/report',
        icon: '/fileIcon.svg'
      }
    ]
  },
  // ... existing file items, etc.
];
```

---

## 4. Components

### 4.1 `Desktop.svelte`
- Renders the desktop background, noise overlay, schedule, countdown, and all `files`.
- **Enhanced** to detect `file.type === 'folder'` and render a new `Folder` component instead of a “file” icon.

### 4.2 `Folder.svelte`
- A new component that:
  - Shows a folder icon on the desktop (draggable).
  - Opens a “folder window” to display text or sub-files.

### 4.3 `Draggable.svelte`
- Your existing Draggable logic is unchanged.  
- Will be used by `Folder.svelte` or by `Desktop.svelte` to drag the folder icon.

---

## 5. Detailed Step-by-Step Implementation

Below is a granular, **numbered** guide to building and integrating the folder feature:

---

### 5.1 Step 1: Add `type` Fields in `fileUtils.js`

1. **Identify** which items are “files” and which are “folders.”  
2. **Add** `type: 'folder'` for folder items.  
3. **For** folder items, **add** `folderType` with possible values `'text'` or `'files'`.  
4. **For** a `'text'` folder, **add** `textContent`.  
5. **For** a `'files'` folder, **add** `contents` array for sub-files.  
6. **Include** basic logging in the file if needed, e.g.  
   ```js
   console.log("Initializing files/folders array", files);
   ```
7. **Error-check**: If any folder lacks required fields, log with `console.error` and consider omitting that folder from the final exported array.

---

### 5.2 Step 2: Create `Folder.svelte`

**Objective**: Render a draggable folder icon that toggles a “folder window” for text or sub-files.

**Implementation**:

1. **Props**: 
   - `file` (the entire folder object from `files`).
   - `openFile` (a function reference to open sub-files in a new tab).

2. **Local State**:
   - `let isOpen = false;` (tracks if the folder window is open).

3. **Draggable** Approach (Option A, Inside Folder.svelte):
   1. Import `Draggable.svelte`.
   2. Wrap a `<Draggable>` around the folder icon.  
   3. Use `onActuallyClick` to toggle `isOpen`.

4. **Window Layout**:
   1. A container `div.folder-window` that appears only if `isOpen` is `true`.
   2. `folderType === 'text'` => Show the `textContent`.
   3. `folderType === 'files'` => Map through `file.contents` to display subfiles. 

5. **Error Handling**:
   1. If `file.folderType` is missing or invalid, log `console.error("Unknown folderType:", file);` and do not render the window.  
   2. If `file.folderType === 'files'` but `file.contents` is empty or missing, log a warning and show “No contents.”

6. **Sample Code** (simplified example):

```html
<!-- Folder.svelte -->
<script>
  import Draggable from '$lib/Draggable.svelte';

  export let file;       // The folder item
  export let openFile;   // Function to open sub-files

  let isOpen = false;

  function handleIconClick() {
    // Toggle open/closed
    isOpen = !isOpen;
    console.log(`Folder "${file.name}" toggled to:`, isOpen ? 'Open' : 'Closed');
  }

  // Basic check for missing folderType
  if (!file.folderType) {
    console.error("Folder is missing 'folderType':", file);
  }
</script>

<Draggable
  x={100}
  y={100}
  onActuallyClick={handleIconClick}
>
  <div class="folder-icon">
    <img class="folder-img" src={file.icon} alt="Folder icon" />
    <div class="folder-label">
      {file.name}
    </div>
  </div>
</Draggable>

{#if isOpen}
  <div class="folder-window">
    <div class="folder-header">
      <div>{file.name}</div>
      <button on:click={() => (isOpen = false)}>Close</button>
    </div>

    {#if file.folderType === 'text'}
      <div class="folder-text">
        {file.textContent}
      </div>
    {:else if file.folderType === 'files'}
      <div class="folder-contents">
        {#each file.contents as subfile}
          <div class="subfile" on:click={() => openFile(subfile)}>
            <img class="subfile-icon" src={subfile.icon} alt="subfile icon" />
            <div class="subfile-label">{subfile.name}</div>
          </div>
        {/each}
      </div>
    {:else}
      <!-- Fallback if folderType is invalid -->
      <div class="folder-error">Unknown folder type.</div>
    {/if}
  </div>
{/if}

<style>
  .folder-icon {
    display: flex;
    flex-direction: column;
    align-items: center;
    cursor: pointer;
    user-select: none;
  }
  .folder-img {
    width: 52px;
    height: 52px;
  }
  .folder-label {
    margin-top: 4px;
    font-size: 0.6rem;
    color: #fff;
    background-color: rgba(0, 0, 0, 0.3);
    padding: 4px;
    text-align: center;
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
  }
  .folder-header {
    background: #444;
    padding: 6px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    color: #fff;
    font-size: 0.7rem;
  }
  .folder-text {
    padding: 10px;
    color: #fff;
    font-size: 0.8rem;
    white-space: pre-wrap;
    overflow: auto;
    flex: 1;
  }
  .folder-contents {
    display: flex;
    flex-wrap: wrap;
    padding: 10px;
    gap: 10px;
    flex: 1;
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
    color: red;
    padding: 10px;
  }
</style>
```

---

### 5.3 Step 3: Integrate `Folder.svelte` in `Desktop.svelte`

1. **Import** the new `Folder.svelte` component:
   ```js
   import Folder from '$lib/Folder.svelte';
   ```
2. **Open** function for sub-files remains the same:
   ```js
   function openFile(file) {
     window.open(file.link, '_blank');
     console.log(`Opening file: ${file.name} => ${file.link}`);
   }
   ```
3. **Desktop Rendering Logic**:
   1. In the main `{#each files as file, i}`, if `file.type === 'folder'`, render `<Folder file={file} {openFile} />`.  
   2. If you want the folder icon also stacked, you can wrap `<Folder>` in `<Draggable>` (Option B) or rely on the Draggable usage from inside `Folder.svelte` (Option A).
   3. Example snippet:
   ```html
   {#each files as file, i}
     {#if file.type === 'folder'}
       {#if file.centered}
         <!-- Centered folder logic (like centered files) -->
         <Folder file={file} {openFile} />
       {:else}
         {#if stackedPositions[i] != null}
           <Draggable 
             x={stackedPositions[i].x} 
             y={stackedPositions[i].y}
           >
             <!-- Or just put <Folder file={file} ...> 
                  if you want to handle the Draggable from Desktop. -->
             <Folder file={file} {openFile} />
           </Draggable>
         {/if}
       {/if}
     {:else if file.type === 'file'}
       <!-- Existing file logic -->
       {#if file.centered}
         <Draggable
           x={innerWidth / 2}
           y={innerHeight * 0.7 - 35}
           onActuallyClick={() => openFile(file)}
         >
           <!-- file icon markup -->
         </Draggable>
       {:else}
         {#if stackedPositions[i] != null}
           <Draggable
             x={stackedPositions[i].x}
             y={stackedPositions[i].y}
             onActuallyClick={() => openFile(file)}
           >
             <!-- file icon markup -->
           </Draggable>
         {/if}
       {/if}
     {/if}
   {/each}
   ```
4. **Error Handling**:
   - If `file.type === 'folder'` but we detect that `file.folderType` is missing, log a warning.  
   - If `stackedPositions[i]` is `null`, we can skip rendering or default to `(0, 0)`.

---

### 5.4 Step 4: Ensure `computeStackedPositions` Works for Folders

1. **Currently** in `computeStackedPositions`, you skip any `file.centered`.  
2. **Extend** or **reuse** the same logic for items with `file.type === 'folder'`.  
3. **Note**: If a folder is `file.centered`, skip it from normal stacking, as done for normal “centered files.”  

---

### 5.5 Step 5: Logging and Comments

1. **Comment** each major function:
   ```js
   /**
    * computeStackedPositions - calculates the XY coordinates
    * for each file or folder to be displayed.
    * @param windowHeight ...
    * @param windowWidth ...
    * @param files ...
    */
   ```
2. **Add** `console.log` statements in critical points:  
   - Desktop’s file/folder rendering loop, to see which items are loaded.  
   - `Folder.svelte` to see when a folder is opened or closed.  
   - Sub-file clicks, to confirm which sub-file was opened.  

3. **Add** `console.warn` or `console.error` for unexpected data or missing properties.

---

## 6. Edge Cases & Potential Errors

1. **Missing `folderType`**:  
   - If `file.type === 'folder'` but `folderType` is absent, log an error and do not render the folder window.  
2. **Empty `contents`** for `files` folder:  
   - Show a “No contents” message or gracefully handle with an empty array.  
3. **Multi-line `textContent`**:  
   - Ensure `<div class="folder-text">` uses `white-space: pre-wrap;` so line breaks are preserved.  
4. **Window Overflow**:  
   - Large text or many subfiles might exceed the window’s size. Provide `overflow: auto;` in the folder window to allow scrolling.  
5. **Mobile / Small Screens**:  
   - If stacked positions cause items to appear off-screen, the user might not be able to see them. A future enhancement could be to recalculate positions on window resize.  
6. **Drag threshold**:  
   - If the user slightly moves the folder icon and releases, does it count as a click or a drag? The `clickThreshold` in your `Draggable.svelte` is set to 1 by default. Adjust if needed.  
7. **Performance**:  
   - For extremely large `files` arrays or sub-files, performance might degrade. Future optimization might require virtualization or partial rendering.  

---

## 7. Testing & Validation

1. **Unit Tests**:
   - Test data model validation (e.g., missing folder fields).  
   - Test toggling the folder window open/closed in `Folder.svelte`.  
   - Test `openFile` function to confirm sub-files open in a new tab.

2. **Integration Tests**:
   - Render the entire desktop, drag folders around, open them, click sub-files.  
   - Confirm the correct logs appear in the console.

3. **Manual QA**:
   - Check various screen sizes.  
   - Confirm text content renders multiline.  
   - Confirm sub-files open as expected.

---

## 8. Non-Functional Requirements

1. **Performance**: Must not drastically degrade performance when a moderate number of folders and files are on the screen (e.g., 50+ items).  
2. **Accessibility**:  
   - Ensure clickable elements (folder icons, sub-file icons) have `aria-label`s or alternative text.  
   - Provide keyboard navigation in the future if needed (not strictly required now).  
3. **Security**: Sub-file links open in new tabs with `target="_blank"`. Consider `rel="noopener noreferrer"` for external links to avoid potential security issues.  

---

## 9. Detailed Logging & Error Checks

1. **Desktop-level logging**:
   ```js
   console.log(`Rendering ${files.length} items on desktop.`);
   ```
2. **Folder-level logging**:
   ```js
   console.log(`Folder "${file.name}" toggled to open/close.`);
   console.error(`Folder missing 'folderType':`, file);
   ```
3. **Sub-file opens**:
   ```js
   console.log(`User clicked sub-file: ${subfile.name} => ${subfile.link}`);
   ```
4. **Drag events**:
   - Already handled in `Draggable.svelte`, but you can add logs if needed:
     ```js
     console.log(`Moving x:${x}, y:${y}`);
     ```

---

## 10. Sample End-to-End Code Sketch

Below is a **collapsed** example of how the three pieces might come together. This is not a copy-paste final but outlines how each portion calls the other:

```svelte
<!-- Desktop.svelte -->
<script>
  import Countdown from '$lib/Countdown.svelte';
  import Draggable from '$lib/Draggable.svelte';
  import Folder from '$lib/Folder.svelte';
  import { files, computeStackedPositions } from '$lib/fileUtils.js';

  let stackedPositions = [];
  $: innerWidth = 0;
  $: innerHeight = 0;

  onMount(() => {
    stackedPositions = computeStackedPositions(innerHeight, innerWidth, files);
    console.log("Desktop stacked positions:", stackedPositions);
  });

  function openFile(file) {
    if (!file?.link) {
      console.error("Cannot open file without a 'link' property:", file);
      return;
    }
    window.open(file.link, '_blank');
    console.log("Opened file:", file.name);
  }
</script>

<div class="desktop">
  <!-- Background, noise, dark overlay, schedule, etc. -->
  <Countdown targetDate={new Date('2025-03-03T00:00:00')} />

  {#each files as file, i}
    {#if file.type === 'folder'}
      {#if file.centered}
        <!-- Centered Folder -->
        <Folder file={file} {openFile} />
      {:else}
        {#if stackedPositions[i]}
          <!-- Use Draggable or rely on Folder's internal Draggable -->
          <Folder file={file} {openFile} />
        {/if}
      {/if}
    {:else if file.type === 'file'}
      <!-- Existing file code with Draggable, etc. -->
      <Draggable x={stackedPositions[i].x} y={stackedPositions[i].y} onActuallyClick={() => openFile(file)}>
        <div class="file">
          <img src={file.icon} alt="icon" />
          <div class="file-label">{file.name}</div>
        </div>
      </Draggable>
    {/if}
  {/each}
</div>

<style>
  /* Omitted for brevity... */
</style>
```

---

## 11. Conclusion

By following the above steps, you’ll add two types of folders—**text folders** and **files folders**—to your existing web desktop. The key deliverables are:

1. **Updated `files` data model** to include `type: 'folder'` and either `'text'` or `'files'`.
2. **New `Folder.svelte` component** to handle folder icons, toggling an internal window that displays text or sub-files.  
3. **Extended `Desktop.svelte` logic** to differentiate between files vs. folders in the main render loop.  
4. **Robust error checking & logging** to handle missing data and provide debugging information.

This design is modular and extensible, making it straightforward to add nested folders, advanced styling, or advanced features like a draggable folder window in the future.  

---

**End of PRD**  