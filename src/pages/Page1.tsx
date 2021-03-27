import React from 'react';

function Page1(props: any) {
    return (
		<div className="App">
			<h1>Page 1</h1>
			<p>Good Morning.</p>
			<iframe
				src="https://open.spotify.com/embed/album/1DFixLWuPkv3KT3TnV35m3"
				width="100%"
				height="90"
				// style="positon:abssolute; "
				frameBorder="0"
				allowTransparency={true}
				allow="encrypted-media"
			></iframe>

			<iframe
				width="100"
				height="80"
				src="https://www.youtube.com/embed/WPni755-Krg?rel=0&autoplay=1"
				title="YouTube video player"
				frameBorder="0"
				allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
			></iframe>
		</div>
	);
}

export default Page1