import posthog from 'posthog-js';

// Track document helpfulness rating
export const trackHelpfulRating = (pageTitle: string, isHelpful: boolean, feedback?: string) => {
  posthog.capture('document_rated', {
    page_title: pageTitle,
    is_helpful: isHelpful,
    feedback: feedback || '',
    url: window.location.pathname,
  });
};

// Track search queries
export const trackSearch = (query: string, resultCount: number) => {
  posthog.capture('search_performed', {
    search_query: query,
    result_count: resultCount,
  });
};

// Track time spent on page
export const trackTimeOnPage = (pageTitle: string, duration: number) => {
  posthog.capture('time_on_page', {
    page_title: pageTitle,
    duration_seconds: Math.round(duration / 1000),
    url: window.location.pathname,
  });
};

// Track chatbot interactions
export const trackChatbotInteraction = (question: string, responseLength: number) => {
  posthog.capture('chatbot_interaction', {
    question: question,
    response_length: responseLength,
  });
};

// Track external link clicks
export const trackExternalLinkClick = (url: string) => {
  posthog.capture('external_link_clicked', {
    destination_url: url,
    source_url: window.location.pathname,
  });
};
