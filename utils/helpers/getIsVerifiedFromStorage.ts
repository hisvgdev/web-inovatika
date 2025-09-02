export const getIsVerifiedFromStorage = (): boolean | null => {
  try {
    const stored = localStorage.getItem("me")
    if (!stored) return null

    const parsed = JSON.parse(stored)

    if (
      typeof parsed === 'object' &&
      parsed !== null &&
      'user' in parsed &&
      typeof parsed.user === 'object' &&
      parsed.user !== null &&
      'email' in parsed.user
    ) {
      return typeof parsed.user.is_verified === 'boolean' ? parsed.user.is_verified : null
    }

    return null
  } catch (error) {
    console.error("Ошибка при чтении is_verified из localStorage:", error)
    return null
  }
}
