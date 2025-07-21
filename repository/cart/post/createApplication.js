async function fetchPost(bodyObject) {
    const url = "https://localhost:7128/api/Application"
	try {
        const response = await fetch(url, {
            method : 'post',
            body: JSON.stringify(bodyObject),
            headers:{
                "Content-Type": "application/json; charset=UTF-8",
            } 
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