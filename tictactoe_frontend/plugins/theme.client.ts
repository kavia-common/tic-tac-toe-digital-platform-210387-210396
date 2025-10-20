export default defineNuxtPlugin(() => {
  // Inject global theme stylesheet
  if (typeof window !== 'undefined') {
    const id = 'ocean-professional-theme'
    if (!document.getElementById(id)) {
      const link = document.createElement('link')
      link.id = id
      link.rel = 'stylesheet'
      link.href = '/assets/styles/theme.css'
      document.head.appendChild(link)
    }
  }
})
