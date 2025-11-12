/**
 * Session Recording & Heatmap System
 * Captures user interactions for playback and analysis
 */

export type EventType =
  | 'mousemove'
  | 'click'
  | 'scroll'
  | 'input'
  | 'focus'
  | 'blur'
  | 'resize'
  | 'page_load'
  | 'page_unload';

export interface RecordedEvent {
  type: EventType;
  timestamp: number;
  data: {
    x?: number;
    y?: number;
    scrollX?: number;
    scrollY?: number;
    target?: string; // CSS selector
    value?: string;
    width?: number;
    height?: number;
    path?: string;
  };
}

export interface FrictionEvent {
  type: 'rage_click' | 'dead_click' | 'error_click' | 'form_abandon';
  timestamp: number;
  element: string;
  count?: number;
  metadata?: Record<string, any>;
}

export interface SessionRecording {
  sessionId: string;
  startTime: number;
  endTime?: number;
  duration?: number;
  events: RecordedEvent[];
  frictionEvents: FrictionEvent[];
  viewport: {
    width: number;
    height: number;
  };
  url: string;
  userAgent: string;
  intentScore?: number;
}

export interface HeatmapData {
  sessionId: string;
  url: string;
  clicks: Array<{ x: number; y: number; timestamp: number }>;
  scrollDepth: number[]; // Array of max scroll depths at each timestamp
  mousePath: Array<{ x: number; y: number; timestamp: number }>;
  viewport: { width: number; height: number };
}

/**
 * Get CSS selector for an element
 */
function getElementSelector(element: Element): string {
  if (!element) return '';

  // Use ID if available
  if (element.id) return `#${element.id}`;

  // Use data attributes
  const dataId = element.getAttribute('data-testid') || element.getAttribute('data-id');
  if (dataId) return `[data-testid="${dataId}"]`;

  // Use classes
  const classes = Array.from(element.classList)
    .filter(c => !c.match(/^(hover|focus|active|visited|disabled)/))
    .slice(0, 2)
    .join('.');

  if (classes) {
    return `${element.tagName.toLowerCase()}.${classes}`;
  }

  // Fallback to tag name with nth-child
  const parent = element.parentElement;
  if (parent) {
    const siblings = Array.from(parent.children);
    const index = siblings.indexOf(element) + 1;
    return `${element.tagName.toLowerCase()}:nth-child(${index})`;
  }

  return element.tagName.toLowerCase();
}

/**
 * Detect rage clicks (multiple rapid clicks on same element)
 */
class RageClickDetector {
  private clicks: Array<{ element: string; timestamp: number }> = [];
  private readonly threshold = 3; // 3+ clicks
  private readonly timeWindow = 2000; // within 2 seconds

  addClick(element: string, timestamp: number): FrictionEvent | null {
    // Add new click
    this.clicks.push({ element, timestamp });

    // Remove old clicks outside time window
    this.clicks = this.clicks.filter(c => timestamp - c.timestamp < this.timeWindow);

    // Count clicks on same element
    const sameElementClicks = this.clicks.filter(c => c.element === element);

    if (sameElementClicks.length >= this.threshold) {
      // Rage click detected!
      this.clicks = []; // Reset
      return {
        type: 'rage_click',
        timestamp,
        element,
        count: sameElementClicks.length,
      };
    }

    return null;
  }
}

/**
 * Detect dead clicks (clicks that don't trigger any action)
 */
class DeadClickDetector {
  private clicks: Map<string, number> = new Map();
  private readonly timeout = 300; // 300ms to see if anything happens

  addClick(element: string, timestamp: number): Promise<FrictionEvent | null> {
    return new Promise((resolve) => {
      const beforeScroll = window.scrollY;
      const beforeUrl = window.location.href;

      setTimeout(() => {
        const afterScroll = window.scrollY;
        const afterUrl = window.location.href;

        // Check if anything changed
        const nothingHappened =
          beforeScroll === afterScroll &&
          beforeUrl === afterUrl &&
          !document.querySelector(':focus'); // No element gained focus

        if (nothingHappened) {
          resolve({
            type: 'dead_click',
            timestamp,
            element,
          });
        } else {
          resolve(null);
        }
      }, this.timeout);
    });
  }
}

/**
 * Session Recorder Class
 */
export class SessionRecorder {
  private recording: SessionRecording | null = null;
  private rageClickDetector = new RageClickDetector();
  private deadClickDetector = new DeadClickDetector();
  private mouseMoveThrottle = 100; // ms between mouse move captures
  private lastMouseMove = 0;
  private isRecording = false;

  constructor(private sessionId: string) {}

  /**
   * Start recording session
   */
  start() {
    if (this.isRecording) return;

    this.recording = {
      sessionId: this.sessionId,
      startTime: Date.now(),
      events: [],
      frictionEvents: [],
      viewport: {
        width: window.innerWidth,
        height: window.innerHeight,
      },
      url: window.location.href,
      userAgent: navigator.userAgent,
    };

    this.isRecording = true;
    this.attachListeners();

    // Record initial page load
    this.recordEvent({
      type: 'page_load',
      timestamp: Date.now(),
      data: {
        path: window.location.pathname,
        scrollX: window.scrollX,
        scrollY: window.scrollY,
      },
    });
  }

  /**
   * Stop recording and return session data
   */
  stop(): SessionRecording | null {
    if (!this.recording || !this.isRecording) return null;

    this.isRecording = false;
    this.detachListeners();

    this.recording.endTime = Date.now();
    this.recording.duration = this.recording.endTime - this.recording.startTime;

    return this.recording;
  }

  /**
   * Record an event
   */
  private recordEvent(event: RecordedEvent) {
    if (!this.recording || !this.isRecording) return;
    this.recording.events.push(event);
  }

  /**
   * Record a friction event
   */
  private recordFriction(event: FrictionEvent) {
    if (!this.recording || !this.isRecording) return;
    this.recording.frictionEvents.push(event);
  }

  /**
   * Attach event listeners
   */
  private attachListeners() {
    // Mouse move (throttled)
    document.addEventListener('mousemove', this.handleMouseMove, { passive: true });

    // Clicks
    document.addEventListener('click', this.handleClick, true);

    // Scroll
    window.addEventListener('scroll', this.handleScroll, { passive: true });

    // Input changes
    document.addEventListener('input', this.handleInput, true);

    // Focus/blur
    document.addEventListener('focus', this.handleFocus, true);
    document.addEventListener('blur', this.handleBlur, true);

    // Resize
    window.addEventListener('resize', this.handleResize, { passive: true });
  }

  /**
   * Detach event listeners
   */
  private detachListeners() {
    document.removeEventListener('mousemove', this.handleMouseMove);
    document.removeEventListener('click', this.handleClick, true);
    window.removeEventListener('scroll', this.handleScroll);
    document.removeEventListener('input', this.handleInput, true);
    document.removeEventListener('focus', this.handleFocus, true);
    document.removeEventListener('blur', this.handleBlur, true);
    window.removeEventListener('resize', this.handleResize);
  }

  /**
   * Event Handlers
   */
  private handleMouseMove = (e: MouseEvent) => {
    const now = Date.now();
    if (now - this.lastMouseMove < this.mouseMoveThrottle) return;

    this.lastMouseMove = now;
    this.recordEvent({
      type: 'mousemove',
      timestamp: now,
      data: {
        x: e.clientX,
        y: e.clientY,
      },
    });
  };

  private handleClick = async (e: MouseEvent) => {
    const target = e.target as Element;
    const selector = getElementSelector(target);
    const timestamp = Date.now();

    this.recordEvent({
      type: 'click',
      timestamp,
      data: {
        x: e.clientX,
        y: e.clientY,
        target: selector,
      },
    });

    // Check for rage clicks
    const rageClick = this.rageClickDetector.addClick(selector, timestamp);
    if (rageClick) {
      this.recordFriction(rageClick);
      console.warn('[Session] Rage click detected:', selector);
    }

    // Check for dead clicks
    const deadClick = await this.deadClickDetector.addClick(selector, timestamp);
    if (deadClick) {
      this.recordFriction(deadClick);
      console.warn('[Session] Dead click detected:', selector);
    }
  };

  private handleScroll = () => {
    this.recordEvent({
      type: 'scroll',
      timestamp: Date.now(),
      data: {
        scrollX: window.scrollX,
        scrollY: window.scrollY,
      },
    });
  };

  private handleInput = (e: Event) => {
    const target = e.target as HTMLInputElement;
    const selector = getElementSelector(target);

    // Don't record sensitive data - just that input occurred
    this.recordEvent({
      type: 'input',
      timestamp: Date.now(),
      data: {
        target: selector,
        value: target.type === 'password' ? '[REDACTED]' : undefined,
      },
    });
  };

  private handleFocus = (e: FocusEvent) => {
    const target = e.target as Element;
    this.recordEvent({
      type: 'focus',
      timestamp: Date.now(),
      data: {
        target: getElementSelector(target),
      },
    });
  };

  private handleBlur = (e: FocusEvent) => {
    const target = e.target as Element;
    this.recordEvent({
      type: 'blur',
      timestamp: Date.now(),
      data: {
        target: getElementSelector(target),
      },
    });
  };

  private handleResize = () => {
    this.recordEvent({
      type: 'resize',
      timestamp: Date.now(),
      data: {
        width: window.innerWidth,
        height: window.innerHeight,
      },
    });
  };

  /**
   * Get current recording
   */
  getRecording(): SessionRecording | null {
    return this.recording;
  }
}

/**
 * Generate heatmap data from recorded events
 */
export function generateHeatmapData(recording: SessionRecording): HeatmapData {
  const clicks = recording.events
    .filter(e => e.type === 'click' && e.data.x && e.data.y)
    .map(e => ({
      x: e.data.x!,
      y: e.data.y!,
      timestamp: e.timestamp,
    }));

  const mousePath = recording.events
    .filter(e => e.type === 'mousemove' && e.data.x && e.data.y)
    .map(e => ({
      x: e.data.x!,
      y: e.data.y!,
      timestamp: e.timestamp,
    }));

  const scrollEvents = recording.events.filter(e => e.type === 'scroll');
  const scrollDepth = scrollEvents.map(e => e.data.scrollY || 0);

  return {
    sessionId: recording.sessionId,
    url: recording.url,
    clicks,
    scrollDepth,
    mousePath,
    viewport: recording.viewport,
  };
}
