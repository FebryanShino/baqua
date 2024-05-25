export async function fetchData(tags: string) {
    const response = await fetch(`https://danbooru.donmai.us/posts.json?tags=${tags}`);
    const data = await response.json()
    return data;
}