/**
 * Accessibility utilities for enhanced screen reader and keyboard navigation support
 */

/**
 * Generate unique IDs for accessibility attributes
 */
export function generateId(prefix: string = 'a11y'): string {
	return `${prefix}-${Math.random().toString(36).substr(2, 9)}`;
}

/**
 * Announce messages to screen readers
 */
export function announceToScreenReader(message: string, priority: 'polite' | 'assertive' = 'polite'): void {
	const announcement = document.createElement('div');
	announcement.setAttribute('aria-live', priority);
	announcement.setAttribute('aria-atomic', 'true');
	announcement.className = 'sr-only';
	announcement.textContent = message;

	document.body.appendChild(announcement);

	// Remove after announcement
	setTimeout(() => {
		document.body.removeChild(announcement);
	}, 1000);
}

/**
 * Trap focus within a container (for modals, dropdowns, etc.)
 */
export function trapFocus(container: HTMLElement): () => void {
	const focusableElements = container.querySelectorAll(
		'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
	) as NodeListOf<HTMLElement>;

	const firstElement = focusableElements[0];
	const lastElement = focusableElements[focusableElements.length - 1];

	const handleTabKey = (e: KeyboardEvent) => {
		if (e.key !== 'Tab') return;

		if (e.shiftKey) {
			if (document.activeElement === firstElement) {
				lastElement.focus();
				e.preventDefault();
			}
		} else {
			if (document.activeElement === lastElement) {
				firstElement.focus();
				e.preventDefault();
			}
		}
	};

	container.addEventListener('keydown', handleTabKey);

	// Return cleanup function
	return () => {
		container.removeEventListener('keydown', handleTabKey);
	};
}

/**
 * Check if element is visible to screen readers
 */
export function isA11yVisible(element: HTMLElement): boolean {
	const style = window.getComputedStyle(element);
	const rect = element.getBoundingClientRect();

	return (
		style.position !== 'fixed' &&
		style.display !== 'none' &&
		style.visibility !== 'hidden' &&
		style.opacity !== '0' &&
		rect.width > 0 &&
		rect.height > 0 &&
		!element.hasAttribute('aria-hidden')
	);
}

/**
 * Generate skip links for better keyboard navigation
 */
export function generateSkipLinks(): { id: string; label: string; href: string }[] {
	return [
		{
			id: 'skip-to-main',
			label: 'Skip to main content',
			href: '#main-content'
		},
		{
			id: 'skip-to-nav',
			label: 'Skip to navigation',
			href: '#nav'
		},
		{
			id: 'skip-to-contact',
			label: 'Skip to contact information',
			href: '#contact'
		}
	];
}

/**
 * Handle escape key for closing modals/dropdowns
 */
export function handleEscapeKey(callback: () => void): () => void {
	const handleEscape = (e: KeyboardEvent) => {
		if (e.key === 'Escape') {
			callback();
		}
	};

	document.addEventListener('keydown', handleEscape);

	return () => {
		document.removeEventListener('keydown', handleEscape);
	};
}

/**
 * Enhanced aria-label generation for complex components
 */
export function generateAriaLabel(
	baseLabel: string,
	context?: string,
	state?: string
): string {
	const parts = [baseLabel];

	if (context) {
		parts.push(context);
	}

	if (state) {
		parts.push(`(${state})`);
	}

	return parts.join(' ');
}

/**
 * Check color contrast for WCAG compliance (simplified version)
 */
export function checkColorContrast(foreground: string, background: string): {
	ratio: number;
	wcagAA: boolean;
	wcagAAA: boolean;
} {
	// Simple contrast check (in production, use a proper library)
	const hex2rgb = (hex: string) => {
		const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
		return result
			? {
					r: parseInt(result[1], 16),
					g: parseInt(result[2], 16),
					b: parseInt(result[3], 16)
			  }
			: { r: 0, g: 0, b: 0 };
	};

	const fg = hex2rgb(foreground);
	const bg = hex2rgb(background);

	const luminance = (color: { r: number; g: number; b: number }) => {
		const [rs, gs, bs] = [color.r, color.g, color.b].map(c => {
			c = c / 255;
			return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
		});
		return 0.2126 * rs + 0.7152 * gs + 0.0722 * bs;
	};

	const fgLum = luminance(fg);
	const bgLum = luminance(bg);
	const ratio = (Math.max(fgLum, bgLum) + 0.05) / (Math.min(fgLum, bgLum) + 0.05);

	return {
		ratio,
		wcagAA: ratio >= 4.5,
		wcagAAA: ratio >= 7
	};
}

/**
 * Debounce function for accessibility events
 */
export function debounce<T extends (...args: any[]) => any>(
	func: T,
	wait: number
): (...args: Parameters<T>) => void {
	let timeout: NodeJS.Timeout;

	return (...args: Parameters<T>) => {
		clearTimeout(timeout);
		timeout = setTimeout(() => func(...args), wait);
	};
}