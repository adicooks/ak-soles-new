/**
 * Responsive utilities for handling window sizing and layout adjustments
 */

export class ResponsiveManager {
  private resizeTimeout: ReturnType<typeof setTimeout> | null = null;
  private listeners: ((isMobile: boolean) => void)[] = [];
  private currentIsMobile: boolean = false;

  constructor(private mobileBreakpoint: number = 768) {
    this.checkViewport();
    this.setupResizeListener();
  }

  /**
   * Initialize responsive behavior
   */
  public init(): void {
    this.applyResponsiveStyles();
    this.checkViewport();
  }

  /**
   * Setup window resize listener with debouncing
   */
  private setupResizeListener(): void {
    window.addEventListener("resize", () => {
      if (this.resizeTimeout) {
        clearTimeout(this.resizeTimeout);
      }

      this.resizeTimeout = setTimeout(() => {
        this.handleResize();
      }, 250); // Debounce resize events
    });

    window.addEventListener("orientationchange", () => {
      this.handleResize();
    });
  }

  /**
   * Handle window resize event
   */
  private handleResize(): void {
    const wasMobile = this.currentIsMobile;
    this.checkViewport();

    if (wasMobile !== this.currentIsMobile) {
      this.notifyListeners();
    }

    // Trigger reflow and repaint to prevent CSS issues
    this.recalculateLayout();
  }

  /**
   * Check if current viewport is mobile
   */
  private checkViewport(): void {
    this.currentIsMobile = window.innerWidth < this.mobileBreakpoint;
  }

  /**
   * Notify all listeners of viewport change
   */
  private notifyListeners(): void {
    this.listeners.forEach((listener) => listener(this.currentIsMobile));
  }

  /**
   * Register listener for viewport changes
   */
  public onViewportChange(callback: (isMobile: boolean) => void): void {
    this.listeners.push(callback);
  }

  /**
   * Get current viewport width
   */
  public getViewportWidth(): number {
    return window.innerWidth;
  }

  /**
   * Get current viewport height
   */
  public getViewportHeight(): number {
    return window.innerHeight;
  }

  /**
   * Check if currently in mobile view
   */
  public isMobile(): boolean {
    return this.currentIsMobile;
  }

  /**
   * Force recalculation of layout to prevent CSS issues
   */
  private recalculateLayout(): void {
    // Force a reflow by accessing offsetHeight
    document.body.offsetHeight;

    // Trigger CSS recalculation on main elements
    const root = document.documentElement;
    root.style.fontSize = root.style.fontSize; // Trigger recalc

    // Dispatch custom event for components to respond
    const event = new CustomEvent("layoutRecalculated", {
      detail: {
        isMobile: this.currentIsMobile,
        width: this.getViewportWidth(),
        height: this.getViewportHeight(),
      },
    });
    window.dispatchEvent(event);
  }

  /**
   * Apply responsive styles based on viewport
   */
  private applyResponsiveStyles(): void {
    if (this.currentIsMobile) {
      document.body.classList.add("mobile-view");
      document.body.classList.remove("desktop-view");
    } else {
      document.body.classList.add("desktop-view");
      document.body.classList.remove("mobile-view");
    }
  }

  /**
   * Get a CSS media query string
   */
  public getMediaQuery(breakpoint: number): string {
    return `(max-width: ${breakpoint}px)`;
  }
}

// Create and export singleton instance
export const responsiveManager = new ResponsiveManager(768);
