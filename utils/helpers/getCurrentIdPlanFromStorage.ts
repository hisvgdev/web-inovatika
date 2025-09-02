interface IGetCurrentPlanFromStorage {
  end_at: string
  id: string;
  is_active: boolean;
  payment_id: string;
  start_at: string;
  tariff_id: string;
  user_id: string
}
export const getCurrentPlanFromStorage = (): IGetCurrentPlanFromStorage | null => {
  try {
    const stored = localStorage.getItem("me")
    if (!stored) return null

    const parsed = JSON.parse(stored)

    if (
      typeof parsed === 'object' &&
      parsed !== null &&
      'subscription' in parsed &&
      typeof parsed.subscription === 'object' &&
      parsed.subscription !== null
    ) {
      return typeof parsed.subscription === 'object' ? parsed.subscription : null
    }

    return null
  } catch (error) {
    console.error("Ошибка при чтении id из localStorage:", error)
    return null
  }
}
