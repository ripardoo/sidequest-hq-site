export const files = [
	{
		name: 'welcome',
		link: 'https://example.com/welcome',
		icon: '/fileIcon.svg',
		highlight: false,
		centered: false
	},
	{
		name: 'houses',
		link: 'https://example.com/houses',
		icon: '/homeIcon.svg',
		highlight: false,
		centered: false
	},
	{
		name: 'assets',
		link: 'https://example.com/assets',
		icon: '/robotIcon.svg',
		highlight: false,
		centered: false
	},
	{
		name: 's5_anthem',
		link: 'https://example.com/s5_anthem',
		icon: '/robotIcon.svg',
		highlight: true,
		centered: false
	},
	{
		name: 'update_1',
		link: 'https://example.com/update_1',
		icon: '/robotIcon.svg',
		highlight: false,
		centered: true
	}
	// etc.
];

export function computeStackedPositions(
    windowHeight,
    windowWidth,
    files, 
    fileWidth=80, 
    fileHeight=80,
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

        if (file.highlight) {
            x -= 10
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
