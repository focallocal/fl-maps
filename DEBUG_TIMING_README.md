# Debug Timing System

A cross-origin timing diagnostic tool for tracking communication between Discourse (Docuss plugin) and the embedded iframe (fl-maps). Use this to debug timing issues, identify slow operations, and understand the sequence of events during page navigation.

## Quick Start

Open your browser's developer console (F12 → Console) on the **Discourse site** (not in the iframe) and run:

```javascript
// Start collecting for 24 hours
window.dcsTimingStart(24)

// Navigate around your site normally...

// Check status anytime
window.dcsTimingStatus()

// When done, stop and download the log
window.dcsTimingStop()
```

> **Note:** The commands must be run in the **parent Discourse window**, not in the fl-maps iframe. The timing system is initialized by the Docuss plugin.

## Features

- **Persists across page reloads** - Collection continues when you refresh or navigate
- **Auto-saves every 5 seconds** to localStorage
- **Saves on page unload** - Won't lose data if you close the tab
- **Auto-expires** after the specified duration
- **Caps at 10,000 events** to prevent localStorage overflow
- **Trims oldest events** automatically if storage gets full

## Available Commands

All commands are called on `window` in the browser console:

| Command | Description |
|---------|-------------|
| `dcsTimingStart(hours)` | Start collecting for specified hours (default 24) |
| `dcsTimingStatus()` | Check if active, time remaining, event count |
| `dcsTimingStop()` | Stop collecting and download all events |
| `dcsTimingExport()` | Download collected events without stopping |
| `dcsShowTimeline()` | Show events in console |
| `dcsTimingClear()` | Delete all collected data |
| `dcsTimingOn()` | Alias for `dcsTimingStart(24)` |

## What Gets Tracked

### Discourse Side
- **Route changes** - When Discourse navigates to a new page
- **iframe ready** - When iframe signals readyForTransitions
- **Tag loading** - When waiting for topic tags to load
- **postMessage sends** - Messages sent to the iframe
- **Timing start/stop** - Collection session events

### iframe Side (fl-maps)
- **Message received** - When iframe receives a message from parent
- **pauseVideo** - Video pause events  
- **dcsOpenForm** - Form open requests
- **dcs-topic-posted** - Topic creation confirmations
- **Map mount** - When the map component mounts

## Example Log Output

```
DCS Timing Log - Extended Collection
=====================================
Exported: 2025-12-14T10:30:00.000Z
Collection started: 2025-12-13T10:30:00.000Z
Duration: 1440.0 minutes
Total events: 523

=== PAGE: https://example.com/docuss/home ===
     0ms (10:30:00.123) [discourse] Route change detected
    15ms (10:30:00.138) [discourse] iframe ready for transitions
    45ms (10:30:00.168) [fl-maps] Message received: cycleRoutes
   120ms (10:30:00.243) [discourse] Waiting for tags property
   185ms (10:30:00.308) [discourse] Tags property loaded

=== PAGE: https://example.com/docuss/page-name ===
     0ms (10:31:15.456) [discourse] Route change detected
    ...
```

## Workflow for Bug Reports

1. Open browser console on your Discourse site
2. Run `dcsTimingStart(24)` to start collecting
3. Use the site normally - refresh, navigate, reproduce any issues
4. Run `dcsTimingStatus()` periodically to check event count
5. When done, run `dcsTimingStop()` to download the log file
6. Share the `.txt` file for analysis

## Troubleshooting

### "DcsTiming is not defined"

This error means you're either:
- Running the command in the **iframe console** instead of the parent Discourse window
- The Docuss plugin hasn't fully loaded yet

**Solution:** Make sure you're in the Discourse parent window's console (not fl-maps iframe). Wait for the page to fully load, then try again.

### "dcsTimingStart is not defined"

The Docuss plugin may not be properly installed or hasn't initialized.

**Solution:** Refresh the page and wait for it to fully load. The commands should be available after the Docuss plugin initializes.

### No events appearing

- Make sure timing is enabled before navigating (`dcsTimingStart(24)`)
- Check status with `dcsTimingStatus()`
- The iframe will receive a message to enable its timing when you start

### Missing iframe events

- The fl-maps iframe may not have received the timing toggle message
- Try refreshing the page after enabling timing
- Check browser console for any postMessage errors

### Timeline shows only Discourse events

- The iframe may not have received the timing toggle message
- Verify fl-maps is running the version with FlMapsTiming support
- Try: enable timing → refresh page → navigate

## Technical Details

The timing system uses:
- `localStorage` for persistence across page reloads
- `postMessage` for cross-origin communication with the iframe
- Automatic batching and periodic saves every 5 seconds
- Event trimming when approaching the 10,000 event cap

### Internal Architecture

```
Discourse (parent)                    fl-maps (iframe)
┌──────────────────┐                 ┌──────────────────┐
│ DcsTiming object │                 │ FlMapsTiming     │
│ - localStorage   │ ◄──postMessage──│ - sends events   │
│ - window.dcs*()  │ ──postMessage──►│ - receives toggle│
└──────────────────┘                 └──────────────────┘
```

Events from both sides are collected in the parent window and saved together.
