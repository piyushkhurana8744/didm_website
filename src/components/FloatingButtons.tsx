"use client";

import { useState, useCallback, memo } from "react";
import { Phone, X, MessageCircle } from "lucide-react";

// ─── Configuration ────────────────────────────────────────────────────────────
const PHONE_NUMBER = process.env.NEXT_PUBLIC_CONTACT_PHONE || "9971259994";
const WHATSAPP_NUMBER = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "919971259994";
const WHATSAPP_MESSAGE = encodeURIComponent(
  process.env.NEXT_PUBLIC_WHATSAPP_MESSAGE ||
    "Hi, I am interested in your digital marketing services. Can you share more details?"
);

// ─── Sub-components ───────────────────────────────────────────────────────────
const WhatsAppIcon = memo(() => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
  </svg>
));
WhatsAppIcon.displayName = "WhatsAppIcon";

interface FloatingButtonProps {
  href: string;
  label: string;
  tooltip: string;
  variant: "call" | "whatsapp";
  icon: React.ReactNode;
  isExpanded: boolean;
  delay: string;
}

const FloatingButton = memo(
  ({ href, label, tooltip, variant, icon, isExpanded, delay }: FloatingButtonProps) => {
    const [showTooltip, setShowTooltip] = useState(false);

    const baseClasses =
      "group relative flex items-center justify-center rounded-full shadow-lg transition-all duration-500 ease-out focus-visible:outline-2 focus-visible:outline-offset-2";

    const variantClasses =
      variant === "whatsapp"
        ? "bg-[#25D366] hover:bg-[#1ebe57] text-white shadow-[0_4px_20px_rgba(37,211,102,0.4)] hover:shadow-[0_8px_30px_rgba(37,211,102,0.6)] focus-visible:outline-[#25D366] w-14 h-14"
        : "bg-[#be1e2e] hover:bg-[#a11a27] text-white shadow-[0_4px_20px_rgba(190,30,46,0.4)] hover:shadow-[0_8px_30px_rgba(190,30,46,0.6)] focus-visible:outline-[#be1e2e] w-12 h-12";

    const animationClasses = isExpanded
      ? `opacity-100 translate-y-0 scale-100`
      : "opacity-0 translate-y-4 scale-75 pointer-events-none";

    return (
      <div className="relative flex items-center justify-end">
        {/* Tooltip */}
        <div
          className={`absolute right-full mr-3 whitespace-nowrap rounded-lg bg-gray-900/95 backdrop-blur-sm px-3 py-1.5 text-xs font-medium text-white shadow-xl border border-white/10 transition-all duration-200 ${
            showTooltip ? "opacity-100 translate-x-0" : "opacity-0 translate-x-2 pointer-events-none"
          }`}
        >
          {tooltip}
          <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1 w-2 h-2 bg-gray-900/95 rotate-45 border-r border-t border-white/10" />
        </div>

        {/* Button */}
        <a
          href={href}
          target={variant === "whatsapp" ? "_blank" : undefined}
          rel={variant === "whatsapp" ? "noopener noreferrer" : undefined}
          aria-label={label}
          className={`${baseClasses} ${variantClasses} ${animationClasses}`}
          style={{ transitionDelay: isExpanded ? delay : "0ms" }}
          onMouseEnter={() => setShowTooltip(true)}
          onMouseLeave={() => setShowTooltip(false)}
          onFocus={() => setShowTooltip(true)}
          onBlur={() => setShowTooltip(false)}
        >
          {/* Pulse ring for WhatsApp */}
          {variant === "whatsapp" && (
            <span className="absolute inset-0 rounded-full animate-ping bg-[#25D366]/30 duration-1000" />
          )}
          <span className="relative z-10 transition-transform duration-200 group-hover:scale-110">
            {icon}
          </span>
        </a>
      </div>
    );
  }
);
FloatingButton.displayName = "FloatingButton";

// ─── Main Component ───────────────────────────────────────────────────────────
function FloatingButtons() {
  const [isExpanded, setIsExpanded] = useState(true);

  const toggleExpanded = useCallback(() => {
    setIsExpanded((prev) => !prev);
  }, []);

  return (
    <div
      className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3"
      role="navigation"
      aria-label="Quick contact actions"
    >
      {/* Action Buttons */}
      <FloatingButton
        href={`tel:+91${PHONE_NUMBER}`}
        label={`Call us at ${PHONE_NUMBER}`}
        tooltip="📞 Call Us Now"
        variant="call"
        icon={<Phone className="w-5 h-5" />}
        isExpanded={isExpanded}
        delay="80ms"
      />

      <FloatingButton
        href={`https://wa.me/${WHATSAPP_NUMBER}?text=${WHATSAPP_MESSAGE}`}
        label="Chat with us on WhatsApp"
        tooltip="💬 Chat on WhatsApp"
        variant="whatsapp"
        icon={<WhatsAppIcon />}
        isExpanded={isExpanded}
        delay="0ms"
      />

      {/* Toggle Button */}
      <button
        onClick={toggleExpanded}
        aria-label={isExpanded ? "Hide contact buttons" : "Show contact buttons"}
        aria-expanded={isExpanded}
        className="group flex items-center justify-center w-14 h-14 rounded-full bg-gradient-to-br from-[#be1e2e] to-[#8b1520] text-white shadow-[0_4px_24px_rgba(190,30,46,0.5)] hover:shadow-[0_8px_32px_rgba(190,30,46,0.7)] transition-all duration-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#be1e2e]"
      >
        <span
          className={`transition-transform duration-300 ease-out ${isExpanded ? "rotate-0" : "rotate-180"}`}
        >
          {isExpanded ? (
            <X className="w-6 h-6" />
          ) : (
            <MessageCircle className="w-6 h-6" />
          )}
        </span>
      </button>
    </div>
  );
}

export default memo(FloatingButtons);
