document.getElementById('albumForm').addEventListener('submit', function(e) {
    e.preventDefault();  // Prevent form from submitting normally

    // Get values from the form inputs
    const albumName = document.getElementById('albumName').value;
    const songList = document.getElementById('songList').value.split(',').map(song => song.trim());

    // Get the file input
    const albumCoverFile = document.getElementById('albumCover').files[0];

    // Check if an image file was uploaded
    if (!albumCoverFile) {
        alert('Please upload an album cover image.');
        return;
    }

    // Use FileReader to read the uploaded image and display it
    const reader = new FileReader();
    reader.onload = function(e) {
        // Once the file is read, we can use it to create the album element
        const album = document.createElement('div');
        album.classList.add('album');

        // Add album cover image
        const img = document.createElement('img');
        img.src = e.target.result;  // Set the image source to the result of FileReader
        img.alt = albumName;
        album.appendChild(img);

        // Create song list
        const songDiv = document.createElement('div');
        songDiv.classList.add('songs');
        const songUl = document.createElement('ul');

        songList.forEach(song => {
            const li = document.createElement('li');
            li.textContent = song;
            songUl.appendChild(li);
        });

        songDiv.appendChild(songUl);
        album.appendChild(songDiv);

        // Append the new album to the album container
        document.getElementById('albumContainer').appendChild(album);
    };

    // Read the album cover file as a Data URL (base64 encoded string)
    reader.readAsDataURL(albumCoverFile);

    // Reset the form
    document.getElementById('albumForm').reset();
});
