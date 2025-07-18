async function fetchPost(bodyObject) {
    const url = ""
	try {
        const response = await fetch(url, {
            method : 'post',
            body: JSON.stringify(bodyObject)
        })
        if (!response.ok) {
            throw new Error(`Response status: ${response.status}`);
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Ошибка при отправке данных:', error.message);
		return [];
    }
}