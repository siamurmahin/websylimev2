// Emails the website sends to visitors right after they fill in a form.
// Edit the words below. {name} = their first name, {plan} = the plan they picked.
// Each body is a list of paragraphs. The links, WhatsApp line and sign-off are added
// automatically (see app/actions/forms.ts).
export const emails = {
  links: {
    bookCall: "https://www.websylime.com/book-a-call",
    whatsapp: "https://wa.me/17254040225",
    whatsappLabel: "+1 725 404 0225",
    site: "https://www.websylime.com",
  },
  signOff: "Siamur, Websy Lime",
  urgent: "Need something urgently? Message us on WhatsApp for a quick reply:",
  bookLabel: "Book a free 30-minute call",

  replies: {
    contact: {
      subject: "We got your message",
      body: [
        "Hi {name},",
        "Thanks for getting in touch. Your message is with us, and we'll reply by email, usually within 12 hours (Monday to Friday).",
        "If it's easier to talk it through, you can pick a time for a free 30-minute call.",
      ],
      book: true,
    },
    "start-project": {
      subject: "Your project request is in",
      body: [
        "Hi {name},",
        "Thanks for telling us about your project. We'll read everything you sent and reply by email, usually within 12 hours, with a few questions and the next steps.",
        "Want to move faster? Book a free 30-minute call and we'll plan it together.",
      ],
      book: true,
    },
    "get-started": {
      subject: "Thanks for choosing {plan}",
      body: [
        "Hi {name},",
        "Thanks for choosing the {plan} plan. Here's what happens next:",
        "1. We review your details and reply by email, usually within 12 hours.\n2. We have a short call to learn about your business and goals.\n3. Once you're happy with the plan, we send the invoice and get started.",
        "If you haven't booked your call yet, you can pick a time below.",
      ],
      book: true,
    },
    "free-design": {
      subject: "Your free homepage design request",
      body: [
        "Hi {name},",
        "Thanks for applying for a free homepage design. We take on 10 businesses a month, and we'll let you know by email if yours is one of them.",
        "If we pick your business, you'll get your new homepage design within 2 days. It's yours to keep, with no obligation to work with us.",
      ],
      book: false,
    },
    careers: {
      subject: "We got your application",
      body: [
        "Hi {name},",
        "Thanks for applying to work with Websy Lime. We read every application. If your skills match what we need, we'll be in touch by email.",
      ],
      book: false,
    },
    waitlist: {
      subject: "You're on the video editing waitlist",
      body: [
        "Hi there,",
        "Thanks for joining the waitlist. Our video editing service isn't open yet. You'll be one of the first to know when it launches.",
        "In the meantime, if you need a website, social media or local SEO help, we'd love to hear from you.",
      ],
      book: false,
    },
  },
} as const;
