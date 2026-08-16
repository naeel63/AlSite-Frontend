async function createOrder(order) {
    const url = 'https://localhost:7128/api/Order'

    try {
        const response = await fetch(
            url,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(order)
            }
        )

        if (!response.ok) {
            const error = await response.json().catch(() => null)

            throw new Error(
                error?.message ||
                error?.title ||
                `Response status: ${response.status}`
            )
        }

        const data = await response.json()

        return data

    } catch (error) {
        console.error(
            'Ошибка при оформлении заказа:',
            error.message
        )

        throw error
    }
}