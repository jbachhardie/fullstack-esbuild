import { createTheme, globalStyle, style } from '@vanilla-extract/css'

export const [themeClass, theme] = createTheme({
  color: {
    brand: 'blue',
    background: '#333',
    primary: '#f5f5f5',
    secondary: '#f0f0f0',
  },
  font: {
    body: 'arial',
  },
})

globalStyle('html, body', {
  margin: 0,
})

export const containerStyle = style({
  width: '100%',
  height: '100vh',
  paddingTop: '4rem',
  paddingBottom: '4rem',
  color: theme.color.primary,
  background: theme.color.background,
})

export const countStyle = style({
  fontSize: '1.5rem',
})

export const gridStyle = style({
  width: '100%',
  height: '100%',
  paddingLeft: '2rem',
  paddingRight: '2rem',
  display: 'grid',
  gridTemplateColumns: 'minmax(min-content, 400px)',
  gridTemplateRows: 'repeat(3, min-content) 1fr min-content',
  gap: '2rem',
  justifyItems: 'stretch',
  justifyContent: 'center',
})

export const searchStyle = style({
  display: 'grid',
  gridTemplateColumns: '1fr min-content',
  gap: '1rem',
})

export const searchBoxStyle = style({
  borderRadius: '4px',
  borderColor: theme.color.primary,
  color: theme.color.primary,
  borderWidth: '2px',
  borderStyle: 'solid',
  background: 'none',
})

export const resultsStyle = style({
  display: 'grid',
  gap: '1rem',
  gridAutoRows: 'min-content',
  overflowY: 'auto',
  overscrollBehavior: 'contain',
  WebkitOverflowScrolling: 'touch',
  paddingRight: '0.5rem',
  scrollbarWidth: 'thin',
  scrollbarColor: `${theme.color.primary} transparent`,
  selectors: {
    '&::-webkit-scrollbar': {
      height: '.375rem',
      width: '.375rem',
    },
    '&::-webkit-scrollbar-track': {
      backgroundColor: 'transparent',
    },
    '&::-webkit-scrollbar-thumb': {
      backgroundColor: theme.color.primary,
      borderRadius: '3px',
    },
    '&::-webkit-scrollbar-thumb:hover': {
      backgroundColor: theme.color.primary,
    },
    '&::-webkit-scrollbar-thumb:active': {
      backgroundColor: theme.color.primary,
    },
    '&::-webkit-scrollbar-thumb:vertical': {
      minHeight: '1rem',
    },
    '&::-webkit-scrollbar-thumb:horizontal': {
      minWidth: '1rem',
    },
  },
})

export const resultStyle = style({
  padding: '1rem',
  borderColor: theme.color.primary,
  borderRadius: '4px',
  borderWidth: '2px',
  borderStyle: 'solid',
  color: theme.color.primary,
  textDecoration: 'none',
  display: 'flex',
  gap: '1rem',
  alignItems: 'center',
})

export const resultAvatarStyle = style({
  borderRadius: '50%',
  height: '50px',
  width: '50px',
})

export const resultTitleStyle = style({
  fontSize: '1.2rem',
  fontWeight: 'bold',
})

export const resultInfoGroupStyle = style({
  color: theme.color.secondary,
})

export const paginationStyle = style({
  display: 'flex',
  justifyContent: 'space-between',
})
