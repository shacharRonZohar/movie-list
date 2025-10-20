import { onMounted, onUnmounted } from 'vue'

/**
 * Keyboard shortcut configuration
 */
export interface KeyboardShortcut {
  key: string
  ctrl?: boolean
  shift?: boolean
  alt?: boolean
  meta?: boolean
  handler: (event: KeyboardEvent) => void
}

/**
 * Keyboard shortcuts composable
 * Registers keyboard shortcuts and handles key events
 * Automatically prevents shortcuts when typing in input fields
 *
 * @param shortcuts - Array of keyboard shortcuts to register
 * @returns Shortcuts configuration
 */
export const useKeyboard = (shortcuts: KeyboardShortcut[]) => {
  const handleKeyDown = (event: KeyboardEvent) => {
    for (const shortcut of shortcuts) {
      const ctrlMatch = shortcut.ctrl ? event.ctrlKey : !event.ctrlKey
      const shiftMatch = shortcut.shift ? event.shiftKey : !event.shiftKey
      const altMatch = shortcut.alt ? event.altKey : !event.altKey
      const metaMatch = shortcut.meta ? event.metaKey : !event.metaKey

      if (
        event.key.toLowerCase() === shortcut.key.toLowerCase() &&
        (shortcut.ctrl === undefined || ctrlMatch) &&
        (shortcut.shift === undefined || shiftMatch) &&
        (shortcut.alt === undefined || altMatch) &&
        (shortcut.meta === undefined || metaMatch)
      ) {
        // Don't trigger if user is typing in an input
        const target = event.target as HTMLElement
        if (
          target.tagName === 'INPUT' ||
          target.tagName === 'TEXTAREA' ||
          target.isContentEditable
        ) {
          continue
        }

        event.preventDefault()
        shortcut.handler(event)
        break
      }
    }
  }

  onMounted(() => {
    window.addEventListener('keydown', handleKeyDown)
  })

  onUnmounted(() => {
    window.removeEventListener('keydown', handleKeyDown)
  })

  return {
    shortcuts,
  }
}

/**
 * Format keyboard shortcut for display
 *
 * @param shortcut - Keyboard shortcut configuration
 * @returns Formatted shortcut string (e.g., "Ctrl + Shift + K")
 */
export const formatShortcut = (shortcut: KeyboardShortcut) => {
  const parts: string[] = []

  if (shortcut.ctrl) parts.push('Ctrl')
  if (shortcut.shift) parts.push('Shift')
  if (shortcut.alt) parts.push('Alt')
  if (shortcut.meta) parts.push('⌘')

  parts.push(shortcut.key.toUpperCase())

  return parts.join(' + ')
}
