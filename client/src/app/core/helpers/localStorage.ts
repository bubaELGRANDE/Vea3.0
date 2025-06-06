export function addLocalStorageUser(user: any) {
    const userInfo = {
        id: user.id,
        name: user.name,
        username: user.username,
        email: user.email,
        img: user.img,
        roles: user.roles,
    };

    localStorage.setItem('auth_data', JSON.stringify(userInfo));
}

export function addLocalStorageToken(tokens: any) {
    const token = {
        accessToken: tokens.accessToken,
        refreshToken: tokens.refreshToken,
        expiresIn: tokens.expiresIn,
    }
    localStorage.setItem('auth_key', JSON.stringify(token));
}

export function clearAllStorage(): void {
    localStorage.clear()
}