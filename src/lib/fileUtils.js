export const files = [

	/* Example files
	{
		name: 'update_1',
		type: 'file',
		link: 'https://example.com/update_1',
		icon: '/robotIcon.svg',
		highlight: false,
		centered: true
	},
	// New text folder example
	{
		name: 'docs_f',
		type: 'folder',
		folderType: 'text',
		icon: '/folderIcon.svg',
		textContent: `Multi-line textual content goes here...`,
		highlight: false,
		centered: false
	}, */
	// New text folder example
	// New files folder example
	{
		name: 'How it Works',
		type: 'folder',
		folderType: 'text',
		icon: '/folderIcon.svg',
		textContent: `All the folders can be opened, all the files are links :) \n\nIf you have any questions/suggestions on how to make it better, ping me @ roope@mysidequest.xyz!`,
		highlight: true,
		centered: false
	},
	{
		name: 'Recordings',
		type: 'folder',
		folderType: 'both',
		icon: '/folderIcon.svg',
		textContent: `You will find all the recordings here when we have them!`,
		contents: [
			{
				name: 'Kickoff',
				type: 'file',
				folderType: 'text',
				link: 'https://www.youtube.com/live/SmEzXA23S8I',
				icon: '/videoIcon.svg',
			}	
		],
		highlight: true,
		centered: false
	}
];

export function computeStackedPositions(
    windowHeight,
    windowWidth,
    files, 
    fileWidth=100, 
    fileHeight=100,
    marginTop=50,
    marginRight=40,
    verticalGap=20,
    horizontalGap=80
  ) {
	const positions = new Array(files.length).fill(null);

	// We'll read the window size
	const w = window.innerWidth;
	const h = window.innerHeight;

	// Start at the top-right
	let x = w - marginRight - fileWidth;
	let y = marginTop;

	for (let i = 0; i < files.length; i++) {
		const file = files[i];

		// If it's centered, we skip normal stacking
		if (file.centered) {
			// We'll handle the centered file separately
			continue;
		} 

		// Assign this position
		positions[i] = { x, y };

		// Move down by fileHeight + verticalGap
		y += fileHeight + verticalGap;

		// If we exceed the window’s bottom, start a new column
		if (y + fileHeight > h) {
			x -= fileWidth + horizontalGap;
			y = marginTop;
		}
	}

	return positions;
}

console.log("fileUtils loaded", files);
