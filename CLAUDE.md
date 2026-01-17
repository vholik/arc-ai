# Arc AI - Gym Progress Chatbot

A mobile chatbot application for tracking gym progress with AI-powered photo analysis and personalized coaching.

## Tech Stack

- React Native / Expo
- TypeScript

## Project Structure

```
app/           # Expo Router screens
components/    # Reusable UI components
  chat/        # Chat-specific components (input, header, suggestions)
  ui/          # Base UI components
constants/     # Theme and configuration
hooks/         # Custom React hooks
```

## Features

### 1. Profile & Goals
- User profile: age, height, sex, training experience, injuries/limitations, equipment access
- Goals: fat loss / hypertrophy / strength / recomposition with target timelines
- Baseline setup: starting weight, key lifts, measurements, photos
- Preferences: training split, days/week, exercise dislikes, dietary approach

### 2. Progress Tracking (The Log)
- **Weight**: daily/weekly weigh-ins, rolling averages, trend lines
- **Measurements**: waist/hips/chest/arms/thighs/neck with reminders
- **Workouts**: exercises, sets, reps, load, RPE/RIR, rest times, PR detection
- **Nutrition** (optional): calories/macros, protein target, adherence score, meal photos
- **Recovery**: sleep hours/quality, soreness, steps, cardio minutes
- **Check-ins**: weekly survey

### 3. Photo Analysis (Core Differentiator)
- Standardized photo guidance (lighting, distance, pose, timing)
- Photo timeline with side-by-side comparisons
- Qualitative assessment: visible changes, symmetry, areas of improvement
- Change estimation over absolute body fat %
- Confidence meter with explanations
- Bad comparison detection (lighting/pose differences)

### 4. Memory & History
- Long-term memory: goals, injuries, preferred exercises, plateaus
- Session memory: last workouts, weigh-ins, check-ins
- User-controlled: "Remember this" / "Forget this", view/edit profile
- Contextual coaching based on history

### 5. Coaching & Plans
- Adaptive training plans (PPL, Upper/Lower, Full-body)
- Auto-adjust volume/intensity, deload detection
- Progression engine based on RIR/RPE + performance
- Exercise substitutions for equipment/pain
- Nutrition guidance: protein targets, calorie adjustments

### 6. Insights & Diagnostics
- Trend analysis: weight vs photos vs measurements
- Plateau detection with actionable feedback
- Consistency scoring: workouts, protein, steps, sleep
- Weekly summaries: wins, problems, action items

### 7. Reminders & Accountability
- Custom reminders: weigh-in, photo, measurement, deload
- Streaks and gentle nudges
- Optional "Coach mode" daily check-ins

### 8. Safety & Privacy
- Medical disclaimers and professional referral triggers
- Uncertainty handling for photo/body fat estimates
- Privacy-first: encryption, consent, data deletion/export
- Optional local/on-device photo processing
