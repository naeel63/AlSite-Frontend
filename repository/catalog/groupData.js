/**
 * Download group's data with children and products by group's id
 * @returns {Promise<Group[]>}
 */
async function fetchGroupData(groupId){
    const url = `https://localhost:7128/api/Group/${groupId}`
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

/**
 * Download group's data with children and products by group's id
 * @returns {Promise<Group[]>}
 */
async function fetchGroupDataSecond(groupId, page = 1, pageSize = 15) {
    const url = `https://localhost:7128/api/Product/GroupProducts?groupId=${groupId}&page=${page}&pageSize=${pageSize}`;

    try {
        const response = await fetch(url);

        if (!response.ok) {
            throw new Error(`Response status: ${response.status}`);
        }

        return await response.json();
    } catch (error) {
        console.error("Ошибка при получении данных:", error.message);
        return [];
    }
}