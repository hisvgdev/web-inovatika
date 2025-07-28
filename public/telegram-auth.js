window.onTelegramAuth = async function (user) {
    localStorage.setItem('telegramUser', JSON.stringify(user))

    try {
        const res = await fetch('https://botcalendary.ru/api/v1/auth/login/telegram', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                tg_id: user.id,
                init_data: JSON.stringify(user),
                type: 'web',
            }),
        })

        const data = await res.json()

        if (data?.access_token) {
            await fetch('/api/set-tokens', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    access_token: data.access_token,
                    refresh_token: data.refresh_token,
                }),
            })

            window.location.href = '/'
        } else {
            alert('Ошибка авторизации через Telegram')
        }
    } catch (e) {
        console.error('Telegram login failed:', e)
    }
}
