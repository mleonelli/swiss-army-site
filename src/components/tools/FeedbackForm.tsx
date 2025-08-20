import React, { useState } from 'react';
import { Send, MessageSquare, Lightbulb, Bug, Star } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';

export function FeedbackForm() {
  const { t } = useLanguage();
  const [formData, setFormData] = useState({
    type: 'general',
    subject: '',
    message: '',
    email: '',
    rating: 5
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const feedbackTypes = [
    { value: 'general', label: 'General Feedback', icon: MessageSquare, color: 'blue' },
    { value: 'feature', label: 'Feature Request', icon: Lightbulb, color: 'yellow' },
    { value: 'bug', label: 'Bug Report', icon: Bug, color: 'red' },
    { value: 'improvement', label: 'Improvement Suggestion', icon: Star, color: 'purple' }
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Method 1: Using Formspree (requires setup)
    // Uncomment and replace 'YOUR_FORM_ID' with actual Formspree form ID
    /*
    try {
      const response = await fetch('https://formspree.io/f/YOUR_FORM_ID', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          type: formData.type,
          subject: formData.subject,
          message: formData.message,
          email: formData.email,
          rating: formData.rating,
          url: window.location.href
        }),
      });

      if (response.ok) {
        setSubmitted(true);
        setFormData({ type: 'general', subject: '', message: '', email: '', rating: 5 });
      }
    } catch (error) {
      console.error('Error submitting feedback:', error);
    }
    */

    // Method 2: Using mailto (fallback - works everywhere)
    const selectedType = feedbackTypes.find(type => type.value === formData.type);
    const emailSubject = `[Swiss Army Site] ${selectedType?.label}: ${formData.subject}`;
    const emailBody = `
Feedback Type: ${selectedType?.label}
Rating: ${formData.rating}/5 stars
Contact Email: ${formData.email}
Page URL: ${window.location.href}

Message:
${formData.message}

---
Sent from Swiss Army Site Feedback Form
    `.trim();

    const mailtoLink = `mailto:feedback@example.com?subject=${encodeURIComponent(emailSubject)}&body=${encodeURIComponent(emailBody)}`;
    window.location.href = mailtoLink;
    
    setSubmitted(true);
    setFormData({ type: 'general', subject: '', message: '', email: '', rating: 5 });
    setIsSubmitting(false);
  };

  const handleInputChange = (field: string, value: string | number) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  if (submitted) {
    return (
      <div className="max-w-2xl mx-auto bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8">
        <div className="text-center">
          <div className="w-16 h-16 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mx-auto mb-4">
            <Send className="w-8 h-8 text-green-600 dark:text-green-400" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            Thank You for Your Feedback!
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            Your feedback has been sent successfully. We appreciate you taking the time to help us improve Swiss Army Site.
          </p>
          <button
            onClick={() => setSubmitted(false)}
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-lg transition-colors"
          >
            Send Another Feedback
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
      <div className="text-center mb-6">
        <MessageSquare className="w-12 h-12 text-blue-600 dark:text-blue-400 mx-auto mb-4" />
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          Share Your Feedback
        </h2>
        <p className="text-gray-600 dark:text-gray-400">
          Help us improve Swiss Army Site with your suggestions, bug reports, or feature requests
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Feedback Type */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
            Feedback Type
          </label>
          <div className="grid grid-cols-2 gap-3">
            {feedbackTypes.map((type) => {
              const Icon = type.icon;
              const isSelected = formData.type === type.value;
              return (
                <button
                  key={type.value}
                  type="button"
                  onClick={() => handleInputChange('type', type.value)}
                  className={`p-3 rounded-lg border-2 transition-all flex items-center space-x-2 ${
                    isSelected
                      ? `border-${type.color}-500 bg-${type.color}-50 dark:bg-${type.color}-900/20`
                      : 'border-gray-200 dark:border-gray-600 hover:border-gray-300 dark:hover:border-gray-500'
                  }`}
                >
                  <Icon className={`w-5 h-5 ${
                    isSelected ? `text-${type.color}-600 dark:text-${type.color}-400` : 'text-gray-500'
                  }`} />
                  <span className={`text-sm font-medium ${
                    isSelected ? `text-${type.color}-700 dark:text-${type.color}-300` : 'text-gray-700 dark:text-gray-300'
                  }`}>
                    {type.label}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Rating */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Overall Rating
          </label>
          <div className="flex items-center space-x-1">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                type="button"
                onClick={() => handleInputChange('rating', star)}
                className="p-1 transition-colors"
              >
                <Star
                  className={`w-6 h-6 ${
                    star <= formData.rating
                      ? 'text-yellow-400 fill-current'
                      : 'text-gray-300 dark:text-gray-600'
                  }`}
                />
              </button>
            ))}
            <span className="ml-2 text-sm text-gray-600 dark:text-gray-400">
              {formData.rating}/5 stars
            </span>
          </div>
        </div>

        {/* Subject */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Subject
          </label>
          <input
            type="text"
            value={formData.subject}
            onChange={(e) => handleInputChange('subject', e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
            placeholder="Brief description of your feedback"
            required
          />
        </div>

        {/* Message */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Message
          </label>
          <textarea
            value={formData.message}
            onChange={(e) => handleInputChange('message', e.target.value)}
            rows={5}
            className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white resize-none"
            placeholder="Please provide detailed feedback, suggestions, or describe any issues you've encountered..."
            required
          />
        </div>

        {/* Email */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Email (Optional)
          </label>
          <input
            type="email"
            value={formData.email}
            onChange={(e) => handleInputChange('email', e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
            placeholder="your.email@example.com"
          />
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
            Provide your email if you'd like us to follow up on your feedback
          </p>
        </div>

        {/* Submit Button */}
        <div className="flex space-x-3 pt-4">
          <button
            type="submit"
            disabled={isSubmitting || !formData.subject.trim() || !formData.message.trim()}
            className="flex-1 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white font-semibold py-3 px-6 rounded-lg transition-colors flex items-center justify-center space-x-2"
          >
            <Send className="w-4 h-4" />
            <span>{isSubmitting ? 'Sending...' : 'Send Feedback'}</span>
          </button>
          <button
            type="button"
            onClick={() => setFormData({ type: 'general', subject: '', message: '', email: '', rating: 5 })}
            className="bg-gray-500 hover:bg-gray-600 text-white font-semibold py-3 px-6 rounded-lg transition-colors"
          >
            Clear
          </button>
        </div>
      </form>

      {/* Technical Info */}
      <div className="mt-6 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
        <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
          How it works
        </h3>
        <p className="text-xs text-gray-600 dark:text-gray-400">
          This form uses your default email client to send feedback. No data is stored on our servers, 
          ensuring your privacy while allowing us to receive your valuable input.
        </p>
      </div>
    </div>
  );
}