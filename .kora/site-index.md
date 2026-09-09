# Site index · format 2
Structure and the names of what each page offers. Values that change often — prices, hours, phone,
address — and body copy are deliberately not recorded here; read the page itself for those.

## index.html → /
title: Child & Teen Therapist Colchester CT | Play Therapy & Family Counseling | RZ Therapy Solutions
purpose: The landing page — the practice's mission, how it works, the challenges it treats, the team, and a consultation form.
sections:
- `#main-content` "A place where children and teens feel understood, safe, and ready to grow." — the page body, holding the hero and every section below it
- `#mission-heading` "Specialized therapy for children, teens, and their families" — the mission block, naming: trauma-informed, neurodiversity-affirming, in-person, telehealth, pregnancy, postpartum, parenting
- `#approach-heading` "How we support children and families" — the four principles: Trauma-informed, Neurodiversity-affirming, Person-centered, Developmentally Adaptive
- `#help-heading` "Challenges we help children & teens with" — the presenting concerns treated: Anxiety & worry, ADHD, Emotion regulation, Trauma & adverse experiences, School stress & avoidance, Self-esteem & identity, Pregnancy, postpartum & parenting
- `#gallery` "A calm space for real conversations" — photographs of the practice rooms, with its heading in `#gallery-heading`
- `#team-preview-heading` "Meet the team" — the four clinicians: Rebecca Ziskind, Ashlee Cannon, Madison Marcavage, Mackenzie Vigil
- `#cta-heading` "Schedule a free consultation today" — the closing call to action
- `#home-contact-form` — the consultation form, with `#hf_first_name`, `#hf_last_name`, `#hf_email`, `#hf_phone` and `#hf_message`
- `#home-form-status` — where the form's success or error message is written
also: The list of challenges treated is written here as seven short labels and again on who-we-help.html as nine longer ones, and the two lists do not match. Adding or removing a specialism means reconciling both.
also: The four clinicians are named here and again in full on about-us.html. A clinician joining or leaving is two pages.
also: This page's form fields are prefixed `hf_` while contact.html's are not, even though the two forms collect the same things. An id-based change meant for one will not match the other.

## about-us.html → /about-us
title: About Our Therapists | Child & Teen Therapy Specialists Colchester CT | RZ Therapy Solutions
purpose: The team page — a profile for each clinician, with credentials.
sections:
- `#main-content` "Rebecca Ziskind, MS, LPC, NCC" — the page body, holding a profile for each clinician: Rebecca Ziskind, Ashlee Cannon, Madison Marcavage, Mackenzie Vigil
- "Schedule a consultation" — the closing call to action
also: Each clinician's post-nominal letters are part of their heading text rather than a separate field, so a credential change is an edit to the heading a link may point at.
also: No profile carries an id of its own, so a change to one clinician is located only by their name.

## who-we-help.html → /who-we-help
title: Who We Help | Child & Teen Therapy Colchester CT | Play Therapy & Family Counseling
purpose: The specialisms page — what the practice treats, the modalities it uses, and an FAQ.
sections:
- `#main-content` "Specialized Therapy for Children, Teens, and Their Families" — the page body, naming the modalities: CCPT, PCIT, CPP, CBT, ARC model
- `#who-hero-heading` — the page's h1
- `#counseling-heading` "Child & Teen Therapy, Family Counseling, and Perinatal Support in Connecticut" — the services block
- `#challenges-heading` "What We Help Children & Teens With" — the presenting concerns treated: Low Self-Esteem & Self-Worth, Grief, Anxiety, Social Challenges, Behavioral Struggles at Home or School, School Stress & School Avoidance, Trauma & Adverse Experiences, Family Stress, Emotion Regulation Challenges
- `#faq-heading` "Frequently asked questions" — the FAQ accordion
- `#faq-q1` and `#faq-a1` — the first question and its answer
- `#faq-q2` and `#faq-a2` — the second question and its answer
- `#faq-q3` and `#faq-a3` — the third question and its answer
- "Colchester and surrounding communities" — the areas served
- "We can't wait to support you and your family" — the closing call to action
also: The FAQ questions and answers are separately identified as `faq-q1`/`faq-a1` and so on. Adding a question in the middle means renumbering every id after it, and the numbering is the only thing pairing a question to its answer.

## information.html → /information
title: Insurance & Practice Info | Aetna Anthem Husky | Colchester CT Counselors
purpose: The practice-information page — the treatment philosophy, how families are involved, the populations served, and insurance and location details.
sections:
- `#main-content` "Strength-based and restorative" — the page body
- "Partnering with families" — how parents and caregivers are involved
- "Services and populations served" — who the practice treats
- "Insurance, costs, and location" — the insurers accepted and where the practice is
- "Questions about insurance or fit?" — the closing call to action
also: The insurers accepted appear in the page title but the page body is where they are actually listed. A change to which insurers are accepted has to reach the title too.
also: No section on this page has an id, so every change here is located by its heading text.

## contact.html → /contact
title: Contact & Free Consultation | Therapist Colchester CT | RZ Therapy
purpose: The contact page — the practice's address, phone, email and directory listing, beside a consultation form.
sections:
- `#main-content` "Consultation request" — the page body
- `#contact` "Consultation request" — the contact block, carrying the Address, Phone, Email and the Psychology Today profile link
- `#contact-form` — the consultation form, with `#first_name`, `#last_name`, `#email`, `#phone` and `#message`
also: `#main-content` and `#contact` wrap the same content, so a change targeting either id lands in the same place.
also: This form and the one on index.html collect the same fields under different ids, and neither page mentions the other. A change to what the practice asks for has to be made twice.

## blog.html → /blog
title: Therapy Blog | Mental Health Tips Colchester CT | RZ Therapy Solutions
purpose: The blog index — a card for each post.
sections:
- `#main-content` "Blog" — the page body, with its h1 in `#blog-hero-heading`
- `#posts-heading` "Latest posts" — the post cards, one per article
- "Ready to talk with a clinician?" — the closing call to action
also: Each post's title is written here on its card and again as the heading of the post's own page. Retitling a post is two edits, and this page is the only thing that links to the posts.

## blog-anxiety-adults.html → /blog-anxiety-adults
title: Adult Anxiety Counseling Colchester CT | Depression Therapy
purpose: A blog post on anxiety and depression in adults, including the symptoms it lists.
sections:
- `#main-content` "Understanding Anxiety in Adults" — the post, with a symptom list

## blog-teen-reasons.html → /blog-teen-reasons
title: Why Teens Need Therapy | Adolescent Counseling Colchester CT
purpose: A blog post on why adolescents come to therapy.
sections:
- `#main-content` "Why Teens and Adolescents Often Need Therapy" — the post

## blog-teen-therapy.html → /blog-teen-therapy
title: Teen Therapy Colchester CT | ADHD Autism Anxiety School Avoidance
purpose: A blog post on the common reasons teens seek therapy locally.
sections:
- `#main-content` "Common Reasons Teens Seek Therapy in Colchester, CT" — the post, naming: school anxiety, school avoidance, ADHD, executive functioning, Autism Spectrum Disorder, anxiety disorders, panic, depression, self-harm, low self-esteem, emotional regulation

## blog-trauma-ptsd.html → /blog-trauma-ptsd
title: Trauma & PTSD Therapy Colchester CT | Individual Counseling | RZ Therapy
purpose: A blog post on trauma and PTSD, and what treatment aims to change.
sections:
- `#main-content` "Understanding Trauma and PTSD Symptoms" — the post, with a list of treatment goals
also: All four blog posts are a single undivided block under `#main-content` with no ids inside, so a change to part of a post is located only by its wording. They are also the longest pages on the site.

## privacy-policy.html → /privacy-policy
title: Privacy Policy | RZ Therapy Solutions PLLC Colchester, CT
purpose: The privacy policy page.
sections:
- `#main-content` — the page body, with no heading of its own
also: This is the only page whose `#main-content` has no heading, so it cannot be identified by one.

## support files
Files that are not pages. A line marked [content] holds words or data a visitor reads, so a
change to the site's content can land there; the rest only make the site work or look right.
- `llms.txt` — a plain-text summary of the business for AI crawlers — derived from the site by the deploy, not written by hand
- `robots.txt` — crawler rules and the sitemap link — derived from the site by the deploy, not written by hand
- `sitemap.xml` — the list of page URLs — derived from the site by the deploy, not written by hand
- `assets/premium.css` — brand colours and the type scale
- `assets/site.css` — the site's layout and component styling
- `js/main.js` — page behaviour, the accordions and the consultation forms

## shared (every page)
The header, navigation, mobile menu and footer are propagated from index.html to every other page by
`shell_propagation`. A change to any of them is made on index.html alone and copied automatically.
