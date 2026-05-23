import type { RootState } from '../store'

// Other code such as selectors can use the imported `RootState` type
export const alertMessage = (state: RootState) => state.alert.message

export const alertSeverity = (state: RootState) => state.alert.severity
