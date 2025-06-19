# My Day, My Way 🗓️🍅✨

A cozy, pastel-themed workday organizer with task management, Eisenhower matrix prioritization, customizable Pomodoro scheduling, drag-and-drop task reordering, recurring tasks, and delightful celebration animations to keep you motivated!

---

## Table of Contents

- [Overview](#overview)  
- [Features](#features)  
- [Getting Started](#getting-started)  
- [How to Use](#how-to-use)  
  - [Adding Tasks](#adding-tasks)  
  - [Organizing Tasks with the Eisenhower Matrix](#organizing-tasks-with-the-eisenhower-matrix)  
  - [Scheduling Pomodoro Sessions](#scheduling-pomodoro-sessions)  
  - [Managing Recurring Tasks](#managing-recurring-tasks)  
  - [Marking Tasks as Complete](#marking-tasks-as-complete)  
  - [Celebrating Your Day](#celebrating-your-day)  
- [Settings & Customization](#settings--customization)  
- [Sound Effects](#sound-effects)  
- [Known Issues](#known-issues)  
- [Contributing](#contributing)  
- [License](#license)  

---

## Overview

**My Day, My Way** helps you organize your workday by combining:

- A simple task list with Pomodoro timers  
- An Eisenhower matrix to prioritize by urgency & importance  
- A drag-and-drop interface for organizing tasks easily  
- Customizable Pomodoro session and break lengths  
- Recurring tasks to save time on daily routines  
- A fun celebration page with confetti and sounds when you finish your day!

The whole experience is designed with a warm, cozy pastel aesthetic to keep your workflow joyful.

---

## Features

- **Add tasks** with adjustable Pomodoro counts (1–5)  
- **Organize tasks** into 4 Eisenhower quadrants (Important/Urgent, Important/Not Urgent, etc.) with drag-and-drop  
- **Generate a Pomodoro schedule** prioritized by task importance and urgency  
- **Drag and drop** tasks within the schedule to reorder or swap tasks easily  
- **Partial schedule update** starting from current time, skipping completed tasks  
- **Mark tasks complete** with checkboxes that update your lists automatically  
- **Recurring tasks**: save, favorite, add to today with one click  
- **Daily celebration page** with confetti and sounds to reward progress  
- **Custom Pomodoro settings**: number of Pomodoros before a long break, length of breaks, start and end of your workday  
- **Sound toggle** to enable/disable cute sound effects  
- **Smooth page transitions** and subtle fade animations  
- **Persistent data storage** via `localStorage` — your tasks and settings save across browser sessions

---

## Getting Started

Simply open `index.html` in any modern web browser (Chrome, Firefox, Edge, Safari).

No installation required!

---

## How to Use

### Adding Tasks

1. Type your task into the input field on the **Task Page**.  
2. Click the **"+" button** or press Enter.  
3. Each task defaults to 1 Pomodoro 🍅 but you can adjust that later.  
4. Tasks appear in your task list ready for organization.

### Organizing Tasks with the Eisenhower Matrix

- Click **"Organize Tasks 🧠"** to reveal the Eisenhower matrix with four quadrants:  
  - Important & Urgent  
  - Important & Not Urgent  
  - Not Important & Urgent  
  - Not Important & Not Urgent  
- Your tasks will be randomly assigned to quadrants initially.  
- Drag and drop tasks between quadrants to prioritize your day exactly how you want.  
- This matrix guides the Pomodoro schedule generation by priority.

### Scheduling Pomodoro Sessions

- Click **"Go to Schedule ⏱️"** to view your Pomodoro schedule.  
- Use the **Pomodoro Settings** to adjust:  
  - Number of Pomodoros before a long break  
  - Length of long breaks  
  - Start and end times for your day  
- Click **"Generate Schedule"** to create your Pomodoro timeline based on your prioritized tasks.  
- Drag and drop task cards in the schedule to reorder or swap tasks easily.  
- Click **"Partial Schedule Update"** to re-generate the schedule starting from the current time, skipping completed tasks.

### Managing Recurring Tasks

- Click the **"📋 Recurring"** button (bottom right) to open the Recurring Tasks panel.  
- Add tasks you do often, assign quadrants and Pomodoro counts.  
- Favorite recurring tasks with ❤️ to sort them to the top.  
- Add any recurring task to today’s tasks with one click.  
- Manage recurring tasks by deleting or toggling favorites.

### Marking Tasks as Complete

- On both the Task list and Schedule pages, checkboxes let you mark tasks complete.  
- Completed tasks are automatically moved out of the main task list and scheduled out.  
- The task card color changes to visually confirm completion.

### Celebrating Your Day

- When you’re done, click **"🎉 Complete Day"** on the Schedule page.  
- This shows a celebration page with a congratulatory message, a list of completed tasks, and a confetti burst.  
- Click **"🌅 Finish Day"** to confirm and clear all tasks for a fresh start tomorrow.  
- You can toggle sound effects on/off with the volume button (🔊/🔇).

---

## Settings & Customization

- **Sound Toggle:** Top-left 🔊 button mutes/unmutes all sound effects.  
- **Pomodoro Settings:** Customize session lengths and breaks to fit your workflow.  
- **Day Start/End:** Set your working hours to tailor the schedule.  
- **Drag & Drop:** Rearrange tasks anywhere with natural drag-and-drop support.  

---

## Sound Effects

The app uses gentle, cute sound effects for:

- Adding a task  
- Completing a task  
- Moving tasks via drag and drop  
- Celebrating the completion of your day  

Sounds can be toggled on/off anytime.

---

## Known Issues

- Occasionally, page transition animations may feel abrupt depending on browser performance.  
- Task deletion and schedule updates reload the task list for data consistency.  
- Drag and drop swapping in schedule is implemented but may need a refresh to update state fully.

---

## Contributing

Feel free to fork this project, suggest improvements, or submit pull requests!  
I welcome feature requests or bug reports via GitHub issues.

---

## License

MIT License — free to use and modify with attribution.  
See the [LICENSE](LICENSE) file for details.

---

# Thank you for using **My Day, My Way**!  
May your days be productive and cozy 🌸🍅
