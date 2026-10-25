# Implementation Plan: Official Logo & 18+ Years Experience Video Integration

Integrate the official "The Masonry Doctors" brand logo and the authentic on-site video featuring Alex and Rolando talking about their 18+ years of craft in Fox Valley.

---

## User Review Required

> [!IMPORTANT]
> **Key Integration Choices**:
> 1. **Official Logo Replacement**: The current 4-brick placeholder badge in `Navbar.tsx` and `Footer.tsx` will be replaced with the crisp official logo (`/assets/aistudio/image_4c8ccfb1.png`), optimized with high contrast on dark headers and footers.
> 2. **Video Placement & Dual Experience**:
>    - **Primary Embedded Feature**: In `MeetTheTeam.tsx` (Home) and `AboutView.tsx` (About page), we will provide an interactive vertical 9:16 video player card showing the authentic Kubota excavator clip with Alex & Rolando, complete with custom Play/Pause, Mute/Unmute toggle, and a toggle between the team portrait and the video.
>    - **Secondary Quick Access**: A prominent "▶ Ver Video (18 Años de Experiencia)" badge in the Hero section so visitors can immediately see the owners' story in a clean lightbox modal without scrolling down.

---

## Proposed Changes

### 1. Brand Identity & Logo Updates
- **`src/components/Navbar.tsx`**:
  - Replace the 4-square CSS blocks with the authentic "The Masonry Doctors" logo (`/assets/aistudio/image_4c8ccfb1.png`).
  - Add a subtle white/clean backing pill or clean backdrop ensuring high legibility for both desktop and mobile headers.
- **`src/components/Footer.tsx`**:
  - Replace the footer logo placeholder with the real brand emblem.
- **`index.html`**:
  - Update favicon `<link rel="icon">` to point to the official logo asset `/assets/aistudio/image_4c8ccfb1.png`.
- **`src/components/QuoteModal.tsx` & `src/components/SubmissionSuccessModal.tsx`**:
  - Include the official logo at the top of the consultation request modal for high customer trust.

---

### 2. Video Player Component & Lightbox
- **Create `src/components/ExperienceVideoModal.tsx`**:
  - Responsive lightbox modal for smooth mobile and desktop playback.
  - Custom overlay controls: Play/Pause, sound unmute prompt, progress indicator, and close button.
  - Video source: `/assets/aistudio/AQPkQbO1r-u2fKgkzW-OOwFNrVUOYR1g6qs_j5kqKVsnavvXlxmwJ_Xoo8rsrHEvkuzLFBAnqBolQxnq4ikiO2Sq._abd8a26e.mp4`.
- **Create `src/components/ExperienceVideoCard.tsx`**:
  - Dedicated responsive card built specifically for 9:16 vertical video proportions.
  - Custom play/pause button, unmute/mute sound toggle, and badge: "18+ Años de Experiencia · Aurora & Fox Valley".
  - Tab/Toggle allowing users to switch between "Ver Video de Rolando y Alex" and "Foto en Obra".

---

### 3. Page Integrations
- **`src/components/MeetTheTeam.tsx`**:
  - Embed the video player directly in the left column with a tab switcher ("Video: 18 Años" / "Foto en Obra") and update the copy to cite Alex & Rolando's video message.
- **`src/components/HeroSection.tsx`**:
  - Add a video preview badge below the rating/phone buttons: *"▶ Ver historia: 18 años construyendo en Fox Valley"*.
- **`src/views/AboutView.tsx`**:
  - Integrate the video player into the About page layout alongside the company values.
- **`src/App.tsx`**:
  - Manage global state for the video lightbox modal so clicking the video badge anywhere opens seamless full-screen playback.

---

## Verification Plan

### Automated / Build Verification
- Run `compile_applet` to ensure zero TypeScript errors and clean imports.
- Verify asset paths resolve correctly in Vite without build warnings.

### Manual & Interactive Verification
- Verify logo renders crisply on both dark `#14171A` navbar and light modal backgrounds.
- Test video playback, play/pause controls, and audio toggle on desktop and simulated mobile viewports.
- Confirm full bilingual support (English / Spanish) for all new badges and video labels.
