# PROMPTS.md - Vibe Coding Prompt Traceability Log

This document records the exact sequence of prompts used to guide the Antigravity AI Assistant following the strict **Vibe Coding Workflow (AI-Assisted Software Engineering)** guidelines.

---

## Step 1: Test-Driven Development (TDD) via AI

### 1. Feeding Acceptance Criteria & NFRs
> **Prompt:** "Act as a Senior Software Engineer. I am feeding you the Acceptance Criteria and Non-Functional Requirements (NFRs) for a Frequent Flyer Portal (passenger management, flight tracking, accumulated miles, telemetry logging, and XSS sanitization). Do not write the final code immediately."

### 2. Writing the Test Suite First
> **Prompt:** "Write the test suite first using Vitest and React Testing Library (RTL) to verify these acceptance criteria and unhappy path requirements. Ensure tests fail initially (Red Phase)."

### 3. Writing Implementation to Pass Tests
> **Prompt:** "Now write the actual React implementation in `FrequentFlyerPortal.jsx` to make all 5 test cases pass (Green Phase)."

---

## Step 2: The Iterative Loop (Bug Fixes & Unhappy Path Handling)

### 1. Handling UI & Layout Breaking Errors
> **Prompt:** "That approach caused an error with layout rendering and styles not applying. Let's revert and try a different method using CDN styling in index.html."

### 2. Manual Unhappy Path Verification
> **Prompt:** "Add state handling for unhappy path requirements: display explicit validation alert banners when fields are empty or invalid, and add a simulated slow network loading state (`Loading telemetry...`) during form submission."

---

## Step 3: Production Build & Deployment Pipeline

### 1. Verification & Bundling
> **Prompt:** "Run `npm run build` to verify production bundling output with zero errors."

### 2. Deployment Setup
> **Prompt:** "Prepare project files and Git repository for zero-config deployment on Netlify."