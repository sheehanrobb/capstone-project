# TODO list

- Get project running
- Assess main functionality
- Setup github projects
- Update JS packages
- Plan and Implement secure environment variable management 
- Implement authentication
- Implement testing framework
- Plan of how and what needs to be maintained
- Rename
- Create a list of exercises/exercise protocols. Will exercises be based on diagnosis.


# Main functionality (MVP)

- Speech to text working easily and smoothly
- Professional Exercise programs generated. Preferably with images or videos. Based on science preferably
- Professional referral letters generated.
- Authentication and authorisation.
- Export — PDF export of notes, exercise programs, and letters (currently no export at all)
- Exercise program with images/videos — you'll need a curated exercise database or integrate with something like Physiotec or a YouTube/Vimeo embed approach
- Referral letter templates — structured prompts with clinic letterhead fields
- Offline/poor connectivity fallback — clinics often have bad wifi
- Ability to email the programs and referrals direct from the app

# Questions
- Can we do it with storing as little personal information as possible?

# Future

- Visual based notes for those with visual preferences
- Dialog back and fourth with practitioner protocols
- Patient centered app to manage and map progress.


Security & Compliance (Critical)

    Remove exposed secrets — OpenAI API key is currently set as NEXT_PUBLIC_ which means it's sent to the browser. Anyone can steal it.
    HIPAA/GDPR considerations — even with minimal data storage, you need a data processing policy if this handles real patients
    Input sanitisation on all API endpoints (currently none)
    Rate limiting on API routes to prevent abuse/cost blowout on OpenAI
    HTTPS enforcement in production

Data & Privacy (answers your "minimal personal info" question)

Yes, you absolutely can minimise PII. Options:

    Store patients by ID/code only (clinician keeps the name-to-ID mapping offline or in their own system)
    Don't persist transcripts — generate notes on the fly and let the clinician copy/export, store nothing
    Auto-delete consultations after export (30/60/90 day TTL)
    Encrypt stored notes at rest

# Quality & Reliability

    Error boundaries — app currently crashes silently on API failures
    Loading/saving states — no feedback when AI is processing
    Auto-save during consultation (currently only saves on "Finalise")
    Undo/edit transcription before sending to AI
    Session timeout handling — what happens if mic cuts out mid-consultation?

# Deployment

    Environment configuration for dev/staging/production
    CI/CD pipeline (GitHub Actions)
    Database backups
    Cost monitoring on OpenAI API usage

# Responsive/Device Support

    Tablet-first layout — most clinicians will use an iPad during consults
    Large touch targets for mobile
    Microphone permissions UX — clear prompts when mic access is denied

# On the Exercise Programs Question

This is the hardest part of your MVP. "Based on science" with images/videos means either:

    Build a curated exercise library in your DB with evidence-based descriptions + embedded videos — significant content work
    Integrate a third-party library (Physiotec, Physitrack, etc.) — they have APIs but cost money
    AI-generated descriptions + YouTube embeds — easiest to build, but quality varies and YouTube links break

I'd recommend option 3 for the capstone, with a note that production would use option 1 or 2.

Exercises will need to be grouped with access to equipment and no equipment options.

Idea would be to get a pt or osteo to do generate the videos





 