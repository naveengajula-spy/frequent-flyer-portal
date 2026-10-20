import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import FrequentFlyerPortal from './FrequentFlyerPortal';

describe('End-to-End Frequent Flyer Portal - TDD Suite', () => {
  beforeEach(() => {
    vi.spyOn(console, 'log').mockImplementation(() => {});
  });

  // --- HAPPY PATH ---
  it('renders the portal interface correctly with primary title', () => {
    render(<FrequentFlyerPortal />);
    expect(screen.getByRole('heading', { name: /Frequent Flyer Portal/i })).toBeInTheDocument();
  });

  it('allows adding a new passenger and logs analytics telemetry', async () => {
    render(<FrequentFlyerPortal />);
    
    const nameInput = screen.getByLabelText(/passenger name/i);
    const flightInput = screen.getByLabelText(/flight number/i);
    const milesInput = screen.getByLabelText(/accumulated miles/i);
    const submitBtn = screen.getByRole('button', { name: /add passenger/i });

    await userEvent.type(nameInput, 'John Doe');
    await userEvent.type(flightInput, 'AA-102');
    await userEvent.type(milesInput, '15000');
    await userEvent.click(submitBtn);

    await waitFor(() => {
      expect(screen.getByText('John Doe')).toBeInTheDocument();
      expect(console.log).toHaveBeenCalledWith(
        '[Analytics] User interacted with End-to-End Frequent Flyer Portal'
      );
    });
  });

  // --- UNHAPPY PATH & EDGE CASES ---
  it('displays empty state message when no passengers match search', async () => {
    render(<FrequentFlyerPortal />);
    const searchInput = screen.getByPlaceholderText(/search passenger or flight/i);
    
    await userEvent.type(searchInput, 'NonExistentPassenger');
    
    expect(screen.getByText(/no data found/i)).toBeInTheDocument();
  });

  it('highlights missing or invalid fields in red when submitting empty form', async () => {
    render(<FrequentFlyerPortal />);
    const submitBtn = screen.getByRole('button', { name: /add passenger/i });

    await userEvent.click(submitBtn);

    const nameInput = screen.getByLabelText(/passenger name/i);
    expect(nameInput).toHaveClass('border-red-600');
  });

  it('sanitizes input against XSS injection', async () => {
    render(<FrequentFlyerPortal />);
    const nameInput = screen.getByLabelText(/passenger name/i);
    const flightInput = screen.getByLabelText(/flight number/i);
    const milesInput = screen.getByLabelText(/accumulated miles/i);
    const submitBtn = screen.getByRole('button', { name: /add passenger/i });

    await userEvent.type(nameInput, '<script>alert("xss")</script>Jane Doe');
    await userEvent.type(flightInput, 'BA-204');
    await userEvent.type(milesInput, '5000');
    await userEvent.click(submitBtn);

    await waitFor(() => {
      expect(screen.getByText('Jane Doe')).toBeInTheDocument();
      expect(screen.queryByText('<script>')).not.toBeInTheDocument();
    });
  });
});