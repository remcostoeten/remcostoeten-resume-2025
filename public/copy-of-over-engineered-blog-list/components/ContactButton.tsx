"use client";

import * as React from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, MotionConfig, motion as motionOriginal } from "framer-motion";
import { Mail, User, MessageSquare, Send, X } from "lucide-react";

import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Label } from "./ui/label";

// Workaround for framer-motion type mismatch
const motion = motionOriginal as any;

const TRANSITION = {
  type: "spring",
  bounce: 0.15,
  duration: 0.5,
} as const;

interface ContactPopoverContextType {
  isOpen: boolean;
  openPopover: () => void;
  closePopover: () => void;
  uniqueId: string;
  triggerRef: React.RefObject<HTMLButtonElement>;
  formData: {
    name: string;
    email: string;
    message: string;
  };
  setFormData: React.Dispatch<
    React.SetStateAction<{
      name: string;
      email: string;
      message: string;
    }>
  >;
  errors: Record<string, string>;
  setErrors: React.Dispatch<React.SetStateAction<Record<string, string>>>;
  isSubmitting: boolean;
  setIsSubmitting: React.Dispatch<React.SetStateAction<boolean>>;
}

const ContactPopoverContext = React.createContext<
  ContactPopoverContextType | undefined
>(undefined);

function useContactPopover() {
  const context = React.useContext(ContactPopoverContext);
  if (!context) {
    throw new Error(
      "useContactPopover must be used within a ContactPopoverProvider"
    );
  }
  return context;
}

function useContactPopoverLogic() {
  const uniqueId = React.useId();
  const triggerRef = React.useRef<HTMLButtonElement>(null);
  const [isOpen, setIsOpen] = React.useState(false);
  const [formData, setFormData] = React.useState({
    name: "",
    email: "",
    message: "",
  });
  const [errors, setErrors] = React.useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  const openPopover = () => setIsOpen(true);
  const closePopover = () => {
    setIsOpen(false);
    setTimeout(() => {
      setFormData({ name: "", email: "", message: "" });
      setErrors({});
      setIsSubmitting(false);
    }, 300);
  };

  return {
    isOpen,
    openPopover,
    closePopover,
    uniqueId,
    triggerRef,
    formData,
    setFormData,
    errors,
    setErrors,
    isSubmitting,
    setIsSubmitting,
  };
}

interface ContactPopoverRootProps {
  children: React.ReactNode;
  className?: string;
}

const ContactPopoverRoot = React.forwardRef<
  HTMLDivElement,
  ContactPopoverRootProps
>(({ children, className }, ref) => {
  const popoverLogic = useContactPopoverLogic();

  return (
    <ContactPopoverContext.Provider value={popoverLogic}>
      <MotionConfig transition={TRANSITION}>
        <div ref={ref} className={className}>
          {children}
        </div>
      </MotionConfig>
    </ContactPopoverContext.Provider>
  );
});
ContactPopoverRoot.displayName = "ContactPopoverRoot";

interface ContactPopoverTriggerProps {
  children: React.ReactNode;
  className?: string;
}

const ContactPopoverTrigger = React.forwardRef<
  HTMLButtonElement,
  ContactPopoverTriggerProps
>(({ children, className }, ref) => {
  const { openPopover, isOpen, triggerRef } = useContactPopover();

  // Combine refs
  const combinedRef = (node: HTMLButtonElement) => {
    // @ts-ignore
    triggerRef.current = node;
    if (typeof ref === 'function') ref(node);
    else if (ref) ref.current = node;
  };

  return (
    <button
      ref={combinedRef}
      className={className}
      onClick={openPopover}
      disabled={isOpen}
    >
      {children}
    </button>
  );
});
ContactPopoverTrigger.displayName = "ContactPopoverTrigger";

/**
 * Hook to calculate popover position relative to the trigger.
 * Default: Anchored ABOVE the trigger (since it's a footer button).
 */
function usePopoverPosition(isOpen: boolean) {
  const { triggerRef } = useContactPopover();
  const [style, setStyle] = React.useState<React.CSSProperties>({});
  const [placement, setPlacement] = React.useState<'top' | 'bottom'>('top');

  const updatePosition = React.useCallback(() => {
    if (!triggerRef.current || !isOpen) return;

    const triggerRect = triggerRef.current.getBoundingClientRect();
    const gap = 12; // Space between button and popover
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;
    const popoverWidth = Math.min(420, viewportWidth - 32); // Max width 420px, with padding
    const margin = 16; // Safe area margin from viewport edges

    // Horizontal Center
    let left = triggerRect.left + triggerRect.width / 2;
    
    // Clamp horizontal to viewport margins
    const minLeft = margin + popoverWidth / 2;
    const maxLeft = viewportWidth - margin - popoverWidth / 2;
    
    if (left < minLeft) left = minLeft;
    if (left > maxLeft) left = maxLeft;

    // Vertical Positioning Logic
    const spaceAbove = triggerRect.top;
    const spaceBelow = viewportHeight - triggerRect.bottom;
    
    // Default to placing above (standard for footer)
    // unless space is very tight above (< 350px) AND there is more space below.
    let placeAbove = true;
    if (spaceAbove < 350 && spaceBelow > spaceAbove) {
        placeAbove = false;
    }

    const baseStyle: React.CSSProperties = {
        position: 'fixed',
        left: `${left}px`,
        transform: 'translateX(-50%)',
        width: `${popoverWidth}px`,
        maxWidth: 'calc(100vw - 32px)',
        zIndex: 1000, // Ensure it's above the backdrop (z-999)
    };

    if (placeAbove) {
        setPlacement('top');
        // Calculate max available height above
        const availableHeight = spaceAbove - gap - margin;
        
        setStyle({
            ...baseStyle,
            bottom: `${viewportHeight - triggerRect.top + gap}px`,
            maxHeight: `${availableHeight}px`,
            transformOrigin: 'bottom center',
        });
    } else {
        setPlacement('bottom');
        // Calculate max available height below
        const availableHeight = spaceBelow - gap - margin;

        setStyle({
            ...baseStyle,
            top: `${triggerRect.bottom + gap}px`,
            maxHeight: `${availableHeight}px`,
            transformOrigin: 'top center',
        });
    }

  }, [isOpen, triggerRef]);

  React.useLayoutEffect(() => {
    updatePosition();
    window.addEventListener('resize', updatePosition);
    window.addEventListener('scroll', updatePosition, true);
    
    return () => {
      window.removeEventListener('resize', updatePosition);
      window.removeEventListener('scroll', updatePosition, true);
    };
  }, [updatePosition]);

  return { style, placement };
}

interface ContactPopoverContentProps {
  className?: string;
}

const ContactPopoverContent = React.forwardRef<
  HTMLDivElement,
  ContactPopoverContentProps
>(({ className }, ref) => {
  const {
    isOpen,
    closePopover,
    formData,
    setFormData,
    errors,
    setErrors,
    isSubmitting,
    setIsSubmitting,
  } = useContactPopover();
  
  const contentRef = React.useRef<HTMLDivElement>(null);
  const [container, setContainer] = React.useState<HTMLElement | null>(null);
  const { style: popoverStyle, placement } = usePopoverPosition(isOpen);

  React.useEffect(() => {
    setContainer(document.body);
  }, []);

  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        contentRef.current &&
        !contentRef.current.contains(event.target as Node)
      ) {
        closePopover();
      }
    };
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [closePopover, isOpen]);

  React.useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") closePopover();
    };
    if (isOpen) {
      document.addEventListener("keydown", handleKeyDown);
    }
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [closePopover, isOpen]);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Please enter a valid email";
    }

    if (!formData.message.trim()) {
      newErrors.message = "Message is required";
    } else if (formData.message.trim().length < 10) {
      newErrors.message = "Message must be at least 10 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);
    await new Promise((resolve) => setTimeout(resolve, 1500));
    console.log("Form submitted:", formData);
    setIsSubmitting(false);
    closePopover();
  };

  const handleInputChange = (
    field: keyof typeof formData,
    value: string
  ) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }));
    }
  };

  if (!container) return null;

  // Animation variants based on placement
  const isTop = placement === 'top';
  const initialY = isTop ? 10 : -10; // Slide in from button
  const exitY = isTop ? 10 : -10;

  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-black/40 backdrop-blur-[2px] z-[999]"
            onClick={closePopover}
          />
          
          <motion.div
            ref={contentRef}
            style={popoverStyle}
            className={`flex flex-col overflow-hidden rounded-2xl border border-border bg-background shadow-2xl ${className || ''}`}
            initial={{ opacity: 0, scale: 0.9, y: initialY }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: exitY }}
            transition={{
              type: "spring",
              bounce: 0.2,
              duration: 0.4,
            }}
          >
            <div className="flex items-center justify-between border-b border-border bg-muted/30 px-6 py-4 flex-shrink-0">
              <h2 className="text-lg font-semibold text-foreground">
                Get in Touch
              </h2>
              <button
                onClick={closePopover}
                className="h-8 w-8 rounded-full inline-flex items-center justify-center hover:bg-accent hover:text-accent-foreground transition-colors"
                aria-label="Close"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {/* Scrollable Form Container */}
            <form 
                onSubmit={handleSubmit} 
                className="p-6 space-y-4 overflow-y-auto custom-scrollbar flex-1 min-h-0"
            >
              <div className="space-y-2">
                <Label htmlFor="name" className="text-sm font-medium">
                  Name
                </Label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="name"
                    type="text"
                    placeholder="Your name"
                    value={formData.name}
                    onChange={(e) => handleInputChange("name", e.target.value)}
                    className={`pl-10 ${
                      errors.name ? "border-destructive" : ""
                    }`}
                    autoFocus
                  />
                </div>
                {errors.name && (
                  <p className="text-xs text-destructive mt-1">
                    {errors.name}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="email" className="text-sm font-medium">
                  Email
                </Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="your@email.com"
                    value={formData.email}
                    onChange={(e) =>
                      handleInputChange("email", e.target.value)
                    }
                    className={`pl-10 ${
                      errors.email ? "border-destructive" : ""
                    }`}
                  />
                </div>
                {errors.email && (
                  <p className="text-xs text-destructive mt-1">
                    {errors.email}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="message" className="text-sm font-medium">
                  Message
                </Label>
                <div className="relative">
                  <MessageSquare className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Textarea
                    id="message"
                    placeholder="Tell us about your project..."
                    rows={4}
                    value={formData.message}
                    onChange={(e) =>
                      handleInputChange("message", e.target.value)
                    }
                    className={`pl-10 resize-none ${
                      errors.message ? "border-destructive" : ""
                    }`}
                  />
                </div>
                {errors.message && (
                  <p className="text-xs text-destructive mt-1">
                    {errors.message}
                  </p>
                )}
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full relative overflow-hidden group inline-flex items-center justify-center rounded-md bg-primary text-primary-foreground px-4 py-2 text-sm font-medium transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 flex-shrink-0"
              >
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-primary/20 to-transparent"
                  initial={{ x: "-100%" }}
                  whileHover={{ x: "100%" }}
                  transition={{ duration: 0.5 }}
                />
                <span className="relative flex items-center justify-center gap-2">
                  {isSubmitting ? (
                    <motion.div
                      className="w-4 h-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full"
                      animate={{ rotate: 360 }}
                      transition={{
                        duration: 1,
                        repeat: Infinity,
                        ease: "linear",
                      }}
                    />
                  ) : (
                    <>
                      <Send className="h-4 w-4" />
                      Send Message
                    </>
                  )}
                </span>
              </button>
            </form>
          </motion.div>
        </>
      )}
    </AnimatePresence>,
    container
  );
});
ContactPopoverContent.displayName = "ContactPopoverContent";

interface ContactButtonProps {
  className?: string;
  children?: React.ReactNode;
}

export function ContactButton({ className, children }: ContactButtonProps) {
  return (
    <ContactPopoverRoot>
      <ContactPopoverTrigger className={className}>
        {children || (
          <>
            <Mail className="h-4 w-4" />
            Contact Us
          </>
        )}
      </ContactPopoverTrigger>
      <ContactPopoverContent />
    </ContactPopoverRoot>
  );
}