export type UITheme = 'wasteland' | 'new'

export interface ThemeState {
  uiTheme: UITheme
  setUITheme: (theme: UITheme) => void
}
