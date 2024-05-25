export default async function fetchItunesAlbums(artistId: string) {
    const response = await fetch(`https://itunes.apple.com/lookup?id=${artistId}&entity=album,song`);
    const data = await response.json();
    return data;
} 