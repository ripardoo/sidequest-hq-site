export const files = [

	/* Example files
	{
		name: 'update_1',
		type: 'file',
		link: 'https://docs.google.com/document/d/14p5RW4gcx3gG9uiUuNKy-mFnZyUMM3ukfD8aP0l-p2Q/edit?tab=t.0',
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
		name: 'HELP',
		type: 'folder',
		folderType: 'text',
		icon: '/folderIcon.svg',
		textContent: `All the folders can be opened, all the files are links :) \n\nIf you have any questions/suggestions on how to make it better, ping me @ <a href="mailto:roope@mysideqeust.xyz">roope@mysidequest.xyz</a>! \n\n If you want your questions to be answered faster, you can email the whole team \n<a href="mailto:team@mysideqeust.xyz">team@mysideqeust.xyz</a>`,
		highlight: false,
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
				link: 'https://www.youtube.com/live/SmEzXA23S8I',
				icon: '/videoIcon.svg',
				highlight: false,
				centered: false
			},
			{
				name: 'Session 1',
				type: 'file',
				folderType: 'text',
				link: 'https://www.youtube.com/live/qGxMfhxq4BE',
				icon: '/videoIcon.svg',
				highlight: false,
				centered: false
			},
			{
				name: "Lab 1",
				type: 'file',
				link: 'https://www.youtube.com/live/zMIDdaiRmKo',
				icon: '/videoIcon.svg',
				highlight: false,
				centered: false
			},
			{
				name: "Session 2",
				type: 'file',
				link: 'https://youtube.com/live/6BOqzK3MnMk',
				icon: '/videoIcon.svg',
				highlight: false,
				centered: false
			},
			{
				name: "Lab 2",
				type: 'file',
				link: 'https://www.youtube.com/live/SB2KwCEayws?si=BsBRoMTTeWRnC-uJ',
				icon: '/videoIcon.svg',
				highlight: false,
				centered: false
			},
			{
				name: "Session 3",
				type: 'file',
				link: 'https://www.youtube.com/live/dK-1bGAhOUQ',
				icon: '/videoIcon.svg',
				highlight: false,
				centered: false
			},
			{
				name: "Lab 3",
				type: 'file',
				link: 'https://youtube.com/live/xIdmMT1igMs',
				icon: '/videoIcon.svg',
				highlight: false,
				centered: false
			},
			{
				name: "Session 4",
				type: 'file',
				link: 'https://youtube.com/live/ZcDYZONeqHg',
				icon: '/videoIcon.svg',
				highlight: false,
				centered: false
			},
			{
				name: "Lab 4",
				type: 'file',
				link: 'https://youtube.com/live/ze5OOwKg8FQ',
				icon: '/videoIcon.svg',
				highlight: false,
				centered: false
			},
			{
				name: "Session 5",
				type: 'file',
				link: 'https://youtube.com/live/7QO3BQsSvPo',
				icon: '/videoIcon.svg',
				highlight: false,
				centered: false
			},
			{
				name: "Session 5",
				type: 'file',
				link: 'https://youtube.com/live/TFEvxYTyLzM',
				icon: '/videoIcon.svg',
				highlight: false,
				centered: false
			}
		],
		highlight: true,
		centered: false
	},
	{
		name: "Submissions",
		type: 'folder',
		folderType: 'both',
		icon: '/folderIcon.svg',
		textContent: "You can submit your assignments from these links! We'll update these links as we go!",
		contents: [
			{
				name: 'W1 submission',
				type: 'file',
				link: 'https://mysidequest.xyz/week1-submission',
				icon: '/fileIcon.svg',
				highlight: false,
				centered: false
			},
			{
				name: 'W2 submission',
				type: 'file',
				link: 'https://mysidequest.xyz/week2-submission',
				icon: '/fileIcon.svg',
				highlight: false,
				centered: false
			},
			{
				name: 'W3 submission',
				type: 'file',
				link: 'https://mysidequest.xyz/week3-submission',
				icon: '/fileIcon.svg',
				highlight: false,
				centered: false
			},
			{
				name: 'W4 submission',
				type: 'file',
				link: 'https://mysidequest.xyz/week4-submission',
				icon: '/fileIcon.svg',
				highlight: false,
				centered: false
			},
			{
				name: 'W5 submission',
				type: 'file',
				link: 'https://mysidequest.xyz/week5-submission',
				icon: '/fileIcon.svg',
				highlight: false,
				centered: false
			}
		],
		highlight: true,
		centered: false
	},
	{
		name: 'Resources',
		type: 'folder',
		folderType: 'both',
		icon: '/folderIcon.svg',
		textContent: 'Will be updated to include more resources soon!',
		contents: [
			{
				name: 'W1 Ideas in the wild',
				type: 'file',
				link: 'https://docs.google.com/document/d/14p5RW4gcx3gG9uiUuNKy-mFnZyUMM3ukfD8aP0l-p2Q/',
				icon: '/robotIcon.svg',
				highlight: false,
				centered: true
			},
			{
				name: "Lilyas guide to prototyping with Google!",
				type: 'file',
				link: 'https://drive.google.com/file/d/1NmTyqGj7CqeeEyhLtBCwlvsOTqzJP0Od/view?usp=sharing',
				icon: '/robotIcon.svg',
				highlight: false,
				centered: true
			},
			{
				name: "Roopes guide on running R1 locally!",
				type: 'file',
				link: 'https://docs.google.com/document/d/1MxsfOZYn_5EsoYZTqJMvymNNiee7EdHn_o0jM1UmPRM/edit?usp=sharing',
				icon: '/robotIcon.svg',
				highlight: false,
				centered: true
			},
			{
				name: "FigJam board for Lab #2",
				type: 'file',
				link: 'https://mysidequest.xyz/figjam',
				icon: '/robotIcon.svg',
				highlight: false,
				centered: true
			}
		],
		highlight: false,
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
