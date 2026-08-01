/**
 * Загрузка количества продуктов в группе
 * @returns {Promise<Group[]>}
 */
async function fetchGroupCount(groupId){
    const url = `https://localhost:7128/api/Group/Count/${groupId}`
    try {
        const response = await fetch(url)
        if (!response.ok) {
            throw new Error(`Response status: ${response.status}`);
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Ошибка при получении данных:', error.message);
		return [];
    }
}